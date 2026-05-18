"use client";

import { Button } from "@components/ui/button";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { getRichText } from "@i18n/richtext";
import { motion } from "motion/react";
import { LuArrowRight } from "react-icons/lu";

export interface HeroImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

export interface HeroProps {
  lang: Lang;
  image: HeroImage;
}

export function Hero({ lang, image }: Readonly<HeroProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);
  const richText = getRichText(lang);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      data-testid="hero"
      id="home"
    >
      <motion.div
        animate={{ scale: 1 }}
        className="absolute top-0 bottom-0 left-0 z-0 h-full w-full"
        initial={{ scale: 1.1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          alt={t("hero.imageAlt")}
          className="h-full w-full object-cover object-[15%] md:object-left"
          height={image.height}
          loading="eager"
          sizes={image.sizes}
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-transparent" />
        <div className="absolute inset-0 bg-linear-to-l from-black/90 via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-4 py-20 sm:px-6 md:ml-auto lg:px-8">
        <div className="max-w-3xl md:ml-auto md:pr-12 lg:pr-24">
          <motion.h1
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 font-bold text-3xl text-white sm:text-5xl md:text-7xl"
            data-testid="hero-title"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {richText("hero.title", ["accent"]).map((part) =>
              part.tag === "accent" ? (
                <span className="text-accent" key={part.text}>
                  {part.text}
                </span>
              ) : (
                part.text
              )
            )}
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 text-base text-gray-200 leading-relaxed sm:text-xl md:text-2xl"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:items-end"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              className="group w-full sm:w-auto"
              data-testid="hero-cta-primary"
              href={tp("/#contact")}
            >
              <span>{t("hero.cta")}</span>
              <LuArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              className="w-full sm:w-auto"
              data-testid="hero-cta-secondary"
              href={tp("/#projects")}
              variant="secondary"
            >
              {t("hero.featured")}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-48 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />
    </section>
  );
}
