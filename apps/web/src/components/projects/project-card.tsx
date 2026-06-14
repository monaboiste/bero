import { Card } from "@components/ui/card";

export interface ProjectCardProps {
  "data-testid"?: string;
  date?: string;
  description: string;
  image: string;
  title: string;
}

export function ProjectCard({
  title,
  description,
  image,
  date,
  "data-testid": dataTestId = "project-card",
}: Readonly<ProjectCardProps>) {
  return (
    <Card
      data-testid={dataTestId}
      date={date}
      image={{ src: image, alt: title }}
    >
      <h3
        className="mb-2 line-clamp-2 text-xl transition-colors duration-300 group-hover:text-accent"
        title={title}
      >
        {title}
      </h3>
      <p
        className="mb-2 line-clamp-2 text-muted-foreground text-sm"
        title={description}
      >
        {description}
      </p>
    </Card>
  );
}
