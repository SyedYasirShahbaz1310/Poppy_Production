import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = PROJECTS_DATA.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found | Poppy Productions",
    };
  }

  return {
    title: `${project.title} | Poppy Productions`,
    description: project.subtitle || project.description,
    openGraph: {
      title: `${project.title} - Poppy Productions`,
      description: project.subtitle || project.description,
      images: [{ url: project.posterSrc }],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = PROJECTS_DATA.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject =
    PROJECTS_DATA[(currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject =
    PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  const relatedProjects = (project.relatedIds || [])
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter(Boolean);

  const fallbackRelated = PROJECTS_DATA.filter((p) => p.id !== project.id).slice(0, 2);
  const finalRelated = relatedProjects.length > 0 ? relatedProjects : fallbackRelated;

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      relatedProjects={finalRelated as typeof PROJECTS_DATA}
    />
  );
}
