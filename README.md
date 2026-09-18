# Devin Zarate — Electrical Engineering Portfolio

A static portfolio site. No build step, no dependencies — plain HTML, CSS, and JavaScript.

```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── profile.svg      ← replace with your photo
│   └── resume.pdf       ← add your resume here
└── README.md
```

## Publishing on GitHub Pages

1. Create a new repository. Naming it `yourusername.github.io` gets you the clean
   URL `https://yourusername.github.io`; any other name gives you
   `https://yourusername.github.io/repo-name`.
2. Upload everything in this folder to the repository root — `index.html` must sit
   at the top level, not inside a subfolder.
3. In the repo, go to **Settings → Pages**, set **Source** to *Deploy from a branch*,
   pick `main` and `/ (root)`, and save.
4. Wait about a minute, then load the URL Pages shows you.

From the command line instead:

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
git push -u origin main
```

## Before you publish — five things to change

**1. Your photo.** Drop a portrait into `assets/` and update one line in `index.html`:

```html
<img src="assets/profile.png" alt="Portrait of Devin Zarate" />
```

A cutout with the background removed matches the layout best (remove.bg or
Photoshop's subject select). Shoot for roughly 900×1300px, portrait orientation.
If you keep a rectangular photo it still works, it just won't float the same way.

**2. Your resume.** Save the PDF as `assets/resume.pdf`. The download button in the
Education section already points there.

**3. Your GitHub link.** In `index.html`, the GitHub icon in the hero currently
points at `https://github.com/` — swap in your profile URL.

**4. Project details.** The bracketed numbers we talked about (layer count,
capacitance, inrush current, dB attenuation) will make these project descriptions
land harder. Add them in the `<article class="project">` blocks.

**5. Project photos.** Board shots, scope captures, and CAD renders are the single
biggest upgrade available to a hardware portfolio. To add one, put an image at the
top of a project card:

```html
<article class="project">
  <img src="assets/solar-pcb.jpg" alt="Contactor driver PCB" style="margin-bottom:22px" />
  <div class="project-meta">…
```

## Contact form

GitHub Pages serves static files only, so there's no server to receive a form post.
The form currently opens the visitor's email client with their message prefilled —
this works everywhere with zero setup.

To collect submissions in your inbox instead, create a free form endpoint at
[formspree.io](https://formspree.io) and change the form tag in `index.html`:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOURID" method="POST">
```

Then delete the `form.addEventListener("submit", …)` block in `js/main.js` so the
browser submits normally.

## Colors

Every color lives in one place — the `:root` block at the top of `css/style.css`.
Change `--accent` to shift the whole site's highlight color.

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#08120D` | Page background |
| `--panel` | `#0E1C15` | Alternating sections |
| `--card` | `#132419` | Project cards, form |
| `--accent` | `#17B26A` | Links, stats, highlights |
| `--text` | `#EDF3EF` | Body text |
| `--muted` | `#94AB9C` | Secondary text |

## Notes

- Fonts load from Google Fonts (Space Grotesk + Inter). Works offline-ish via
  fallbacks, but the design assumes those two.
- Responsive down to small phones; the portrait hides below 1080px so the text
  and side panel keep their space.
- Keyboard focus is visible, there's a skip link, and `prefers-reduced-motion`
  turns off the scroll animations.
