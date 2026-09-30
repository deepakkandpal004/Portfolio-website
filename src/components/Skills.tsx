interface SkillItem {
  name: string;
  icon?: string;    // devicon path, e.g. "react/react-original"
  invert?: boolean; // dark icon → invert for dark background
}

interface Category {
  title: string;
  desc: string;
  skills: SkillItem[];
}

const ICON = (p: string) =>
  p.startsWith("http")
    ? p
    : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}.svg`;

const categories: Category[] = [
  {
    title: "Frontend",
    desc: "Building responsive, state-driven client interfaces",
    skills: [
      { name: "React",         icon: "react/react-original" },
      { name: "Next.js",       icon: "nextjs/nextjs-original", invert: true },
      { name: "TypeScript",    icon: "typescript/typescript-original" },
      { name: "JavaScript",    icon: "javascript/javascript-original" },
      { name: "Redux Toolkit", icon: "redux/redux-original" },
      { name: "Tailwind CSS",  icon: "tailwindcss/tailwindcss-original" },
    ],
  },
  {
    title: "Backend & APIs",
    desc: "Designing server pipelines & real-time communication",
    skills: [
      { name: "Node.js",   icon: "nodejs/nodejs-original" },
      { name: "Express",   icon: "express/express-original", invert: true },
      { name: "GraphQL",   icon: "graphql/graphql-plain" },
      { name: "Socket.io", icon: "socketio/socketio-original", invert: true },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Database & Cache",
    desc: "Handling structured data models & caching layers",
    skills: [
      { name: "MongoDB",    icon: "mongodb/mongodb-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Redis",      icon: "redis/redis-original" },
      { name: "MySQL",      icon: "mysql/mysql-original" },
    ],
  },
  {
    title: "Cloud & DevOps",
    desc: "Automating hosting, deployments & environments",
    skills: [
      { name: "Docker", icon: "docker/docker-original" },
      { name: "Nginx",  icon: "nginx/nginx-original" },
      { name: "GitHub", icon: "github/github-original", invert: true },
      { name: "Vercel", icon: "vercel/vercel-original", invert: true },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/white" },
    ],
  },
];

const allSkills: SkillItem[] = categories.flatMap((c) => c.skills);

const Skills = () => {
  return (
    <section id="skills" aria-label="Tech stack" style={{ padding: "var(--sec-pad) 0" }}>
      <div className="container">
        <div className="tech-head">
          <p className="t-label" style={{ marginBottom: 20 }}>Tech Arsenal</p>
          <h2 className="t-h2" style={{ margin: "20px 0 14px" }}>
            Technologies powering<br /><span className="gold">every product I build.</span>
          </h2>
          <p className="tech-sub">
            I build scalable web applications using a modern stack focused on
            performance, maintainability, security and exceptional user experience.
          </p>
        </div>

        <div className="tech-grid">
          {categories.map((cat) => (
            <div key={cat.title} className="tech-card">
              <h3 className="tech-title">{cat.title}</h3>
              <p className="tech-desc">{cat.desc}</p>
              <div className="tech-chips">
                {cat.skills.map((s) => (
                  <span key={s.name} className="tchip">
                    {s.icon ? (
                      <img
                        src={ICON(s.icon)}
                        alt=""
                        loading="lazy"
                        className={s.invert ? "invert" : undefined}
                      />
                    ) : null}
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill ticker — icon + name */}
      <div className="tech-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-seq">
              {allSkills.map((s, i) => (
                <span key={i} className="mq-item">
                  {s.icon ? (
                    <img
                      src={ICON(s.icon)}
                      alt=""
                      loading="lazy"
                      className={s.invert ? "mq-icon invert" : "mq-icon"}
                    />
                  ) : null}
                  <span className="mq-name">{s.name}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-head {
          text-align: center;
          margin-bottom: 44px;
        }
        .tech-sub {
          margin: 0 auto;
          max-width: 560px;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: var(--fg3);
        }
        .tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .tech-card {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-top-color: rgba(255, 255, 255, 0.16);
          border-radius: 18px;
          background:
            radial-gradient(120% 70% at 50% 0%, rgba(255, 255, 255, 0.10), transparent 60%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(255, 255, 255, 0.045) 100%),
            rgba(13, 17, 26, 0.55);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow:
            0 32px 64px -16px rgba(0, 0, 0, 0.65),
            0 8px 24px -8px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
          padding: 32px;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tech-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
          border-top-color: rgba(255, 255, 255, 0.26);
          transform: translateY(-4px);
          box-shadow:
            0 40px 72px -16px rgba(0, 0, 0, 0.70),
            0 12px 28px -8px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            inset 0 -1px 1px rgba(0, 0, 0, 0.25);
        }
        .tech-title {
          margin: 0 0 8px;
          font-family: var(--font-head);
          font-size: 19px;
          font-weight: 700;
          color: var(--fg);
        }
        .tech-desc {
          margin: 0 0 24px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg3);
        }
        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tchip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px 8px 8px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--fg2);
          white-space: nowrap;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .tchip:hover {
          border-color: rgba(245, 158, 11, 0.45);
          color: var(--fg);
          background: rgba(245, 158, 11, 0.07);
          transform: translateY(-2px);
        }
        .tchip img {
          width: 20px;
          height: 20px;
          flex: none;
          padding: 5px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          box-sizing: content-box;
        }
        .tchip img.invert {
          filter: invert(1);
        }
        .tech-marquee {
          overflow: hidden;
          margin-top: 88px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: tech-marquee 45s linear infinite;
        }
        .marquee-seq {
          display: flex;
          align-items: center;
          gap: 96px;
          padding-right: 96px;
        }
        .mq-item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex: none;
        }
        .mq-icon {
          width: 32px;
          height: 32px;
          flex: none;
          opacity: 0.9;
        }
        .mq-icon.invert {
          filter: invert(1);
        }
        .mq-name {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          color: var(--fg3);
          white-space: nowrap;
        }
        @keyframes tech-marquee {
          to { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
          .tech-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
