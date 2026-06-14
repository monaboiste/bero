import { defaultLang, type Lang } from "@bero/locales";
import type { PortfolioService } from "@bero/portfolio";

/** Ensures every language in @bero/locales has a translation entry. */
type LocalizedText = Record<Lang, string>;

interface FixtureImage {
  thumbnail: string;
  url: string;
  aspectRatio: number;
}

interface LocalizedProject {
  date: string;
  description: LocalizedText;
  excerpt: LocalizedText;
  images: FixtureImage[];
  slug: LocalizedText;
  tags: string[];
  title: LocalizedText;
}

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
const LOCALIZED_PORTFOLIO: LocalizedProject[] = [
  {
    title: {
      pl: "Renowacja fotela klubowego",
      en: "Club armchair renovation",
      de: "Renovierung eines Clubsessels",
    },
    slug: {
      pl: "renowacja-fotela-klubowego",
      en: "club-armchair-renovation",
      de: "renovierung-eines-clubsessels",
    },
    date: "2026-02-12",
    excerpt: {
      pl: "Kompleksowa odnowa klasycznego fotela klubowego z lat 60.",
      en: "Comprehensive restoration of a classic 1960s club armchair.",
      de: "Umfassende Restaurierung eines klassischen Clubsessels aus den 60er Jahren.",
    },
    description: {
      pl: "Fotel klubowy przeszedl pelna renowacje — od rozebrania konstrukcji, przez naprawe sprężyn i wymiane pianki, az po nowa tapicerke z weluru w kolorze butelkowej zieleni.",
      en: "The club armchair underwent a full renovation — from disassembling the frame, through spring repair and foam replacement, to new velvet upholstery in bottle green.",
      de: "Der Clubsessel wurde vollständig renoviert — vom Zerlegen des Rahmens über die Reparatur der Federn und den Austausch des Schaumstoffs bis hin zum neuen Samtbezug in Flaschengrün.",
    },
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
    title: {
      pl: "Nowoczesny fotel tapicerowany",
      en: "Modern upholstered armchair",
      de: "Moderner Polstersessel",
    },
    slug: {
      pl: "nowoczesny-fotel-tapicerowany",
      en: "modern-upholstered-armchair",
      de: "moderner-polstersessel",
    },
    date: "2026-01-06",
    excerpt: {
      pl: "Stworzenie eleganckiego fotela na zamowienie.",
      en: "Creation of an elegant custom-made armchair.",
      de: "Anfertigung eines eleganten Sessels nach Maß.",
    },
    description: {
      pl: "Projekt indywidualny fotela wypoczynkowego z wysokim oparciem. Tapicerka z tkaniny boucle w odcieniu kremowym, nogi z drewna debowego.",
      en: "Custom design of a lounge armchair with a high backrest. Boucle fabric upholstery in a cream shade, oak wood legs.",
      de: "Individuelles Design eines Loungesessels mit hoher Rückenlehne. Bouclé-Stoffbezug in Cremeton, Beine aus Eichenholz.",
    },
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
    title: {
      pl: "Zestaw mebli tapicerowanych",
      en: "Upholstered furniture set",
      de: "Polstermöbel-Set",
    },
    slug: {
      pl: "zestaw-mebli-tapicerowanych",
      en: "upholstered-furniture-set",
      de: "polstermoebel-set",
    },
    date: "2025-12-01",
    excerpt: {
      pl: "Kompleksowa tapicerka zestawu salonowego.",
      en: "Comprehensive upholstery of a living room set.",
      de: "Umfassende Polsterung eines Wohnzimmer-Sets.",
    },
    description: {
      pl: "Trojczłonowy zestaw wypoczynkowy: sofa trzyosobowa i dwa fotele. Jednolita tkanina welurowa w kolorze grafitowym z dekoracyjnymi guzikami.",
      en: "Three-piece lounge set: a three-seater sofa and two armchairs. Uniform velvet fabric in graphite with decorative buttons.",
      de: "Dreiteiliges Lounge-Set: ein Dreisitzer-Sofa und zwei Sessel. Einheitlicher Samtstoff in Graphit mit dekorativen Knöpfen.",
    },
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
    title: {
      pl: "Sofa narozna do salonu",
      en: "Corner sofa for the living room",
      de: "Ecksofa für das Wohnzimmer",
    },
    slug: {
      pl: "sofa-narozna-do-salonu",
      en: "corner-sofa-for-living-room",
      de: "ecksofa-fuer-wohnzimmer",
    },
    date: "2025-11-15",
    excerpt: {
      pl: "Przebudowa naroznika z wymiana sprężyn i tapicerki.",
      en: "Reconstruction of a corner sofa with spring and upholstery replacement.",
      de: "Umbau eines Ecksofas mit Austausch von Federn und Polsterung.",
    },
    description: {
      pl: "Naroznik przeszedl gruntowna modernizacje. Wymieniono caly uklad sprezynujacy, dodano nowa pianke wysokoelastyczna i pokryto tkanina hydrofobowa.",
      en: "The corner sofa underwent a thorough modernization. The entire spring system was replaced, new high-resilience foam was added, and it was covered with hydrophobic fabric.",
      de: "Das Ecksofa wurde gründlich modernisiert. Das gesamte Federsystem wurde ausgetauscht, neuer hochelastischer Schaumstoff wurde hinzugefügt und mit hydrophobem Stoff bezogen.",
    },
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
    title: {
      pl: "Krzeslo biurowe retro",
      en: "Retro office chair",
      de: "Retro-Bürostuhl",
    },
    slug: {
      pl: "krzeslo-biurowe-retro",
      en: "retro-office-chair",
      de: "retro-buerostuhl",
    },
    date: "2025-10-20",
    excerpt: {
      pl: "Odnowa krzesla biurowego z lat 70.",
      en: "Restoration of a 1970s office chair.",
      de: "Restaurierung eines Bürostuhls aus den 70er Jahren.",
    },
    description: {
      pl: "Klasyczne krzeslo obrotowe na metalowej nodze. Wymiana tapicerki siedziska i oparcia na skore ekologiczna w kolorze koniakowym.",
      en: "Classic swivel chair on a metal base. Seat and backrest reupholstered in cognac-coloured faux leather.",
      de: "Klassischer Drehstuhl auf Metallfuß. Sitz und Rückenlehne neu bezogen mit cognacfarbenem Kunstleder.",
    },
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
    title: {
      pl: "Komplet krzesel do jadalni",
      en: "Dining chair set",
      de: "Esszimmerstuhl-Set",
    },
    slug: {
      pl: "komplet-krzesel-do-jadalni",
      en: "dining-chair-set",
      de: "esszimmerstuhl-set",
    },
    date: "2025-09-05",
    excerpt: {
      pl: "Tapicerka szesciu krzesel jadalnianych.",
      en: "Upholstery of six dining chairs.",
      de: "Polsterung von sechs Esszimmerstühlen.",
    },
    description: {
      pl: "Szesc krzesel jadalnianych otrzymalo nowe siedziska z pianki HR oraz tapicerke z tkaniny łatwozmywalnej. Drewniane nogi pomalowano na kolor orzecha.",
      en: "Six dining chairs received new HR foam seats and easy-clean fabric upholstery. Wooden legs were painted in walnut colour.",
      de: "Sechs Esszimmerstühle erhielten neue HR-Schaumstoffsitze und pflegeleichten Stoffbezug. Die Holzbeine wurden in Walnussfarbe gestrichen.",
    },
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
    title: {
      pl: "Tapicerka kanapy samochodowej",
      en: "Car bench seat upholstery",
      de: "Autositzbank-Polsterung",
    },
    slug: {
      pl: "tapicerka-kanapy-samochodowej",
      en: "car-bench-seat-upholstery",
      de: "autositzbank-polsterung",
    },
    date: "2025-08-10",
    excerpt: {
      pl: "Renowacja tapicerki tylnej kanapy klasycznego auta.",
      en: "Restoration of a classic car's rear bench seat upholstery.",
      de: "Restaurierung der Polsterung der Rücksitzbank eines Oldtimers.",
    },
    description: {
      pl: "Tylna kanapa Mercedesa W123 przeszła pełną renowację. Nowa skora naturalna w kolorze bezowym z oryginalnym wzorem przeszyc.",
      en: "The rear bench seat of a Mercedes W123 underwent a full renovation. New natural leather in beige with original stitching pattern.",
      de: "Die Rücksitzbank eines Mercedes W123 wurde vollständig renoviert. Neues Naturleder in Beige mit originalem Steppnähmuster.",
    },
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
    title: {
      pl: "Fotel lotniczy do samochodu",
      en: "Bucket seat for sports car",
      de: "Schalensitz für Sportwagen",
    },
    slug: {
      pl: "fotel-lotniczy-do-samochodu",
      en: "bucket-seat-for-sports-car",
      de: "schalensitz-fuer-sportwagen",
    },
    date: "2025-07-01",
    excerpt: {
      pl: "Tapicerka sportowego fotela samochodowego.",
      en: "Upholstery of a sports car bucket seat.",
      de: "Polsterung eines Sportwagen-Schalensitzes.",
    },
    description: {
      pl: "Fotel kubełkowy do auta sportowego. Kombinacja skory i alcantary w czarno-czerwonej kolorystyce z kontrastowymi przeszyciami.",
      en: "Bucket seat for a sports car. A combination of leather and Alcantara in black and red with contrasting stitching.",
      de: "Schalensitz für einen Sportwagen. Kombination aus Leder und Alcantara in Schwarz-Rot mit kontrastierenden Nähten.",
    },
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
    title: {
      pl: "Fotel uszak — nowe zycie",
      en: "Wing chair — new life",
      de: "Ohrensessel — neues Leben",
    },
    slug: {
      pl: "fotel-uszak-nowe-zycie",
      en: "wing-chair-new-life",
      de: "ohrensessel-neues-leben",
    },
    date: "2025-06-15",
    excerpt: {
      pl: "Pelna renowacja zabytkowego fotela uszaka.",
      en: "Full restoration of an antique wing chair.",
      de: "Vollständige Restaurierung eines antiken Ohrenessels.",
    },
    description: {
      pl: "Fotel uszak z XIX wieku przeszedł kompleksową restaurację. Odtworzono oryginalne tapicerowanie na pasach i sprężynach, calość pokryto lnem.",
      en: "A 19th-century wing chair underwent comprehensive restoration. The original webbing and spring upholstery was recreated, and the whole piece was covered in linen.",
      de: "Ein Ohrensessel aus dem 19. Jahrhundert wurde umfassend restauriert. Die originale Gurt- und Federpolsterung wurde nachgebildet und das ganze Stück mit Leinen bezogen.",
    },
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
    title: {
      pl: "Sofa Chesterfield na zamowienie",
      en: "Custom Chesterfield sofa",
      de: "Chesterfield-Sofa nach Maß",
    },
    slug: {
      pl: "sofa-chesterfield-na-zamowienie",
      en: "custom-chesterfield-sofa",
      de: "chesterfield-sofa-nach-mass",
    },
    date: "2025-05-20",
    excerpt: {
      pl: "Budowa sofy Chesterfield od podstaw.",
      en: "Building a Chesterfield sofa from scratch.",
      de: "Bau eines Chesterfield-Sofas von Grund auf.",
    },
    description: {
      pl: "Klasyczna sofa Chesterfield wykonana ręcznie od podstaw. Konstrukcja z drewna bukowego, tapicerka ze skory naturalnej w kolorze ciemnobrazowym z charakterystycznym pikowaniem.",
      en: "Classic Chesterfield sofa handcrafted from scratch. Beechwood frame, natural leather upholstery in dark brown with characteristic button tufting.",
      de: "Klassisches Chesterfield-Sofa, von Hand gefertigt. Buchenholzrahmen, Naturlederpolsterung in Dunkelbraun mit charakteristischer Knopfheftung.",
    },
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

function resolveText(text: LocalizedText, lang: Lang): string {
  return text[lang] ?? text[defaultLang];
}

/**
 * Returns mock portfolio data resolved for the given language.
 * Falls back to Polish for any missing translation.
 */
function getMockPortfolio(lang: Lang) {
  return LOCALIZED_PORTFOLIO.map((project) => ({
    title: resolveText(project.title, lang),
    slug: resolveText(project.slug, lang),
    date: project.date,
    excerpt: resolveText(project.excerpt, lang),
    description: resolveText(project.description, lang),
    tags: project.tags,
    images: project.images,
  }));
}

/** Creates a fixture-backed PortfolioService using static mock data. */
export function createFixturePortfolioService(lang: Lang): PortfolioService {
  return {
    count: async () => getMockPortfolio(lang).length,

    fetchPortfolioPage: async (page) =>
      getMockPortfolio(lang).slice(page.start, page.end),

    fetchPortfolioLatestProjects: async (limit) =>
      getMockPortfolio(lang).slice(0, limit),
  };
}
