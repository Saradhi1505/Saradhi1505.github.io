# Pardha Saradhi Alapati — Portfolio

A personal portfolio site: React (Vite) + Tailwind CSS, with a cosmic React
Three Fiber hero scene and a scroll-scrubbed "mountain road" SVG animation
in the Education section.

## Folder structure

```
portfolio/
├── index.html                  # SEO/OG meta tags, Google Fonts
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── resume.pdf              # ← ADD YOUR RESUME HERE (see below)
│   ├── profile.jpg             # ← ADD YOUR PROFILE PHOTO HERE (see below)
│   └── og-image.png            # ← ADD A SOCIAL PREVIEW IMAGE HERE (see below)
├── src/
│   ├── main.jsx                # React root
│   ├── App.jsx                 # Assembles all sections
│   ├── index.css               # Theme tokens (CSS vars), Tailwind import
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/light toggle, persisted to localStorage
│   ├── hooks/
│   │   ├── useReducedMotion.js # Live prefers-reduced-motion tracking
│   │   └── useIsMobile.js      # Viewport-based mobile detection
│   ├── data/
│   │   └── content.js          # ALL real content lives here (single source of truth)
│   ├── components/
│   │   ├── sections/           # One file per page section
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx        # Includes large ProfilePhoto
│   │   │   ├── About.jsx       # Includes smaller ProfilePhoto next to bio
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx  # Role card + certification card grid (no timeline line)
│   │   │   ├── Education.jsx   # Mountain-road scroll section, 4 stages
│   │   │   ├── Contact.jsx     # Validated form + direct links
│   │   │   └── Footer.jsx
│   │   ├── ui/                 # Reusable primitives
│   │   │   ├── Button.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── SkillBadge.jsx
│   │   │   ├── StatCounter.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ExperienceCard.jsx  # Standalone role/certification card
│   │   │   └── ProfilePhoto.jsx    # Circular photo w/ glow ring + initials fallback
│   │   ├── 3d/                 # Everything R3F-related, isolated here
│   │   │   ├── CosmicScene.jsx         # Canvas + scene assembly
│   │   │   ├── CosmicSceneBoundary.jsx # Error boundary -> CSS fallback
│   │   │   ├── Starfield.jsx
│   │   │   ├── GlowOrb.jsx
│   │   │   └── Constellation.jsx
│   │   └── education/
│   │       └── EducationPath.jsx  # Scroll-scrubbed SVG road, multi-marker
├── package.json
└── vite.config.js
```

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To build a production bundle and preview it locally:

```bash
npm run build
npm run preview
```

## Before you deploy — things to add or fill in

1. **Profile photo** — drop your photo at `public/profile.jpg`. It's used
   large in the Hero and smaller in the About section. Until the file is
   added, both spots gracefully show your initials ("PS") on a warm
   gradient instead of a broken image — so the site never looks broken,
   it just looks a little less personal until you add the real photo.
   Any common image format works — just update `profileImage` in
   `src/data/content.js` if you use a different filename/extension.
2. **Resume PDF** — drop your resume at `public/resume.pdf`. The
   "Download Resume" buttons in the navbar and hero already link to
   `/resume.pdf`; no code changes needed once the file is in place.
3. **10th class & Intermediate details** — `src/data/content.js` has
   placeholder entries (marked `// TODO`) in the `educationHistory`
   array for your 10th class and Intermediate schooling — board/school
   name, years, and percentage/CGPA. Fill these in with your real
   details; the Education section will pick them up automatically.
4. **Social preview image** — `index.html` references `/og-image.png`
   for Open Graph/Twitter card previews (what shows up when the link is
   shared on LinkedIn, Twitter/X, etc). Add a 1200×630px image at
   `public/og-image.png`. Until you add one, the meta tag will just point
   to a missing file — harmless, but the link preview will look empty.

## Key packages and approximate versions

Installed via `npm install`, exact versions pinned in `package.json`:

| Package                  | Version   | Purpose                                  |
|---------------------------|-----------|-------------------------------------------|
| `react` / `react-dom`     | ^19.2     | UI framework                              |
| `vite`                    | ^8.1      | Build tool / dev server                   |
| `tailwindcss`             | ^4.3      | Utility CSS (v4 — CSS-based config)       |
| `@tailwindcss/postcss`    | latest    | Tailwind v4 PostCSS plugin                |
| `framer-motion`           | ^12.42    | 2D animation, spring interactions, scroll |
| `three`                   | ^0.185    | 3D engine underlying R3F                  |
| `@react-three/fiber`      | ^9.6      | React renderer for Three.js               |
| `@react-three/drei`       | ^10.7     | R3F helpers (OrbitControls, etc.)         |
| `react-parallax-tilt`     | ^1.7      | Project card hover-tilt effect            |

> Note: this project uses **Tailwind v4**, which moved most configuration
> into CSS (`@theme inline` block in `src/index.css`) rather than a
> `tailwind.config.js` file. If you're used to Tailwind v3, that's the
> main structural difference — color tokens like `bg-surface`,
> `text-clay`, `border-hairline` are defined there, mapped from the raw
> CSS variables that also drive dark/light mode and the 3D scene's colors.

## Deployment (Vercel or Netlify)

This is a static Vite build — both platforms support it with zero custom
server config. The one thing that needs attention is **Three.js/WebGL in
production builds**, covered below.

### Vercel

1. Push this project to a GitHub repo.
2. In Vercel: **New Project → Import** your repo.
3. Framework preset: Vercel auto-detects **Vite** — leave defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. To point your existing domain (`pardhasaradhi.me`) at it:
   **Project Settings → Domains → Add**, then update your DNS (A/CNAME
   records) as Vercel instructs.

### Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project**.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. To use `pardhasaradhi.me`: **Site settings → Domain
   management → Add a domain**, then update DNS as instructed.

### Three.js / WebGL production notes

- **No special bundler config was needed** — `@react-three/fiber` and
  `three` work out of the box with Vite's default build. The
  `CosmicScene` component is already dynamically `import()`-ed
  (`React.lazy` in `Hero.jsx`), so Vite automatically code-splits it into
  its own chunk (`CosmicScene-*.js`, confirmed in local builds at
  ~900KB / ~240KB gzipped) rather than bloating the main bundle or
  blocking first paint.
- **If you see a blank hero background in production but not in dev:**
  this is almost always a WebGL context issue on the *hosting* CDN's
  headers, not the code. Both Vercel and Netlify serve static assets
  correctly by default — no action needed — but if you add a custom
  `Content-Security-Policy` header later, make sure it allows
  `worker-src 'self' blob:` (Three.js can spin up workers for certain
  loaders) and doesn't block `data:`/`blob:` for `img-src`/`connect-src`.
- **Graceful degradation is already built in:** the `CosmicSceneBoundary`
  error boundary catches WebGL failures (e.g., a visitor's browser has
  WebGL disabled, or a headless/old browser hits the site) and falls back
  to a static CSS gradient — so a WebGL issue in some visitor's
  environment will never produce a broken page, only a slightly less
  animated one.
- **Mobile performance:** particle counts and `devicePixelRatio` are
  already capped and reduced for viewports under 768px, and
  drag-to-orbit is disabled on mobile to avoid conflicting with page
  scroll. No additional production config needed for this.

## Wiring up the Contact form

The form currently **simulates** a submission (see the comment block in
`src/components/sections/Contact.jsx`) so it's fully functional in the UI
without needing a backend. To make it actually send messages, pick one:

- **Formspree** (simplest, no dependencies): create a form at
  formspree.io, then swap the simulated `await` in `handleSubmit` for a
  `fetch` POST to your Formspree endpoint. Exact snippet is commented
  inline in the file.
- **EmailJS** (sends directly from the browser): `npm install
  @emailjs/browser`, set up a service/template at emailjs.com, then call
  `emailjs.send(...)` in place of the simulated `await`. Snippet also
  commented inline.

## Accessibility & performance notes

- All interactive elements are keyboard-focusable with visible focus
  rings (`:focus-visible` styled globally).
- Images/icons are inline SVG with `aria-hidden` where decorative.
- The 3D scene and the Education scroll animation both fully respect
  `prefers-reduced-motion`, falling back to static, still-informative
  content rather than just "less motion."
- The 3D scene is split into its own chunk via `React.lazy`, so a
  visitor never downloads Three.js before they've even seen the hero
  text.
