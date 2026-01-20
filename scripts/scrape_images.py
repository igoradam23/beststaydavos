#!/usr/bin/env python3
"""
Scrape property images from beststaydavos.ch website links
Usage: python scripts/scrape_images.py [--limit N] [--dry-run]
"""

import os
import re
import json
import time
import hashlib
from pathlib import Path
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse
import sys

# Install dependencies
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests', 'beautifulsoup4', '-q'])
    import requests
    from bs4 import BeautifulSoup


def get_image_filename(url: str, property_slug: str, index: int) -> str:
    """Generate a filename for the image"""
    # Get extension from URL
    parsed = urlparse(url)
    path = parsed.path.lower()
    
    if '.jpg' in path or '.jpeg' in path:
        ext = 'jpg'
    elif '.png' in path:
        ext = 'png'
    elif '.webp' in path:
        ext = 'webp'
    elif '.gif' in path:
        ext = 'gif'
    else:
        ext = 'jpg'  # Default
    
    return f"{property_slug}_{index:02d}.{ext}"


def scrape_property_page(url: str, timeout: int = 10) -> List[str]:
    """Scrape images from a property page on beststaydavos.ch"""
    
    if not url or 'beststaydavos.ch' not in url:
        return []
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        images = []
        
        # Find all image sources
        # Common patterns on property sites:
        
        # 1. Standard img tags
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if src:
                # Make absolute URL
                src = urljoin(url, src)
                if is_property_image(src):
                    images.append(src)
        
        # 2. Background images in style attributes
        for elem in soup.find_all(style=True):
            style = elem.get('style', '')
            urls = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', style)
            for img_url in urls:
                img_url = urljoin(url, img_url)
                if is_property_image(img_url):
                    images.append(img_url)
        
        # 3. Source sets (srcset)
        for source in soup.find_all(['source', 'img']):
            srcset = source.get('srcset', '')
            if srcset:
                # Parse srcset format: "url1 1x, url2 2x" or "url1 100w, url2 200w"
                for part in srcset.split(','):
                    src = part.strip().split()[0] if part.strip() else None
                    if src:
                        src = urljoin(url, src)
                        if is_property_image(src):
                            images.append(src)
        
        # 4. Data attributes common in galleries
        for elem in soup.find_all(attrs={'data-image': True}):
            src = elem.get('data-image')
            if src:
                src = urljoin(url, src)
                if is_property_image(src):
                    images.append(src)
        
        for elem in soup.find_all(attrs={'data-full': True}):
            src = elem.get('data-full')
            if src:
                src = urljoin(url, src)
                if is_property_image(src):
                    images.append(src)
        
        # Deduplicate while preserving order
        seen = set()
        unique_images = []
        for img in images:
            # Normalize URL for comparison
            normalized = img.split('?')[0]  # Remove query params
            if normalized not in seen:
                seen.add(normalized)
                unique_images.append(img)
        
        return unique_images
        
    except Exception as e:
        print(f"  Error scraping {url}: {e}")
        return []


def is_property_image(url: str) -> bool:
    """Check if URL is likely a property image (not icon, logo, etc.)"""
    url_lower = url.lower()
    
    # Skip common non-property images
    skip_patterns = [
        'logo', 'icon', 'favicon', 'sprite', 'avatar',
        'loading', 'spinner', 'placeholder', 'blank',
        'button', 'arrow', 'social', 'share',
        'wp-includes', 'wp-content/themes',  # WordPress theme assets
        'gravatar', 'facebook', 'twitter', 'instagram',
        '.svg', '.gif',  # Usually not photos
        '1x1', '2x2', 'pixel',  # Tracking pixels
    ]
    
    for pattern in skip_patterns:
        if pattern in url_lower:
            return False
    
    # Must be an image
    image_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    has_image_ext = any(ext in url_lower for ext in image_extensions)
    
    # Or be from a CDN/image service
    image_services = ['cloudinary', 'imgix', 'unsplash', 'cloudfront', 'wp-content/uploads']
    from_image_service = any(svc in url_lower for svc in image_services)
    
    return has_image_ext or from_image_service


def download_image(url: str, output_path: Path, timeout: int = 30) -> bool:
    """Download an image to the specified path"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=timeout, stream=True)
        response.raise_for_status()
        
        # Check content type
        content_type = response.headers.get('content-type', '')
        if 'image' not in content_type and 'octet-stream' not in content_type:
            return False
        
        # Write file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
        
    except Exception as e:
        print(f"  Error downloading {url}: {e}")
        return False


def scrape_all_properties(limit: Optional[int] = None, dry_run: bool = False):
    """Scrape images for all properties with website links"""
    
    # Load properties
    data_dir = Path(__file__).parent.parent / 'data'
    properties_file = data_dir / 'properties.json'
    
    if not properties_file.exists():
        print("Error: properties.json not found. Run import_properties.py first.")
        return
    
    with open(properties_file, 'r', encoding='utf-8') as f:
        properties = json.load(f)
    
    # Filter properties with website links
    properties_with_links = [
        p for p in properties 
        if p.get('external_link') and 'beststaydavos.ch' in str(p.get('external_link', ''))
    ]
    
    print(f"Found {len(properties_with_links)} properties with beststaydavos.ch links")
    
    if limit:
        properties_with_links = properties_with_links[:limit]
        print(f"Limiting to {limit} properties")
    
    # Output directory
    images_dir = Path(__file__).parent.parent / 'public' / 'images' / 'properties'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # Track results
    results = {
        'processed': 0,
        'images_found': 0,
        'images_downloaded': 0,
        'errors': [],
        'property_images': {}
    }
    
    for i, prop in enumerate(properties_with_links, 1):
        slug = prop['slug']
        url = prop['external_link']
        
        print(f"\n[{i}/{len(properties_with_links)}] {prop['name']}")
        print(f"  URL: {url}")
        
        # Scrape images
        images = scrape_property_page(url)
        print(f"  Found {len(images)} images")
        
        results['images_found'] += len(images)
        results['property_images'][slug] = []
        
        if dry_run:
            for img in images[:5]:  # Show first 5
                print(f"    - {img[:80]}...")
            results['processed'] += 1
            continue
        
        # Download images (limit to 10 per property)
        for idx, img_url in enumerate(images[:10], 1):
            filename = get_image_filename(img_url, slug, idx)
            output_path = images_dir / filename
            
            if output_path.exists():
                print(f"  Already exists: {filename}")
                results['property_images'][slug].append(str(output_path.relative_to(Path(__file__).parent.parent)))
                continue
            
            print(f"  Downloading: {filename}")
            if download_image(img_url, output_path):
                results['images_downloaded'] += 1
                results['property_images'][slug].append(str(output_path.relative_to(Path(__file__).parent.parent)))
            
            # Be nice to the server
            time.sleep(0.5)
        
        results['processed'] += 1
        
        # Be nice to the server
        time.sleep(1)
    
    # Save results
    results_file = data_dir / 'scraped_images.json'
    with open(results_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n{'='*50}")
    print(f"Scraping Summary")
    print(f"{'='*50}")
    print(f"Properties processed: {results['processed']}")
    print(f"Total images found: {results['images_found']}")
    print(f"Images downloaded: {results['images_downloaded']}")
    print(f"Results saved to: {results_file}")
    
    if not dry_run:
        print(f"Images saved to: {images_dir}")
    
    return results


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Scrape property images from beststaydavos.ch')
    parser.add_argument('--limit', type=int, default=None,
                       help='Limit number of properties to scrape')
    parser.add_argument('--dry-run', action='store_true',
                       help='Only find images, do not download')
    
    args = parser.parse_args()
    
    scrape_all_properties(limit=args.limit, dry_run=args.dry_run)
