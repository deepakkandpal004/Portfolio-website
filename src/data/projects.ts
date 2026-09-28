export type Screenshot = { src: string; alt: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  caseStudy: {
    problem: string;
    solution: string;
    results: string[];
  };
  highlights: string[];
  proof: string[];
  tech: string[];
  live: string;
  github: string;
  accent: string;
  accentSoft: string;
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "careerforge",
    title: "CareerForge",
    category: "AI career platform",
    summary: "A full-stack resume builder with AI-powered writing, ATS scoring, cover letter generation, and interview prep — all in one workspace.",
    caseStudy: {
      problem:
        "Job seekers juggle five different tools — one to write the resume, another to check ATS compatibility, a third to tailor it per job description, plus cover letters and interview prep. Good candidates get filtered out by applicant tracking systems before a human ever sees them.",
      solution:
        "One workspace that does it all: import a PDF resume and extract structured data, tailor it to any job description with Groq AI, score ATS compatibility with actionable feedback, generate cover letters and prep for interviews — with 7 templates, live preview, PDF export, auto-save and 20 versions of history, secured by JWT auth with HttpOnly cookies.",
      results: [
        "7 ATS-optimized templates",
        "20 resume versions retained",
        "PDF import to JD-tailored resume pipeline",
      ],
    },
    highlights: [
      "ATS Score Checker and Resume Tailor to match any job description",
      "Cover Letter Generator and Interview Prep with AI",
      "7 templates, live preview, PDF export, and auto-save",
    ],
    proof: ["7 templates", "Groq AI", "Auto-save"],
    tech: ["React 19", "Vite 7", "Express 5", "MongoDB", "Groq AI"],
    live: "https://resume-builder-saas-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/Resume-Builder-SaaS",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/dashboard.png", alt: "ResumeAI dashboard", label: "Dashboard" },
      { src: "/images/resumeBuilder.png", alt: "ResumeAI editor", label: "Resume editor" },
      { src: "/images/resume.png", alt: "ResumeAI landing", label: "Landing page" },
    ],
  },
  {
    slug: "finora",
    title: "Finora",
    category: "AI finance tracker",
    summary: "An AI-powered expense tracker with intelligent insights, smart budgets, and savings goals — manage your finances in one place.",
    caseStudy: {
      problem:
        "Manual expense tracking dies within weeks — typing every transaction is tedious, and most apps show you charts without ever telling you what your spending actually means.",
      solution:
        "AI receipt scanning with OpenRouter that extracts transactions automatically, an AI financial coach with spending analysis and recommendations, budgets with real-time alerts, savings goals, recurring transactions, a command palette and dark mode — all on PostgreSQL + Prisma with strict multi-user data isolation.",
      results: [
        "AI receipt scanning via OpenRouter",
        "Budgets, savings goals & real-time alerts",
        "Multi-user isolation on PostgreSQL + Prisma",
      ],
    },
    highlights: [
      "AI Financial Coach with spending analysis and recommendations",
      "Budget tracking with real-time alerts and visual progress",
      "Savings goals, command palette, and dark mode",
    ],
    proof: ["OpenRouter AI", "Prisma + PostgreSQL", "Dark mode"],
    tech: ["Next.js 15", "React 19", "Prisma", "PostgreSQL", "OpenRouter"],
    live: "https://next-expense-tracker-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/next-expense-tracker",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/expense-dashboard.png", alt: "Finora dashboard", label: "Dashboard" },
      { src: "/images/expense.png", alt: "Finora landing", label: "Landing page" },
    ],
  },
  {
    slug: "trim",
    title: "Trim",
    category: "Full-stack URL shortener",
    summary: "A full-stack URL shortener with custom aliases, JWT auth, and a dashboard — short links redirect directly from your domain.",
    caseStudy: {
      problem:
        "Long URLs look unprofessional and tell you nothing — and most shorteners either lack analytics or force you onto someone else's domain.",
      solution:
        "Custom aliases on your own domain, link expiry, QR codes, CSV export and 14-day click analytics. Auth built from scratch — scrypt password hashing, short-lived JWTs and rotating refresh tokens in HttpOnly cookies, no auth library. 57 Vitest unit tests with GitHub Actions CI/CD.",
      results: [
        "57 Vitest unit tests",
        "Auth from scratch: scrypt + rotating refresh tokens",
        "GitHub Actions CI/CD pipeline",
      ],
    },
    highlights: [
      "Custom aliases and direct redirects from yourdomain.com/:code",
      "JWT auth with dashboard to manage, copy, and delete links",
      "57 unit tests, GitHub Actions CI/CD, and Vercel deployments",
    ],
    proof: ["57 unit tests", "CI/CD pipeline", "Drizzle ORM"],
    tech: ["Next.js 16", "PostgreSQL", "Drizzle", "JWT", "Vitest"],
    live: "https://url-shortener-lyart-two.vercel.app",
    github: "https://github.com/deepakkandpal004/URL-Shortener",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/Url-shortener.png", alt: "Trim dashboard", label: "Dashboard" },
    ],
  },
  {
    slug: "macos-portfolio",
    title: "macOS Portfolio",
    category: "Interactive web experience",
    summary: "A macOS-inspired portfolio with a dock, draggable windows, and interactive apps — Terminal, Safari, Finder, and Resume viewer.",
    caseStudy: {
      problem:
        "Every developer portfolio looks the same — hero, cards, contact form. Nothing that makes a visitor stop, explore and remember.",
      solution:
        "A full macOS desktop recreated in the browser: a dock with hover magnification and app launching, draggable windows with GSAP for a native feel, and working Terminal, Safari, Finder and Resume-viewer apps — all window state managed with Zustand, opening with a welcome typing animation.",
      results: [
        "Working Terminal, Safari & Finder apps",
        "GSAP draggable window system",
        "Zustand-powered window state",
      ],
    },
    highlights: [
      "macOS dock with hover magnification and app launch",
      "Draggable windows with GSAP for a native feel",
      "Zustand-powered window state and welcome typing animation",
    ],
    proof: ["GSAP animations", "Zustand state", "Window system"],
    tech: ["React 19", "Vite 7", "GSAP", "Zustand", "Tailwind CSS v4"],
    live: "https://macos-portfolio-sepia.vercel.app",
    github: "https://github.com/deepakkandpal004/MacOS-Portfolio",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/macos-portfolio.png", alt: "macOS portfolio", label: "Desktop" },
    ],
  },
];
