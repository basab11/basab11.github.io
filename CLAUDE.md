# CLAUDE.md - Bharat Tech-Shakti Mission Website Maintenance Guide
# Repository: https://github.com/basab11/basab11.github.io
# Domain: https://bharattechshakti.org/

## 1. Single Source of Truth: Canonical Navigation Bar
The header navigation is replicated across every HTML page because this repository uses `.nojekyll` on GitHub Pages. 
Whenever editing any page or adding new pages, ensure the top menu matches the EXACT 10-item structure below:

```html
<header class="site-header">
  <div class="masthead">
    <div class="wrap">
      <a class="wordmark" href="/">
        <span class="wordmark-name">Bharat Tech-Shakti Mission</span>
        <span class="wordmark-tag">
          <span class="deva" lang="hi">&#2360;&#2371;&#2332;&#2344; &#2360;&#2375; &#2358;&#2325;&#2381;&#2340;&#2367;</span>
          <span class="sep" aria-hidden="true">&middot;</span>
          <span class="wordmark-translit">Srijan Se Shakti</span>
        </span>
      </a>
    </div>
  </div>
  <div class="site-nav-bar">
    <div class="wrap">
      <button class="nav-toggle" type="button" aria-expanded="true" aria-controls="site-nav" hidden>Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/courses/">Courses</a></li>
          <li><a href="/lab/">Lab</a></li>
          <li><a href="/learning/">Learning Material</a></li>
          <li><a href="/lessons.html">AI on WhatsApp</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/activities/">Activities</a></li>
          <li><a href="/apply/">Apply</a></li>
          <li><a href="/faq/">FAQ</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>
```

> **CRITICAL RULE**: The only thing that changes between pages is which nav link carries `aria-current="page"`.
> Never add a separate "WhatsApp" anchor link pointing to the homepage. The sole home for the campaign is `/lessons.html` under the label **"AI on WhatsApp"** (Campaign: **AI Shakti**).

---

## 2. Structure of lessons.html ("AI Shakti on WhatsApp")
`lessons.html` is the single home of the AI Shakti campaign:
1. **Top Section**: Join-the-group call to action banner with QR code (`/assets/img/whatsapp-qr.png`) linking to WhatsApp (`https://chat.whatsapp.com/LlfkZSoZBm9FxmmA8YlOtB`).
2. **Bottom Section**: Chronological archive of past lessons dynamically rendered into `#root` from `lessons.json`.

### Weekly Update Isolation Rule
- The weekly WhatsApp lesson update routine **MUST ONLY** append new lesson objects to `lessons.json`.
- It **MUST NEVER** alter the top QR/CTA block, the page layout, or the header navigation in `lessons.html`.
- Do not modify `assets/js/nav.js` or `assets/css/site.css` during weekly lesson updates.

---

## 3. Brand & Volunteer Attribution
- The website showcases the initiative as:
  *"Bharat Tech-Shakti Mission is a volunteer-led initiative operating at the Swami Pranavananda AI & Robotics Lab, Bharat Sevashram Sangha, Sriniwaspuri, New Delhi."*
- Maintain the plain-language disclaimer in `/legal/` that protects the organization and sets expectations.

---

## 4. Pre-Push Verification Check
Run this verification grep before pushing changes to ensure zero menu drift:
```bash
# Ensure every HTML page carries the canonical 10 nav links
grep -L '/lessons.html' *.html */*.html */*/*.html
```
