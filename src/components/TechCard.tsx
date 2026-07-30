"use client";

import { useRef } from "react";
import { ICON_BASE, Technology } from "@/src/data/techStack";

interface TechCardProps {
  tech: Technology;
}

export default function TechCard({ tech }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden flex items-center gap-[18px] min-h-[96px] p-[18px] rounded-[20px] border border-white/[0.08] isolate transition-all duration-350 [cubic-bezier(0.22,1,0.36,1)] max-md:p-[16px] max-md:min-h-[84px] max-md:gap-[14px]"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        "--x": "50%",
        "--y": "50%",
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-350"
        style={{
          background: "radial-gradient(220px circle at var(--x) var(--y), rgba(255,255,255,0.14), transparent 65%)",
        }}
      />

      <div
        className="absolute inset-[-1px] rounded-[inherit] p-[1px] opacity-0 transition-opacity duration-350"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,170,0.55), rgba(0,150,255,0.45), rgba(255,255,255,0.08))",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="tech-card__icon-el relative w-[58px] h-[58px] flex items-center justify-center shrink-0 rounded-[18px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.08] transition-all duration-350 max-md:w-[50px] max-md:h-[50px] max-md:rounded-[16px]">
        <img
          src={`${ICON_BASE}/${tech.icon}`}
          alt={tech.name}
          loading="lazy"
          className="w-[30px] h-[30px] object-contain max-md:w-[26px] max-md:h-[26px]"
          style={{ animation: "floatIcon 4s ease-in-out infinite" }}
        />
      </div>

      <div className="tech-card__content-el flex flex-col gap-[6px] min-w-0 flex-1">
        <h4 className="font-[var(--font-head)] text-[1rem] font-semibold tracking-[-0.02em] whitespace-nowrap overflow-hidden text-ellipsis max-md:text-[0.95rem]">
          {tech.name}
        </h4>

        <span className="inline-flex items-center w-fit px-[10px] py-[4px] rounded-full bg-white/[0.05] border border-white/[0.08] text-[var(--fg2)] text-[0.72rem] tracking-[0.08em] uppercase transition-all duration-300 max-md:text-[0.66rem] max-md:px-[8px]">
          {tech.level}
        </span>
      </div>

      <div
        className="absolute top-[-60%] left-[-120%] w-[90px] h-[220%] rotate-[20deg] transition-all duration-700"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
      />

      <style>{`
        @keyframes floatIcon { 0% { transform: translateY(0px); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0px); } }
        .tech-card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(255,255,255,0.18); box-shadow: 0 20px 40px rgba(0,0,0,0.28); }
        .tech-card:hover::before { opacity: 1; }
        .tech-card:hover::after { left: 140%; }
        .tech-card:hover .tech-card__icon-el { transform: rotate(-8deg) scale(1.08); background: linear-gradient(135deg, rgba(0,255,170,0.12), rgba(0,150,255,0.10)); }
        .tech-card:hover .tech-card__content-el span { background: rgba(0,255,170,0.08); border-color: rgba(0,255,170,0.25); }
      `}</style>
    </div>
  );
}
