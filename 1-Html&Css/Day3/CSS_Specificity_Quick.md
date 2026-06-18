# CSS Specificity - Quick Problems (Mixed Difficulty)

**Calculate the specificity for each selector:**

---

## Problem 1 (BASIC)

`p`

**Answer:** 1

---

## Problem 2 (BASIC)

`.intro`

**Answer:** 10

---

## Problem 3 (BASIC)

`#header`

**Answer:** 100

---

## Problem 4 (MEDIUM)

`p.intro`

**Answer:** 11 (element + class = 1 + 10)

---

## Problem 5 (MEDIUM)

`div#main.container`

**Answer:** 111 (element + ID + class = 1 + 100 + 10)

---

## Problem 6 (MEDIUM)

`.btn.primary.large`

**Answer:** 30 (3 classes = 10 + 10 + 10)

---

## Problem 7 (MEDIUM)

`button[type="submit"]`

**Answer:** 11 (element + attribute = 1 + 10)

---

## Problem 8 (MODERATE)

`a:hover`

**Answer:** 11 (element + pseudo-class = 1 + 10)

---

## Problem 9 (MODERATE)

`#nav ul li a:hover`

**Answer:** 113 (ID + 3 elements + pseudo-class = 100 + 1 + 1 + 1 + 10)

---

## Problem 10 (MODERATE)

`#main #sub.active ul li:nth-child(3)`

**Answer:** 123 (2 IDs + 1 class + 2 elements + 1 pseudo-class = 100 + 100 + 10 + 1 + 1 + 10)

---

## Problem 11 (BASIC)

`*`  

**Answer:** 0 (universal selector)

---

## Problem 12 (MEDIUM)

`input:focus:active`

**Answer:** 21 (element + 2 pseudo-classes = 1 + 10 + 10)

---

## Problem 13 (MEDIUM)

`section > article p.highlight`

**Answer:** 12 (3 elements + 1 class = 1 + 1 + 1 + 10)

---

## Problem 14 (MODERATE)

`.navbar .menu li.active a[href]:hover`

**Answer:** 32 (2 classes + 1 attribute + 1 pseudo-class + 2 elements = 10 + 10 + 10 + 10 + 1 + 1)

---

## Problem 15 (MODERATE)

`#wrapper #main .container .box div p:nth-of-type(2)`

**Answer:** 122 (2 IDs + 2 classes + 2 elements + 1 pseudo-class = 100 + 100 + 10 + 10 + 1 + 1 + 10)

---

## Specificity Reference

| Selector                      | Points |
| ----------------------------- | ------ |
| Element (p, div, a)           | 1      |
| Class (.class)                | 10     |
| Attribute ([attr])            | 10     |
| Pseudo-class (:hover, :focus) | 10     |
| ID (#id)                      | 100    |
| Inline style                  | 1000   |
| Universal (\*)                | 0      |
