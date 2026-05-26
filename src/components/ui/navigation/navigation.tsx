import CompanyLogo from "@assets/logo.svg?react";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { cn } from "@lib/cn";
import { useState } from "react";
import { LuCamera } from "react-icons/lu";
import { LanguageSelector } from "../language-selector";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuButton } from "./mobile-menu-button";
import { NavLinks } from "./nav-links";
import type { NavItem } from "./types";

export interface NavigationProps {
  lang: Lang;
  currentPath?: string;
  className?: string;
  "data-testid"?: string;
}

export function Navigation({
  lang,
  currentPath,
  className = "",
  "data-testid": dataTestId = "navigation",
}: Readonly<NavigationProps>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: tp("/#home") },
    { label: t("nav.projects"), href: tp("/#projects") },
    { label: t("nav.about"), href: tp("/#about") },
    { label: t("nav.contact"), href: tp("/#contact") },
    {
      label: t("nav.gallery"),
      href: tp("/portfolio"),
      highlight: true,
      testId: "gallery",
      icon: LuCamera,
      iconClass:
        "h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110",
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/95 backdrop-blur-sm",
        className
      )}
      data-testid={dataTestId}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo lang={lang} size="md" svgComponent={CompanyLogo} />

          {/* Desktop Navigation */}
          <NavLinks
            className="hidden lg:flex"
            data-testid="nav-links-desktop"
            direction="row"
            items={navItems}
          />

          {/* Right side controls (desktop) */}
          <div className="hidden items-center space-x-4 lg:flex">
            <LanguageSelector
              currentPath={currentPath}
              lang={lang}
              variant="dropdown"
            />
            <ThemeToggle data-testid="theme-toggle" lang={lang} />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle
              data-testid="mobile-theme-toggle"
              id="mobile-theme-toggle"
              lang={lang}
            />
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              lang={lang}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile menu panel */}
        <MobileMenu
          currentPath={currentPath}
          isOpen={isMobileMenuOpen}
          items={navItems}
          lang={lang}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
