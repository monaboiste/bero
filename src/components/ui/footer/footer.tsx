import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { BUSINESS } from "@lib/content/business";
import { LuMail, LuPhone } from "react-icons/lu";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { SocialLinks } from "../social-links";
import { FooterLinks } from "./footer-links";

export interface FooterProps {
  lang: Lang;
  className?: string;
  "data-testid"?: string;
}

export function Footer({
  lang,
  className = "",
  "data-testid": dataTestId = "footer",
}: Readonly<FooterProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);

  const currentYear = new Date().getFullYear();

  const content = {
    aboutText: t("footer.about"),
    rights: `\u00A9 ${currentYear} ${t("seo.title")}. ${t("footer.rights")}`,
  };

  const quickLinks = [
    { label: t("nav.home"), href: tp("/#home") },
    { label: t("nav.projects"), href: tp("/#projects") },
    { label: t("nav.about"), href: tp("/#about") },
    { label: t("nav.contact"), href: tp("/#contact") },
    { label: t("nav.gallery"), href: tp("/portfolio"), testId: "gallery" },
  ];

  const legalLinks = [
    { label: t("footer.privacyPolicy"), href: tp("/privacy-policy") },
  ];

  const socialLinks = [
    {
      icon: SiFacebook,
      href: BUSINESS.social.facebook,
      label: "Facebook",
    },
    {
      icon: SiInstagram,
      href: BUSINESS.social.instagram,
      label: "Instagram",
    },
  ];

  return (
    <footer
      className={`bg-primary text-primary-foreground ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* About */}
          <div className="md:col-span-2" data-testid="footer-about">
            <p className="mb-4 text-primary-foreground/80 text-sm">
              {content.aboutText}
            </p>
            <SocialLinks links={socialLinks} />
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <FooterLinks links={quickLinks} title={t("footer.quickLinks")} />
          </div>

          <div>
            {/* Legal */}
            <FooterLinks links={legalLinks} title={t("footer.legal")} />
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm">
                <LuPhone className="h-4 w-4" />
                <span>{BUSINESS.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm">
                <LuMail className="h-4 w-4" />
                <span>{BUSINESS.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-white/10 border-t pt-8 text-center text-primary-foreground/60 text-sm"
          data-testid="footer-copyright"
        >
          {content.rights}
        </div>
      </div>
    </footer>
  );
}
