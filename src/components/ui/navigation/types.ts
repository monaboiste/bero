import type { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
  testId?: string;
  icon?: IconType;
  iconClass?: string;
}
