"use client";

import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { SectionHeader } from "@components/ui/section-header";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { fadeUp, stagger, viewport } from "@lib/motion";
import { motion } from "motion/react";
import { LuArrowRight } from "react-icons/lu";
import { ProjectCard } from "./project-card";

export interface ProjectData {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface ProjectsProps {
  lang: Lang;
  projects: ProjectData[];
}

const { container, item } = stagger(0.15, { y: 50 });
const ctaMotion = fadeUp(20, { delay: 0.3 });

export function Projects({ lang, projects }: Readonly<ProjectsProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);

  return (
    <section
      className="bg-secondary py-14"
      data-testid="projects"
      id="projects"
    >
      <Container>
        <SectionHeader
          subtitle={t("projects.subtitle")}
          title={t("projects.title")}
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          data-testid="projects-grid"
          initial="hidden"
          variants={container}
          viewport={viewport}
          whileInView="visible"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard
                date={project.date}
                description={project.excerpt}
                image={project.image}
                title={project.title}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-8 text-center" {...ctaMotion}>
          <Button data-testid="projects-view-all" href={tp("/portfolio")}>
            <span>{t("projects.viewAll")}</span>
            <LuArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
