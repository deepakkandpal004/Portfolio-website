# Deepak Kandpal — Portfolio

Personal portfolio website built with React, TypeScript, and Vite. Features a dark/light theme, GitHub activity dashboard, project showcase, and a working contact form powered by Resend.

**Live:** https://deepakkandpal.me

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** CSS custom properties (no CSS framework)
- **Contact API:** Vercel Serverless Function + Resend
- **SEO:** react-helmet-async + JSON-LD structured data
- **Deployment:** Vercel

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx           # Landing section with typewriter effect
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Tech stack grid
│   ├── GitHubDashboard.tsx # Live GitHub stats & repos
│   ├── Work.tsx           # Project showcase
│   ├── Contact.tsx        # Contact section
│   ├── ContactForm.tsx    # Form with API integration
│   ├── Navbar.tsx         # Fixed navigation with scroll effect
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── MainContainer.tsx  # Root layout
│   └── SEO.tsx            # Meta tags & structured data
├── context/
│   └── ThemeContext.tsx   # Theme state management
├── App.tsx
├── main.tsx
└── index.css              # Global styles & CSS variables
api/
└── contact.ts             # Vercel serverless contact handler
public/
└── images/                # Project screenshots
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
```

## Environment Variables

For the contact form, set this in your Vercel project settings:

```
RESEND_API_KEY=your_resend_api_key
```

## License

MIT — open source and available for use.

---

Built by Deepak Kandpal.
