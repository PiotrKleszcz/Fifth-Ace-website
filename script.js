const yearNode = document.getElementById("year");
const brandAvatarImage = document.getElementById("brandAvatarImage");
const metaDescriptionNode = document.getElementById("metaDescription");
const pageTitleNode = document.getElementById("pageTitle");
const langSwitchNode = document.querySelector(".lang-switch");
const languageButtons = document.querySelectorAll("[data-lang-switch]");
const translatableNodes = document.querySelectorAll("[data-i18n]");

const i18n = {
  pl: {
    meta: {
      title: "Fifth Ace | Cyberbezpieczeństwo i Pentesty",
      description:
        "Fifth Ace - cyberbezpieczeństwo, testy penetracyjne oraz profesjonalne wsparcie IT dla firm.",
    },
    ui: {
      langLabel: "Wybór języka",
    },
    nav: {
      services: "Usługi",
      experience: "Doświadczenie",
      process: "Proces",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Cyberbezpieczeństwo • Testy penetracyjne • Wsparcie IT",
      title: "Chronimy firmę zanim zagrożenie stanie się incydentem",
      lead1:
        "Fifth Ace wspiera organizacje w wykrywaniu luk bezpieczeństwa, przeprowadzaniu testów penetracyjnych i utrzymaniu bezpiecznego, stabilnego środowiska IT.",
      lead2:
        "Zespół Fifth Ace łączy praktyczne wsparcie IT z intensywnym rozwojem kompetencji w obszarze bezpieczeństwa systemów i sieci.",
      ctaConsult: "Umów konsultację",
      ctaOffer: "Zobacz ofertę",
    },
    services: {
      title: "Kluczowe usługi",
      card1: {
        title: "Cyberbezpieczeństwo",
        desc: "Audyty bezpieczeństwa, twarde polityki dostępu i monitoring zagrożeń dopasowany do Twojej infrastruktury.",
        li1: "Ocena ryzyka i zgodności",
        li2: "Wzmacnianie zabezpieczeń systemów i sieci",
        li3: "Programy świadomości bezpieczeństwa",
      },
      card2: {
        title: "Testy penetracyjne",
        desc: "Realistyczne symulacje ataków na aplikacje, sieci i środowiska chmurowe, zakończone raportem i planem naprawczym.",
        li1: "Pentesty aplikacji webowych, API i mobilnych",
        li2: "Testy infrastruktury wewnętrznej i zewnętrznej",
        li3: "Retesty po wdrożeniu poprawek",
      },
      card3: {
        title: "Wsparcie IT",
        desc: "Szybka pomoc techniczna dla zespołów, administracja środowiskiem i stała opieka nad infrastrukturą.",
        li1: "Obsługa zgłoszeń i SLA dla firm",
        li2: "Administracja serwerami i stacjami roboczymi",
        li3: "Kopie zapasowe, odzyskiwanie i ciągłość działania",
      },
      now: {
        title: "Usługi dostępne od ręki",
        card1: {
          title: "Security check dla małych firm / freelancerów",
          desc: "Sprawdzę podstawowe ryzyka na laptopie i sieci domowej.",
          li1: "Hardening Windows 10/11",
          li2: "Ustawienia Microsoft Defender",
          li3: "Zapora, aktualizacje i podstawowy audyt bezpieczeństwa",
        },
        card2: {
          title: "Small Business Cyber Hygiene Setup",
          desc: "Praktyczne wdrożenie nawyków bezpieczeństwa dla małych zespołów.",
          li1: "MFA i menedżer haseł",
          li2: "Bezpieczne kopie zapasowe",
          li3: "Świadomość phishingu",
        },
        card3: {
          title: "Home network security review",
          desc: "Przegląd bezpieczeństwa sieci domowej i podstawowa konfiguracja.",
          li1: "Konfiguracja routera",
          li2: "Szyfrowanie Wi-Fi",
          li3: "Sieć gościnna",
        },
      },
    },
    experience: {
      title: "Doświadczenie i kwalifikacje",
      card1: {
        title: "Podejście do współpracy",
        desc: "Fundamentem pracy Fifth Ace jest doświadczenie w prowadzeniu złożonych projektów oraz konsekwentne podejście do ryzyka, jakości i zgodności z procedurami.",
        li1: "Analiza problemu i szybkie wskazanie priorytetów",
        li2: "Wysoka dbałość o szczegóły i standardy bezpieczeństwa",
        li3: "Jasna komunikacja i skuteczne prowadzenie działań naprawczych",
      },
      card2: {
        title: "Praktyka Fifth Ace",
        desc: "Realne wsparcie techniczne i bezpieczeństwo dla środowisk domowych i małych firm.",
        li1: "Diagnostyka i naprawa Windows, macOS oraz drukarek",
        li2: "Modernizacje sprzętu: RAM, SSD, serwis urządzeń",
        li3: "Konfiguracja sieci i podstawowych ustawień zapory sieciowej",
      },
      card3: {
        title: "Rozwój kompetencji bezpieczeństwa",
        desc: "Stały rozwój praktyczny w obszarze ofensywnego i defensywnego bezpieczeństwa.",
        li1: "Kali Linux i narzędzia: Nmap, Netdiscover, Bettercap, Wifite",
        li2: "Monitoring sieci LAN i ocena podatności urządzeń",
        li3: "Wsparcie OWASP: tłumaczenia dokumentacji LLM oraz Juice Shop na język polski",
      },
      card4: {
        title: "Zakres kompetencji technicznych",
        desc: "Usługi realizowane są w oparciu o praktyczne umiejętności techniczne i codzienną pracę z infrastrukturą użytkowników.",
        li1: "Ocena ryzyka i identyfikacja podatności",
        li2: "Konfiguracja systemów: Windows, Linux, macOS",
        li3: "Diagnostyka usterek sprzętowych i systemowych",
        li4: "Konfiguracja i zabezpieczanie sieci lokalnych",
        li5: "Budowanie świadomości bezpieczeństwa w zespołach",
      },
    },
    process: {
      title: "Jak pracujemy",
      step1: {
        title: "Diagnoza",
        desc: "Rozpoznanie środowiska i priorytetów biznesowych.",
      },
      step2: {
        title: "Test i analiza",
        desc: "Weryfikacja podatności i ocena wpływu na organizację.",
      },
      step3: {
        title: "Wdrożenie",
        desc: "Rekomendacje, wsparcie i ponowny test potwierdzający poprawki.",
      },
    },
    contact: {
      title: "Potrzebujesz partnera od bezpieczeństwa?",
      desc: "Skontaktuj się z Fifth Ace i zaplanujmy bezpieczniejszą infrastrukturę.",
    },
    footer: {
      follow: "Obserwuj nas",
      rights: "Wszelkie prawa zastrzeżone.",
    },
  },
  en: {
    meta: {
      title: "Fifth Ace | Cybersecurity and Pentesting",
      description:
        "Fifth Ace - cybersecurity, penetration testing and professional IT support for businesses.",
    },
    ui: {
      langLabel: "Language switch",
    },
    nav: {
      services: "Services",
      experience: "Experience",
      process: "Process",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Cybersecurity • Penetration Testing • IT Support",
      title: "We protect your business before a threat becomes an incident",
      lead1:
        "Fifth Ace supports organizations in identifying security gaps, conducting penetration tests, and maintaining a secure, stable IT environment.",
      lead2:
        "The Fifth Ace team combines practical IT support with continuous growth in systems and network security expertise.",
      ctaConsult: "Book a consultation",
      ctaOffer: "View services",
    },
    services: {
      title: "Core services",
      card1: {
        title: "Cybersecurity",
        desc: "Security audits, strict access policies, and threat monitoring tailored to your infrastructure.",
        li1: "Risk and compliance assessment",
        li2: "System and network hardening",
        li3: "Security awareness programs",
      },
      card2: {
        title: "Penetration testing",
        desc: "Realistic attack simulations for applications, networks, and cloud environments, followed by a report and remediation plan.",
        li1: "Web, API, and mobile pentests",
        li2: "Internal and external infrastructure testing",
        li3: "Re-tests after remediation",
      },
      card3: {
        title: "IT support",
        desc: "Fast technical assistance for teams, environment administration, and continuous infrastructure care.",
        li1: "Ticket handling and SLA support for companies",
        li2: "Server and workstation administration",
        li3: "Backups, recovery, and business continuity",
      },
      now: {
        title: "Services available right now",
        card1: {
          title: "Security check for small businesses / freelancers",
          desc: "I will review basic risks on a laptop and home network.",
          li1: "Windows 10/11 hardening",
          li2: "Microsoft Defender settings",
          li3: "Firewall, updates, and basic security audit",
        },
        card2: {
          title: "Small Business Cyber Hygiene Setup",
          desc: "Practical security hygiene setup for small teams.",
          li1: "MFA and password manager",
          li2: "Secure backups",
          li3: "Phishing awareness",
        },
        card3: {
          title: "Home network security review",
          desc: "Home network security review and baseline configuration.",
          li1: "Router configuration",
          li2: "Wi-Fi encryption",
          li3: "Guest network",
        },
      },
    },
    experience: {
      title: "Experience and qualifications",
      card1: {
        title: "How we work",
        desc: "Fifth Ace is built on experience in complex project execution and a consistent approach to risk, quality, and procedural compliance.",
        li1: "Problem analysis and fast prioritization",
        li2: "Strong attention to detail and security standards",
        li3: "Clear communication and effective remediation execution",
      },
      card2: {
        title: "Fifth Ace practice",
        desc: "Hands-on technical support and security services for home and small business environments.",
        li1: "Diagnostics and repair for Windows, macOS, and printers",
        li2: "Hardware upgrades: RAM, SSD, and device servicing",
        li3: "Network setup and basic firewall configuration",
      },
      card3: {
        title: "Security skills development",
        desc: "Continuous practical growth in offensive and defensive security.",
        li1: "Kali Linux tools: Nmap, Netdiscover, Bettercap, Wifite",
        li2: "LAN monitoring and device vulnerability assessment",
        li3: "OWASP support: translating LLM and Juice Shop documentation into Polish",
      },
      card4: {
        title: "Technical capability scope",
        desc: "Services are delivered using practical technical skills and daily work with end-user infrastructure.",
        li1: "Risk assessment and vulnerability identification",
        li2: "System configuration: Windows, Linux, macOS",
        li3: "Hardware and system troubleshooting",
        li4: "Local network configuration and protection",
        li5: "Security awareness building for teams",
      },
    },
    process: {
      title: "How we work",
      step1: {
        title: "Discovery",
        desc: "Understanding your environment and business priorities.",
      },
      step2: {
        title: "Testing and analysis",
        desc: "Verifying vulnerabilities and evaluating organizational impact.",
      },
      step3: {
        title: "Implementation",
        desc: "Recommendations, support, and a follow-up test confirming the fixes.",
      },
    },
    contact: {
      title: "Need a trusted security partner?",
      desc: "Contact Fifth Ace and let's plan a safer infrastructure.",
    },
    footer: {
      follow: "Follow us",
      rights: "All rights reserved.",
    },
  },
};

function getTranslation(language, key) {
  return key.split(".").reduce((obj, part) => {
    if (!obj || typeof obj !== "object") return undefined;
    return obj[part];
  }, i18n[language]);
}

function applyLanguage(language) {
  const selectedLanguage = i18n[language] ? language : "pl";

  document.documentElement.lang = selectedLanguage;
  document.title = i18n[selectedLanguage].meta.title;

  if (pageTitleNode) {
    pageTitleNode.textContent = i18n[selectedLanguage].meta.title;
  }

  if (metaDescriptionNode) {
    metaDescriptionNode.setAttribute("content", i18n[selectedLanguage].meta.description);
  }

  if (langSwitchNode) {
    langSwitchNode.setAttribute("aria-label", i18n[selectedLanguage].ui.langLabel);
  }

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    const translation = getTranslation(selectedLanguage, key);
    if (typeof translation === "string") {
      node.textContent = translation;
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langSwitch === selectedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("fifthace_lang", selectedLanguage);
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (brandAvatarImage) {
  const markMissingAvatar = () => document.body.classList.add("no-brand-avatar");

  brandAvatarImage.addEventListener("error", markMissingAvatar);

  if (brandAvatarImage.complete && brandAvatarImage.naturalWidth === 0) {
    markMissingAvatar();
  }
}

const savedLanguage = localStorage.getItem("fifthace_lang");
applyLanguage(savedLanguage || "pl");

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langSwitch);
  });
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
