# Responsive Web Design & CSS Layout Guide

https://vivmagarwal.notion.site/CSS-grid-8f2b508b098f4806ab011b095e652ba4

## 📚 Table of Contents

1. CSS Grid Basics
2. Positioning
3. Media Queries
4. Responsive Design Principles
5. Flex vs Grid Comparison
6. Mobile-First Thinking
7. Responsive Image Gallery
8. Portfolio Projects/Gallery Section

---

## 1. CSS Grid Basics

### What is CSS Grid?

CSS Grid is a powerful 2D layout system that allows you to create complex web layouts with rows and columns.

### Key Concepts:

- **Grid Container**: The parent element with `display: grid`
- **Grid Items**: Direct children of the grid container
- **Tracks**: Rows and columns
- **Grid Lines**: Dividing lines between tracks
- **Grid Cells**: Single unit in the grid
- **Grid Areas**: Rectangular space made up of grid cells

### Basic Syntax:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 20px;
}

.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
```

### Useful Grid Properties:

| Property                | Description          |
| ----------------------- | -------------------- |
| `grid-template-columns` | Define column sizes  |
| `grid-template-rows`    | Define row sizes     |
| `gap`                   | Space between items  |
| `grid-auto-flow`        | How items are placed |
| `justify-items`         | Horizontal alignment |
| `align-items`           | Vertical alignment   |

### Asymmetric Grid Layout Example:

#### HTML:

```html
<div class="asymmetric-grid">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
  <div class="item item-4"></div>
  <div class="item item-5"></div>
  <div class="item item-6"></div>
</div>
```

#### CSS:

```css
.asymmetric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px 100px;
  gap: 15px;
}

.item-1 {
  background-color: #d9534f;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.item-2 {
  background-color: #6f2da8;
  grid-column: 2 / 4;
  grid-row: 1 / 2;
}

.item-3 {
  background-color: #6f2da8;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}

.item-4 {
  background-color: #0051ba;
  grid-column: 3 / 4;
  grid-row: 2 / 4;
}

.item-5 {
  background-color: #d9534f;
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.item-6 {
  background-color: #d9534f;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
```

---

## 2. Positioning

### Types of Positioning:

#### a) **Static (Default)**

```css
position: static;
```

#### b) **Relative**

```css
position: relative;
top: 10px;
left: 20px;
```

#### c) **Absolute**

```css
position: absolute;
top: 50px;
left: 50px;
```

#### d) **Fixed**

```css
position: fixed;
top: 0;
right: 0;
```

#### e) **Sticky**

```css
position: sticky;
top: 20px;
```

### Z-index

Controls stacking order of positioned elements:

```css
.element {
  position: relative;
  z-index: 10;
}
```

---

## 3. Media Queries

### Purpose

Adapt your website to different screen sizes and devices.

### Basic Syntax:

```css
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

### Common Breakpoints:

```css
@media (min-width: 480px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}

@media (min-width: 1440px) {
}
```

### Media Query Features:

- `max-width`: Maximum width of viewport
- `min-width`: Minimum width of viewport
- `orientation`: Portrait or landscape
- `max-height`: Maximum height of viewport

### Example:

```css
@media (max-width: 768px) and (orientation: portrait) {
}
```

---

## 4. Responsive Design Principles

### Key Principles:

#### 1. **Fluid Layouts**

- Use percentages instead of fixed pixels
- Use `max-width` to prevent over-stretching

```css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
```

#### 2. **Flexible Images**

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

#### 3. **Flexible Typography**

```css
body {
  font-size: 16px;
}

@media (max-width: 480px) {
  body {
    font-size: 14px;
  }
}
```

#### 4. **Touch-Friendly Design**

- Minimum touch target size: 44x44 pixels
- Adequate spacing between interactive elements

```css
a,
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}
```

---

## 5. Flex vs Grid Comparison

### When to Use Flexbox:

✅ **One-dimensional layouts**

- Navigation bars
- Button groups
- Centering content
- Equal-height columns

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### When to Use Grid:

✅ **Two-dimensional layouts**

- Page layouts
- Image galleries
- Dashboard layouts
- Complex designs

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### Comparison Table:

| Feature        | Flexbox                | Grid                |
| -------------- | ---------------------- | ------------------- |
| Dimensions     | 1D (row or column)     | 2D (rows & columns) |
| Best For       | Components             | Layouts             |
| Alignment      | Easy (justify-content) | More precise        |
| Learning Curve | Easier                 | Steeper             |
| Nesting        | Often needed           | Less needed         |

---

## 6. Mobile-First Thinking

### What is Mobile-First?

Design for mobile devices first, then enhance for larger screens.

### Advantages:

- Forces you to focus on essentials
- Better performance on mobile
- Progressive enhancement
- Simpler media queries

### Example:

```css
.container {
  grid-template-columns: 1fr;
  font-size: 16px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Mobile-First Checklist:

- ✓ Design simplicity first
- ✓ Only add complexity for larger screens
- ✓ Use `min-width` in media queries
- ✓ Test on actual mobile devices
- ✓ Optimize images for mobile
- ✓ Keep interactions simple

---
