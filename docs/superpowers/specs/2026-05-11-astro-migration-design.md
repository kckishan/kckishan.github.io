# Astro Migration Design Spec

**Date:** 2026-05-11  
**Goal:** Migrate kckishan.github.io from Hugo + Academic (Wowchemy) to Astro + Tailwind + React. Preserve all existing content. Improve maintainability and positioning as Senior Applied Scientist at Amazon AGI.

---

## Context

Current stack: Hugo + Academic theme (Wowchemy). Pain points: hard to update, complex TOML config, outdated content management. Chrome "Dangerous Site" warning was triggered by an insecure `_redirects` entry (already fixed); the Safe Browsing cache clears in 24–48h regardless of framework.

Target audience: Recruiters at top AI labs + public portfolio record.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4.x |
| Styling | Tailwind CSS |
| Interactive components | React (via `@astrojs/react`) |
| Deployment | Netlify (unchanged) |
| Content | Astro Content Collections (Markdown) + TypeScript data files |

---

## File Structure

```
kckishan.github.io/
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   └── Publications.astro
│   ├── content/
│   │   └── publications/       # one .md file per paper
│   ├── data/
│   │   ├── profile.ts          # bio, interests, social links, education
│   │   └── experience.ts       # work history
│   ├── layouts/
│   │   └── BaseLayout.astro    # <head>, fonts, global styles
│   └── pages/
│       └── index.astro         # Single-page homepage
├── public/
│   ├── images/                 # avatar.jpg, publication thumbnails
│   └── files/                  # CV PDF, paper PDFs
├── _redirects                  # Netlify redirects (keep as-is)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Homepage Layout

Single-page, scroll-based. Section order optimized for recruiter scanning.

```
Nav  (sticky, smooth scroll — About · Experience · Publications)
Hero         — name, title, org, social icon links, avatar photo
About        — bio paragraph, interests as tags
Experience   — vertical timeline
Publications — paper cards (title, venue, year, tags, PDF/DOI links)
```

---

## Content Model

### Publications — `src/content/publications/<slug>.md`

```markdown
---
title: ""
date: YYYY-MM-DD
authors: []
venue: ""
tags: []
pdf: ""        # path under /files/ or external URL
doi: ""
abstract: ""
featured: true
---
```

All 8 existing papers migrated from `content/publication/content/publication/*/index.md`.

### Profile — `src/data/profile.ts`

```ts
export const profile = {
  name: "Kishan KC",
  role: "Senior Applied Scientist",
  org: "Amazon AGI",
  bio: `...`,
  interests: [
    "Multimodal AI",
    "Visual Question Answering",
    "Information Retrieval",
    "Representation Learning",
    "Probabilistic Machine Learning"
  ],
  education: [
    { degree: "PhD in Computing and Information Sciences", institution: "Rochester Institute of Technology", year: 2022 },
    { degree: "B.E. in Computer Engineering", institution: "Institute of Engineering, Tribhuvan University", year: 2014 }
  ],
  social: {
    email: "kishankhatrichettri@gmail.com",
    github: "https://github.com/kckishan",
    linkedin: "https://www.linkedin.com/in/kishankc",
    scholar: "https://scholar.google.co.uk/citations?user=pNQVEMUAAAAJ",
    twitter: "https://twitter.com/kishan_kc07",
    cv: "/files/kishan_kc_resume.pdf"
  }
}
```

### Experience — `src/data/experience.ts`

```ts
export const experience = [
  {
    title: "Senior Applied Scientist",
    company: "Amazon AGI Info",
    companyUrl: "https://www.amazon.com",
    location: "Sunnyvale, CA",
    start: "2022-02",
    end: null,
    description: "Building multimodal AI systems for text-to-image retrieval, image-to-image retrieval, text-to-video retrieval, and visual question answering — shipped features serving millions of Amazon customers."
  },
  {
    title: "Applied Scientist Intern",
    company: "Alexa AI, Amazon",
    companyUrl: "https://www.amazon.com",
    location: "Sunnyvale, CA",
    start: "2021-06",
    end: "2021-09",
    description: "Embedding adaptation via transformer-based architecture in open-set few-shot learning for speaker identification."
  },
  {
    title: "Graduate Research Assistant",
    company: "Rochester Institute of Technology",
    companyUrl: "https://www.rit.edu",
    location: "Rochester, NY",
    start: "2016-08",
    end: "2022-02",
    description: "Scalable biomedical network inference using network representation learning and Bayesian neural architecture inference."
  }
]
```

---

## Content Migration Mapping

| Hugo source | New location |
|---|---|
| `content/author/admin/_index.md` | `src/data/profile.ts` |
| `content/home/experience.md` | `src/data/experience.ts` |
| `content/publication/content/publication/*/index.md` | `src/content/publications/*.md` |
| `static/files/` | `public/files/` |
| `content/author/admin/avatar.jpg` | `public/images/avatar.jpg` |

Publication PDFs and featured images are copied to `public/files/` and `public/images/` respectively.

---

## Design

- **Color:** Clean minimal — white background, dark text, single accent (blue-600 or teal-600)
- **Typography:** Inter or Geist (system font fallback)
- **Hero:** Avatar right-aligned on desktop, centered on mobile; social icon row below name/title
- **Experience:** Vertical timeline with company name, title, date range, description
- **Publications:** Card grid — title, venue + year badge, author list, tag chips, PDF/DOI icon links
- **Nav:** Fixed top, transparent → solid on scroll, smooth scroll anchors

---

## Out of Scope

- Blog posts (existing posts not migrated)
- Projects section
- Skills section
- Accomplishments section
- Contact section
- LinkedIn profile updates (separate effort, follow-on)
