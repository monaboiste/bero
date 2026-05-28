import type { IconType } from "react-icons";

export interface NavItem {
  highlight?: boolean;
  href: string;
  icon?: IconType;
  iconClass?: string;
  label: string;
  testId?: string;
}
