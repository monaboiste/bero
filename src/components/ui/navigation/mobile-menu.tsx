import { useFocusTrap } from "@components/hooks/use-focus-trap";
import type { Lang } from "@i18n/locale";
import { useRef } from "react";
import { LanguageSelector } from "../language-selector";
import { NavLinks } from "./nav-links";
import type { NavItem } from "./types";

export interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  lang: Lang;
  onClose: () => void;
  className?: string;
  "data-testid"?: string;
}

export function MobileMenu({
  isOpen,
  items,
  lang,
  onClose,
  className = "",
  "data-testid": dataTestId = "mobile-menu",
}: Readonly<MobileMenuProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, { isActive: isOpen, onEscape: onClose });

  return (
    <div
      aria-hidden={!isOpen}
      className={`border-border border-t py-4 lg:hidden ${
        isOpen ? "block" : "hidden"
      } ${className}`.trim()}
      data-testid={dataTestId}
      ref={containerRef}
    >
      <div className="flex flex-col space-y-4">
        <NavLinks direction="column" items={items} onLinkClick={onClose} />
        <div className="border-border border-t pt-4">
          <LanguageSelector
            data-testid="mobile-language-selector"
            lang={lang}
            variant="inline"
          />
        </div>
      </div>
    </div>
  );
}
