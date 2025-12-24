# KaynAero Technocrats Website

A complete static website for KaynAero Technocrats, a Kenya-based digital services firm building websites for schools, churches, and institutions.

## Deployment Instructions

### Netlify Deployment (Recommended)

1. **Zip the folder**: Compress the entire `kaysn-aero-technocrats` folder
2. **Go to Netlify**: Visit [app.netlify.com](https://app.netlify.com)
3. **Drag and drop**: Drag the zip file into the Netlify drop zone
4. **Wait for deployment**: Netlify will automatically deploy your site
5. **Configure form handling**: 
   - Go to Site settings > Forms
   - Enable form detection
   - The contact form is already set up with `netlify` attribute

### Alternative: Manual Deployment

1. **Upload via FTP**: Upload all files to your web host's public_html folder
2. **Set index.html as default**: Ensure your server is configured to serve index.html as the default page
3. **Test all pages**: Visit each page to ensure links work correctly

## File Structure
kaysn-aero-technocrats/
├── index.html # Home page
├── services.html # Services page
├── who-we-serve.html # Who We Serve page
├── process.html # Our Process page
├── portfolio.html # Portfolio/Demos page
├── about.html # About Us page
├── contact.html # Contact page
├── css/
│ └── style.css # All styles
├── js/
│ └── script.js # All JavaScript
├── images/ # Image directory (placeholder)
└── README.md # This file

text

## Customization Notes

### Contact Information
Update the following in all HTML files:
- WhatsApp number: `+254 712 345 678` (replace with actual number)
- Email: `info@kaynaero.co.ke` (replace with actual email)
- Demo website links (in portfolio.html)

### Colors
Primary colors are defined in `css/style.css` root variables:
- `--primary-color`: #1a5f7a (dark blue)
- `--secondary-color`: #2d8a7a (teal)
- `--accent-color`: #ff7e30 (orange)

### Images
Placeholder icons are used. Replace with actual images:
1. Add favicon.ico to images folder
2. Replace hero image placeholders with actual screenshots
3. Add institution logos or photos as needed

## Technical Details

- **Pure HTML/CSS/JS**: No frameworks or libraries
- **Mobile-first**: Responsive design that works on all devices
- **Accessible**: Semantic HTML, ARIA labels where needed
- **Fast loading**: Minimal assets, optimized code
- **Netlify Forms**: Contact form ready for Netlify handling

## Form Handling

The contact form uses Netlify Forms. When deployed on Netlify:
1. Form submissions are automatically captured
2. You can set up notifications in Netlify settings
3. No backend code required

For other hosting, you'll need to:
1. Replace the form action with your form handler
2. Set up server-side processing

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (Chrome, Safari, Samsung Internet)

## License

All code is proprietary to KaynAero Technocrats.
