import type { IconType } from "react-icons";
import { StatCard } from "./stat-card";

export interface StatData {
  icon: IconType;
  valueNumeric?: number | null;
  suffix: string;
  label: string;
}

export interface AboutStatsProps {
  stats: StatData[];
  "data-testid"?: string;
}

export function AboutStats({
  stats,
  "data-testid": dataTestId = "about-stats",
}: Readonly<AboutStatsProps>) {
  return (
    <div
      className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4"
      data-testid={dataTestId}
    >
      {stats.map((stat) => (
        <StatCard
          icon={stat.icon}
          key={stat.label}
          label={stat.label}
          suffix={stat.suffix}
          valueNumeric={stat.valueNumeric}
        />
      ))}
    </div>
  );
}
