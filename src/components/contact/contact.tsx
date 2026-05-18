"use client";

import { SectionHeader } from "@components/ui/section-header";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { BUSINESS, BUSINESS_UNSTRUCTURED_ADDRESS } from "@lib/content/business";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { ContactInfo } from "./contact-info";
import { MapEmbed } from "./map-embed";

export interface ContactProps {
  lang: Lang;
}

export function Contact({ lang }: Readonly<ContactProps>) {
  const t = getTranslations(lang);

  const contactItems = [
    { icon: LuMapPin, label: BUSINESS_UNSTRUCTURED_ADDRESS },
    { icon: LuPhone, label: BUSINESS.phone },
    { icon: LuMail, label: BUSINESS.email },
  ];

  return (
    <section
      className="overflow-x-hidden bg-secondary py-20"
      data-testid="contact"
      id="contact"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={t("contact.subtitle")}
          title={t("contact.title")}
        />

        <div className="grid gap-12 md:grid-cols-2">
          <ContactInfo items={contactItems} />
          <MapEmbed src={BUSINESS.mapEmbedUrl} title={t("contact.mapTitle")} />
        </div>
      </div>
    </section>
  );
}
