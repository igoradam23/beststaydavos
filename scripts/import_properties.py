#!/usr/bin/env python3
"""
Import properties from Excel file to Supabase
Usage: python scripts/import_properties.py [--dry-run] [--json-only]
"""

import os
import re
import json
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional
import unicodedata

# Excel reading
try:
    import openpyxl
except ImportError:
    print("Installing openpyxl...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'openpyxl', '-q'])
    import openpyxl


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text


def parse_price(price_str: Optional[str]) -> Optional[float]:
    """Parse price string to float (e.g., '50,000.-' -> 50000.0)"""
    if not price_str or price_str == 'n/a':
        return None
    
    # Handle complex strings (e.g., "Single room: CHF 18'000.00\nDouble room...")
    if '\n' in str(price_str):
        # Take the first price mentioned
        lines = str(price_str).split('\n')
        for line in lines:
            match = re.search(r"[\d',\.]+", line)
            if match:
                price_str = match.group()
                break
    
    # Remove currency symbols, spaces, and format characters
    price_str = str(price_str)
    price_str = re.sub(r'[CHFchf\s]', '', price_str)
    price_str = price_str.replace("'", "").replace(",", "").replace(".-", "").replace("-", "")
    price_str = price_str.replace(".00", "").replace(".", "")
    
    # Handle "per night" - multiply by 7 for weekly rate
    is_per_night = 'per night' in str(price_str).lower() or 'night' in str(price_str).lower()
    
    try:
        # Extract just the number
        match = re.search(r'(\d+)', price_str)
        if match:
            price = float(match.group(1))
            if is_per_night:
                price *= 7  # Convert to weekly
            return price
    except (ValueError, TypeError):
        pass
    
    return None


def parse_distance(distance_str: Optional[str]) -> Optional[float]:
    """Parse distance string to km (e.g., '400m' -> 0.4, '1.7km' -> 1.7)"""
    if not distance_str or distance_str == 'n/a':
        return None
    
    distance_str = str(distance_str).lower().strip()
    
    # Handle meters
    match = re.search(r'(\d+)\s*m(?:eter)?s?(?!i)', distance_str)
    if match:
        return float(match.group(1)) / 1000
    
    # Handle kilometers
    match = re.search(r'([\d.]+)\s*km', distance_str)
    if match:
        return float(match.group(1))
    
    # Handle just numbers (assume km if > 10, else assume meters)
    match = re.search(r'([\d.]+)', distance_str)
    if match:
        val = float(match.group(1))
        return val / 1000 if val > 10 else val
    
    return None


def parse_availability(avail_str: Optional[str]) -> bool:
    """Parse availability to boolean"""
    if not avail_str:
        return True  # Default to available if not specified
    
    avail_str = str(avail_str).lower().strip()
    
    # Positive indicators
    if any(x in avail_str for x in ['✅', '☑', 'yes', 'available', 'true', '1']):
        return True
    
    # Negative indicators
    if any(x in avail_str for x in ['❌', 'no', 'booked', 'false', '0']):
        return False
    
    return True  # Default to available


def parse_int(val) -> Optional[int]:
    """Parse value to integer"""
    if val is None:
        return None
    
    if isinstance(val, int):
        return val
    
    if isinstance(val, float):
        return int(val)
    
    # Handle strings like "34 hotel rooms" - extract first number
    match = re.search(r'(\d+)', str(val))
    if match:
        return int(match.group(1))
    
    return None


def extract_city(address: str) -> str:
    """Extract city from address"""
    address = str(address).strip()
    
    # Common patterns
    if 'Klosters' in address:
        return 'Klosters'
    if 'Davos Dorf' in address:
        return 'Davos Dorf'
    if 'Davos Platz' in address:
        return 'Davos Platz'
    if 'Davos' in address:
        return 'Davos'
    
    # Try to extract from postal code area
    match = re.search(r'7\d{3}\s+(\w+)', address)
    if match:
        return match.group(1)
    
    return 'Davos'  # Default


def normalize_property_type(prop_type: str) -> str:
    """Normalize property type"""
    prop_type = str(prop_type).strip().lower()
    
    type_map = {
        'apartment': 'apartment',
        'apartments': 'apartment',
        'chalet': 'chalet',
        'house': 'house',
        'studio': 'studio',
        'hotel room': 'hotel_room',
        'hotel': 'hotel_room',
        'room': 'room',
        'building': 'building',
        'bundalodge building': 'building',
        'artel building': 'building',
        'blaues haus building': 'building',
        'gruppenhaus': 'group_house',
        'restaurant': 'commercial',
    }
    
    return type_map.get(prop_type, 'apartment')


def generate_name(prop_type: str, address: str, city: str) -> str:
    """Generate a property name from type and address"""
    # Clean address - get street name
    address = str(address).strip()
    
    # Remove postal codes and city names
    street = re.sub(r',?\s*\d{4}\s+\w+.*$', '', address)
    street = re.sub(r'\n.*$', '', street)
    street = street.strip().rstrip(',')
    
    # Capitalize type
    type_name = prop_type.replace('_', ' ').title()
    
    # Create name
    if street:
        return f"{type_name} {street}"
    else:
        return f"{type_name} {city}"


def import_excel(excel_path: str, dry_run: bool = False, json_only: bool = False):
    """Import properties from Excel file"""
    
    print(f"Loading Excel file: {excel_path}")
    wb = openpyxl.load_workbook(excel_path)
    ws = wb.active
    
    properties = []
    pricing_rules = []
    errors = []
    
    # Track slugs to ensure uniqueness
    used_slugs = set()
    
    for row_num, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
        try:
            # Skip empty rows
            if not row[0]:
                continue
            
            # Extract raw values
            prop_type = str(row[0]).strip() if row[0] else 'Apartment'
            address = str(row[1]).strip() if row[1] else ''
            bedrooms = parse_int(row[2])
            bathrooms = parse_int(row[3])
            guests = parse_int(row[4])
            price = parse_price(row[5])
            cleaning_fee = parse_price(row[6])
            security_deposit = parse_price(row[7])
            distance = parse_distance(row[8])
            available = parse_availability(row[9])
            website_link = str(row[10]).strip() if row[10] else None
            owner = str(row[11]).strip() if row[11] else None
            
            # Skip if no address
            if not address:
                errors.append(f"Row {row_num}: Missing address")
                continue
            
            # Normalize and derive values
            city = extract_city(address)
            property_type = normalize_property_type(prop_type)
            name = generate_name(property_type, address, city)
            
            # Generate unique slug
            base_slug = slugify(name)
            slug = base_slug
            counter = 1
            while slug in used_slugs:
                slug = f"{base_slug}-{counter}"
                counter += 1
            used_slugs.add(slug)
            
            # Default values for missing data
            bedrooms = bedrooms or 1
            bathrooms = bathrooms or 1
            guests = guests or 2
            distance = distance or 1.0
            
            # Create property record
            prop = {
                "name": name,
                "slug": slug,
                "property_type": property_type,
                "address": address.replace('\n', ', '),
                "city": city,
                "rooms": bedrooms,
                "bathrooms": bathrooms,
                "capacity": guests,
                "distance_to_congress": round(distance, 2),
                "cleaning_fee": cleaning_fee,
                "security_deposit": security_deposit,
                "wef_price": price,
                "external_link": website_link,
                "owner_info": owner,
                "active": available,
                "featured": False,
                "amenities": [],
                "description": None,
                "short_description": f"{property_type.replace('_', ' ').title()} in {city} with {bedrooms} bedroom{'s' if bedrooms > 1 else ''}, {guests} guests max.",
            }
            
            properties.append(prop)
            
            # Create pricing rule if price exists
            if price:
                pricing = {
                    "property_slug": slug,
                    "name": "WEF 2026",
                    "base_price_per_night": round(price / 7, 2),  # Weekly to nightly
                    "wef_multiplier": 1.0,
                    "min_stay": 7,
                    "cleaning_fee": cleaning_fee or 0,
                    "valid_from": "2026-01-01",
                    "valid_to": "2026-12-31",
                    "is_default": True,
                }
                pricing_rules.append(pricing)
            
        except Exception as e:
            errors.append(f"Row {row_num}: {str(e)}")
    
    # Summary
    print(f"\n{'='*50}")
    print(f"Import Summary")
    print(f"{'='*50}")
    print(f"Total properties: {len(properties)}")
    print(f"With pricing: {len(pricing_rules)}")
    print(f"Errors: {len(errors)}")
    
    if errors:
        print(f"\nErrors:")
        for err in errors[:10]:
            print(f"  - {err}")
        if len(errors) > 10:
            print(f"  ... and {len(errors) - 10} more")
    
    # Property types breakdown
    type_counts = {}
    for p in properties:
        t = p['property_type']
        type_counts[t] = type_counts.get(t, 0) + 1
    
    print(f"\nProperty types:")
    for t, count in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"  - {t}: {count}")
    
    # City breakdown
    city_counts = {}
    for p in properties:
        c = p['city']
        city_counts[c] = city_counts.get(c, 0) + 1
    
    print(f"\nCities:")
    for c, count in sorted(city_counts.items(), key=lambda x: -x[1]):
        print(f"  - {c}: {count}")
    
    # Save to JSON
    output_dir = Path(__file__).parent.parent / 'data'
    output_dir.mkdir(exist_ok=True)
    
    properties_file = output_dir / 'properties.json'
    pricing_file = output_dir / 'pricing_rules.json'
    
    with open(properties_file, 'w', encoding='utf-8') as f:
        json.dump(properties, f, indent=2, ensure_ascii=False)
    print(f"\nSaved properties to: {properties_file}")
    
    with open(pricing_file, 'w', encoding='utf-8') as f:
        json.dump(pricing_rules, f, indent=2, ensure_ascii=False)
    print(f"Saved pricing rules to: {pricing_file}")
    
    if json_only:
        print("\n--json-only flag set, skipping database import")
        return properties, pricing_rules
    
    if dry_run:
        print("\n--dry-run flag set, skipping database import")
        return properties, pricing_rules
    
    # Import to Supabase
    try:
        from supabase import create_client, Client
        
        supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
        supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
        
        if not supabase_url or not supabase_key:
            print("\nSupabase credentials not found in environment.")
            print("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to import to database.")
            print("JSON files have been saved for manual import.")
            return properties, pricing_rules
        
        print(f"\nConnecting to Supabase...")
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Insert properties
        print(f"Inserting {len(properties)} properties...")
        
        # Prepare for DB (remove fields not in schema)
        db_properties = []
        for p in properties:
            db_prop = {k: v for k, v in p.items() 
                      if k not in ['wef_price', 'external_link', 'owner_info', 'property_type']}
            db_properties.append(db_prop)
        
        # Insert in batches
        batch_size = 50
        for i in range(0, len(db_properties), batch_size):
            batch = db_properties[i:i+batch_size]
            result = supabase.table('properties').insert(batch).execute()
            print(f"  Inserted batch {i//batch_size + 1}/{(len(db_properties)-1)//batch_size + 1}")
        
        print("Database import complete!")
        
    except ImportError:
        print("\nSupabase Python client not installed.")
        print("Run: pip install supabase")
        print("JSON files have been saved for manual import.")
    except Exception as e:
        print(f"\nDatabase import error: {e}")
        print("JSON files have been saved for manual import.")
    
    return properties, pricing_rules


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Import properties from Excel to Supabase')
    parser.add_argument('--excel', default='/Users/igorkretov/Downloads/LIST WEF 2026.xlsx',
                       help='Path to Excel file')
    parser.add_argument('--dry-run', action='store_true',
                       help='Parse and validate only, do not import to database')
    parser.add_argument('--json-only', action='store_true',
                       help='Only output JSON files, do not attempt database import')
    
    args = parser.parse_args()
    
    import_excel(args.excel, dry_run=args.dry_run, json_only=args.json_only)
