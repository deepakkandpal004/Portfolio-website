import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/src/data/projects";
import ProjectDetailClient from "@/src/components/ProjectDetailClient";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Deepak Kandpal`,
      description: project.summary,
      url: `https://deepakkandpal.me/projects/${project.slug}`,
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;
  return <ProjectDetailClient project={project} prev={prev} next={next} />;
}
