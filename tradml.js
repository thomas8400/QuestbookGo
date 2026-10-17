// 🖼️ CONFIGURATION affichage logo
const LOGO_CONFIG = {
  mainPage: true    // 👈 Changez 'false' pour masquer le logo 
};

// 🌐 CONFIGURATION SÉLECTEUR DE LANGUE
const LANGUAGE_CONFIG = {
  loginPage: true,  // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page de connexion
  mainPage: true    // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page principale
};


document.addEventListener("DOMContentLoaded", () => {
    // Déclarez la constante languageChangeSound ici pour qu'elle soit accessible
    const languageChangeSound = new Audio('sounds/sound5.mp3'); // son sélecteur langage

    const legalTranslations = {
      fr: {
        currentLang: "Français &#9662;",
        pageTitle: "Mentions légales - QuestbookGo",
        title: "Mentions légales",
        section1: "Conformément aux articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (L.C.E.N.), les présentes mentions légales sont portées à la connaissance des utilisateurs du site.",
        section2: "En se connectant et en naviguant sur le site, l'utilisateur accepte pleinement et sans réserve les présentes mentions légales, disponibles dans la section « Mentions légales » du site.",
        editorTitle: "Éditeur",
        section3: "Le présent site, accessible à l'URL questbookgo.com, est édité par Erwan VANCE",
        email: "Email : contact@questbookgo.com",
        hostingerTitle: "Hébergement",
        section4: "Le site est hébergé par QuestbookGo",
        PITitle: "Propriété Intellectuelle",
        PITitleContent: "L'ensemble des contenus présents sur notre site est protégé par les lois en vigueur en France.",
        LimitRespTitle: "Limitation de Responsabilité",
        LimitRespContent: "Le Site est disponible 24h/24 et 7j/7, sauf en cas de force majeure.",
        CondTitle: "Conditions d'Utilisation",
        CondContent: "L'accès à notre site est destiné à un usage personnel uniquement.",
        DataTitle: "Données Personnelles",
        DataContent: "Notre site ne traite aucune information personnelle.",
        CookiesTitle: "Cookies",
        CookiesContent: "Notre site n'utilise aucun cookie, ni aucun autre traceur.",
        LawTitle: "Loi applicable et attribution de juridiction",
        LawContent: "Tout litige est soumis au droit français.",
        ContactTitle: "Contact",
        ContactContent: "Pour toute question ou demande d'informations concernant les mentions légales du site, vous pouvez nous contacter par e-mail à : contact@questbookgo.com",
        updateDate: "(Mise à jour le 16/10/2026)",
      },
      en: {
        currentLang: "English &#9662;",
        pageTitle: "Legal Notice - QuestbookGo",
        title: "Legal Notice",
        section1: "", 
        section2: "By connecting to and Browse the site, the user fully and unreservedly accepts these legal notices.",
        editorTitle: "Editor",
        section3: "This site, accessible at questbookgo.com, is published by:",
        email: "E-mail : contact@questbookgo.com",
        hostingerTitle: "Hosting",
        section4: "The site is hosted by questbookgo",
        PITitle: "Intellectual Property",
        PITitleContent: "All content on our site is protected by applicable French laws.",
        LimitRespTitle: "Limitation of Liability",
        LimitRespContent: "The Site is available 24/7, except in cases of force majeure.",
        CondTitle: "Terms of Use",
        CondContent: "Access to our site is for personal use only.",
        DataTitle: "Personal Data",
        DataContent: "Our site does not process any personal information.",
        CookiesTitle: "Cookies",
        CookiesContent: "Our site does not use any cookies or other tracking technologies.",
        LawTitle: "Applicable Law and Jurisdiction",
        LawContent: "Any dispute is subject to English law.",
        ContactTitle: "Contact",
        ContactContent: "For any questions, you can contact us at : contact@questbookgo.com",
        updateDate: "(Updated on 16/10/2026)"
      },
      es: {
        currentLang: "Español &#9662;",
        pageTitle: "Aviso Legal - QuestbookGo",
        title: "Aviso Legal",
        section1: "",
        section2: "Al conectarse y navegar por el sitio, el usuario acepta plenamente y sin reservas estas menciones legales.",
        editorTitle: "Editor",
        section3: "Este sitio, accesible en questbookgo.com, está editado por:",
        email: "Correo electrónico : contact@questbookgo.com",
        hostingerTitle: "Alojamiento",
        section4: "El sitio está alojado por questbookgo:",
        hostPhone: "Número de teléfono : (Datos de contacto de la empresa de alojamiento).",
        PITitle: "Propiedad Intelectual",
        PITitleContent: "Todo el contenido presente en nuestro sitio está protegido por las leyes vigentes en España.",
        LimitRespTitle: "Limitación de Responsabilidad",
        LimitRespContent: "El sitio está disponible 24/7, salvo en casos de fuerza mayor.",
        CondTitle: "Condiciones de Uso",
        CondContent: "El acceso a nuestro sitio está destinado exclusivamente a un uso personal.",
        DataTitle: "Datos Personales",
        DataContent: "Nuestro sitio no trata ninguna información personal.",
        CookiesTitle: "Cookies",
        CookiesContent: "Nuestro sitio no utiliza cookies ni otros rastreadores.",
        LawTitle: "Legislación Aplicable y Jurisdicción",
        LawContent: "Cualquier disputa se somete a la ley española.",
        ContactTitle: "Contacto",
        ContactContent: "Para cualquier pregunta, puede contactarnos en : contact@questbookgo.com.",
        updateDate: "(Actualizado el 16/10/2026)"
      },
      it: {
        currentLang: "Italiano &#9662;",
        pageTitle: "Note Legali - QuestbookGo",
        title: "Note Legali",
        section1: "",
        section2: "Collegandosi e navigando nel sito, l'utente accetta pienamente e senza riserve le presenti note legali.",
        editorTitle: "Editore",
        section3: "Questo sito, accessibile all'URL questbookgo.com, è pubblicato da:",
        email: "Email : contact@questbookgo.com.",
        hostingerTitle: "Hosting",
        section4: "Il sito è ospitato da : questbookgo",
        PITitle: "Proprietà Intellettuale",
        PITitleContent: "Tutti i contenuti presenti sul nostro sito sono protetti dalle leggi vigenti in Italia.",
        LimitRespTitle: "Limitazione di Responsabilità",
        LimitRespContent: "Il sito è disponibile 24 ore su 24, 7 giorni su 7, tranne in caso di forza maggiore.",
        CondTitle: "Condizioni d'Uso",
        CondContent: "L'accesso al nostro sito è destinato esclusivamente a uso personale.",
        DataTitle: "Dati Personali",
        DataContent: "Il nostro sito non tratta alcuna informazione personale.",
        CookiesTitle: "Cookies",
        CookiesContent: "Il nostro sito non utilizza cookie o altri tracciatori.",
        LawTitle: "Legge Applicabile e Giurisdizione",
        LawContent: "Qualsiasi controversia è soggetta alla legge italiano.",
        ContactTitle: "Contacto",
        ContactContent: "Per qualsiasi domanda, potete contattarci a : contact@questbookgo.com",
        updateDate: "(Aggiornato il 16/10/2026)"
      }
    };

    // 🎯 Fonction pour déterminer le type de page actuel
   function getCurrentPageType() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();

        if (currentFile === 'login.html' || currentFile === 'connexion.html') {
            return 'loginPage';
        } else if (currentFile === 'mentions-legales.html') { // Assurez-vous que 'Mentions-légales.html' est le nom exact de votre fichier
            return 'legalPage';
        } else {
            return 'mainPage';
        }
    }

    // 🖼️ Fonction pour gérer l'affichage du logo
    function handleLogoDisplay() {
        const logo = document.querySelector('.logo');
        const pageType = getCurrentPageType();
        
        if (logo) {
            if (LOGO_CONFIG[pageType]) {
                logo.style.display = '';
                setupLogoClick(logo);
            } else {
                logo.style.display = 'none';
            }
        }
    }

    // 🌐 Fonction pour gérer l'affichage du sélecteur de langue
    function handleLanguageSelectorDisplay() {
        const languageSelector = document.querySelector('.dropdown');
        const pageType = getCurrentPageType();
        
        if (languageSelector) {
            if (LANGUAGE_CONFIG[pageType]) {
                languageSelector.style.display = '';
            } else {
                languageSelector.style.display = 'none';
            }
        }
    }

    // 🖱️ Fonction pour configurer le clic sur le logo
    function setupLogoClick(logo) {
        // Créer l'élément audio pour le son du logo
        const logoClickSound = new Audio('sounds/sound1.mp3');

        logo.addEventListener('click', () => {
            // Jouer le son
            logoClickSound.currentTime = 0;
            logoClickSound.play();

            // Attendre un court délai avant la redirection
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        });

        // Ajouter un style cursor pointer
        logo.style.cursor = 'pointer';
    }

    // 🌍 Utiliser la langue par défaut ou celle stockée
    let currentLanguage = localStorage.getItem("language") || LANGUAGE_CONFIG.defaultLanguage;

    function changeLanguage(lang) {
      currentLanguage = lang;
      localStorage.setItem("language", lang);
      updateLegalContent();
      updateDropdownButton();
    }

    function updateLegalContent() {
      const legalTextElements = document.querySelectorAll('[data-translate]');

      legalTextElements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        if (legalTranslations[currentLanguage][key] !== undefined) {
          // Si la traduction est une chaîne vide, masquer l'élément
          if (legalTranslations[currentLanguage][key] === "") {
            element.style.display = "none";
          } else {
            element.style.display = ""; // Réafficher l'élément si nécessaire
            element.innerHTML = legalTranslations[currentLanguage][key];
          }
        }
      });

      // Update the page title
      if (legalTranslations[currentLanguage].pageTitle) {
        document.title = legalTranslations[currentLanguage].pageTitle;
      }
    }

    function updateDropdownButton() {
      const dropdownBtn = document.querySelector('.dropdown-btn');
      if (dropdownBtn) {
        dropdownBtn.innerHTML = legalTranslations[currentLanguage].currentLang;
      }
    }

    // 🔍 Fonction pour marquer la langue active dans le dropdown
    function setActiveLanguage() {
      document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-lang') === currentLanguage) {
          link.classList.add('active');
        }
      });
    }

    // Add events for language change buttons
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Jouer le son de changement de langue
        languageChangeSound.currentTime = 0;
        languageChangeSound.play();

        const selectedLang = e.target.getAttribute('data-lang');
        changeLanguage(selectedLang);

        // Update active class
        setActiveLanguage();
      });
    });

    // 🚀 Initialisation
    handleLogoDisplay();
    handleLanguageSelectorDisplay();
    updateLegalContent();
    updateDropdownButton();
    setActiveLanguage(); // 👈 Ajout pour marquer la langue par défaut comme active
});