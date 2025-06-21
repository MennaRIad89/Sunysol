#!/usr/bin/env python3
"""
Image upload and processing script for Sun y Sol gallery
This script will help process and optimize your 42 gallery images
"""

import os
import shutil
from PIL import Image
import json

def process_gallery_images(source_folder, target_folder="static/images"):
    """
    Process images from source folder and optimize them for gallery
    - Resize images for consistent display
    - Optimize file sizes
    - Generate image metadata
    """
    
    # Create target folder if it doesn't exist
    os.makedirs(target_folder, exist_ok=True)
    
    # Image settings for optimization
    MAX_WIDTH = 1920
    MAX_HEIGHT = 1080
    QUALITY = 85
    
    processed_images = []
    
    # Get all image files from source folder
    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')
    image_files = [f for f in os.listdir(source_folder) 
                   if f.lower().endswith(image_extensions)]
    
    print(f"Found {len(image_files)} images to process...")
    
    for i, filename in enumerate(sorted(image_files), 1):
        try:
            source_path = os.path.join(source_folder, filename)
            
            # Create new filename with consistent naming
            file_ext = os.path.splitext(filename)[1].lower()
            new_filename = f"gallery_{i:02d}{file_ext}"
            target_path = os.path.join(target_folder, new_filename)
            
            # Open and process image
            with Image.open(source_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Calculate new size maintaining aspect ratio
                width, height = img.size
                if width > MAX_WIDTH or height > MAX_HEIGHT:
                    ratio = min(MAX_WIDTH/width, MAX_HEIGHT/height)
                    new_width = int(width * ratio)
                    new_height = int(height * ratio)
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Save optimized image
                img.save(target_path, 'JPEG', quality=QUALITY, optimize=True)
                
                processed_images.append({
                    'filename': new_filename,
                    'original_name': filename,
                    'size': img.size,
                    'alt': f"UAE Tour Gallery Image {i}"
                })
                
                print(f"Processed: {filename} -> {new_filename}")
        
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    
    # Save metadata
    metadata_path = os.path.join(target_folder, 'gallery_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(processed_images, f, indent=2)
    
    print(f"\nProcessed {len(processed_images)} images successfully!")
    print(f"Images saved to: {target_folder}")
    print(f"Metadata saved to: {metadata_path}")
    
    return processed_images

if __name__ == "__main__":
    print("Image Processing Script for Sun y Sol Gallery")
    print("=" * 50)
    
    source_folder = input("Enter the path to your folder with 42 images: ").strip()
    
    if not os.path.exists(source_folder):
        print("Error: Source folder does not exist!")
        exit(1)
    
    processed = process_gallery_images(source_folder)
    
    print(f"\nReady to update gallery with {len(processed)} images!")