import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TagFilter } from "./tag-filter";

const mockTags = [
  { key: "kitchen", label: "Kuchnia" },
  { key: "living", label: "Salon" },
  { key: "bedroom", label: "Sypialnia" },
];

describe("TagFilter", () => {
  test("renders All button and all tag buttons", () => {
    render(<TagFilter activeTag="" onTagChange={vi.fn()} tags={mockTags} />);

    expect(screen.getByTestId("tag-filter-all")).toHaveTextContent("Wszystkie");
    expect(screen.getByTestId("tag-filter-kitchen")).toHaveTextContent(
      "Kuchnia"
    );
    expect(screen.getByTestId("tag-filter-living")).toHaveTextContent("Salon");
    expect(screen.getByTestId("tag-filter-bedroom")).toHaveTextContent(
      "Sypialnia"
    );
  });

  test("highlights active tag with aria-pressed", () => {
    render(
      <TagFilter activeTag="kitchen" onTagChange={vi.fn()} tags={mockTags} />
    );

    expect(screen.getByTestId("tag-filter-kitchen")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByTestId("tag-filter-all")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByTestId("tag-filter-living")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  test("active tag has accent classes", () => {
    render(
      <TagFilter activeTag="living" onTagChange={vi.fn()} tags={mockTags} />
    );

    expect(screen.getByTestId("tag-filter-living")).toHaveClass(
      "bg-accent",
      "text-accent-foreground"
    );
  });

  test("calls onTagChange with tag key on click", async () => {
    const user = userEvent.setup();
    const onTagChange = vi.fn();
    render(
      <TagFilter activeTag="" onTagChange={onTagChange} tags={mockTags} />
    );

    await user.click(screen.getByTestId("tag-filter-kitchen"));
    expect(onTagChange).toHaveBeenCalledWith("kitchen");
  });

  test("clicking All button calls onTagChange with empty string", async () => {
    const user = userEvent.setup();
    const onTagChange = vi.fn();
    render(
      <TagFilter
        activeTag="kitchen"
        onTagChange={onTagChange}
        tags={mockTags}
      />
    );

    await user.click(screen.getByTestId("tag-filter-all"));
    expect(onTagChange).toHaveBeenCalledWith("");
  });

  test("supports custom allLabel", () => {
    render(
      <TagFilter
        activeTag=""
        allLabel="All"
        onTagChange={vi.fn()}
        tags={mockTags}
      />
    );

    expect(screen.getByTestId("tag-filter-all")).toHaveTextContent("All");
  });
});
