# SASS Architecture Documentation

## 📁 Structure

```
scss/
├── style.scss                 # Main entry point
├── _variables.scss            # Colors, fonts, spacing, etc.
├── _mixins.scss              # Reusable SASS mixins
├── _base.scss                # Base styles (typography, links)
├── _utilities.scss           # Utility classes
├── _responsive.scss          # Responsive breakpoints
├── _print.scss               # Print styles
└── components/
    ├── _header.scss          # Header & navigation
    ├── _hero.scss            # Hero section
    ├── _search.scss          # Search section
    ├── _services.scss        # Services cards
    ├── _quick-access.scss    # Quick access links
    ├── _news.scss            # News section
    ├── _footer.scss          # Footer
    └── _buttons.scss         # Button styles
```

## 🎯 Naming Convention

All CSS classes are prefixed with `ap-` (Area Privata) and namespaced under `.area-privata` to avoid conflicts:

### Prefix Pattern
- `ap-` = Area Privata prefix
- `ap-header` = Header component
- `ap-btn-primary` = Primary button
- `ap-footer-links` = Footer links

### Example
```scss
.area-privata {
  .ap-header {
    background: white;

    .ap-header-logo {
      // nested styles
    }
  }
}
```

This compiles to:
```css
.area-privata .ap-header {
  background: white;
}
.area-privata .ap-header .ap-header-logo {
  /* styles */
}
```

## 🎨 Variables

All design tokens are defined in `_variables.scss`:

### Colors
```scss
$ap-primary: #0066CC;
$ap-primary-dark: #004D99;
$ap-gray-100: #F5F6F7;
// ... etc
```

### Spacing
```scss
$ap-spacing-sm: 1rem;
$ap-spacing-md: 1.5rem;
$ap-spacing-lg: 2rem;
```

### Transitions
```scss
$ap-transition-fast: 0.2s ease;
$ap-transition-normal: 0.3s ease;
```

## 🔧 Mixins

Reusable patterns in `_mixins.scss`:

### Responsive Breakpoints
```scss
@include ap-respond-to('md') {
  // Styles for max-width: 767px
}
```

Available breakpoints: `sm`, `md`, `lg`, `xl`

### Card Styles
```scss
@include ap-card;          // Base card
@include ap-card-hover;    // Hover state
```

### Utilities
```scss
@include ap-flex-center;      // Flex center
@include ap-gradient-primary; // Primary gradient
@include ap-focus-ring;       // Focus outline
```

## 📝 Development Workflow

### 1. Watch Mode (Development)
Automatically recompile on file changes:
```bash
npm run sass:watch
```

### 2. Build (Production)
Compile compressed CSS:
```bash
npm run sass:build
```

### 3. File Organization
- **Create new components** in `scss/components/_component-name.scss`
- **Import in style.scss**: `@use 'components/component-name';`
- **Use variables**: `@use '../variables' as *;`
- **Use mixins**: `@use '../mixins' as *;`

## 🎯 Component Structure Example

```scss
// scss/components/_new-component.scss
@use '../variables' as *;
@use '../mixins' as *;

.area-privata {
  .ap-new-component {
    padding: $ap-spacing-lg;
    color: $ap-primary;

    &:hover {
      @include ap-card-hover;
    }

    @include ap-respond-to('md') {
      padding: $ap-spacing-sm;
    }
  }
}
```

## 🔄 Compilation

The SASS files are compiled to `css/style.css`:

```
scss/style.scss  →  css/style.css (compressed)
                →  css/style.css.map (source map)
```

The generated CSS file is **git-ignored** (only SCSS files are tracked).

## ✅ Benefits

1. **Namespace Protection**: All styles under `.area-privata` prevent global conflicts
2. **Consistent Prefixing**: `ap-` prefix makes all classes easily identifiable
3. **Modular Architecture**: Each component in its own file
4. **Variables**: Centralized design tokens
5. **Mixins**: Reusable patterns (DRY principle)
6. **Modern SASS**: Uses `@use` instead of deprecated `@import`
7. **Responsive**: Mobile-first approach with breakpoint mixins
8. **Maintainable**: Clear structure and naming conventions

## 📚 HTML Usage

Always wrap your content with the `.area-privata` class:

```html
<body class="area-privata">
  <header class="ap-header">
    <div class="ap-header-logo">...</div>
  </header>

  <button class="ap-btn ap-btn-primary">Click me</button>
</body>
```

## 🔍 Debugging

### Source Maps
Source maps are generated automatically, allowing you to see the original SCSS file in browser DevTools.

### Check Compiled CSS
```bash
cat css/style.css | head -50
```

### Validate SCSS
```bash
npx sass scss/style.scss --no-source-map --style=expanded
```

## 🎓 Best Practices

1. ✅ Always use the `ap-` prefix for new classes
2. ✅ Nest styles inside `.area-privata`
3. ✅ Use variables for colors, spacing, transitions
4. ✅ Create mixins for repeated patterns
5. ✅ Keep components modular (one file per component)
6. ✅ Use `@use` instead of `@import`
7. ✅ Test responsive breakpoints
8. ✅ Run `sass:build` before committing

## 🚀 Quick Commands

```bash
# Watch and recompile on changes
npm run sass:watch

# One-time compilation
npm run sass:build

# Build + test worker
npm run dev:worker

# Full build
npm run build
```

## 📖 Resources

- [SASS Documentation](https://sass-lang.com/documentation)
- [SASS @use](https://sass-lang.com/documentation/at-rules/use)
- [BEM Methodology](http://getbem.com/)
- [CSS Architecture](https://philipwalton.com/articles/css-architecture/)

