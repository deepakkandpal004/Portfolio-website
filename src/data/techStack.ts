export interface Technology {
  name: string;
  icon: string;
  level: "Advanced" | "Intermediate";
}

export interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  span: "large" | "medium";
  technologies: Technology[];
}

export const ICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const TECH_STACK: TechCategory[] = [
  {
    id: "frontend",

    title: "Frontend Engineering",

    subtitle:
      "Building modern, accessible and highly interactive user experiences.",

    span: "large",

    technologies: [
      {
        name: "React",
        icon: "react/react-original.svg",
        level: "Advanced",
      },
      {
        name: "Next.js",
        icon: "nextjs/nextjs-original.svg",
        level: "Advanced",
      },
      {
        name: "TypeScript",
        icon: "typescript/typescript-original.svg",
        level: "Advanced",
      },
      {
        name: "JavaScript",
        icon: "javascript/javascript-original.svg",
        level: "Advanced",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss/tailwindcss-original.svg",
        level: "Advanced",
      },
      {
        name: "Redux",
        icon: "redux/redux-original.svg",
        level: "Intermediate",
      },
      {
        name: "HTML5",
        icon: "html5/html5-original.svg",
        level: "Advanced",
      },
      {
        name: "CSS3",
        icon: "css3/css3-original.svg",
        level: "Advanced",
      },
    ],
  },

  {
    id: "backend",

    title: "Backend & APIs",

    subtitle:
      "Designing scalable APIs, authentication and production-ready services.",

    span: "medium",

    technologies: [
      {
        name: "Node.js",
        icon: "nodejs/nodejs-original.svg",
        level: "Advanced",
      },
      {
        name: "Express.js",
        icon: "express/express-original.svg",
        level: "Advanced",
      },
      {
        name: "REST API",
        icon: "fastapi/fastapi-original.svg",
        level: "Advanced",
      },
      {
        name: "JWT",
        icon: "jsonwebtoken/jsonwebtoken-original.svg",
        level: "Advanced",
      },
      {
        name: "Socket.io",
        icon: "socketio/socketio-original.svg",
        level: "Intermediate",
      },
    ],
  },

  {
    id: "database",

    title: "Database & Cache",

    subtitle:
      "Building optimized data models and high-performance persistence.",

    span: "medium",

    technologies: [
      {
        name: "PostgreSQL",
        icon: "postgresql/postgresql-original.svg",
        level: "Advanced",
      },
      {
        name: "MongoDB",
        icon: "mongodb/mongodb-original.svg",
        level: "Advanced",
      },
      {
        name: "Redis",
        icon: "redis/redis-original.svg",
        level: "Advanced",
      },
      {
        name: "Prisma",
        icon: "prisma/prisma-original.svg",
        level: "Advanced",
      },
    ],
  },

  {
    id: "devops",

    title: "Cloud & DevOps",

    subtitle:
      "Deploying, automating and maintaining reliable infrastructure.",

    span: "large",

    technologies: [
      {
        name: "Docker",
        icon: "docker/docker-original.svg",
        level: "Advanced",
      },
      {
        name: "AWS",
        icon: "amazonwebservices/amazonwebservices-original-wordmark.svg",
        level: "Intermediate",
      },
      {
        name: "Git",
        icon: "git/git-original.svg",
        level: "Advanced",
      },
      {
        name: "GitHub",
        icon: "github/github-original.svg",
        level: "Advanced",
      },
      {
        name: "Linux",
        icon: "linux/linux-original.svg",
        level: "Intermediate",
      },
      {
        name: "Vercel",
        icon: "vercel/vercel-original.svg",
        level: "Advanced",
      },
    ],
  },
];