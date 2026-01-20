#!/usr/bin/env python3
"""
Scrape all property images from beststaydavos.ch
Usage: python scripts/scrape_website_images.py [--dry-run]
"""

import os
import re
import json
import time
import hashlib
from pathlib import Path
from typing import List, Set
from urllib.parse import urljoin, urlparse
import sys

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests', 'beautifulsoup4', '-q'])
    import requests
    from bs4 import BeautifulSoup


def get_full_size_url(url: str) -> str:
    """Convert WordPress thumbnail URL to full-size URL"""
    # Remove size suffixes like -150x150, -300x200, -1024x768
    pattern = r'-\d+x\d+(\.[a-zA-Z]+)$'
    return re.sub(pattern, r'\1', url)


def is_property_image(url: str) -> bool:
    """Check if URL is a property image"""
    url_lower = url.lower()
    
    # Must be from the WordPress uploads
    if 'wp-content/uploads' not in url_lower:
        return False
    
    # Must be an image
    if not any(ext in url_lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
        return False
    
    # Skip logos, icons, etc.
    skip_patterns = ['logo', 'icon', 'favicon', 'banner', 'header']
    if any(p in url_lower for p in skip_patterns):
        return False
    
    return True


def download_image(url: str, output_path: Path, timeout: int = 30) -> bool:
    """Download an image"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=timeout, stream=True)
        response.raise_for_status()
        
        content_type = response.headers.get('content-type', '')
        if 'image' not in content_type and 'octet-stream' not in content_type:
            return False
        
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        # Check file size - skip if too small (probably placeholder)
        if output_path.stat().st_size < 5000:  # Less than 5KB
            output_path.unlink()
            return False
        
        return True
        
    except Exception as e:
        print(f"  Error: {e}")
        return False


def scrape_accommodation_page() -> Set[str]:
    """Scrape all image URLs from the accommodation page"""
    
    url = 'https://beststaydavos.ch/accommodation/'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    
    print(f"Fetching: {url}")
    response = requests.get(url, headers=headers, timeout=30)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    images = set()
    
    # Find all img tags
    for img in soup.find_all('img'):
        # Check src
        src = img.get('src')
        if src and is_property_image(src):
            images.add(get_full_size_url(src))
        
        # Check data-src (lazy loading)
        data_src = img.get('data-src') or img.get('data-lazy-src')
        if data_src and is_property_image(data_src):
            images.add(get_full_size_url(data_src))
        
        # Check srcset for larger versions
        srcset = img.get('srcset') or img.get('data-srcset')
        if srcset:
            for part in srcset.split(','):
                src_part = part.strip().split()[0]
                if is_property_image(src_part):
                    images.add(get_full_size_url(src_part))
    
    # Also check background images
    for elem in soup.find_all(style=True):
        style = elem.get('style', '')
        urls = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', style)
        for img_url in urls:
            img_url = urljoin(url, img_url)
            if is_property_image(img_url):
                images.add(get_full_size_url(img_url))
    
    return images


def main(dry_run: bool = False):
    """Main function"""
    
    print("Scraping beststaydavos.ch for property images...")
    print()
    
    # Get all image URLs
    images = scrape_accommodation_page()
    
    print(f"\nFound {len(images)} unique property images")
    
    if dry_run:
        print("\nSample images (dry run):")
        for img in sorted(images)[:20]:
            print(f"  {img}")
        return
    
    # Setup output directory
    output_dir = Path(__file__).parent.parent / 'public' / 'images' / 'scraped'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Download images
    downloaded = 0
    skipped = 0
    failed = 0
    
    print(f"\nDownloading to: {output_dir}")
    
    for i, img_url in enumerate(sorted(images), 1):
        # Generate filename from URL
        parsed = urlparse(img_url)
        filename = Path(parsed.path).name
        output_path = output_dir / filename
        
        if output_path.exists():
            print(f"[{i}/{len(images)}] Skipping (exists): {filename}")
            skipped += 1
            continue
        
        print(f"[{i}/{len(images)}] Downloading: {filename}")
        
        if download_image(img_url, output_path):
            downloaded += 1
        else:
            failed += 1
        
        # Be nice to the server
        time.sleep(0.3)
    
    # Save image manifest
    manifest = {
        'source': 'beststaydavos.ch',
        'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S'),
        'total_found': len(images),
        'downloaded': downloaded,
        'skipped': skipped,
        'failed': failed,
        'images': sorted([str(output_dir / Path(urlparse(u).path).name) for u in images])
    }
    
    data_dir = Path(__file__).parent.parent / 'data'
    data_dir.mkdir(exist_ok=True)
    
    manifest_file = data_dir / 'scraped_images_manifest.json'
    with open(manifest_file, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n{'='*50}")
    print("Scraping Complete")
    print(f"{'='*50}")
    print(f"Downloaded: {downloaded}")
    print(f"Skipped (already exists): {skipped}")
    print(f"Failed: {failed}")
    print(f"Manifest saved to: {manifest_file}")


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Scrape images from beststaydavos.ch')
    parser.add_argument('--dry-run', action='store_true', help='Only list images, do not download')
    
    args = parser.parse_args()
    main(dry_run=args.dry_run)
