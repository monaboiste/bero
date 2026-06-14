import { cn } from "@lib/cn";
import type { IconType } from "react-icons";

export interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
}

export interface SocialLinksProps {
  className?: string;
  "data-testid"?: string;
  links: SocialLink[];
}

export function SocialLinks({
  links,
  className = "",
  "data-testid": dataTestId = "footer-social",
}: Readonly<SocialLinksProps>) {
  return (
    <div className={cn("flex space-x-4", className)} data-testid={dataTestId}>
      {links.map((social) => {
        const Icon = social.icon;
        return (
          <a
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            href={social.href}
            key={social.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
