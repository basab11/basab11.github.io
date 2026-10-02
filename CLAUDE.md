# CLAUDE.md — Bharat Tech-Shakti Mission Website

## What this project is

A public, multi-page static website for the Bharat Tech-Shakti Mission and the
Swami Pranavananda AI & Robotics Lab. It has two jobs. It tells visitors who we
are, what the lab offers, and how to join. And it is the target for QR codes
printed into the Beginner course learning material.

## How to work on this project

Work in defined stages. Do not build the whole site in one pass. At each stage,
show your plan or output and wait for my approval before moving on. Never
publish or deploy without my say-so.

## Technical rules

* Plain HTML and CSS only. No framework, no build step. JavaScript only for the
navigation menu.
* Hosted on GitHub Pages from a public repository.
* Every page shares one header and one footer.
* English at launch. Lay out every page so a Hindi mirror under /hi/ can be
added later without a rebuild. Do not write the Hindi yet.
* Mobile first. Most visitors arrive by scanning a QR code on a phone. Pages
must read well on a small screen.
* Do not put large images or any video in the repository. Flag any video, and
any image over about 1 MB, for me to handle outside the repo. Use a
compressed copy or a link instead.

## Palette (from the printed book, exact)

* Navy #1A3A6B: headings, the top navigation bar, rules, icons, links.
* Saffron #F47920: accent bars, buttons, the active menu item, highlights.
* Cream #FAF3E3: soft background for cards or illustration areas only. The page
background stays white, matching the book. Do not flood a page with cream.
* Body text black #000000. Captions and hairlines grey #555555. White #FFFFFF
for text on navy. Use no other colours.

## Fonts (echo the book)

* Headings: Trebuchet MS Bold, navy, with a clean sans-serif fallback.
* Body: Calibri, with a plain system sans-serif fallback.
* Code samples: Consolas, monospace fallback.
* Hindi, when added later: Noto Sans Devanagari from Google Fonts. Never italic.
* Separate heading parts with a middot ·, not a dash.

## Voice and writing rules

* Warm, plain, patient English. Short sentences. Readable by a first-time
computer user and a school student alike.
* No em dashes. No semicolons in prose.
* Replace the word "research" with "gathering more information".
* Avoid corporate filler: leverage, robust, seamless, ensure, foster, utilise,
synergy, holistic, journey, innovative, essential, moreover, furthermore,
specifically, delve, elevate, unlock, vibrant, and similar.
* Recurring characters, if used, are first names only: Meena, Rakesh, Sunita,
Dadaji.

## Branding (there is no logo)

The Mission has no logo. The site's identity is a text wordmark. In the header,
set "Bharat Tech-Shakti Mission" in Trebuchet MS Bold navy, with the tagline
"Srijan Se Shakti" beneath it. The Devanagari सृजन से शक्ति may sit alongside the
transliteration as a brand anchor, even before the rest of the site is
bilingual. Load Noto Sans Devanagari for that one line. No logo image anywhere.

## The pages

Top navigation, in this order: Home, Courses, Lab, Learning Material, AI on
WhatsApp, Blog, Activities, Apply, FAQ, Contact. The exact block is fixed below
under "Canonical top navigation".

* Home: the mission in plain words, who can learn here, one line on community
based AI learning, a clear path to Apply. Source who/what/why from the preface
in reference/chapters/. May carry a short AI Shakti block that links to
/lessons.html. It is not its own menu item.
* Courses: Beginner, Intermediate, Advanced, with hours, fees, and the batch
model. Beginner is live. Mark Intermediate and Advanced as planned if the
source says so.
* Lab: the space and its equipment, from the brochure in
reference/forms-and-brochure/.
* Learning Material: the QR target. See the rule below.
* AI on WhatsApp: the page at /lessons.html. The single home of the AI Shakti
campaign. See the lessons.html rule below.
* Activities: completed events, newest first. Inauguration and the PGDAV
masterclass. See the Activities rule below.
* Apply: how to join. Link to a Google Form that I will create and give you the
link for. Until I supply the link, use a clearly marked placeholder button. A
static site cannot process a form itself, so the Google Form does the
collection. Form responses route privately to a monitored inbox. Do NOT
display any personal email on the site. The only email shown publicly is the
mission address on the Contact page.
* Contact: phone +91-80104-84692, email BharatTechShakti@gmail.com,
Instagram @BharatTechShakti, X @Tech_Shakti. No live contact form.

## Canonical top navigation (single source of truth)

Every page carries this exact nav block, byte for byte. The only per-page
change is which one link gets `aria-current="page"`. The chapter pages under
/learning/beginner/ mark the Learning Material link. The blog index and every
post under /blog/ mark the Blog link. Pages with no place in the
menu (404, /legal/) carry the block with no `aria-current` at all. Do not add,
remove, reorder, or rename items on one page only. Change it here first, then
apply the same change to every page in one pass.

```html
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
