# INPS-Inspired GitHub Pages Project

A GitHub Pages website inspired by the design and structure of the official INPS (Istituto Nazionale Previdenza Sociale) website at https://www.inps.it/.

## Features

- ✨ Modern, responsive design based on Italian government design standards
- 🎨 INPS color palette and Titillium Web font (official Italian government font)
- 📱 Mobile-first approach with Bootstrap 5
- ♿ Accessibility features (skip links, ARIA labels, keyboard navigation)
- 🔍 Search functionality
- 📰 News section
- 🎯 Service cards and quick access links
- 🌐 Multi-section navigation
- ⚡ **Cloudflare Worker proxy for AEM content** (see below)

## Cloudflare Worker - AEM Proxy

This project includes a **Cloudflare Pages Function** that acts as a reverse proxy to Adobe AEM Cloud. The worker automatically forwards specific paths to the AEM backend while serving static assets from Cloudflare Pages.

### Proxied Paths

| Local Path | Forwarded To |
|------------|-------------|
| `/content/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/content/*` |
| `/etc/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/etc/*` |
| `/etc.clientlibs/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/etc.clientlibs/*` |
| `/libs/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/libs/*` |

### Quick Start

```bash
# Install dependencies
npm install

# Test worker locally
npm run dev:worker

# Open test page
open http://localhost:8788/worker-test.html
```

### Documentation

- 📘 **[CLOUDFLARE_WORKER.md](CLOUDFLARE_WORKER.md)** - Complete worker documentation
- 🚀 **[WORKER_QUICKSTART.md](WORKER_QUICKSTART.md)** - Quick start guide
- 🧪 **[worker-test.html](worker-test.html)** - Interactive test page

The worker is automatically deployed when you push to GitHub (if using Cloudflare Pages).

## Design Elements

### Color Palette
- **Primary Blue**: #0066CC (INPS signature blue)
- **Dark Blue**: #004D99
- **Success Green**: #00CC66
- **Warning Orange**: #F90
- **Text Dark**: #17324D
- **Gray Tones**: Various shades for backgrounds and borders

### Typography
- **Font Family**: Titillium Web (Google Fonts)
- **Weights**: 300, 400, 600, 700

## Structure

```
/
├── index.html          # Main homepage
├── css/
│   └── style.css      # Custom styles inspired by INPS
├── js/
│   └── app.js         # Interactive functionality
├── img/
│   ├── logo-inps.svg          # INPS logo
│   └── hero-illustration.svg  # Hero section illustration
├── favicon.ico
├── icon.svg
├── icon.png
├── robots.txt
└── site.webmanifest
```

## Sections

1. **Header**
   - Logo and branding
   - Login/Access button
   - Main navigation with dropdowns
   - Categories: Pensione, Lavoro, Famiglia, Imprese

2. **Hero Section**
   - Welcome message
   - Call-to-action buttons
   - Illustration

3. **Search Section**
   - Prominent search bar for services and content

4. **Services Section**
   - Four main service categories with icons
   - Pensioni, Disoccupazione, Famiglia, Certificazioni

5. **Quick Access Section**
   - Direct links to frequently used services
   - Grid layout with icons

6. **News Section**
   - Latest news and updates
   - Date-stamped articles

7. **Footer**
   - Multiple columns with links
   - Social media icons
   - Copyright information

## Development

### Prerequisites
- Node.js and npm installed

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

This will start the webpack dev server at http://localhost:8080

### Alternative: Simple HTTP Server

```bash
npm run serve
```

### Build for Production

```bash
npm run build
```

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - INPS-inspired homepage"
   ```

3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```

4. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

5. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Choose "/ (root)" as folder
   - Save

Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Accessibility

This project follows WCAG 2.1 guidelines:
- Skip links for keyboard navigation
- Proper heading hierarchy
- ARIA labels on interactive elements
- Sufficient color contrast ratios
- Responsive font sizes
- Focus indicators

## Credits

- Design inspiration: [INPS Official Website](https://www.inps.it/)
- Typography: [Titillium Web](https://fonts.google.com/specimen/Titillium+Web)
- Framework: [Bootstrap 5](https://getbootstrap.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

## License

MIT License - See LICENSE.txt for details

## Note

This is an educational project inspired by the INPS website design. It is not affiliated with or endorsed by INPS (Istituto Nazionale Previdenza Sociale).

