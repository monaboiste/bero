import type { Lang } from "@i18n/locale";
import { getTranslations } from "@i18n/locale";
import { getTranslatedPath } from "@i18n/path";
import { cn } from "@lib/cn";
import type { ComponentType, SVGProps } from "react";

export interface LogoProps {
  className?: string;
  "data-testid"?: string;
  lang: Lang;
  size?: "sm" | "md" | "lg";
  svgComponent?: ComponentType<
    SVGProps<SVGSVGElement> & { className?: string }
  >;
  variant?: "light" | "dark";
}

const sizes = {
  sm: {
    main: "0.75rem",
    bero: "0.5rem",
    separator: "2.25rem",
    gap: "0rem",
    imageHeight: "h-9",
    containerGap: "gap-0.5",
    separatorMargin: "mr-0.5",
  },
  md: {
    main: "1.25rem",
    bero: "0.875rem",
    separator: "3.25rem",
    gap: "0rem",
    imageHeight: "h-12",
    containerGap: "gap-1",
    separatorMargin: "mr-1",
  },
  lg: {
    main: "2rem",
    bero: "1.5rem",
    separator: "5rem",
    gap: "0rem",
    imageHeight: "h-20",
    containerGap: "gap-2",
    separatorMargin: "mr-2",
  },
} as const;

export function Logo({
  variant = "light",
  size = "md",
  lang,
  svgComponent: SvgIcon,
  className = "",
  "data-testid": dataTestId = "logo",
}: Readonly<LogoProps>) {
  const t = getTranslations(lang);
  const tp = getTranslatedPath(lang);
  const sizeScheme = sizes[size];

  let primaryClass = "";
  const secondaryClass = "text-accent";
  let companyNameClass = "";
  let separatorClass = "";

  if (variant === "light") {
    primaryClass = "text-foreground";
    companyNameClass = "text-foreground";
    separatorClass = "bg-foreground";
  } else if (variant === "dark") {
    primaryClass = "text-background";
    companyNameClass = "text-background";
    separatorClass = "bg-background";
  }

  return (
    <a
      className={cn(
        "flex shrink-0 items-center",
        sizeScheme.containerGap,
        className
      )}
      data-testid={dataTestId}
      href={tp("/#home")}
    >
      {SvgIcon && (
        <div className="shrink-0">
          <SvgIcon
            aria-hidden="true"
            className={cn(sizeScheme.imageHeight, "w-auto", primaryClass)}
            fill="currentColor"
          />
        </div>
      )}

      <div
        className="inline-flex items-center"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div
          className={cn(sizeScheme.separatorMargin, separatorClass)}
          style={{
            width: "1px",
            height: sizeScheme.separator,
            opacity: 0.3,
            flexShrink: 0,
          }}
        />

        <div className="flex flex-col" style={{ gap: sizeScheme.gap }}>
          <div
            style={{
              fontSize: sizeScheme.main,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className={primaryClass}
              style={{ fontWeight: "var(--font-weight-normal)" }}
            >
              {t("logo.primary")}
            </span>
            <span
              className={secondaryClass}
              style={{ fontWeight: "var(--font-weight-bold)" }}
            >
              {t("logo.secondary")}
            </span>
          </div>

          <div
            className={companyNameClass}
            style={{
              fontSize: sizeScheme.bero,
              fontWeight: "var(--font-weight-bold)",
              lineHeight: 1,
            }}
          >
            BERO
          </div>
        </div>
      </div>
    </a>
  );
}
