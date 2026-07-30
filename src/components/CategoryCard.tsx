"use client";

import TechCard from "./TechCard";
import { TechCategory } from "@/src/data/techStack";

interface CategoryCardProps {
  category: TechCategory;
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <section
      className={`relative overflow-hidden flex flex-col min-h-105 p-8.5 rounded-[30px] backdrop-blur-[22px] border border-white/8 isolate opacity-0 translate-y-10 max-[1100px]:min-h-auto max-[1100px]:p-[28px] max-md:p-[24px] max-md:rounded-[24px] max-[1100px]:col-span-6 max-md:!col-span-1 ${
        category.span === "large" ? "col-span-12 max-[1100px]:col-span-6 max-md:col-span-1!" : "col-span-6 max-[1100px]:col-span-3 max-md:col-span-1!"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
        animation: "revealCard 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
      }}
    >
      <div className="shine absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
        <div
          className="absolute w-40 h-[200%] left-50 top-[-50%] rotate-18"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)" }}
        />
      </div>

      <div
        className="absolute inset-[-1px] rounded-[inherit] p-[1px] opacity-0 transition-opacity duration-[450ms]"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,170,0.45), rgba(0,140,255,0.35), rgba(255,255,255,0.05))",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <div
        className="absolute w-[420px] h-[420px] rounded-full top-[-220px] right-[-180px] opacity-0 transition-opacity duration-[450ms]"
        style={{ background: "radial-gradient(circle, rgba(0,255,170,0.18), transparent 72%)" }}
      />

      <div className="flex justify-between items-start gap-[30px] max-[1100px]:flex-col max-[1100px]:items-start">
        <div>
          <span className="inline-flex mb-[14px] text-[var(--acc)] text-[0.74rem] tracking-[0.20em] uppercase font-bold">
            {category.id.replace("-", " ").toUpperCase()}
          </span>

          <h2 className="font-[var(--font-head)] text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] max-md:text-[1.65rem]">
            {category.title}
          </h2>
        </div>

        <p className="max-w-[280px] text-[var(--fg2)] leading-[1.8] text-right max-[1100px]:text-left max-[1100px]:max-w-full">
          {category.subtitle}
        </p>
      </div>

      <div className="relative h-[1px] my-[30px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}>
        <div
          className="absolute left-0 w-[80px] h-full"
          style={{
            background: "linear-gradient(90deg, rgba(0,255,170,0.8), transparent)",
            animation: "dividerMove 5s linear infinite",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-[18px] mt-auto max-md:grid-cols-1 max-md:gap-[14px]">
        {category.technologies.map((tech) => (
          <TechCard
            key={tech.name}
            tech={tech}
          />
        ))}
      </div>

      <style>{`
        @keyframes revealCard { to { opacity: 1; transform: none; } }
        @keyframes dividerMove { 0% { transform: translateX(-100px); } 100% { transform: translateX(900px); } }
        .category-card:hover { transform: translateY(-10px); border-color: rgba(255,255,255,0.16); box-shadow: 0 30px 70px rgba(0,0,0,0.35); }
        .category-card:hover::before { opacity: 1; }
        .category-card:hover::after { opacity: 1; }
        .category-card:hover .shine::before { animation: shineMove 1.2s ease; }
        @keyframes shineMove { to { left: 140%; } }
      `}</style>
    </section>
  );
}
