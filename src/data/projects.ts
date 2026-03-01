// TODO: replace with CMS/API data (Sanity.io)

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Renowacja fotela klubowego",
    description:
      "Kompleksowa odnowa klasycznego fotela klubowego ze skory naturalnej. Wymiana tapicerki, naprawa konstrukcji i odswiezenie detali.",
    image:
      "https://images.unsplash.com/photo-1768573264026-b540abdc3384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYXJtY2hhaXIlMjByZXN0b3JhdGlvbnxlbnwxfHx8fDE3NzA1Nzg3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2026-02-12",
    tags: ["Fotele", "Renowacja"],
  },
  {
    id: "2",
    title: "Nowoczesny fotel tapicerowany",
    description:
      "Stworzenie eleganckiego fotela z aksamitnym wykonczeniem. Projekt laczy nowoczesny design z klasycznym komfortem.",
    image:
      "https://images.unsplash.com/photo-1753362752045-2c3fdf2d04f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaGFpciUyMHVwaG9sc3RlcnklMjBkZXRhaWx8ZW58MXx8fHwxNzcwNTc4NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2026-01-06",
    tags: ["Fotele", "Projekt indywidualny"],
  },
  {
    id: "3",
    title: "Zestaw mebli tapicerowanych",
    description:
      "Kompleksowa tapicerka zestawu salonowego. Sofa, dwa fotele i pufa w jednolitej tkaninie.",
    image:
      "https://images.unsplash.com/photo-1763979628017-ea650631b0be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmdXJuaXR1cmUlMjB1cGhvbHN0ZXJ5fGVufDF8fHx8MTc3MDU3ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2025-12-01",
    tags: ["Sofy", "Fotele", "Projekt indywidualny"],
  },
  {
    id: "4",
    title: "Tapicerka krzesel zabytkowych",
    description:
      "Odswiezenie kompletu szesciu zabytkowych krzesel. Zachowanie oryginalnego charakteru z uzyciem nowoczesnych materialow.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-11-15",
    tags: ["Krzesla", "Renowacja"],
  },
  {
    id: "5",
    title: "Sofa narozna na wymiar",
    description:
      "Wykonanie duzej sofy naroznej na wymiar. Tkanina wodoodporna, idealnie dopasowana do przestrzeni klienta.",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-10-20",
    tags: ["Sofy", "Projekt indywidualny"],
  },
  {
    id: "6",
    title: "Renowacja kanapy Chesterfield",
    description:
      "Pelna renowacja klasycznej kanapy Chesterfield. Nowa skora, naprawione sprężyny i przywrocony blask oryginalu.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-09-08",
    tags: ["Sofy", "Renowacja"],
  },
  {
    id: "7",
    title: "Fotel biurowy premium",
    description:
      "Tapicerka ergonomicznego fotela biurowego skora naturalna. Komfort i elegancja w jednym.",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-08-25",
    tags: ["Fotele", "Projekt indywidualny"],
  },
  {
    id: "8",
    title: "Pufy i siedziska do restauracji",
    description:
      "Seria 20 puf i siedzisk dla nowoczesnej restauracji. Tkaniny latwe w czyszczeniu, odporne na zabrudzenia.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-07-12",
    tags: ["Projekt indywidualny"],
  },
  {
    id: "9",
    title: "Tapicerka lozka kontynentalnego",
    description:
      "Wykonanie tapicerowanego zaglowka i ramy lozka kontynentalnego z weluru w kolorze butelkowej zieleni.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-06-30",
    tags: ["Projekt indywidualny"],
  },
  {
    id: "10",
    title: "Odnowienie foteli kinowych",
    description:
      "Wymiana tapicerki w 50 fotelach kinowych. Nowa pianka, nowe pokrycie z tkaniny trudnopalnej.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-05-18",
    tags: ["Fotele", "Renowacja"],
  },
  {
    id: "11",
    title: "Kanapa modularowa",
    description:
      "Projekt i wykonanie modularowej kanapy z mozliwoscia dowolnej konfiguracji elementow.",
    image:
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-04-05",
    tags: ["Sofy", "Projekt indywidualny"],
  },
  {
    id: "12",
    title: "Renowacja mebli art deco",
    description:
      "Delikatna renowacja kompletu mebli w stylu art deco z lat 30. Zachowanie oryginalnych tkanin gdzie to mozliwe.",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-03-22",
    tags: ["Renowacja"],
  },
  {
    id: "13",
    title: "Tapicerka jachtowa",
    description:
      "Wykonanie kompletnej tapicerki wnetrza jachtu. Materialy odporne na wilgoc i promieniowanie UV.",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-02-14",
    tags: ["Projekt indywidualny"],
  },
  {
    id: "14",
    title: "Krzesla do sali konferencyjnej",
    description:
      "Tapicerka 30 krzesel konferencyjnych. Tkanina w kolorze firmowym klienta z logo wyhaftowanym na oparciu.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-01-10",
    tags: ["Krzesla", "Projekt indywidualny"],
  },
  {
    id: "15",
    title: "Fotel uszak klasyczny",
    description:
      "Szycie od podstaw klasycznego fotela uszak. Tkanina w kratke, detale z naturalnego drewna.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-12-05",
    tags: ["Fotele", "Projekt indywidualny"],
  },
  {
    id: "16",
    title: "Panel scienne tapicerowane",
    description:
      "Montaz tapicerowanych paneli sciennych w sypialni. Efekt miekkiej sciany z weluru w odcieniu pudrowego rozu.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-11-18",
    tags: ["Projekt indywidualny"],
  },
  {
    id: "17",
    title: "Sofa do poczekalni",
    description:
      "Wykonanie wytrzymalej sofy do poczekalni gabinetu medycznego. Tapicerka z eko-skory, latwa w dezynfekcji.",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-10-30",
    tags: ["Sofy", "Projekt indywidualny"],
  },
  {
    id: "18",
    title: "Renowacja zabytkowej otomany",
    description:
      "Odrestaurowanie XIX-wiecznej otomany. Odtworzenie oryginalnego wzoru tkaniny na podstawie zachowanych fragmentow.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-09-15",
    tags: ["Renowacja"],
  },
  {
    id: "19",
    title: "Tapicerka kampera",
    description:
      "Kompleksowa wymiana tapicerki we wnetrzu kampera. Lekkie materialy, funkcjonalne rozwiazania na mala przestrzen.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-08-20",
    tags: ["Projekt indywidualny"],
  },
  {
    id: "20",
    title: "Lawka tapicerowana do holu",
    description:
      "Wykonanie eleganckiej lawki tapicerowanej do holu hotelowego. Konstrukcja stalowa, siedzisko z naturalnej skory.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2024-07-08",
    tags: ["Projekt indywidualny"],
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}
