const yearNode = document.getElementById("year");
const brandAvatarImage = document.getElementById("brandAvatarImage");
const metaDescriptionNode = document.getElementById("metaDescription");
const pageTitleNode = document.getElementById("pageTitle");
const langSwitchNode = document.querySelector(".lang-switch");
const languageButtons = document.querySelectorAll("[data-lang-switch]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const reviewsListNode = document.getElementById("reviewsList");
const portalTabs = document.querySelectorAll("[data-portal-tab]");
const portalSessionNode = document.getElementById("portalSession");
const portalFeedbackNode = document.getElementById("portalFeedback");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const reviewForm = document.getElementById("reviewForm");
const reviewFieldset = document.getElementById("reviewFieldset");
const reviewLockNote = document.getElementById("reviewLockNote");

let activeLanguage = "pl";
let activePortalTab = "register";
let activePortalMessage = null;

const i18n = {
  pl: {
    meta: {
      title: "Fifth Ace | Cyberbezpieczeństwo, Pentesty i Audyty",
      description:
        "Fifth Ace - cyberbezpieczeństwo, audyty bezpieczeństwa, testy penetracyjne oraz wsparcie IT dla małych firm i freelancerów.",
    },
    ui: {
      langLabel: "Wybór języka",
    },
    nav: {
      services: "Usługi",
      guides: "Strefa usług",
      experience: "Doświadczenie",
      process: "Proces",
      reviews: "Opinie",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Cyberbezpieczeństwo • Testy penetracyjne • Wsparcie IT",
      title: "Chronimy firmę zanim zagrożenie stanie się incydentem",
      lead1:
        "Fifth Ace wspiera organizacje w wykrywaniu luk bezpieczeństwa, przeprowadzaniu testów penetracyjnych i utrzymaniu bezpiecznego, stabilnego środowiska IT.",
      lead2:
        "Zespół Fifth Ace łączy praktyczne wsparcie IT z intensywnym rozwojem kompetencji w obszarze bezpieczeństwa systemów i sieci.",
      lead3:
        "Pomagamy w takich obszarach jak audyt bezpieczeństwa, testy penetracyjne, zabezpieczanie laptopów firmowych, ochrona sieci Wi-Fi, MFA, kopie zapasowe i cyber hygiene dla małych organizacji.",
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
        cta: "Zobacz stronę usługi",
      },
      card2: {
        title: "Testy penetracyjne",
        desc: "Realistyczne symulacje ataków na aplikacje, sieci i środowiska chmurowe, zakończone raportem i planem naprawczym.",
        li1: "Pentesty aplikacji webowych, API i mobilnych",
        li2: "Testy infrastruktury wewnętrznej i zewnętrznej",
        li3: "Retesty po wdrożeniu poprawek",
        cta: "Zobacz stronę usługi",
      },
      card3: {
        title: "Wsparcie IT",
        desc: "Szybka pomoc techniczna dla zespołów, administracja środowiskiem i stała opieka nad infrastrukturą.",
        li1: "Obsługa zgłoszeń i SLA dla firm",
        li2: "Administracja serwerami i stacjami roboczymi",
        li3: "Kopie zapasowe, odzyskiwanie i ciągłość działania",
        cta: "Zobacz stronę usługi",
      },
      now: {
        title: "Usługi dostępne od ręki",
        card1: {
          title: "Przegląd bezpieczeństwa dla małych firm i freelancerów",
          desc: "Sprawdzę podstawowe ryzyka na laptopie i sieci domowej.",
          li1: "Utwardzanie Windows 10/11",
          li2: "Ustawienia Microsoft Defender",
          li3: "Zapora, aktualizacje i podstawowy audyt bezpieczeństwa",
        },
        card2: {
          title: "Pakiet cyber hygiene dla małych firm",
          desc: "Praktyczne wdrożenie nawyków bezpieczeństwa dla małych zespołów.",
          li1: "MFA i menedżer haseł",
          li2: "Bezpieczne kopie zapasowe",
          li3: "Świadomość phishingu",
        },
        card3: {
          title: "Przegląd bezpieczeństwa sieci domowej",
          desc: "Przegląd bezpieczeństwa sieci domowej i podstawowa konfiguracja.",
          li1: "Konfiguracja routera",
          li2: "Szyfrowanie Wi-Fi",
          li3: "Sieć gościnna",
        },
      },
    },
    seoHub: {
      title: "Strefa usług i porad bezpieczeństwa",
      intro:
        "Przygotowaliśmy osobne strony usług, żeby łatwiej było znaleźć Fifth Ace po konkretnych hasłach takich jak audyt bezpieczeństwa, pentesty, wsparcie IT czy zabezpieczenie laptopa firmowego.",
      card1: {
        kicker: "Cyberbezpieczeństwo",
        title: "Cyberbezpieczeństwo dla małych firm",
        desc: "Strona o ochronie kont, poczty, laptopów, backupów i podstawowych procedurach bezpieczeństwa.",
        cta: "Przejdź do strony",
      },
      card2: {
        kicker: "Audyt bezpieczeństwa",
        title: "Audyt bezpieczeństwa i ocena ryzyka",
        desc: "Zakres audytu, najczęstsze luki i plan działań dla małej firmy lub freelancera.",
        cta: "Przejdź do strony",
      },
      card3: {
        kicker: "Pentesty",
        title: "Testy penetracyjne aplikacji i sieci",
        desc: "Informacje o testach aplikacji webowych, API, sieci wewnętrznej i retestach po poprawkach.",
        cta: "Przejdź do strony",
      },
      card4: {
        kicker: "Wsparcie IT",
        title: "Wsparcie IT dla firm i zespołów",
        desc: "Administracja, helpdesk, utrzymanie stacji roboczych, kopie zapasowe i ciągłość działania.",
        cta: "Przejdź do strony",
      },
      card5: {
        kicker: "Laptop i Wi-Fi",
        title: "Zabezpieczenie laptopa i sieci Wi-Fi",
        desc: "Hardening Windows, router, MFA, Defender i szybki security check dla małego biznesu lub domu.",
        cta: "Przejdź do strony",
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
    reviews: {
      eyebrow: "Zweryfikowane opinie klientów",
      title: "Komentarze i opinie po zrealizowanych usługach",
      intro:
        "Klienci Fifth Ace mogą założyć konto, zalogować się i dodać komentarz po zakończonej współpracy. Rejestracja zbiera podstawowe dane potrzebne do weryfikacji opinii.",
      highlight1: {
        title: "Logowanie wymagane",
        desc: "Formularz opinii odblokowuje się dopiero po zalogowaniu klienta.",
      },
      highlight2: {
        title: "Podstawowe dane",
        desc: "Rejestracja zbiera imię, nazwisko, numer telefonu i adres email.",
      },
      highlight3: {
        title: "Sekcja gotowa na wpisy",
        desc: "Każda nowa opinia pojawia się poniżej razem z oceną i zakresem usługi.",
      },
      listTitle: "Opublikowane komentarze",
      listDesc:
        "Po dodaniu opinii zobaczysz ją poniżej razem z oceną i zakresem usługi.",
      empty: {
        title: "Jeszcze nie ma opublikowanych opinii",
        desc: "Sekcja jest gotowa na pierwsze komentarze od klientów, którzy zakończyli współpracę z Fifth Ace.",
      },
      loading: {
        title: "Ładowanie opinii",
        desc: "Pobieramy opublikowane komentarze z bazy danych.",
      },
      loadError: {
        title: "Nie udało się załadować opinii",
        desc: "Sprawdź połączenie z serwerem i spróbuj ponownie za chwilę.",
      },
      portal: {
        title: "Strefa klienta",
        desc: "Załóż konto klienta, zaloguj się i opisz przebieg współpracy z Fifth Ace.",
        privacy:
          "Dane z formularza są zapisywane w bazie danych i służą do identyfikacji klienta oraz weryfikacji opinii.",
      },
      tabs: {
        register: "Rejestracja",
        login: "Logowanie",
        review: "Dodaj opinię",
      },
      register: {
        firstName: "Imię",
        lastName: "Nazwisko",
        phone: "Nr telefonu",
        email: "Adres email",
        password: "Hasło",
        submit: "Załóż konto",
        hint: "Minimum 8 znaków. Konto służy do zalogowania przed dodaniem komentarza.",
      },
      login: {
        email: "Adres email",
        password: "Hasło",
        submit: "Zaloguj się",
        hint: "Zaloguj się tym adresem email i hasłem, które podałeś podczas rejestracji.",
      },
      review: {
        service: "Zakres usługi",
        rating: "Ocena współpracy",
        comment: "Komentarz klienta",
        submit: "Opublikuj opinię",
        hint: "Opinia będzie podpisana imieniem i inicjałem nazwiska.",
        commentHelp: "Opisz krótko przebieg współpracy, komunikację i efekt usługi.",
        locked: "Zaloguj się, aby odblokować formularz opinii.",
        ready: "Zalogowano jako {name}. Możesz dodać opinię.",
      },
      services: {
        placeholder: "Wybierz usługę",
        securityAudit: "Audyt bezpieczeństwa",
        penetrationTest: "Testy penetracyjne",
        itSupport: "Wsparcie IT",
        laptopSecurity: "Zabezpieczenie laptopa i Wi-Fi",
        cyberHygiene: "Cyber hygiene dla małych firm",
      },
      ratings: {
        placeholder: "Wybierz ocenę",
        five: "5/5 - znakomicie",
        four: "4/5 - bardzo dobrze",
        three: "3/5 - dobrze",
        two: "2/5 - poniżej oczekiwań",
        one: "1/5 - wymaga poprawy",
      },
      session: {
        label: "Status konta",
        loggedOutTitle: "Niezalogowany klient",
        loggedOutDesc: "Zarejestruj się albo zaloguj, aby napisać komentarz.",
        loggedIn: "Zalogowano klienta: {name}",
        email: "Email: {email}",
      },
      logout: "Wyloguj",
      messages: {
        fillAll: "Uzupełnij wszystkie wymagane pola.",
        invalidEmail: "Podaj poprawny adres email.",
        invalidPhone: "Podaj poprawny numer telefonu.",
        shortPassword: "Hasło musi mieć co najmniej 8 znaków.",
        userExists: "Konto z tym adresem email już istnieje.",
        registerSuccess: "Konto zostało utworzone. Zalogowano klienta {name}.",
        registerSaveError: "Nie udało się utworzyć konta po stronie serwera.",
        loginSuccess: "Logowanie zakończone powodzeniem.",
        loginError: "Nieprawidłowy email lub hasło.",
        logoutSuccess: "Sesja klienta została zakończona.",
        loginRequired: "Zaloguj się, aby dodać opinię.",
        shortComment: "Komentarz powinien mieć co najmniej 30 znaków.",
        reviewSuccess: "Opinia została dodana do sekcji komentarzy.",
        reviewUpdated: "Zaktualizowano Twoją wcześniejszą opinię dla tej usługi.",
        reviewSaveError: "Nie udało się zapisać opinii po stronie serwera.",
        serverUnavailable: "Serwer chwilowo nie odpowiada. Spróbuj ponownie za moment.",
        sessionExpired: "Sesja wygasła. Zaloguj się ponownie.",
      },
    },
    faq: {
      title: "FAQ: cyberbezpieczeństwo dla małych firm i freelancerów",
      intro:
        "Ta sekcja odpowiada na pytania, które klienci najczęściej wpisują w Google, gdy szukają praktycznego wsparcia w obszarze cyberbezpieczeństwa.",
      q1: {
        title: "Czym jest audyt bezpieczeństwa dla małej firmy?",
        desc: "Audyt bezpieczeństwa pomaga sprawdzić laptopy, konta, kopie zapasowe, dostęp do poczty, konfigurację Wi-Fi i podstawowe ryzyka w firmie, zanim pojawi się incydent.",
      },
      q2: {
        title: "Kiedy warto zamówić testy penetracyjne?",
        desc: "Testy penetracyjne warto wykonać przed wdrożeniem nowej aplikacji, po większych zmianach w sieci lub wtedy, gdy firma chce realnie sprawdzić odporność systemów i usług.",
      },
      q3: {
        title: "Czy Fifth Ace pomaga zabezpieczyć Windows, router i domowe Wi-Fi?",
        desc: "Tak. Fifth Ace oferuje hardening Windows 10 i 11, przegląd konfiguracji routera, ustawienia Microsoft Defender, podstawowy firewall review oraz pomoc w budowaniu bezpiecznych kopii zapasowych.",
      },
      q4: {
        title: "Jakie usługi cyberbezpieczeństwa są dostępne od ręki?",
        desc: "Najszybciej można rozpocząć security check dla laptopa firmowego, przegląd bezpieczeństwa sieci domowej, cyber hygiene setup dla małego zespołu oraz podstawowy audyt zabezpieczeń.",
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
      title: "Fifth Ace | Cybersecurity, Pentesting and Security Audits",
      description:
        "Fifth Ace - cybersecurity, security audits, penetration testing and IT support for small businesses and freelancers.",
    },
    ui: {
      langLabel: "Language switch",
    },
    nav: {
      services: "Services",
      guides: "Service pages",
      experience: "Experience",
      process: "Process",
      reviews: "Reviews",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Cybersecurity • Penetration Testing • IT Support",
      title: "We protect your business before a threat becomes an incident",
      lead1:
        "Fifth Ace supports organizations in identifying security gaps, conducting penetration tests, and maintaining a secure, stable IT environment.",
      lead2:
        "The Fifth Ace team combines practical IT support with continuous growth in systems and network security expertise.",
      lead3:
        "We help with security audits, penetration testing, laptop hardening, Wi-Fi protection, MFA, backup strategy and cyber hygiene for small organizations.",
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
        cta: "Open service page",
      },
      card2: {
        title: "Penetration testing",
        desc: "Realistic attack simulations for applications, networks, and cloud environments, followed by a report and remediation plan.",
        li1: "Web, API, and mobile pentests",
        li2: "Internal and external infrastructure testing",
        li3: "Re-tests after remediation",
        cta: "Open service page",
      },
      card3: {
        title: "IT support",
        desc: "Fast technical assistance for teams, environment administration, and continuous infrastructure care.",
        li1: "Ticket handling and SLA support for companies",
        li2: "Server and workstation administration",
        li3: "Backups, recovery, and business continuity",
        cta: "Open service page",
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
    seoHub: {
      title: "Service pages and security guides",
      intro:
        "We created dedicated service pages so Fifth Ace can be found more easily for search terms such as security audit, pentesting, IT support, or laptop security hardening.",
      card1: {
        kicker: "Cybersecurity",
        title: "Cybersecurity for small businesses",
        desc: "A page focused on account security, email protection, laptops, backups, and baseline security processes.",
        cta: "Open page",
      },
      card2: {
        kicker: "Security audit",
        title: "Security audit and risk assessment",
        desc: "Audit scope, common weaknesses, and an action plan for a small business or freelancer.",
        cta: "Open page",
      },
      card3: {
        kicker: "Pentesting",
        title: "Penetration testing for applications and networks",
        desc: "Details about web app, API, internal network testing, and re-tests after remediation.",
        cta: "Open page",
      },
      card4: {
        kicker: "IT support",
        title: "IT support for companies and teams",
        desc: "Administration, helpdesk, workstation maintenance, backups, and business continuity support.",
        cta: "Open page",
      },
      card5: {
        kicker: "Laptop and Wi-Fi",
        title: "Laptop and Wi-Fi security hardening",
        desc: "Windows hardening, router review, MFA, Defender, and a fast security check for home or small business environments.",
        cta: "Open page",
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
    reviews: {
      eyebrow: "Verified client feedback",
      title: "Comments and reviews after delivered services",
      intro:
        "Fifth Ace clients can create an account, sign in, and leave feedback after the collaboration is complete. Registration collects the basic details needed for review verification.",
      highlight1: {
        title: "Login required",
        desc: "The review form unlocks only after the client signs in.",
      },
      highlight2: {
        title: "Basic details",
        desc: "Registration collects first name, last name, phone number, and email address.",
      },
      highlight3: {
        title: "Section ready for entries",
        desc: "Each new review appears below together with the rating and service scope.",
      },
      listTitle: "Published comments",
      listDesc: "Once a review is added, it will appear below with its rating and service scope.",
      empty: {
        title: "There are no published reviews yet",
        desc: "This section is ready for the first comments from clients who have completed their work with Fifth Ace.",
      },
      loading: {
        title: "Loading reviews",
        desc: "Published comments are being loaded from the database.",
      },
      loadError: {
        title: "Reviews could not be loaded",
        desc: "Check the server connection and try again in a moment.",
      },
      portal: {
        title: "Client area",
        desc: "Create a client account, sign in, and describe your experience working with Fifth Ace.",
        privacy:
          "The form details are stored in the database and used to identify the client and verify the review.",
      },
      tabs: {
        register: "Register",
        login: "Sign in",
        review: "Add review",
      },
      register: {
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone number",
        email: "Email address",
        password: "Password",
        submit: "Create account",
        hint: "Minimum 8 characters. This account is used to sign in before posting a comment.",
      },
      login: {
        email: "Email address",
        password: "Password",
        submit: "Sign in",
        hint: "Sign in with the email address and password used during registration.",
      },
      review: {
        service: "Service scope",
        rating: "Collaboration rating",
        comment: "Client comment",
        submit: "Publish review",
        hint: "The review will be signed with the first name and last-name initial.",
        commentHelp: "Briefly describe the collaboration, communication, and service outcome.",
        locked: "Sign in to unlock the review form.",
        ready: "Signed in as {name}. You can add your review now.",
      },
      services: {
        placeholder: "Select a service",
        securityAudit: "Security audit",
        penetrationTest: "Penetration testing",
        itSupport: "IT support",
        laptopSecurity: "Laptop and Wi-Fi security",
        cyberHygiene: "Cyber hygiene for small businesses",
      },
      ratings: {
        placeholder: "Select a rating",
        five: "5/5 - excellent",
        four: "4/5 - very good",
        three: "3/5 - good",
        two: "2/5 - below expectations",
        one: "1/5 - needs improvement",
      },
      session: {
        label: "Account status",
        loggedOutTitle: "Client not signed in",
        loggedOutDesc: "Register or sign in to write a comment.",
        loggedIn: "Signed in client: {name}",
        email: "Email: {email}",
      },
      logout: "Log out",
      messages: {
        fillAll: "Complete all required fields.",
        invalidEmail: "Enter a valid email address.",
        invalidPhone: "Enter a valid phone number.",
        shortPassword: "Password must be at least 8 characters long.",
        userExists: "An account with this email address already exists.",
        registerSuccess: "Account created successfully. Client {name} is now signed in.",
        registerSaveError: "The account could not be created on the server.",
        loginSuccess: "Sign-in completed successfully.",
        loginError: "Incorrect email or password.",
        logoutSuccess: "The client session has been closed.",
        loginRequired: "Sign in to add a review.",
        shortComment: "The comment should be at least 30 characters long.",
        reviewSuccess: "The review has been added to the comments section.",
        reviewUpdated: "Your earlier review for this service has been updated.",
        reviewSaveError: "The review could not be saved on the server.",
        serverUnavailable: "The server is temporarily unavailable. Please try again in a moment.",
        sessionExpired: "Your session has expired. Please sign in again.",
      },
    },
    faq: {
      title: "FAQ: cybersecurity for small businesses and freelancers",
      intro:
        "This section answers questions that people often type into Google when they look for practical cybersecurity support.",
      q1: {
        title: "What is a security audit for a small business?",
        desc: "A security audit helps review laptops, accounts, backups, email access, Wi-Fi configuration, and baseline risks before an incident happens.",
      },
      q2: {
        title: "When should you order penetration testing?",
        desc: "Penetration testing is worth scheduling before a new application launch, after major network changes, or whenever a company wants to verify the resilience of systems and services.",
      },
      q3: {
        title: "Can Fifth Ace help secure Windows, a router, and home Wi-Fi?",
        desc: "Yes. Fifth Ace offers Windows 10 and 11 hardening, router configuration review, Microsoft Defender settings, baseline firewall review, and support for building secure backups.",
      },
      q4: {
        title: "Which cybersecurity services are available right away?",
        desc: "The fastest services to start are a laptop security check, a home network security review, a cyber hygiene setup for a small team, and a baseline security audit.",
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

const STORAGE_KEYS = {
  language: "fifthace_lang",
};

const appState = {
  currentUser: null,
  reviews: [],
  reviewsLoading: true,
  reviewsLoadFailed: false,
};

function t(key, replacements = {}) {
  const template = getTranslation(activeLanguage, key) ?? getTranslation("pl", key) ?? "";
  return template.replace(/\{(\w+)\}/g, (_, token) => replacements[token] ?? "");
}

function getStoredString(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setStoredString(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const normalizedPhone = phone.replace(/[\s()-]/g, "");
  return /^\+?\d{7,15}$/.test(normalizedPhone);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return escapeMap[character] ?? character;
  });
}

function formatReviewDate(dateString) {
  if (!dateString) {
    return "";
  }

  const reviewDate = new Date(dateString);

  if (Number.isNaN(reviewDate.getTime())) {
    return "";
  }

  const locale = activeLanguage === "en" ? "en-GB" : "pl-PL";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(reviewDate);
}

function getServiceLabel(serviceKey) {
  return t(`reviews.services.${serviceKey}`) || serviceKey;
}

function createStars(rating) {
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  return `${"★".repeat(normalizedRating)}${"☆".repeat(5 - normalizedRating)}`;
}

function getDisplayName(user) {
  if (!user) {
    return "";
  }

  if (user.displayName) {
    return user.displayName;
  }

  const lastInitial = user.lastName ? `${user.lastName.charAt(0).toUpperCase()}.` : "";
  return [user.firstName, lastInitial].filter(Boolean).join(" ");
}

function getRawErrorMessage(error, fallbackKey = "reviews.messages.serverUnavailable") {
  if (error?.payload?.error) {
    return error.payload.error;
  }

  return t(fallbackKey);
}

function renderPortalMessage() {
  if (!portalFeedbackNode) {
    return;
  }

  if (!activePortalMessage) {
    portalFeedbackNode.hidden = true;
    portalFeedbackNode.textContent = "";
    portalFeedbackNode.className = "portal-feedback";
    return;
  }

  const { type, value, raw, replacements } = activePortalMessage;
  const message = raw ? value : t(value, replacements);

  if (!message) {
    portalFeedbackNode.hidden = true;
    portalFeedbackNode.textContent = "";
    portalFeedbackNode.className = "portal-feedback";
    return;
  }

  portalFeedbackNode.hidden = false;
  portalFeedbackNode.textContent = message;
  portalFeedbackNode.className = `portal-feedback is-${type}`;
}

function clearPortalMessage() {
  activePortalMessage = null;
  renderPortalMessage();
}

function setPortalMessage(type, value, options = {}) {
  if (!value) {
    clearPortalMessage();
    return;
  }

  activePortalMessage = {
    type,
    value,
    raw: options.raw ?? false,
    replacements: options.replacements ?? {},
  };
  renderPortalMessage();
}

function sortReviews(reviews) {
  return [...reviews].sort((left, right) => {
    const leftDate = new Date(left.updatedAt ?? left.createdAt ?? 0).getTime();
    const rightDate = new Date(right.updatedAt ?? right.createdAt ?? 0).getTime();
    return rightDate - leftDate;
  });
}

function upsertReview(review) {
  const nextReviews = [...appState.reviews];
  const existingIndex = nextReviews.findIndex((entry) => entry.id === review.id);

  if (existingIndex >= 0) {
    nextReviews[existingIndex] = review;
  } else {
    nextReviews.push(review);
  }

  appState.reviews = sortReviews(nextReviews);
}

function renderReviewsState(titleKey, descKey) {
  if (!reviewsListNode) {
    return;
  }

  reviewsListNode.innerHTML = `
    <div class="reviews-empty">
      <strong>${escapeHtml(t(titleKey))}</strong>
      <p>${escapeHtml(t(descKey))}</p>
    </div>
  `;
}

function renderReviews() {
  if (!reviewsListNode) {
    return;
  }

  if (appState.reviewsLoading) {
    renderReviewsState("reviews.loading.title", "reviews.loading.desc");
    return;
  }

  if (appState.reviewsLoadFailed) {
    renderReviewsState("reviews.loadError.title", "reviews.loadError.desc");
    return;
  }

  if (!appState.reviews.length) {
    renderReviewsState("reviews.empty.title", "reviews.empty.desc");
    return;
  }

  reviewsListNode.innerHTML = appState.reviews
    .map((review) => {
      const authorName = escapeHtml(review.authorName ?? "Fifth Ace");
      const authorInitials = escapeHtml(review.authorInitials ?? "FA");
      const serviceLabel = escapeHtml(getServiceLabel(review.service));
      const reviewDate = escapeHtml(formatReviewDate(review.updatedAt ?? review.createdAt));
      const message = escapeHtml(review.comment ?? "");
      const stars = createStars(review.rating);

      return `
        <article class="review-card">
          <div class="review-card-head">
            <div class="review-card-author">
              <div class="review-avatar" aria-hidden="true">${authorInitials}</div>
              <div class="review-author-meta">
                <strong>${authorName}</strong>
                <span>${reviewDate}</span>
              </div>
            </div>
            <div class="review-badge">${serviceLabel}</div>
          </div>
          <p class="review-stars">${stars}</p>
          <p class="review-message">${message}</p>
        </article>
      `;
    })
    .join("");
}

function renderPortalState() {
  const currentUser = appState.currentUser;

  if (portalSessionNode) {
    if (currentUser) {
      portalSessionNode.innerHTML = `
        <div class="session-card">
          <div>
            <p class="session-kicker">${escapeHtml(t("reviews.session.label"))}</p>
            <strong>${escapeHtml(
              t("reviews.session.loggedIn", { name: getDisplayName(currentUser) })
            )}</strong>
            <span>${escapeHtml(
              t("reviews.session.email", { email: normalizeEmail(currentUser.email ?? "") })
            )}</span>
          </div>
          <button class="btn btn-secondary" type="button" data-logout-client>
            ${escapeHtml(t("reviews.logout"))}
          </button>
        </div>
      `;
    } else {
      portalSessionNode.innerHTML = `
        <div class="session-card is-logged-out">
          <div>
            <p class="session-kicker">${escapeHtml(t("reviews.session.label"))}</p>
            <strong>${escapeHtml(t("reviews.session.loggedOutTitle"))}</strong>
            <span>${escapeHtml(t("reviews.session.loggedOutDesc"))}</span>
          </div>
        </div>
      `;
    }
  }

  if (reviewFieldset) {
    reviewFieldset.disabled = !currentUser;
  }

  if (reviewLockNote) {
    reviewLockNote.textContent = currentUser
      ? t("reviews.review.ready", { name: currentUser.firstName })
      : t("reviews.review.locked");
  }
}

function setActivePortalTab(tabName) {
  const nextTab = ["register", "login", "review"].includes(tabName) ? tabName : "register";
  activePortalTab = nextTab;

  portalTabs.forEach((button) => {
    const isActive = button.dataset.portalTab === nextTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (registerForm) {
    registerForm.hidden = nextTab !== "register";
  }

  if (loginForm) {
    loginForm.hidden = nextTab !== "login";
  }

  if (reviewForm) {
    reviewForm.hidden = nextTab !== "review";
  }
}

async function fetchJson(url, options = {}) {
  const headers = new Headers(options.headers || {});

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const hasBody = options.body !== undefined && options.body !== null;

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload ?? {};
}

async function loadSession() {
  const payload = await fetchJson("/api/session");
  appState.currentUser = payload.user ?? null;
  renderPortalState();
}

async function loadReviews() {
  appState.reviewsLoading = true;
  appState.reviewsLoadFailed = false;
  renderReviews();

  try {
    const payload = await fetchJson("/api/reviews");
    appState.reviews = sortReviews(Array.isArray(payload.reviews) ? payload.reviews : []);
    appState.reviewsLoadFailed = false;
  } catch (error) {
    appState.reviews = [];
    appState.reviewsLoadFailed = true;
  } finally {
    appState.reviewsLoading = false;
    renderReviews();
  }
}

async function loadInitialState() {
  await Promise.allSettled([loadSession(), loadReviews()]);
  setActivePortalTab(appState.currentUser ? "review" : "register");
}

function applyLanguage(language) {
  const selectedLanguage = i18n[language] ? language : "pl";
  activeLanguage = selectedLanguage;

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

  setStoredString(STORAGE_KEYS.language, selectedLanguage);
  renderReviews();
  renderPortalState();
  renderPortalMessage();
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

const savedLanguage = getStoredString(STORAGE_KEYS.language);
applyLanguage(savedLanguage || "pl");
renderReviews();
renderPortalState();
setActivePortalTab("register");

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.langSwitch);
  });
});

portalTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.portalTab;
    setActivePortalTab(selectedTab);

    if (selectedTab === "review" && !appState.currentUser) {
      setPortalMessage("info", "reviews.messages.loginRequired");
    }
  });
});

if (portalSessionNode) {
  portalSessionNode.addEventListener("click", async (event) => {
    const logoutButton = event.target.closest("[data-logout-client]");

    if (!logoutButton) {
      return;
    }

    try {
      await fetchJson("/api/logout", { method: "POST" });
    } catch (error) {
      setPortalMessage("error", getRawErrorMessage(error), { raw: true });
      return;
    }

    appState.currentUser = null;
    renderPortalState();
    setActivePortalTab("login");
    setPortalMessage("info", "reviews.messages.logoutSuccess");
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = normalizeEmail(String(formData.get("email") ?? ""));
    const password = String(formData.get("password") ?? "");

    if (!firstName || !lastName || !phone || !email || !password) {
      setPortalMessage("error", "reviews.messages.fillAll");
      return;
    }

    if (!isValidEmail(email)) {
      setPortalMessage("error", "reviews.messages.invalidEmail");
      return;
    }

    if (!isValidPhone(phone)) {
      setPortalMessage("error", "reviews.messages.invalidPhone");
      return;
    }

    if (password.length < 8) {
      setPortalMessage("error", "reviews.messages.shortPassword");
      return;
    }

    try {
      const payload = await fetchJson("/api/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          password,
        }),
      });

      appState.currentUser = payload.user ?? null;
      registerForm.reset();
      renderPortalState();
      setActivePortalTab("review");
      setPortalMessage("success", "reviews.messages.registerSuccess", {
        replacements: { name: appState.currentUser?.firstName ?? firstName },
      });
    } catch (error) {
      if (error.status === 409) {
        setPortalMessage("error", "reviews.messages.userExists");
        return;
      }

      setPortalMessage("error", getRawErrorMessage(error), { raw: true });
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = normalizeEmail(String(formData.get("email") ?? ""));
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setPortalMessage("error", "reviews.messages.fillAll");
      return;
    }

    try {
      const payload = await fetchJson("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      appState.currentUser = payload.user ?? null;
      loginForm.reset();
      renderPortalState();
      setActivePortalTab("review");
      setPortalMessage("success", "reviews.messages.loginSuccess");
    } catch (error) {
      if (error.status === 401) {
        setPortalMessage("error", "reviews.messages.loginError");
        return;
      }

      setPortalMessage("error", getRawErrorMessage(error), { raw: true });
    }
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!appState.currentUser) {
      setActivePortalTab("login");
      setPortalMessage("info", "reviews.messages.loginRequired");
      return;
    }

    const formData = new FormData(reviewForm);
    const service = String(formData.get("service") ?? "").trim();
    const rating = Number(formData.get("rating") ?? 0);
    const comment = String(formData.get("comment") ?? "").trim();

    if (!service || !rating || !comment) {
      setPortalMessage("error", "reviews.messages.fillAll");
      return;
    }

    if (comment.length < 30) {
      setPortalMessage("error", "reviews.messages.shortComment");
      return;
    }

    try {
      const payload = await fetchJson("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ service, rating, comment }),
      });

      if (payload.review) {
        upsertReview(payload.review);
        renderReviews();
      }

      reviewForm.reset();
      renderPortalState();
      setPortalMessage(
        "success",
        payload.created ? "reviews.messages.reviewSuccess" : "reviews.messages.reviewUpdated"
      );
    } catch (error) {
      if (error.status === 401) {
        appState.currentUser = null;
        renderPortalState();
        setActivePortalTab("login");
        setPortalMessage("error", "reviews.messages.sessionExpired");
        return;
      }

      setPortalMessage("error", getRawErrorMessage(error), { raw: true });
    }
  });
}

loadInitialState();

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const showAllItems = () => {
    revealItems.forEach((item) => item.classList.add("visible"));
  };

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    showAllItems();
  } else {
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
  }
}
