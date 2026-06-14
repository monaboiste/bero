import { Grid } from "@components/ui/grid";
import type { IconType } from "react-icons";
import { StatCard } from "./stat-card";

export interface StatData {
  icon: IconType;
  label: string;
  suffix: string;
  valueNumeric?: number | null;
}

export interface AboutStatsProps {
  "data-testid"?: string;
  stats: StatData[];
}

export function AboutStats({
  stats,
  "data-testid": dataTestId = "about-stats",
}: Readonly<AboutStatsProps>) {
  return (
    <Grid
      className="mb-20"
      cols={{ sm: 2, md: 4 }}
      data-testid={dataTestId}
      gap="lg"
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
    </Grid>
  );
}
