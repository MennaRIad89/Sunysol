# 🌐 Sun y Sol – Social Links & WhatsApp Update Guide

This guide helps you update your **social media links** and **WhatsApp number** across your website source code.

---

## 📲 WhatsApp Number

### ✅ Format to use
International format **without + or spaces**  
Example: `971564649609`

### 📍 Update in These 4 Places

| File                          | Line Approx. | Description                                  |
|------------------------------|--------------|----------------------------------------------|
| `templates/index.html`       | ~Line 432    | Contact section WhatsApp button              |
| `templates/index.html`       | ~Line 500    | SEO schema JSON-LD structured data           |
| `static/js/booking-modal.js` | ~Line 703    | WhatsApp link used in the booking modal JS   |
| `templates/layout.html`      | ~Line 72     | Footer WhatsApp icon                         |

---

## 📸 Facebook & Instagram Links

### 🔁 Replace the placeholders:

- `FACEBOOK_URL_HERE`
- `INSTAGRAM_URL_HERE`

### 📍 Update in These 2 Places

| File                    | Description                     |
|------------------------|---------------------------------|
| `templates/layout.html`| Social icons in the footer      |
| `templates/index.html` | Social icons in contact section |

### 🔗 Example:
```html
<a href="https://www.facebook.com/sunysoltours" target="_blank" ...>
<a href="https://www.instagram.com/sunysoltours" target="_blank" ...>
