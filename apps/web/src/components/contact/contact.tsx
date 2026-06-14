"use client";

import { Grid } from "@components/ui/grid";
import { Section } from "@components/ui/section";
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
    <Section background="secondary" data-testid="contact" id="contact">
      <SectionHeader
        subtitle={t("contact.subtitle")}
        title={t("contact.title")}
      />

      <Grid cols={{ md: 2 }} gap="xl">
        <ContactInfo items={contactItems} />
        <MapEmbed src={BUSINESS.mapEmbedUrl} title={t("contact.mapTitle")} />
      </Grid>
    </Section>
  );
}
