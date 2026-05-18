export interface TagItem {
  key: string;
  label: string;
}

export interface TagFilterProps {
  tags: TagItem[];
  activeTag: string;
  onTagChange: (tag: string) => void;
  allLabel?: string;
  className?: string;
  "data-testid"?: string;
}

const baseClasses =
  "cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300";

const activeClasses = "bg-accent text-accent-foreground border border-accent";
const inactiveClasses =
  "bg-muted text-foreground border border-border hover:bg-border";

export function TagFilter({
  tags,
  activeTag,
  onTagChange,
  allLabel = "Wszystkie",
  className = "",
  "data-testid": dataTestId = "tag-filter",
}: Readonly<TagFilterProps>) {
  return (
    <div
      className={`mb-12 flex flex-wrap items-center justify-center gap-3 ${className}`.trim()}
      data-testid={dataTestId}
    >
      <button
        aria-pressed={activeTag === ""}
        className={`${baseClasses} ${activeTag === "" ? activeClasses : inactiveClasses}`}
        data-testid="tag-filter-all"
        onClick={() => onTagChange("")}
        type="button"
      >
        {allLabel}
      </button>

      {tags.map(({ key, label }) => (
        <button
          aria-pressed={activeTag === key}
          className={`${baseClasses} ${activeTag === key ? activeClasses : inactiveClasses}`}
          data-testid={`tag-filter-${key}`}
          key={key}
          onClick={() => onTagChange(key)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
