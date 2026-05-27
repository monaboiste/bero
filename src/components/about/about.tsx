"use client";

import { Section } from "@components/ui/section";
import { SectionHeader } from "@components/ui/section-header";
import type { OptimisedImage } from "@components/ui/types";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { LuAward, LuClock, LuHeart, LuUsers } from "react-icons/lu";
import { AboutServices } from "./about-services";
import { AboutStats } from "./about-stats";
import { StorySection } from "./story-section";

export interface AboutProps {
  lang: Lang;
  image: OptimisedImage;
}

export function About({ lang, image }: Readonly<AboutProps>) {
  const t = getTranslations(lang);

  const stats = [
    {
      icon: LuClock,
      valueNumeric: 20,
      suffix: "+",
      label: t("about.stats.experience"),
    },
    {
      icon: LuAward,
      valueNumeric: 1000,
      suffix: "+",
      label: t("about.stats.projects"),
    },
    {
      icon: LuUsers,
      valueNumeric: 100,
      suffix: "%",
      label: t("about.stats.clients"),
    },
    {
      icon: LuHeart,
      valueNumeric: null,
      suffix: "\u221E",
      label: t("about.stats.passion"),
    },
  ];

  const services = [
    {
      title: t("about.services.renovation"),
      description: t("about.services.renovationDescription"),
    },
    {
      title: t("about.services.upholstery"),
      description: t("about.services.upholsteryDescription"),
    },
    {
      title: t("about.services.repair"),
      description: t("about.services.repairDescription"),
    },
    {
      title: t("about.services.automotive"),
      description: t("about.services.automotiveDescription"),
    },
  ];

  return (
    <Section data-testid="about" id="about">
      <SectionHeader subtitle={t("about.subtitle")} title={t("about.title")} />
      <StorySection
        image={image}
        mission={t("about.mission")}
        story={t("about.story")}
      />
      <AboutStats stats={stats} />
      <AboutServices services={services} title={t("about.servicesTitle")} />
    </Section>
  );
}
