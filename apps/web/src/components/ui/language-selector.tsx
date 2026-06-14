import { type Lang, languageLabels } from "@bero/locales";
import { useDropdown } from "@components/hooks/use-dropdown";
import { getCanonicalBasePath, getTranslatedPath } from "@i18n/path";
import { cn } from "@lib/cn";
import { useCallback } from "react";
import { LuGlobe } from "react-icons/lu";

export interface LanguageSelectorProps {
  className?: string;
  currentPath?: string;
  "data-testid"?: string;
  lang: Lang;
  variant?: "dropdown" | "inline";
}

const langEntries = Object.entries(languageLabels) as [Lang, string][];

function InlineLanguageSelector({
  lang,
  getHref,
  className,
  dataTestId,
}: {
  lang: Lang;
  getHref: (code: Lang) => string;
  className: string;
  dataTestId: string;
}) {
  return (
    <div className={cn("flex space-x-4", className)} data-testid={dataTestId}>
      {langEntries.map(([code]) => (
        <a
          className={cn(
            "rounded px-3 py-1",
            code === lang
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted"
          )}
          data-lang={code}
          href={getHref(code)}
          key={code}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

function DropdownLanguageSelector({
  lang,
  getHref,
  className,
  dataTestId,
}: {
  lang: Lang;
  getHref: (code: Lang) => string;
  className: string;
  dataTestId: string;
}) {
  const {
    isOpen,
    toggle,
    containerRef,
    menuRef,
    buttonRef,
    handleButtonKeyDown,
    handleMenuKeyDown,
  } = useDropdown();

  return (
    <div
      className={cn("relative", className)}
      data-testid={dataTestId}
      ref={containerRef}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
        onClick={toggle}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        type="button"
      >
        <LuGlobe className="h-5 w-5" />
        <span className="uppercase">{lang}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 overflow-hidden rounded-lg border border-border bg-card shadow-lg"
          onKeyDown={handleMenuKeyDown}
          ref={menuRef}
          role="listbox"
        >
          {langEntries.map(([code, label]) => (
            <a
              aria-selected={code === lang}
              className={cn(
                "block w-full px-4 py-2 text-left transition-colors hover:bg-muted",
                code === lang && "bg-muted font-medium"
              )}
              data-lang={code}
              href={getHref(code)}
              key={code}
              role="option"
              tabIndex={-1}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function LanguageSelector({
  lang,
  variant = "dropdown",
  currentPath,
  className = "",
  "data-testid": dataTestId = "language-selector",
}: Readonly<LanguageSelectorProps>) {
  const getHref = useCallback(
    (targetLang: Lang) => {
      const basePath =
        currentPath ??
        (typeof window === "undefined"
          ? "/"
          : getCanonicalBasePath(new URL(window.location.href)));
      const tp = getTranslatedPath(targetLang);
      return tp(basePath, targetLang);
    },
    [currentPath]
  );

  if (variant === "inline") {
    return (
      <InlineLanguageSelector
        className={className}
        dataTestId={dataTestId}
        getHref={getHref}
        lang={lang}
      />
    );
  }

  return (
    <DropdownLanguageSelector
      className={className}
      dataTestId={dataTestId}
      getHref={getHref}
      lang={lang}
    />
  );
}
