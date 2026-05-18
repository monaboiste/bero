export interface LinkItem {
  label: string;
  href: string;
  testId?: string;
}

export interface FooterLinksProps {
  title: string;
  links: LinkItem[];
  className?: string;
  "data-testid"?: string;
}

const LOCALE_PREFIX_RE = /^\/[a-z]{2}\//;
const HASH_RE = /^\/?#/;
const SLASH_RE = /^\//;

function getTestId(link: LinkItem): string {
  return (
    link.testId ??
    link.href
      .replace(LOCALE_PREFIX_RE, "/")
      .replace(HASH_RE, "")
      .replace(SLASH_RE, "")
  );
}

export function FooterLinks({
  title,
  links,
  className = "",
  "data-testid": dataTestId,
}: Readonly<FooterLinksProps>) {
  return (
    <div className={className} data-testid={dataTestId}>
      <h3 className="mb-4 text-lg">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              className="text-primary-foreground/80 text-sm transition-colors hover:text-accent"
              data-testid={`footer-link-${getTestId(link)}`}
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
