# Media Queries - Complete Guide

## What are Media Queries?

Media Queries are CSS rules that allow you to apply different styles based on device characteristics like screen size, orientation, resolution, and more. They are essential for creating responsive web designs that work across all devices.

---

## Basic Syntax

### Simple Media Query:

```css
@media (condition) {
  /* CSS rules applied when condition is true */
}
```

### Example:

```css
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

---

## Media Query Features

### 1. Width-based Queries

#### `max-width`

Applies styles to screens **up to** a certain width:

```css
@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}
```

#### `min-width`

Applies styles to screens **at least** a certain width:

```css
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}
```

#### `width`

Applies styles to a specific screen width:

```css
@media (width: 768px) {
  body {
    background-color: blue;
  }
}
```

### 2. Height-based Queries

#### `max-height`

```css
@media (max-height: 600px) {
  .navbar {
    padding: 5px;
  }
}
```

#### `min-height`

```css
@media (min-height: 800px) {
  .sidebar {
    position: fixed;
  }
}
```

### 3. Orientation

#### `portrait`

For devices taller than wide:

```css
@media (orientation: portrait) {
  body {
    flex-direction: column;
  }
}
```

#### `landscape`

For devices wider than tall:

```css
@media (orientation: landscape) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 4. Other Features

#### `aspect-ratio`

```css
@media (aspect-ratio: 16/9) {
  .video {
    width: 100%;
  }
}
```

#### `resolution`

```css
@media (resolution: 300dpi) {
  body {
    font-size: 16px;
  }
}
```

---

## Combining Media Queries

### AND operator

Use `and` to combine multiple conditions:

```css
@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### OR operator

Use comma (`,`) to create multiple conditions (OR logic):

```css
@media (max-width: 480px), (orientation: portrait) {
  body {
    font-size: 14px;
  }
}
```

### NOT operator

Use `not` to negate conditions:

```css
@media not (max-width: 768px) {
  .navbar {
    display: flex;
  }
}
```

---

## Common Breakpoints

### Mobile-First Approach:

```css
/* Mobile: 320px - 480px */
@media (min-width: 320px) {
  body {
    font-size: 14px;
  }
}

/* Small Tablet: 481px - 768px */
@media (min-width: 481px) {
  body {
    font-size: 15px;
  }
}

/* Tablet/iPad: 769px - 1024px */
@media (min-width: 769px) {
  body {
    font-size: 16px;
  }
}

/* Desktop: 1025px - 1440px */
@media (min-width: 1025px) {
  body {
    font-size: 16px;
  }
}

/* Large Desktop: 1441px+ */
@media (min-width: 1441px) {
  body {
    font-size: 18px;
  }
}
```

### Desktop-First Approach:

```css
/* Default: Desktop styles */
body {
  font-size: 18px;
}

/* Tablet and below */
@media (max-width: 1024px) {
  body {
    font-size: 16px;
  }
}

/* Small devices */
@media (max-width: 768px) {
  body {
    font-size: 15px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  body {
    font-size: 14px;
  }
}
```

---

## Practical Examples

### Example 1: Responsive Navigation

```css
/* Mobile: Vertical menu */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .nav-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
}

/* Desktop: Horizontal menu */
@media (min-width: 769px) {
  .navbar {
    flex-direction: row;
    justify-content: space-around;
  }

  .nav-item {
    padding: 20px;
  }
}
```

### Example 2: Responsive Grid

```css
/* Mobile: Single column */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

/* Tablet: Two columns */
@media (min-width: 481px) and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: Three columns */
@media (min-width: 769px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Example 3: Responsive Typography

```css
body {
  font-size: 14px;
  line-height: 1.4;
}

h1 {
  font-size: 24px;
}

/* Tablet */
@media (min-width: 768px) {
  body {
    font-size: 16px;
    line-height: 1.6;
  }

  h1 {
    font-size: 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }

  h1 {
    font-size: 42px;
  }
}
```

### Example 4: Image Gallery

```css
/* Mobile: 1 column */
@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .gallery-item {
    height: 200px;
  }
}

/* Tablet: 2 columns */
@media (min-width: 481px) and (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .gallery-item {
    height: 250px;
  }
}

/* Desktop: 3 columns */
@media (min-width: 769px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .gallery-item {
    height: 300px;
  }
}
```

---

## Mobile-First vs Desktop-First

### Mobile-First (Recommended)

- Start with mobile styles (base)
- Use `min-width` to enhance for larger screens
- Simpler and cleaner code
- Better for performance

```css
/* Base: Mobile */
.container {
  width: 100%;
  padding: 10px;
}

/* Enhanced for tablet */
@media (min-width: 768px) {
  .container {
    width: 95%;
    padding: 20px;
  }
}

/* Enhanced for desktop */
@media (min-width: 1024px) {
  .container {
    width: 80%;
    padding: 40px;
  }
}
```

### Desktop-First

- Start with desktop styles (base)
- Use `max-width` to reduce for smaller screens
- Can lead to code duplication

```css
/* Base: Desktop */
.container {
  width: 80%;
  padding: 40px;
}

/* Reduced for tablet */
@media (max-width: 1024px) {
  .container {
    width: 95%;
    padding: 20px;
  }
}

/* Reduced for mobile */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
```

---

## Best Practices

### 1. Test Thoroughly

- Test on actual devices
- Use Chrome DevTools device emulation
- Check all breakpoints

### 2. Use Meaningful Breakpoints

- Base breakpoints on content, not specific devices
- Adjust where content breaks naturally

```css
@media (max-width: 600px) {
  /* Adjust when content breaks */
}
```

### 3. Keep Selectors Specific

```css
/* Good */
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr;
  }
}

/* Avoid universal styles in media queries */
@media (max-width: 768px) {
  * {
    margin: 0;
  }
}
```

### 4. Use Mobile-First

- Simpler media queries
- Better performance
- Progressive enhancement

### 5. Organize Media Queries

Group related styles together:

```css
/* Component styles */
.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

### 6. Meta Viewport Tag

Always include in HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## Debugging Media Queries

### Chrome DevTools:

1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test responsive behavior

### Check Applied Styles:

```css
@media (max-width: 768px) {
  .test {
    border: 5px solid red;
  }
}
```

If red border appears, media query is active.

---

## Common Media Query Patterns

### Hide Elements on Mobile

```css
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
}
```

### Show Elements on Mobile Only

```css
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }
}
```

### Change Layout Direction

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

### Adjust Spacing

```css
@media (max-width: 768px) {
  .container {
    gap: 10px;
    padding: 10px;
  }
}

@media (min-width: 769px) {
  .container {
    gap: 20px;
    padding: 40px;
  }
}
```

---

## Summary

Media queries are essential for responsive design:

- Use `min-width` for mobile-first (preferred)
- Use `max-width` for desktop-first
- Test on actual devices
- Keep breakpoints logical
- Always include viewport meta tag
- Organize code for maintainability
