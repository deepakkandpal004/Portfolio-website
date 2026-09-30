# Deepak Kandpal — Portfolio

Personal portfolio website. Dark-only minimal design with a GitHub activity dashboard, project case studies, blog, and a working contact form.

**Live:** https://deepakkandpal.me

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 18, TypeScript
- **Styling:** CSS custom properties + per-component styles (no CSS framework)
- **Animation:** Framer Motion
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (terminal/code)
- **Contact API:** Next.js Route Handler + Resend
- **GitHub API:** Route Handler proxy with caching
- **SEO:** Metadata API, auto-generated OG image, sitemap, robots
- **Deployment:** Vercel

## Features

- "Ask about Deepak" floating chat widget (rule-based)
- GitHub dashboard — live stats, repos, and a real 365-day contribution graph
- Project case-study pages (`/projects/[slug]`) with SEO metadata
- Technical blog (`/blog`)
- Contact form (Resend) + Calendly "Book a call" banner
- Resume download in the hero

## Project Structure

```
app/
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout, metadata, fonts
├── opengraph-image.tsx       # Auto-generated OG image
├── sitemap.ts / robots.ts    # SEO
├── not-found.tsx
├── blog/                     # Blog index + [slug] posts
├── projects/[slug]/          # Project case-study pages
└── api/
    ├── contact/              # Contact form → Resend
    └── github/               # GitHub stats proxy (cached)
src/
├── components/               # Hero, About, Experience, Skills,
│                             # GitHubDashboard, Work, BlogPreview, Contact,
│                             # Navbar, AskDeepak, SocialSidebar, ...
├── data/                     # projects.ts, posts.ts
└── index.css                 # Design tokens + global styles
public/
├── resume.pdf
└── images/                   # Project screenshots
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/deepakkandpal004/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start the development server
npm run dev

# Type-check and lint
npm run type-check
npm run lint

# Production build
npm run build
```

## Environment Variables

Set these in your Vercel project settings (and in `.env.local` for local dev):

```
RESEND_API_KEY=your_resend_api_key
```

The contact form sends to the address configured in `app/api/contact/route.ts`.

## License

MIT — open source and available for use.

---

Built by Deepak Kandpal.
