export const languages = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "pl";

/** All supported locale codes, derived from the languages map. */
export const locales = Object.keys(languages) as Lang[];

export const ui = {
  pl: {
    // Navigation
    "nav.home": "Strona glowna",
    "nav.projects": "Realizacje",
    "nav.about": "O nas",
    "nav.contact": "Kontakt",
    "nav.gallery": "Galeria",

    // Hero
    "hero.subtitle": "Profesjonalne usługi tapicerskie",
    "hero.title": "Tradycja spotyka nowoczesność",
    "hero.description": "Tworzymy tapicerkę, która zostaje z Tobą na lata.",
    "hero.cta": "Skontaktuj się z nami",
    "hero.featured": "Nasze realizacje",
    "hero.imageAlt": "Luksusowa tapicerka",

    // Projects
    "projects.title": "Nasze Realizacje",
    "projects.subtitle": "Galeria wybranych projektow",
    "projects.viewAll": "Zobacz wszystkie realizacje",

    // About
    "about.title": "O Nas",
    "about.subtitle": "Pasja i doswiadczenie w kazdym projekcie",
    "about.story":
      "Studio Tapicerskie BERO to rodzinna firma z ponad 20-letnim doswiadczeniem w branzy tapicerskiej. Specjalizujemy sie w profesjonalnej renowacji i tworzeniu mebli tapicerowanych, laczac tradycyjne rzemioslo z nowoczesnymi technikami.",
    "about.mission":
      "Dbamy o to, by meble odzyskały swój charakter i pełną funkcjonalność. Kazdy projekt traktujemy indywidualnie, dbajac o najdrobniejsze szczegoly.",
    "about.craftImageAlt": "Rzemieślnik przy pracy",
    "about.servicesTitle": "Nasze Usługi",

    // About - Stats
    "about.stats.experience": "Lat doswiadczenia",
    "about.stats.projects": "Zrealizowanych projektow",
    "about.stats.clients": "Zadowolonych klientow",
    "about.stats.passion": "Pasja w kazdym detalu",

    // About - Services
    "about.services.renovation": "Renowacja mebli",
    "about.services.renovationDesc":
      "Przywracamy zycie starym meblom i wydobywamy ich dawny charakter",
    "about.services.upholstery": "Wymiana tapicerki",
    "about.services.upholsteryDesc":
      "Odswiezamy wyglad mebli, dobierajac tkaniny dopasowane do wnetrza",
    "about.services.repair": "Naprawa konstrukcji",
    "about.services.repairDesc":
      "Wzmacniamy stelaze i przywracamy pelna stabilnosc mebli",
    "about.services.automotive": "Tapicerstwo samochodowe",
    "about.services.automotiveDesc":
      "Regeneracja foteli i podsufitek - estetyka wnetrza jak z salonu",

    // Contact
    "contact.title": "Kontakt",
    "contact.subtitle": "Skontaktuj sie z nami",
    "contact.mapTitle": "Lokalizacja",
    "contact.form.name": "Imie i nazwisko",
    "contact.form.email": "Adres e-mail",
    "contact.form.message": "Wiadomosc",
    "contact.form.consent":
      "Wyrazam zgode na przetwarzanie moich danych osobowych zgodnie z",
    "contact.form.privacyPolicy": "Polityka Prywatnosci",
    "contact.form.send": "Wyslij wiadomosc",
    "contact.form.sending": "Wysylanie...",
    "contact.form.success": "Dziekujemy! Wiadomosc zostala wyslana.",
    "contact.form.error": "Wystapil blad. Sprobuj ponownie.",

    // Footer
    "footer.about":
      "Studio Tapicerskie BERO to rodzinna firma z ponad 20-letnim doswiadczeniem w renowacji i tworzeniu mebli tapicerowanych.",
    "footer.quickLinks": "Szybkie linki",
    "footer.legal": "Informacje prawne",
    "footer.privacyPolicy": "Polityka prywatnosci",
    "footer.rights": "Wszelkie prawa zastrzezone.",

    // SEO
    "seo.title": "Studio Tapicerskie BERO",
    "seo.description":
      "Profesjonalne uslugi tapicerskie - renowacja mebli, tapicerowanie na zamowienie. Ponad 20 lat doswiadczenia.",

    // Portfolio page
    "portfolio.title": "Wszystkie Realizacje",
    "portfolio.subtitle": "Galeria naszych projektów tapicerskich",
    "portfolio.seoTitle": "Wszystkie Realizacje | Studio Tapicerskie BERO",
    "portfolio.seoDescription":
      "Galeria wszystkich realizacji Studio Tapicerskiego BERO. Zobacz nasze projekty tapicerskie - renowacje, meble na wymiar i wiele wiecej.",
    "portfolio.tagAll": "Wszystkie",

    // 404
    "404.title": "Nic tu nie ma",
    "404.description": "Podana strona nie istnieje lub została przeniesiona.",
    "404.cta": "Wróć na strone główną",

    // Privacy Policy
    "privacy.title": "Polityka Prywatnosci",
    "privacy.description":
      "Polityka prywatnosci Studio Tapicerskiego BERO. Informacje o przetwarzaniu danych osobowych i plikach cookies.",
    "privacy.body":
      "Ta strona internetowa nie zbiera zadnych danych osobowych ani nie korzysta z plikow cookies. Jezeli w przyszlosci strona zacznie przetwarzac dane osobowe, niniejsza polityka prywatnosci zostanie zaktualizowana.",

    // Accessibility
    "a11y.themeToggle": "Przelacz motyw",
    "a11y.menu": "Menu",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.gallery": "Gallery",

    // Hero
    "hero.subtitle": "Professional upholstery services",
    "hero.title": "Tradition meets modernity",
    "hero.description": "We create upholstery that stays with you for years.",
    "hero.cta": "Contact us",
    "hero.featured": "Our projects",
    "hero.imageAlt": "Luxury upholstery",

    // Projects
    "projects.title": "Our Projects",
    "projects.subtitle": "Gallery of selected projects",
    "projects.viewAll": "View all projects",

    // About
    "about.title": "About Us",
    "about.subtitle": "Passion and experience in every project",
    "about.story":
      "Studio Tapicerskie BERO is a family business with over 20 years of experience in the upholstery industry. We specialize in professional renovation and creation of upholstered furniture, combining traditional craftsmanship with modern techniques.",
    "about.mission":
      "We ensure that furniture regains its character and full functionality. Each project is treated individually, with attention to the finest details.",
    "about.craftImageAlt": "Craftsman working",
    "about.servicesTitle": "Our Services",

    // About - Stats
    "about.stats.experience": "Years of experience",
    "about.stats.projects": "Completed projects",
    "about.stats.clients": "Satisfied clients",
    "about.stats.passion": "Passion in every detail",

    // About - Services
    "about.services.renovation": "Furniture renovation",
    "about.services.renovationDesc":
      "We bring old furniture back to life and restore their former character",
    "about.services.upholstery": "Upholstery replacement",
    "about.services.upholsteryDesc":
      "We refresh the look of furniture, selecting fabrics that match the interior",
    "about.services.repair": "Frame repair",
    "about.services.repairDesc":
      "We reinforce frames and restore full stability to furniture",
    "about.services.automotive": "Automotive upholstery",
    "about.services.automotiveDesc":
      "Seat and headliner restoration - interior aesthetics like from the showroom",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Get in touch with us",
    "contact.mapTitle": "Location",
    "contact.form.name": "Full name",
    "contact.form.email": "Email address",
    "contact.form.message": "Message",
    "contact.form.consent":
      "I consent to the processing of my personal data in accordance with the",
    "contact.form.privacyPolicy": "Privacy Policy",
    "contact.form.send": "Send message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Thank you! Your message has been sent.",
    "contact.form.error": "An error occurred. Please try again.",

    // Footer
    "footer.about":
      "Studio Tapicerskie BERO is a family business with over 20 years of experience in renovation and creation of upholstered furniture.",
    "footer.quickLinks": "Quick links",
    "footer.legal": "Legal information",
    "footer.privacyPolicy": "Privacy policy",
    "footer.rights": "All rights reserved.",

    // SEO
    "seo.title": "Upholstery Studio BERO",
    "seo.description":
      "Professional upholstery services - furniture renovation, custom upholstery. Over 20 years of experience.",

    // Portfolio page
    "portfolio.title": "All Projects",
    "portfolio.subtitle": "Gallery of our upholstery projects",
    "portfolio.seoTitle": "All Projects | Upholstery Studio BERO",
    "portfolio.seoDescription":
      "Gallery of all projects by Upholstery Studio BERO. See our upholstery projects - renovations, custom furniture and more.",
    "portfolio.tagAll": "All",

    // 404
    "404.title": "Nothing here",
    "404.description":
      "The page you are looking for does not exist or has been moved.",
    "404.cta": "Back to home page",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.description":
      "Privacy policy of Upholstery Studio BERO. Information about personal data processing and cookies.",
    "privacy.body":
      "This website does not collect any personal data or use cookies. If in the future the website begins to process personal data, this privacy policy will be updated.",

    // Accessibility
    "a11y.themeToggle": "Toggle theme",
    "a11y.menu": "Menu",
  },

  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.projects": "Projekte",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "nav.gallery": "Galerie",

    // Hero
    "hero.subtitle": "Professionelle Polsterdienstleistungen",
    "hero.title": "Tradition trifft Moderne",
    "hero.description": "Wir schaffen Polster, die Sie jahrelang begleiten.",
    "hero.cta": "Kontaktieren Sie uns",
    "hero.featured": "Unsere Projekte",
    "hero.imageAlt": "Luxuriöse Polsterung",

    // Projects
    "projects.title": "Unsere Projekte",
    "projects.subtitle": "Galerie ausgewählter Projekte",
    "projects.viewAll": "Alle Projekte ansehen",

    // About
    "about.title": "Über Uns",
    "about.subtitle": "Leidenschaft und Erfahrung in jedem Projekt",
    "about.story":
      "Studio Tapicerskie BERO ist ein Familienunternehmen mit über 20 Jahren Erfahrung in der Polsterbranche. Wir sind spezialisiert auf die professionelle Renovierung und Herstellung von Polstermöbeln und verbinden traditionelles Handwerk mit modernen Techniken.",
    "about.mission":
      "Wir sorgen dafür, dass Möbel ihren Charakter und ihre volle Funktionalität wiedererlangen. Jedes Projekt wird individuell behandelt, wobei auf die kleinsten Details geachtet wird.",
    "about.craftImageAlt": "Handwerker bei der Arbeit",
    "about.servicesTitle": "Unsere Dienstleistungen",

    // About - Stats
    "about.stats.experience": "Jahre Erfahrung",
    "about.stats.projects": "Abgeschlossene Projekte",
    "about.stats.clients": "Zufriedene Kunden",
    "about.stats.passion": "Leidenschaft in jedem Detail",

    // About - Services
    "about.services.renovation": "Möbelrenovierung",
    "about.services.renovationDesc":
      "Wir erwecken alte Möbel zu neuem Leben und stellen ihren früheren Charakter wieder her",
    "about.services.upholstery": "Polsterwechsel",
    "about.services.upholsteryDesc":
      "Wir frischen das Aussehen von Möbeln auf und wählen passende Stoffe für das Interieur",
    "about.services.repair": "Rahmensanierung",
    "about.services.repairDesc":
      "Wir verstärken Rahmen und stellen die volle Stabilität der Möbel wieder her",
    "about.services.automotive": "Autopolsterung",
    "about.services.automotiveDesc":
      "Sitz- und Dachhimmelrestaurierung - Innenraumästhetik wie aus dem Salon",

    // Contact
    "contact.title": "Kontakt",
    "contact.subtitle": "Nehmen Sie Kontakt mit uns auf",
    "contact.mapTitle": "Standort",
    "contact.form.name": "Vor- und Nachname",
    "contact.form.email": "E-Mail-Adresse",
    "contact.form.message": "Nachricht",
    "contact.form.consent":
      "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der",
    "contact.form.privacyPolicy": "Datenschutzerklärung",
    "contact.form.send": "Nachricht senden",
    "contact.form.sending": "Wird gesendet...",
    "contact.form.success": "Vielen Dank! Ihre Nachricht wurde gesendet.",
    "contact.form.error":
      "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",

    // Footer
    "footer.about":
      "Studio Tapicerskie BERO ist ein Familienunternehmen mit über 20 Jahren Erfahrung in der Renovierung und Herstellung von Polstermöbeln.",
    "footer.quickLinks": "Schnelllinks",
    "footer.legal": "Rechtliche Informationen",
    "footer.privacyPolicy": "Datenschutzerklärung",
    "footer.rights": "Alle Rechte vorbehalten.",

    // SEO
    "seo.title": "Polsterwerkstatt BERO",
    "seo.description":
      "Professionelle Polsterdienstleistungen - Möbelrenovierung, Polsterung nach Maß. Über 20 Jahre Erfahrung.",

    // Portfolio page
    "portfolio.title": "Alle Projekte",
    "portfolio.subtitle": "Galerie unserer Polsterprojekte",
    "portfolio.seoTitle": "Alle Projekte | Polsterwerkstatt BERO",
    "portfolio.seoDescription":
      "Galerie aller Projekte der Polsterwerkstatt BERO. Sehen Sie unsere Polsterprojekte - Renovierungen, Maßmöbel und mehr.",
    "portfolio.tagAll": "Alle",

    // 404
    "404.title": "Hier gibt es nichts",
    "404.description":
      "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    "404.cta": "Zurück zur Startseite",

    // Privacy Policy
    "privacy.title": "Datenschutzerklärung",
    "privacy.description":
      "Datenschutzerklärung der Polsterwerkstatt BERO. Informationen zur Verarbeitung personenbezogener Daten und Cookies.",
    "privacy.body":
      "Diese Website erhebt keine personenbezogenen Daten und verwendet keine Cookies. Sollte die Website in Zukunft personenbezogene Daten verarbeiten, wird diese Datenschutzerklärung aktualisiert.",

    // Accessibility
    "a11y.themeToggle": "Design wechseln",
    "a11y.menu": "Menü",
  },
} as const;
