import type { Portfolio } from "./types";

/**
 * Static mock data for local development and e2e testing.
 * Activated via the USE_MOCK_DATA environment variable.
 *
 * Covers all five tag categories (armchairs, sofas, chairs, restoration,
 * automotive) with a mix of landscape and portrait aspect ratios so that
 * gallery layout, tag filtering, and lightbox tests work correctly.
 *
 * Some projects contain multiple images to exercise the flatMap behaviour
 * in the portfolio page (total gallery tiles > number of projects).
 */
export const MOCK_PORTFOLIO: Portfolio = [
  {
    title: "Renowacja fotela klubowego",
    slug: "renowacja-fotela-klubowego",
    date: "2026-02-12",
    excerpt: "Kompleksowa odnowa klasycznego fotela klubowego z lat 60.",
    description:
      "Fotel klubowy przeszedl pelna renowacje — od rozebrania konstrukcji, przez naprawe sprężyn i wymiane pianki, az po nowa tapicerke z weluru w kolorze butelkowej zieleni.",
    tags: ["armchairs", "restoration"],
    images: [
      {
        thumbnail: "https://placehold.co/800x1067/4a7c59/ffffff?text=Fotel+1a",
        url: "https://placehold.co/1600x2133/4a7c59/ffffff?text=Fotel+1a",
        aspectRatio: 0.75,
      },
      {
        thumbnail: "https://placehold.co/800x600/4a7c59/ffffff?text=Fotel+1b",
        url: "https://placehold.co/1600x1200/4a7c59/ffffff?text=Fotel+1b",
        aspectRatio: 1.33,
      },
    ],
  },
  {
    title: "Nowoczesny fotel tapicerowany",
    slug: "nowoczesny-fotel-tapicerowany",
    date: "2026-01-06",
    excerpt: "Stworzenie eleganckiego fotela na zamowienie.",
    description:
      "Projekt indywidualny fotela wypoczynkowego z wysokim oparciem. Tapicerka z tkaniny boucle w odcieniu kremowym, nogi z drewna debowego.",
    tags: ["armchairs"],
    images: [
      {
        thumbnail: "https://placehold.co/800x600/8b6f47/ffffff?text=Fotel+2",
        url: "https://placehold.co/1600x1200/8b6f47/ffffff?text=Fotel+2",
        aspectRatio: 1.33,
      },
    ],
  },
  {
    title: "Zestaw mebli tapicerowanych",
    slug: "zestaw-mebli-tapicerowanych",
    date: "2025-12-01",
    excerpt: "Kompleksowa tapicerka zestawu salonowego.",
    description:
      "Trojczłonowy zestaw wypoczynkowy: sofa trzyosobowa i dwa fotele. Jednolita tkanina welurowa w kolorze grafitowym z dekoracyjnymi guzikami.",
    tags: ["sofas"],
    images: [
      {
        thumbnail: "https://placehold.co/800x1200/555555/ffffff?text=Sofa+1",
        url: "https://placehold.co/1600x2400/555555/ffffff?text=Sofa+1",
        aspectRatio: 0.67,
      },
    ],
  },
  {
    title: "Sofa narozna do salonu",
    slug: "sofa-narozna-do-salonu",
    date: "2025-11-15",
    excerpt: "Przebudowa naroznika z wymiana sprężyn i tapicerki.",
    description:
      "Naroznik przeszedl gruntowna modernizacje. Wymieniono caly uklad sprezynujacy, dodano nowa pianke wysokoelastyczna i pokryto tkanina hydrofobowa.",
    tags: ["sofas", "restoration"],
    images: [
      {
        thumbnail: "https://placehold.co/800x534/6b4c3b/ffffff?text=Sofa+2a",
        url: "https://placehold.co/1600x1067/6b4c3b/ffffff?text=Sofa+2a",
        aspectRatio: 1.5,
      },
      {
        thumbnail: "https://placehold.co/800x1067/6b4c3b/ffffff?text=Sofa+2b",
        url: "https://placehold.co/1600x2133/6b4c3b/ffffff?text=Sofa+2b",
        aspectRatio: 0.75,
      },
    ],
  },
  {
    title: "Krzeslo biurowe retro",
    slug: "krzeslo-biurowe-retro",
    date: "2025-10-20",
    excerpt: "Odnowa krzesla biurowego z lat 70.",
    description:
      "Klasyczne krzeslo obrotowe na metalowej nodze. Wymiana tapicerki siedziska i oparcia na skore ekologiczna w kolorze koniakowym.",
    tags: ["chairs", "restoration"],
    images: [
      {
        thumbnail: "https://placehold.co/800x1000/a0522d/ffffff?text=Krzeslo+1",
        url: "https://placehold.co/1600x2000/a0522d/ffffff?text=Krzeslo+1",
        aspectRatio: 0.8,
      },
    ],
  },
  {
    title: "Komplet krzesel do jadalni",
    slug: "komplet-krzesel-do-jadalni",
    date: "2025-09-05",
    excerpt: "Tapicerka szesciu krzesel jadalnianych.",
    description:
      "Szesc krzesel jadalnianych otrzymalo nowe siedziska z pianki HR oraz tapicerke z tkaniny łatwozmywalnej. Drewniane nogi pomalowano na kolor orzecha.",
    tags: ["chairs"],
    images: [
      {
        thumbnail: "https://placehold.co/800x600/8b7355/ffffff?text=Krzesla+2a",
        url: "https://placehold.co/1600x1200/8b7355/ffffff?text=Krzesla+2a",
        aspectRatio: 1.33,
      },
      {
        thumbnail:
          "https://placehold.co/800x1067/8b7355/ffffff?text=Krzesla+2b",
        url: "https://placehold.co/1600x2133/8b7355/ffffff?text=Krzesla+2b",
        aspectRatio: 0.75,
      },
    ],
  },
  {
    title: "Tapicerka kanapy samochodowej",
    slug: "tapicerka-kanapy-samochodowej",
    date: "2025-08-10",
    excerpt: "Renowacja tapicerki tylnej kanapy klasycznego auta.",
    description:
      "Tylna kanapa Mercedesa W123 przeszła pełną renowację. Nowa skora naturalna w kolorze bezowym z oryginalnym wzorem przeszyc.",
    tags: ["automotive", "restoration"],
    images: [
      {
        thumbnail: "https://placehold.co/800x534/2f4f4f/ffffff?text=Auto+1",
        url: "https://placehold.co/1600x1067/2f4f4f/ffffff?text=Auto+1",
        aspectRatio: 1.5,
      },
    ],
  },
  {
    title: "Fotel lotniczy do samochodu",
    slug: "fotel-lotniczy-do-samochodu",
    date: "2025-07-01",
    excerpt: "Tapicerka sportowego fotela samochodowego.",
    description:
      "Fotel kubełkowy do auta sportowego. Kombinacja skory i alcantary w czarno-czerwonej kolorystyce z kontrastowymi przeszyciami.",
    tags: ["automotive"],
    images: [
      {
        thumbnail: "https://placehold.co/800x1067/333333/ffffff?text=Auto+2",
        url: "https://placehold.co/1600x2133/333333/ffffff?text=Auto+2",
        aspectRatio: 0.75,
      },
    ],
  },
  {
    title: "Fotel uszak — nowe zycie",
    slug: "fotel-uszak-nowe-zycie",
    date: "2025-06-15",
    excerpt: "Pelna renowacja zabytkowego fotela uszaka.",
    description:
      "Fotel uszak z XIX wieku przeszedł kompleksową restaurację. Odtworzono oryginalne tapicerowanie na pasach i sprężynach, calość pokryto lnem.",
    tags: ["armchairs", "restoration"],
    images: [
      {
        thumbnail: "https://placehold.co/800x960/704214/ffffff?text=Uszak",
        url: "https://placehold.co/1600x1920/704214/ffffff?text=Uszak",
        aspectRatio: 0.83,
      },
    ],
  },
  {
    title: "Sofa Chesterfield na zamowienie",
    slug: "sofa-chesterfield-na-zamowienie",
    date: "2025-05-20",
    excerpt: "Budowa sofy Chesterfield od podstaw.",
    description:
      "Klasyczna sofa Chesterfield wykonana ręcznie od podstaw. Konstrukcja z drewna bukowego, tapicerka ze skory naturalnej w kolorze ciemnobrazowym z charakterystycznym pikowaniem.",
    tags: ["sofas"],
    images: [
      {
        thumbnail:
          "https://placehold.co/800x534/5c3317/ffffff?text=Chesterfield",
        url: "https://placehold.co/1600x1067/5c3317/ffffff?text=Chesterfield",
        aspectRatio: 1.5,
      },
    ],
  },
];
