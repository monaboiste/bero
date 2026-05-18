"use client";

import { GridGallery } from "@components/ui/gallery/grid-gallery";
import type { GalleryImage } from "@components/ui/gallery/types";
import { SectionHeader } from "@components/ui/section-header";
import { TagFilter, type TagItem } from "@components/ui/tag-filter";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface PortfolioGalleryProps {
  lang: Lang;
  images: GalleryImage[];
  tags: TagItem[];
  initialTag?: string;
}

const TAG_PARAM = "tag";

export function PortfolioGallery({
  lang,
  images,
  tags,
  initialTag = "",
}: Readonly<PortfolioGalleryProps>) {
  const t = getTranslations(lang);
  const [activeTag, setActiveTag] = useState(initialTag);

  const handleTagChange = useCallback((tag: string) => {
    setActiveTag(tag);
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set(TAG_PARAM, tag);
    } else {
      url.searchParams.delete(TAG_PARAM);
    }
    window.history.pushState({}, "", url.toString());
  }, []);

  useEffect(() => {
    function onPopState() {
      const params = new URLSearchParams(window.location.search);
      setActiveTag(params.get(TAG_PARAM) ?? "");
    }

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const filteredImages = useMemo(
    () =>
      activeTag ? images.filter((img) => img.tags.includes(activeTag)) : images,
    [activeTag, images]
  );

  return (
    <>
      <SectionHeader
        as="h1"
        subtitle={t("portfolio.subtitle")}
        title={t("portfolio.title")}
      />

      <TagFilter
        activeTag={activeTag}
        allLabel={t("portfolio.tagAll")}
        onTagChange={handleTagChange}
        tags={tags}
      />

      <GridGallery images={filteredImages} />
    </>
  );
}
