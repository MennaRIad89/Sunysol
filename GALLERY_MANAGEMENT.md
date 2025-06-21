# Gallery Management Guide

## How to Manage Tour Galleries

Your website now supports separate galleries for each tour. Here's how to add, remove, or modify images for specific tours:

## Gallery Structure

```
static/images/
├── Gallaries/                    # Main homepage gallery (your current 37 images)
└── Tour Galleries/               # Tour-specific galleries
    ├── dubai-modern/            # Dubai Modern Tour images
    ├── dubai-classic/           # Dubai Classic Heritage Tour images  
    ├── dubai-full/              # Dubai Full Day Tour images
    ├── dubai-cruise/            # Dubai Marina Cruise images
    ├── dubai-desert/            # Desert Safari images
    ├── abudhabi-city/           # Abu Dhabi City Tour images
    ├── abudhabi-louvre/         # Louvre Museum Tour images
    └── northern-emirates/       # Northern Emirates Tour images
```

## How It Works

**Priority System:**
1. **Tour-specific images:** If images exist in a tour's folder, those are displayed
2. **Fallback:** If no tour-specific images exist, it shows your main gallery images
3. **Homepage:** Always shows images from the main `Gallaries/` folder

## Managing Tour Images

### To Add Images to a Specific Tour:
1. Go to `static/images/Tour Galleries/[tour-name]/`
2. Upload your tour-specific images
3. Images will automatically appear in that tour's gallery

### To Remove Images from a Tour:
1. Delete image files from `static/images/Tour Galleries/[tour-name]/`
2. If you delete all images, the tour will show your main gallery as fallback

### To Change Image Order:
- Rename files with number prefixes: `01-image.jpg`, `02-image.jpg`, etc.
- Files are sorted alphabetically

## Tour Gallery Names

- **Dubai Modern Tour:** `dubai-modern`
- **Dubai Classic Heritage:** `dubai-classic`  
- **Dubai Full Day:** `dubai-full`
- **Dubai Marina Cruise:** `dubai-cruise`
- **Desert Safari:** `dubai-desert`
- **Abu Dhabi City:** `abudhabi-city`
- **Louvre Museum:** `abudhabi-louvre`
- **Northern Emirates:** `northern-emirates`

## Examples

**Add Dubai Modern Tour images:**
- Upload to: `static/images/Tour Galleries/dubai-modern/`
- Files: `01-burj-khalifa.jpg`, `02-palm-jumeirah.jpg`, etc.

**Add Desert Safari images:**
- Upload to: `static/images/Tour Galleries/dubai-desert/`
- Files: `01-dune-bashing.jpg`, `02-camel-ride.jpg`, etc.

## Current Status

- **Homepage Gallery:** Uses your 37 optimized images from `Gallaries/` folder
- **Tour Galleries:** Currently empty, will fallback to homepage images
- **Ready for customization:** You can now add tour-specific images anytime

## Quick Start

1. Choose a tour you want to customize
2. Navigate to its gallery folder
3. Upload relevant images
4. Visit the tour page to see your changes

The system automatically handles everything else - no code changes needed!