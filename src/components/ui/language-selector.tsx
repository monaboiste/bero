import { type Lang, languages } from "@i18n/locale";
import { getCanonicalBasePath, getTranslatedPath } from "@i18n/path";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuGlobe } from "react-icons/lu";

export interface LanguageSelectorProps {
  lang: Lang;
  variant?: "dropdown" | "inline";
  className?: string;
  "data-testid"?: string;
}

const langEntries = Object.entries(languages) as [Lang, string][];

function getMenuLinks(menuRef: React.RefObject<HTMLDivElement | null>) {
  return Array.from(menuRef.current?.querySelectorAll("a") ?? []);
}

function focusMenuItemByOffset(
  menuRef: React.RefObject<HTMLDivElement | null>,
  offset: number
) {
  const links = getMenuLinks(menuRef);
  const currentIndex = links.indexOf(
    document.activeElement as HTMLAnchorElement
  );
  const nextIndex =
    offset > 0
      ? (currentIndex + 1) % links.length
      : (currentIndex - 1 + links.length) % links.length;
  links[nextIndex]?.focus();
}

export function LanguageSelector({
  lang,
  variant = "dropdown",
  className = "",
  "data-testid": dataTestId = "language-selector",
}: Readonly<LanguageSelectorProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getBasePath = useCallback(() => {
    if (typeof window === "undefined") {
      return "/";
    }
    return getCanonicalBasePath(new URL(window.location.href));
  }, []);

  const getHref = useCallback(
    (targetLang: Lang) => {
      const basePath = getBasePath();
      const tp = getTranslatedPath(targetLang);
      return tp(basePath, targetLang);
    },
    [getBasePath]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleButtonKeyDown(e: React.KeyboardEvent) {
    if (isOpen) {
      handleOpenKeyDown(e);
    } else {
      handleClosedKeyDown(e);
    }
  }

  function handleClosedKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const firstLink = menuRef.current?.querySelector("a");
        firstLink?.focus();
      }, 0);
    }
  }

  function handleOpenKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusMenuItemByOffset(menuRef, 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusMenuItemByOffset(menuRef, -1);
    }
  }

  if (variant === "inline") {
    return (
      <div
        className={`flex space-x-4 ${className}`.trim()}
        data-testid={dataTestId}
      >
        {langEntries.map(([code]) => (
          <a
            className={`rounded px-3 py-1 ${
              code === lang
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            }`}
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

  return (
    <div
      className={`relative ${className}`.trim()}
      data-testid={dataTestId}
      ref={containerRef}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
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
          onKeyDown={handleOpenKeyDown}
          ref={menuRef}
          role="listbox"
        >
          {langEntries.map(([code, label]) => (
            <a
              aria-selected={code === lang}
              className={`block w-full px-4 py-2 text-left transition-colors hover:bg-muted ${
                code === lang ? "bg-muted font-medium" : ""
              }`}
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
