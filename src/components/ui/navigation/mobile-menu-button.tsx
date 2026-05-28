import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { cn } from "@lib/cn";
import { LuMenu, LuX } from "react-icons/lu";

export interface MobileMenuButtonProps {
  className?: string;
  "data-testid"?: string;
  isOpen: boolean;
  lang: Lang;
  onToggle: () => void;
}

export function MobileMenuButton({
  isOpen,
  onToggle,
  lang,
  className = "",
  "data-testid": dataTestId = "mobile-menu-button",
}: Readonly<MobileMenuButtonProps>) {
  const t = getTranslations(lang);

  return (
    <button
      aria-expanded={isOpen}
      aria-label={t("a11y.menu")}
      className={cn(
        "rounded-lg p-2 transition-colors hover:bg-muted",
        className
      )}
      data-testid={dataTestId}
      onClick={onToggle}
      type="button"
    >
      {isOpen ? (
        <LuX className="h-6 w-6" data-testid="icon-close" />
      ) : (
        <LuMenu className="h-6 w-6" data-testid="icon-menu" />
      )}
    </button>
  );
}
