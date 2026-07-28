"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

type Screenshot = {
  src: string;
  alt: string;
  label: string;
};

type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  proof: string[];
  tech: string[];
  live: string;
  github: string;
  accent: string;
  accentSoft: string;
  featured: boolean;
  screenshots: Screenshot[];
};

const projects: Project[] = [
  {
    slug: "resume-builder",
    title: "Resume Builder SaaS",
    category: "AI career platform",
    summary:
      "A complete AI-assisted workflow for creating tailored, ATS-ready resumes and job-application materials.",
    highlights: [
      "Import a PDF and turn it into editable resume data",
      "Tailor resumes to a job description with ATS scoring",
      "Generate cover letters and role-specific interview prep",
    ],
    proof: ["7 resume templates", "PDF export", "AI-powered"],
    tech: ["React", "Node.js", "MongoDB", "Groq AI", "Redux"],
    live: "https://resume-builder-saas-rsdeepakg.vercel.app/",
    github: "https://github.com/deepakkandpal004/resume-builder-SaaS",
    accent: "#22d3a7",
    accentSoft: "rgba(34, 211, 167, 0.12)",
    featured: true,
    screenshots: [
      {
        src: "/images/dashboard.png",
        alt: "ResumeAI dashboard showing resume management and ATS insights",
        label: "Dashboard",
      },
      {
        src: "/images/resumeBuilder.png",
        alt: "ResumeAI editor with a live resume document preview",
        label: "Resume editor",
      },
      {
        src: "/images/resume.png",
        alt: "ResumeAI landing page describing ATS-ready resume creation",
        label: "Landing page",
      },
    ],
  },
  {
    slug: "expense-ai",
    title: "Expense AI",
    category: "Intelligent finance tracker",
    summary:
      "A personal finance workspace that turns everyday transactions into clear budgets, goals, and AI-driven guidance.",
    highlights: [
      "Track transactions, budgets, categories, and savings goals",
      "Surface spending patterns and personalized financial insights",
      "Pair a fast dashboard with secure, type-safe server actions",
    ],
    proof: ["AI financial coach", "PostgreSQL + Prisma", "Responsive dashboard"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenRouter"],
    live: "https://next-expense-tracker-rsdeepakg.vercel.app",
    github: "https://github.com/deepakkandpal004/next-expense-tracker",
    accent: "#22d3ee",
    accentSoft: "rgba(34, 211, 238, 0.12)",
    featured: true,
    screenshots: [
      {
        src: "/images/expenseDashboard.png",
        alt: "Expense AI dashboard with balances, spending data, and AI insights",
        label: "Dashboard",
      },
      {
        src: "/images/expense.png",
        alt: "Expense AI landing page with its smart-spending value proposition",
        label: "Landing page",
      },
    ],
  },
  {
    slug: "url-shortener",
    title: "ShortLink",
    category: "Production URL shortener",
    summary:
      "A full-stack link management tool built for fast redirects, custom aliases, and reliable deployment.",
    highlights: ["Custom aliases and JWT authentication", "21 unit tests with CI/CD", "Direct redirect route with PostgreSQL + Drizzle"],
    proof: ["21 unit tests", "GitHub Actions", "Vercel deployment"],
    tech: ["Next.js", "PostgreSQL", "Drizzle", "JWT", "Vitest"],
    live: "https://url-shortener-lyart-two.vercel.app",
    github: "https://github.com/deepakkandpal004/URL-Shortener",
    accent: "#a78bfa",
    accentSoft: "rgba(167, 139, 250, 0.12)",
    featured: false,
    screenshots: [
      {
        src: "/images/Url-shortener.png",
        alt: "ShortLink URL shortener dashboard",
        label: "Product dashboard",
      },
    ],
  },
  {
    slug: "macos-portfolio",
    title: "macOS Portfolio",
    category: "Interactive web experience",
    summary:
      "A desktop-inspired portfolio that brings familiar macOS patterns to the browser with playful, polished interactions.",
    highlights: ["Window management and dock interactions", "Motion-rich desktop interface", "Stateful UI built for a native-feeling experience"],
    proof: ["Window system", "GSAP motion", "Zustand state"],
    tech: ["React", "Vite", "GSAP", "Zustand", "Tailwind CSS"],
    live: "https://macos-portfolio-sepia.vercel.app",
    github: "https://github.com/deepakkandpal004/MacOS-Portfolio",
    accent: "#8b9dff",
    accentSoft: "rgba(139, 157, 255, 0.12)",
    featured: false,
    screenshots: [
      {
        src: "/images/macos-portfolio.png",
        alt: "macOS-inspired interactive portfolio desktop interface",
        label: "Desktop interface",
      },
    ],
  },
];

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="project-actions">
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-live-link">
        View live demo <FiArrowUpRight size={15} aria-hidden="true" />
      </a>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-source-link">
        <FiGithub size={15} aria-hidden="true" /> Source code
      </a>
    </div>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const cardRef = useRef<HTMLElement>(null);
  const screenshot = project.screenshots[selectedScreenshot];

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.classList.add("visible");
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="featured-project reveal"
      style={{ "--project-accent": project.accent, "--project-soft": project.accentSoft } as React.CSSProperties}
    >
      <div className="featured-project-copy">
        <div className="project-kicker">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>

        <div className="proof-list" aria-label={`${project.title} highlights`}>
          {project.proof.map((item) => <span key={item}>{item}</span>)}
        </div>

        <div className="tech-list" aria-label={`${project.title} technology`}>
          {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
        </div>

        <ProjectActions project={project} />
      </div>

      <div className="featured-media">
        <div className="project-screen-frame">
          <img
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            width={1400}
            height={860}
            loading="lazy"
            decoding="async"
            className="project-main-image"
          />
        </div>
        <div className="screenshot-selector" aria-label={`${project.title} screenshots`}>
          {project.screenshots.map((item, itemIndex) => {
            const isSelected = itemIndex === selectedScreenshot;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setSelectedScreenshot(itemIndex)}
                aria-label={`Show ${item.label} screenshot for ${project.title}`}
                aria-pressed={isSelected}
                className={isSelected ? "selected" : ""}
              >
                <img src={item.src} alt="" width={104} height={64} loading="lazy" decoding="async" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function CompactProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.classList.add("visible");
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const screenshot = project.screenshots[0];
  return (
    <article
      ref={cardRef}
      className="compact-project reveal"
      style={{ "--project-accent": project.accent, "--project-soft": project.accentSoft } as React.CSSProperties}
    >
      <div className="compact-image-wrap">
        <img src={screenshot.src} alt={screenshot.alt} width={1400} height={860} loading="lazy" decoding="async" />
      </div>
      <div className="compact-project-copy">
        <p className="project-kicker"><span>{project.category}</span></p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="proof-list" aria-label={`${project.title} highlights`}>
          {project.proof.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="tech-list" aria-label={`${project.title} technology`}>
          {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

const Work = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((project) => project.featured);
  const compactProjects = projects.filter((project) => !project.featured);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.classList.add("visible");
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <div ref={headerRef} className="work-heading reveal">
          <p className="t-label">Selected work</p>
          <div>
            <h2 className="t-h2">Products built to solve real problems.</h2>
            <p className="t-body">A selection of full-stack products, developer tools, and interactive web experiences.</p>
          </div>
        </div>

        <div className="featured-project-list">
          {featuredProjects.map((project, index) => <FeaturedProjectCard key={project.slug} project={project} index={index} />)}
        </div>

        <div className="supporting-project-heading">
          <span>More builds</span>
          <div />
        </div>

        <div className="compact-project-grid">
          {compactProjects.map((project) => <CompactProjectCard key={project.slug} project={project} />)}
        </div>
      </div>

      <style>{`
        .work-section { background: var(--bg2); padding: 128px 0; overflow: hidden; }
        .work-heading { display: grid; grid-template-columns: minmax(145px, 0.32fr) 1fr; gap: 34px; align-items: start; margin-bottom: 72px; }
        .work-heading .t-label { margin: 10px 0 0; }
        .work-heading h2 { max-width: 670px; margin-bottom: 18px; }
        .work-heading .t-body { max-width: 560px; font-size: 16px; line-height: 1.75; }
        .featured-project-list { display: flex; flex-direction: column; gap: 36px; }
        .featured-project, .compact-project { border: 1px solid var(--bdr); border-radius: 22px; background: var(--bg); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }
        .featured-project { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(440px, 1.1fr); gap: 52px; padding: 42px; position: relative; overflow: hidden; }
        .featured-project::before, .compact-project::before { content: ""; position: absolute; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, var(--project-soft), transparent 68%); pointer-events: none; filter: blur(10px); }
        .featured-project::before { top: -210px; left: -170px; }
        .featured-project-copy, .compact-project-copy, .featured-media { position: relative; z-index: 1; }
        .featured-project-copy { display: flex; flex-direction: column; align-items: flex-start; padding: 12px 0; }
        .project-kicker { display: flex; align-items: center; gap: 10px; margin: 0 0 18px; color: var(--project-accent); font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 1.15px; text-transform: uppercase; }
        .project-kicker span:first-child { color: var(--fg3); }
        .featured-project h3, .compact-project h3 { color: var(--fg); font-family: var(--font-head); font-size: clamp(28px, 3.5vw, 42px); line-height: 1.12; letter-spacing: -1px; margin: 0 0 17px; }
        .project-summary { color: var(--fg2); font-family: var(--font-body); font-size: 15.5px; line-height: 1.75; margin: 0; }
        .project-highlights { list-style: none; display: grid; gap: 12px; padding: 0; margin: 27px 0; color: var(--fg2); font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; }
        .project-highlights li { display: flex; gap: 10px; }
        .project-highlights li::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; margin-top: 8px; border-radius: 50%; background: var(--project-accent); box-shadow: 0 0 10px var(--project-accent); }
        .proof-list, .tech-list { display: flex; flex-wrap: wrap; gap: 7px; }
        .proof-list { margin-bottom: 18px; }
        .proof-list span { padding: 6px 10px; border-radius: 999px; background: var(--project-soft); border: 1px solid color-mix(in srgb, var(--project-accent) 35%, transparent); color: var(--project-accent); font-family: var(--font-body); font-size: 11px; font-weight: 600; }
        .tech-list span { padding: 4px 0; color: var(--fg3); font-family: var(--font-body); font-size: 11.5px; }
        .tech-list span:not(:last-child)::after { content: "·"; padding-left: 7px; color: var(--bdr); }
        .project-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
        .project-actions a { display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 15px; border-radius: 9px; font-family: var(--font-body); font-size: 13px; font-weight: 600; transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease; }
        .project-actions a:focus-visible, .screenshot-selector button:focus-visible { outline: 2px solid var(--project-accent); outline-offset: 3px; }
        .project-actions a:hover { transform: translateY(-2px); }
        .project-live-link { color: #07100e; background: var(--project-accent); }
        .project-source-link { color: var(--fg2); border: 1px solid var(--bdr); background: var(--bg2); }
        .project-source-link:hover { border-color: var(--project-accent); color: var(--fg); }
        .featured-media { min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
        .project-screen-frame { overflow: hidden; border: 1px solid var(--bdr); border-radius: 13px; background: #080b0d; box-shadow: 0 18px 40px rgba(0,0,0,0.25); aspect-ratio: 1.56; }
        .project-main-image { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; animation: project-image-in 0.32s ease both; }
        .screenshot-selector { display: flex; gap: 9px; overflow-x: auto; padding: 2px; scrollbar-width: thin; }
        .screenshot-selector button { display: grid; grid-template-columns: 54px auto; align-items: center; gap: 8px; flex: 0 0 auto; overflow: hidden; padding: 4px 9px 4px 4px; cursor: pointer; border: 1px solid var(--bdr); border-radius: 8px; background: var(--bg2); color: var(--fg3); font-family: var(--font-body); font-size: 11px; transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .screenshot-selector button:hover, .screenshot-selector button.selected { border-color: var(--project-accent); color: var(--fg); background: var(--project-soft); }
        .screenshot-selector img { display: block; width: 54px; height: 34px; object-fit: cover; border-radius: 4px; }
        .supporting-project-heading { display: flex; align-items: center; gap: 16px; margin: 84px 0 24px; color: var(--fg3); font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }
        .supporting-project-heading div { width: 100%; height: 1px; background: var(--bdr); }
        .compact-project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .compact-project { position: relative; overflow: hidden; }
        .compact-project::before { right: -180px; bottom: -250px; }
        .compact-image-wrap { position: relative; z-index: 1; overflow: hidden; aspect-ratio: 1.72; border-bottom: 1px solid var(--bdr); background: #080b0d; }
        .compact-image-wrap img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .compact-project:hover .compact-image-wrap img { transform: scale(1.025); }
        .compact-project-copy { padding: 28px; }
        .compact-project h3 { font-size: 27px; margin-bottom: 12px; }
        .compact-project .project-summary { min-height: 82px; font-size: 14px; }
        .compact-project .proof-list { margin: 23px 0 17px; }
        .compact-project .project-actions { margin-top: 25px; }
        @keyframes project-image-in { from { opacity: 0.25; transform: scale(1.015); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 1000px) {
          .featured-project { grid-template-columns: 1fr; gap: 30px; }
          .featured-project-copy { order: 2; padding: 0; }
          .featured-media { order: 1; }
        }
        @media (max-width: 720px) {
          .work-section { padding: 90px 0; }
          .work-heading { grid-template-columns: 1fr; gap: 14px; margin-bottom: 46px; }
          .work-heading .t-label { margin: 0; }
          .featured-project { gap: 25px; padding: 18px; border-radius: 17px; }
          .featured-project h3 { font-size: 30px; }
          .project-highlights { margin: 22px 0; font-size: 13px; }
          .project-screen-frame { border-radius: 9px; }
          .screenshot-selector { margin: 0 -2px; }
          .compact-project-grid { grid-template-columns: 1fr; gap: 18px; }
          .compact-project-copy { padding: 22px; }
          .compact-project .project-summary { min-height: 0; }
          .supporting-project-heading { margin-top: 56px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-main-image, .compact-image-wrap img, .project-actions a { animation: none; transition: none; }
        }
      `}</style>
    </section>
  );
};

export default Work;
