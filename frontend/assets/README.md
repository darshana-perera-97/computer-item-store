# Assets Directory

## Current Status
The website is now using the local `test.jpg` image for all images throughout the site.

## Hero Image
The hero section uses:
```
assets/test.jpg
```

## Product Images
All product images now use:
```
assets/test.jpg (for main page)
../assets/test.jpg (for product pages)
```

## File Structure
```
frontend/
├── assets/
│   ├── test.jpg         ← Main image used throughout the site
│   └── README.md
├── css/
├── js/
├── products/
└── index.html
```

## Image Usage
- **Hero Section**: Main hero image (500x500 recommended)
- **Product Cards**: Thumbnail images (300x200 recommended)
- **Product Pages**: Main product images (600x400 recommended)
- **All images**: Currently using the same test.jpg file

## Notes
- The `test.jpg` image is used consistently across all sections
- Image paths are relative to the HTML file location
- Main page uses `assets/test.jpg`
- Product pages use `../assets/test.jpg` (one directory up) 