import type { NavItem } from "./types";

export interface NavLinksProps {
  items: NavItem[];
  direction?: "row" | "column";
  onLinkClick?: () => void;
  className?: string;
  "data-testid"?: string;
}

const LOCALE_PREFIX_RE = /^\/[a-z]{2}\//;
const HASH_RE = /^\/?#/;
const SLASH_RE = /^\//;

function getTestId(item: NavItem): string {
  return (
    item.testId ??
    item.href
      .replace(LOCALE_PREFIX_RE, "/")
      .replace(HASH_RE, "")
      .replace(SLASH_RE, "")
  );
}

export function NavLinks({
  items,
  direction = "row",
  onLinkClick,
  className = "",
  "data-testid": dataTestId,
}: Readonly<NavLinksProps>) {
  const directionClasses =
    direction === "row"
      ? "flex items-center space-x-8"
      : "flex flex-col space-y-4";

  return (
    <div
      className={`${directionClasses} ${className}`.trim()}
      data-testid={dataTestId}
    >
      {items.map((item) => {
        const Icon = item.icon;

        if (item.highlight) {
          return (
            <a
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 ${
                direction === "column"
                  ? "bg-accent/10 text-accent"
                  : "group relative transition-all duration-300 hover:bg-accent/10 hover:text-accent"
              }`}
              data-testid={`nav-link-${getTestId(item)}`}
              href={item.href}
              key={item.href}
              onClick={onLinkClick}
            >
              {Icon && <Icon className={item.iconClass ?? "h-5 w-5"} />}
              <span>{item.label}</span>
              {direction === "row" && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 group-hover:w-4/5" />
              )}
            </a>
          );
        }

        return (
          <a
            className={`transition-colors hover:text-accent ${
              direction === "column" ? "px-4" : ""
            }`}
            data-testid={`nav-link-${getTestId(item)}`}
            href={item.href}
            key={item.href}
            onClick={onLinkClick}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
