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
        "A full-stack workspace built with React 19 + Vite on the frontend and Express 5 + MongoDB on the backend, secured with JWT auth in HttpOnly cookies. Groq AI powers the core loop: AI resume writing, tailoring to any job description, ATS scoring with actionable feedback, cover letter generation, and interview prep. 7 ATS-optimized templates with live preview, PDF import that extracts structured data from an existing resume, auto-save with 20-version history, and one-click PDF export.",
      results: [
        "7 ATS-optimized templates with live preview",
        "JD-tailored resume generated in seconds",
        "20-version history — no work ever lost",
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
      { src: "/images/careerforge-landing.png", alt: "CareerForge landing page", label: "Landing page" },
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
        "A Next.js 15 app on PostgreSQL + Prisma with strict per-user data isolation. OpenRouter AI scans receipts and extracts transactions automatically — zero manual entry. An AI financial coach analyzes spending patterns and gives concrete recommendations. Budgets with real-time overspend alerts, savings goals with visual progress tracking, recurring transaction handling, and a command palette for power users — all wrapped in a full dark mode.",
      results: [
        "Receipt to transaction in seconds, no typing",
        "AI coach with actionable spending insights",
        "Budgets, goals & alerts in one dashboard",
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
      { src: "/images/finora-landing.png", alt: "Finora landing page", label: "Landing page" },
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
        "A Next.js 16 + PostgreSQL/Drizzle URL shortener with custom aliases on your own domain, link expiry, QR code generation, CSV export, and 14-day click analytics on a management dashboard. Authentication built from scratch — scrypt password hashing, short-lived JWTs, and rotating refresh tokens in HttpOnly cookies, no auth library. 57 Vitest unit tests guard the core logic, with GitHub Actions CI/CD deploying to Vercel.",
      results: [
        "Custom aliases on your own domain",
        "Auth from scratch: scrypt + rotating refresh tokens",
        "57 unit tests with CI/CD on every push",
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
      { src: "/images/trim-dashboard.png", alt: "Trim dashboard", label: "Dashboard" },
    ],
  },
  {
    slug: "async-job-processing",
    title: "Async Job Processing",
    category: "Backend job queue",
    summary: "A production-style async job system in TypeScript — Express API, Postgres-backed job store, Redis coordination, and workers with leases, heartbeats, idempotency, and a dead-letter queue.",
    caseStudy: {
      problem:
        "Background jobs are where backends quietly break: workers die mid-task and leave work stuck, retries process the same job twice, and failures go unnoticed until customers complain.",
      solution:
        "A TypeScript job system built for failure from the start. An Express API enqueues jobs into a PostgreSQL-backed store; Redis coordinates a pool of workers that claim work with leases and heartbeats, so no job stays stuck on a dead worker. Idempotency keys and fencing tokens make retries safe to re-run; poisoned jobs land in a dead-letter queue with manual retry. Prometheus metrics and Grafana dashboards expose throughput and failure rates, everything runs via docker-compose, and load-test scripts verify behavior under pressure.",
      results: [
        "Lease + heartbeat model — zero stuck jobs",
        "Safe retries via idempotency keys & fencing tokens",
        "DLQ with manual retry + full observability",
      ],
    },
    highlights: [
      "Worker leases with heartbeats and automatic recovery",
      "Idempotency keys, fencing tokens, and dead-letter queue",
      "Prometheus metrics + Grafana dashboards, Redis coordination",
    ],
    proof: ["DLQ + retries", "Prometheus", "Load tests"],
    tech: ["TypeScript", "Express", "PostgreSQL", "Redis", "Docker"],
    live: "",
    github: "https://github.com/deepakkandpal004/Async-job-processing",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.12)",
    screenshots: [
      { src: "/images/async-job-processing.svg", alt: "Async Job Processing — job queue overview", label: "Overview" },
    ],
  },
];
