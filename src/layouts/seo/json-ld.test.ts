import { renderAstroComponent } from "@test/helpers.ts";
import { describe, expect, test } from "vitest";
import JsonLd from "./json-ld.astro";

function parseJsonLd(fragment: DocumentFragment) {
  const script = fragment.querySelector('script[type="application/ld+json"]');
  return JSON.parse(script?.textContent ?? "{}");
}

function findByType(graph: Record<string, unknown>[], type: string) {
  return graph.find((entry) => {
    const t = entry["@type"];
    return Array.isArray(t) ? t.includes(type) : t === type;
  });
}

const SUB_PAGE_BREADCRUMBS = [
  { name: "Home", url: "https://studio-bero.com/en/" },
  { name: "Portfolio", url: "https://studio-bero.com/en/portfolio" },
];

describe("JsonLd", () => {
  test("renders a valid JSON-LD script tag", async () => {
    const result = await renderAstroComponent(JsonLd);

    const script = result.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(() => JSON.parse(script?.textContent ?? "{}")).not.toThrow();
  });

  test("includes @context and @graph", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"]).toBeInstanceOf(Array);
  });

  test("always includes Organization schema", async () => {
    const result = await renderAstroComponent(JsonLd, {
      props: { breadcrumbs: SUB_PAGE_BREADCRUMBS },
    });
    const data = parseJsonLd(result);
    const org = findByType(data["@graph"], "Organization");

    expect(org).toBeDefined();
    expect(org?.name).toBe("Studio Tapicerskie BERO");
    expect(org?.url).toBeTruthy();
    expect(org?.logo).toContain("/favicon.svg");
    expect(org?.sameAs).toContain(
      "https://www.facebook.com/StudioTapicerskieBERO"
    );
    expect(org?.sameAs).toContain(
      "https://www.instagram.com/studio.tapicerskie.bero"
    );
  });

  test("does not include HomeAndConstructionBusiness or WebSite on sub-pages", async () => {
    const result = await renderAstroComponent(JsonLd, {
      props: { breadcrumbs: SUB_PAGE_BREADCRUMBS },
    });
    const data = parseJsonLd(result);

    const localBusiness = findByType(
      data["@graph"],
      "HomeAndConstructionBusiness"
    );
    const website = findByType(data["@graph"], "WebSite");

    expect(localBusiness).toBeUndefined();
    expect(website).toBeUndefined();
  });

  test("includes HomeAndConstructionBusiness schema when no breadcrumbs (homepage)", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const business = findByType(data["@graph"], "HomeAndConstructionBusiness");

    expect(business).toBeDefined();
    expect(business?.name).toBe("Studio Tapicerskie BERO");
    expect(business?.telephone).toBe("+48 720 770 960");
    expect(business?.email).toBe("szumnyfilip@gmail.com");
  });

  test("HomeAndConstructionBusiness includes structured address", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const business = findByType(data["@graph"], "HomeAndConstructionBusiness");
    const address = business?.address as Record<string, string>;

    expect(address["@type"]).toBe("PostalAddress");
    expect(address.streetAddress).toBe("Św. Wojciech 70");
    expect(address.addressLocality).toBe("Międzyrzecz");
    expect(address.postalCode).toBe("66-300");
    expect(address.addressCountry).toBe("PL");
  });

  test("HomeAndConstructionBusiness includes geo coordinates", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const business = findByType(data["@graph"], "HomeAndConstructionBusiness");
    const geo = business?.geo as Record<string, unknown>;

    expect(geo["@type"]).toBe("GeoCoordinates");
    expect(geo.latitude).toBe(52.448_008_1);
    expect(geo.longitude).toBe(15.547_803_8);
  });

  test("HomeAndConstructionBusiness includes opening hours (Mon-Fri 09:00-17:00)", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const business = findByType(data["@graph"], "HomeAndConstructionBusiness");
    const hours = business?.openingHoursSpecification as Record<
      string,
      unknown
    >;

    expect(hours["@type"]).toBe("OpeningHoursSpecification");
    expect(hours.dayOfWeek).toEqual([
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ]);
    expect(hours.opens).toBe("09:00");
    expect(hours.closes).toBe("17:00");
  });

  test("includes WebSite schema when no breadcrumbs (homepage)", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const website = findByType(data["@graph"], "WebSite");

    expect(website).toBeDefined();
    expect(website?.name).toBe("Studio Tapicerskie BERO");
    expect(website?.url).toBeTruthy();
  });

  test("does not include BreadcrumbList when no breadcrumbs provided", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);
    const breadcrumbList = findByType(data["@graph"], "BreadcrumbList");

    expect(breadcrumbList).toBeUndefined();
  });

  test("includes BreadcrumbList when breadcrumbs are provided", async () => {
    const result = await renderAstroComponent(JsonLd, {
      props: { breadcrumbs: SUB_PAGE_BREADCRUMBS },
    });
    const data = parseJsonLd(result);
    const breadcrumbList = findByType(data["@graph"], "BreadcrumbList");

    expect(breadcrumbList).toBeDefined();
    const items = breadcrumbList?.itemListElement as Record<string, unknown>[];
    expect(items).toHaveLength(2);

    expect(items[0]["@type"]).toBe("ListItem");
    expect(items[0].position).toBe(1);
    expect(items[0].name).toBe("Home");
    expect(items[0].item).toBe("https://studio-bero.com/en/");

    expect(items[1]["@type"]).toBe("ListItem");
    expect(items[1].position).toBe(2);
    expect(items[1].name).toBe("Portfolio");
    expect(items[1].item).toBe("https://studio-bero.com/en/portfolio");
  });

  test("homepage (no breadcrumbs) graph contains exactly 3 schemas", async () => {
    const result = await renderAstroComponent(JsonLd);
    const data = parseJsonLd(result);

    expect(data["@graph"]).toHaveLength(3);
  });

  test("sub-page (with breadcrumbs) graph contains exactly 2 schemas", async () => {
    const result = await renderAstroComponent(JsonLd, {
      props: { breadcrumbs: SUB_PAGE_BREADCRUMBS },
    });
    const data = parseJsonLd(result);

    expect(data["@graph"]).toHaveLength(2);
  });
});
