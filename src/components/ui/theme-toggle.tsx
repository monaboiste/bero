import { useTheme } from "@components/hooks/use-theme";
import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { cn } from "@lib/cn";
import { LuMoon, LuSun } from "react-icons/lu";

export interface ThemeToggleProps {
  lang: Lang;
  id?: string;
  className?: string;
  "data-testid"?: string;
}

export function ThemeToggle({
  lang,
  id = "theme-toggle",
  className = "",
  "data-testid": dataTestId,
}: Readonly<ThemeToggleProps>) {
  const t = getTranslations(lang);
  const { isDark, toggle } = useTheme();

  return (
    <button
      aria-label={t("a11y.themeToggle")}
      className={cn(
        "rounded-lg p-2 transition-colors hover:bg-muted",
        className
      )}
      data-testid={dataTestId ?? id}
      id={id}
      onClick={toggle}
      type="button"
    >
      {isDark ? (
        <LuSun className="h-5 w-5" data-testid="icon-sun" />
      ) : (
        <LuMoon className="h-5 w-5" data-testid="icon-moon" />
      )}
    </button>
  );
}
