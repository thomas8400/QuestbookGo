//==================== CONFIGURATION - MODIFIEZ ICI ====================
// 🔐 CONFIGURATION DE LA PAGE DE CONNEXION
const LOGIN_CONFIG = {
  enabled: false, // 👈 Changez à 'false' pour désactiver la page de connexion
  password: "1234" // 👈 Changez le mot de passe ici

};

// 🖼️ CONFIGURATION affichage logo
const LOGO_CONFIG = {
  loginPage: true,  // 👈 Changez à 'false' pour masquer le logo sur la page de connexion
  mainPage: true    // 👈 Changez à 'false' pour masquer le logo sur la page principale
};

// 🌐 CONFIGURATION SÉLECTEUR DE LANGUE
const LANGUAGE_CONFIG = {
  loginPage: true,  // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page de connexion
  mainPage: true,   // 👈 Changez à 'false' pour masquer le sélecteur de langue sur la page principale
};

    // Protection contre les tentatives de brute force
    let attemptCount = 0;
    const maxAttempts = 3;
    let lockoutTime = 0;

        // Gestion du changement de langue sur la page de connexion
      let loginCurrentLanguage = "fr";
    
  

    // Traductions pour la page de connexion
    const loginTranslations = {
      fr: {
        currentLang: "Français &#9662;",
        loginTitle: "Accès Sécurisé",
        passwordPlaceholder: "Mot de passe",
        loginBtn: "Se connecter",
        incorrectPassword: "Mot de passe incorrect",
        tooManyAttempts: "Trop de tentatives. Réessayez dans",
        connectionSuccess: "Connexion réussie !",
        legalMentions: "Mentions légales",
        seconds: "secondes"
      },
      en: {
        currentLang: "English &#9662;",
        loginTitle: "Secure Access",
        passwordPlaceholder: "Password",
        loginBtn: "Log in",
        incorrectPassword: "Incorrect password",
        tooManyAttempts: "Too many attempts. Try again in",
        connectionSuccess: "Login successful!",
        legalMentions: "Legal mentions",
        seconds: "seconds"
      },
      es: {
        currentLang: "Español &#9662;",
        loginTitle: "Acceso Seguro",
        passwordPlaceholder: "Contraseña",
        loginBtn: "Iniciar sesión",
        incorrectPassword: "Contraseña incorrecta",
        tooManyAttempts: "Demasiados intentos. Inténtelo de nuevo en",
        connectionSuccess: "¡Inicio de sesión exitoso!",
        legalMentions: "Menciones legales",
        seconds: "segundos"
      },
      it: {
        currentLang: "Italiano &#9662;",
        loginTitle: "Accesso Sicuro",
        passwordPlaceholder: "Password",
        loginBtn: "Accedi",
        incorrectPassword: "Password errata",
        tooManyAttempts: "Troppi tentativi. Riprova tra",
        connectionSuccess: "Accesso riuscito!",
        legalMentions: "Menzioni legali",
        seconds: "secondi"
      }
    };
//=======================================================================

//...................... Variables sécurité.......................................

// 🎯 FONCTION AMÉLIORÉE : Sauvegarde de la langue
function saveLanguagePreference(language) {
  // Sauvegarder dans les deux storages pour plus de robustesse
  localStorage.setItem("language", language);
  sessionStorage.setItem('selectedLanguage', language);
  
  console.log(`Langue sauvegardée: ${language}`);
}

// Protection contre l'inspection - Désactiver les outils de développement
(function() {
  'use strict';

  // Désactiver le clic droit
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Désactiver les raccourcis clavier pour les outils de développement
  document.addEventListener('keydown', function(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
    if (e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
      (e.ctrlKey && e.keyCode === 85) ||
      (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
  });

  // Détection des outils de développement ouverts
  let devtools = {
    open: false,
    orientation: null
  };
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200) {
      if (!devtools.open) {
        devtools.open = true;

        // Rediriger ou masquer le contenu
        document.body.innerHTML = '<div style="text-align:center;margin-top:50px;"><h1>Accès non autorisé détecté</h1></div>';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

})();

// Obfuscation du mot de passe - Multiple encodages

const _0x4f2a = [LOGIN_CONFIG.password]; // Utilise le mot de passe de la config
const getSecurePassword = () => {
 
  // Le mot de passe réel serait plus complexe à extraire
  const encoded = btoa(LOGIN_CONFIG.password); // Encode le mot de passe configuré
  return atob(encoded);
};

// Protection du code source

(function() {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.log = function() {};
  console.error = function() {};
  console.warn = function() {};
  console.clear = function() {};

  // Brouillage des variables importantes

  window.addEventListener('load', function() {
    delete window.getSecurePassword;
  });
})();

document.addEventListener("DOMContentLoaded", () => {

  // Variables d'authentification sécurisées
  const correctPassword = getSecurePassword();


  // Fonction de vérification d'authentification avec token crypté
  function isAuthenticated() {
    // Si la page de connexion est désactivée, toujours authentifié
    if (!LOGIN_CONFIG.enabled) {
      return true;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) return false;

    try {
      // Vérification simple du token (dans un vrai projet, utilisez JWT)
      const decoded = atob(token);
      return decoded === 'authenticated_' + new Date().toDateString();
    } catch {
      return false;
    }
  }

  function setAuthenticated(status) {
    if (status) {
      // Créer un token simple mais pas évident
      const token = btoa('authenticated_' + new Date().toDateString());
      sessionStorage.setItem('authToken', token);
    } else {
      sessionStorage.removeItem('authToken');
    }
    window.userAuthenticated = status;
  }

  // Protection contre la manipulation de variables
  Object.defineProperty(window, 'userAuthenticated', {
    set: function(value) {
      this._userAuth = value;
    },
    get: function() {
      return this._userAuth === true && isAuthenticated();
    }
  });

  function showLoginScreen() {
    const loginHTML = `
      <div class="login-screen">
        <div class="logo-container">
     ${LOGO_CONFIG.loginPage ? '<div class="logo-container"><img src="./images/LOGO.png" alt="Logo NOM" class="logo"></div>' : ''}
        </div>

       ${LANGUAGE_CONFIG.loginPage ? `<div id="translate-dropdown">
          <button class="dropdown-btn" data-translate="currentLang">Français &#9662;</button>
          <div class="dropdown-content">
            <a href="#" data-lang="fr">Français</a>
            <a href="#" data-lang="en">English</a>
            <a href="#" data-lang="es">Español</a>
            <a href="#" data-lang="it">Italiano</a>
          </div>
        </div>` : ''}

        <div class="login-container">
          <h1 class="login-title" data-translate="loginTitle">Accès Sécurisé</h1>
          <input type="password" id="passwordInput" class="login-input" data-translate="passwordPlaceholder" placeholder="Mot de passe" autocomplete="off" />
          <button id="loginBtn" class="login-btn" data-translate="loginBtn">Se connecter</button>
          <div id="loginMessage" class="error-message" style="display: none;"></div>
        </div>

        <div class="footer-container" style="margin-top: 30px; text-align: center;">
          <a href="Mentions-légales.html" id="legal-mentions-link" data-translate="legalMentions">Mentions légales</a>
          <div id="footer-text">(Name)© 2025</div>
        </div>
      </div>
    `;
    

    document.body.innerHTML = loginHTML;

    const passwordInput = document.getElementById("passwordInput");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");



    function updateLoginTexts() {
      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (loginTranslations[loginCurrentLanguage] && loginTranslations[loginCurrentLanguage][key]) {
          if (el.tagName === 'INPUT') {
            el.placeholder = loginTranslations[loginCurrentLanguage][key];
          } else {
            el.innerHTML = loginTranslations[loginCurrentLanguage][key];
          }
        }
      });
      // Mettre à jour le texte du bouton principal du dropdown
      const dropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn");
      if (dropdownBtn) {
        dropdownBtn.innerHTML = loginTranslations[loginCurrentLanguage].currentLang;
      }
    }

   function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang); // ← SAUVEGARDE dans localStorage
  updateTextWithTranslations();
  loadEnigme(currentEnigmeIndex);
  languageChangeSound.play();
}



// Gestionnaire d'événements pour le sélecteur de langue sur la page de connexion

document.querySelectorAll('#translate-dropdown .dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const newLang = e.target.getAttribute('data-lang');
    if (loginCurrentLanguage !== newLang) {
      loginCurrentLanguage = newLang;
      
      // NOUVEAU : Sauvegarder la langue dans sessionStorage ET localStorage
      sessionStorage.setItem('selectedLanguage', newLang);
      localStorage.setItem('language', newLang); // ✅ Ajout de cette ligne
      
      updateLoginTexts();
      try {
        const languageChangeSound = new Audio('sounds/sound5.mp3');
        languageChangeSound.currentTime = 0;
        languageChangeSound.play();
      } catch (e) {
      
      }
    }
  });
});

    // Écouteur pour le bouton dropdown pour afficher/masquer le contenu
    const dropdownBtnLogin = document.querySelector("#translate-dropdown .dropdown-btn");
    const dropdownContentLogin = document.querySelector("#translate-dropdown .dropdown-content");

    if (dropdownBtnLogin && dropdownContentLogin) {
      dropdownBtnLogin.addEventListener('click', () => {
        dropdownContentLogin.style.display = dropdownContentLogin.style.display === 'block' ? 'none' : 'block';
      });

      // Fermer le dropdown si on clique en dehors
      document.addEventListener('click', (event) => {
        if (!event.target.closest('#translate-dropdown')) {
          dropdownContentLogin.style.display = 'none';
        }
      });
    }


    // Initialiser les traductions une fois que la page de connexion est chargée
    updateLoginTexts();


    function validatePassword() {
      const currentTime = Date.now();

      // Vérifier le lockout
      if (lockoutTime > currentTime) {
        const remainingTime = Math.ceil((lockoutTime - currentTime) / 1000);
        loginMessage.textContent = `${loginTranslations[loginCurrentLanguage].tooManyAttempts} ${remainingTime} ${loginTranslations[loginCurrentLanguage].seconds}.`;
        loginMessage.className = "error-message";
        loginMessage.style.display = "block";
        return;
      }

      const enteredPassword = passwordInput.value;

      // Hachage simple du mot de passe entré (dans un vrai projet, utilisez bcrypt)
      const hashedInput = btoa(enteredPassword);
      const hashedCorrect = btoa(correctPassword);

      if (hashedInput === hashedCorrect) {
        attemptCount = 0;
        setAuthenticated(true);
        loginMessage.textContent = loginTranslations[loginCurrentLanguage].connectionSuccess;
        loginMessage.className = "success-message";
        loginMessage.style.display = "block";

        // Nettoyer les traces
        passwordInput.value = "";

        setTimeout(() => {
          initializeMainApp();
        }, 1000);
      } else {
        attemptCount++;

        if (attemptCount >= maxAttempts) {
          lockoutTime = Date.now() + (30 * 1000); // 30 secondes de blocage
          startCountdown(30, loginMessage, loginCurrentLanguage, loginTranslations);
        } else {
          loginMessage.textContent = `${loginTranslations[loginCurrentLanguage].incorrectPassword} (${attemptCount}/${maxAttempts})`;
        }

        loginMessage.className = "error-message";
        loginMessage.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
      }
    }

    // Fonction de compte à rebours pour le lockout
    function startCountdown(duration, messageEl, lang, translationsData) {
      let timer = duration;
      const countdownInterval = setInterval(() => {
        if (timer <= 0) {
          clearInterval(countdownInterval);
          messageEl.style.display = 'none';
          // Réactiver le bouton de connexion si nécessaire
          loginBtn.disabled = false;
          attemptCount = 0; // Réinitialiser le compteur d'essais après le lockout
        } else {
          loginBtn.disabled = true; // Désactiver le bouton pendant le lockout
          messageEl.textContent = `${translationsData[lang].tooManyAttempts} ${timer} ${translationsData[lang].seconds}.`;
          timer--;
        }
      }, 1000);
    }

    loginBtn.addEventListener("click", validatePassword);
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        validatePassword();
      }
    });

    passwordInput.focus();

    // Protection contre l'auto-complétion et l'inspection
    passwordInput.setAttribute('autocomplete', 'new-password');
    passwordInput.setAttribute('spellcheck', 'false');
  }

  function initializeMainApp() {
    // Nettoyer les variables sensibles de la mémoire
    if (typeof correctPassword !== 'undefined') {
      delete window.correctPassword;
    }
    //...................... Fin Variables sécurité.......................................




    // Recréer la structure HTML de l'application principale
    // Pour gérer l'activation du compte à rebours, changer style="display: display" en style="display: none" (ligne 436)
    // Pour gérer l'activation du score, changer changer style="display: display" en style="display: none (ligne 437)
    

    const mainAppHTML = `
      <div class="particles"></div>
       ${LOGO_CONFIG.mainPage ? '<img src="./images/LOGO.png" alt="Logo" class="logo">' : ''}

     ${LANGUAGE_CONFIG.mainPage ? `<div id="translate-dropdown">
        <button class="dropdown-btn" data-translate="currentLang">Français &#9662;</button>
        <div class="dropdown-content">
          <a href="#" data-lang="fr">Français</a>
          <a href="#" data-lang="en">English</a>
          <a href="#" data-lang="es">Español</a>
          <a href="#" data-lang="it">Italiano</a>
        </div>
    </div>` : ''}

  <div id="countdown-timer" data-translate="timeRemaining" style="display: none;">Temps restant : 60:00</div>
<div id="score-display" style="display: none;">Score: 0/10</div>

      <div class="container">
        <div class="arrow arrow-left" style="display: none;">‹</div>  
        <div class="arrow arrow-right">›</div>
        
        <h1 id="enigme-title"></h1>
        <p data-translate="verifyText">Vérifiez votre réponse !</p>

        <input type="text" id="response" data-translate="placeholderResponse" placeholder="Réponse">

        <div>
          <button id="validateBtn" data-translate="validateBtn">Valider</button>
          <button id="hintBtn" data-translate="hintBtn">Indice</button>
          <button id="solutionBtn" data-translate="solutionBtn" style="display: none;">Voir la réponse</button>
        </div>

        <div id="hintText" style="display: none;"></div>
        <div id="solutionText" style="display: none;"></div>
        <div id="message" style="display: none;"></div>
      </div>

      <div class="footer-container">
        <a href="mentions-legales.html" id="legal-mentions-link" data-translate="legalMentions">Mentions légales</a>
        <span id="footer-text">QuestbookGo© 2026</span>
      </div>
    `;

    document.body.innerHTML = mainAppHTML;

    initializeAppLogic();
  }


  //-------------------- FIN Variables page d'authentification------------------------

  function initializeAppLogic() {
   
    // Supprimer le stockage de langue et réinitialiser

    let countdownDuration = 60 * 60; //- Compte à rebours initial
    let answeredQuestions = new Set(); // Pour suivre les questions déjà répondues correctement

     // ... autres variables ...

// NOUVEAU : Fonction pour initialiser l'affichage de la langue
function initializeLanguageDisplay() {
  const dropdownBtnMain = document.querySelector("#translate-dropdown .dropdown-btn");
  if (dropdownBtnMain && translations[currentLanguage]) {
    dropdownBtnMain.innerHTML = translations[currentLanguage].currentLang;
  }
}

    const pages = [{
        title: {
          fr: "Jour 1 : Le Billet du saboteur",
          en: "Day 1: The Saboteur's Ticket",
          es: "Día 1: El billete del saboteador",
          it: "Giorno 1: Il biglietto del sabotatore"
        },
        correctAnswers: ["112", "1-1-2","1.1.2"], // réponse attendue 
        hint: { // indices 
          fr: "Calcule l'écart en minutes entre H1 et H2, puis entre H2 et H3, et enfin entre H3 et H4",
         en: "Calculate the gap in minutes between H1 and H2, then between H2 and H3, and finally between H3 and H4",
          es: "Calcula la diferencia en minutos entre H1 y H2, luego entre H2 y H3 y, por último, entre H3 y H4",
          it: "Calcola la differenza in minuti tra H1 e H2, poi tra H2 e H3 e infine tra H3 e H4"
        },
        solution: {
          fr: "12h15 à 14h30 = 135 min. 14h30 à 17h45 = 195 min. 17h45 à 22h00 = 255 min. Prends le chiffre des centaines de chaque durée (135, 195, 255). Code : 1 - 1 - 2.",
         en: "12:15 to 14:30 = 135 min. 14:30 to 17:45 = 195 min. 17:45 to 22:00 = 255 min. Take the hundreds digit of each duration (135, 195, 255). Code: 1 - 1 - 2.",
          es: "De 12:15 a 14:30 = 135 min. De 14:30 a 17:45 = 195 min. De 17:45 a 22:00 = 255 min. Toma la cifra de las centenas de cada duración (135, 195, 255). Código: 1 - 1 - 2.",
          it: "Da 12:15 a 14:30 = 135 min. Da 14:30 a 17:45 = 195 min. Da 17:45 a 22:00 = 255 min. Prendi la cifra delle centinaia di ogni durata (135, 195, 255). Codice: 1 - 1 - 2."
        },
        hasHint: true, // changer en false pour supprimer l'affichage du boutons indice 
        hasSolution: true // changer en false pour supprimer l'affichage du bouton solution 
      }, {
        title: {
          fr: "Jour 2 : Le Télégraphe",
                en: "Day 2: The Telegraph",
          es: "Día 2: El telégrafo",
          it: "Giorno 2: Il telegrafo"
        },
        correctAnswers: ["55", "5 5","5 et 5"],
        hint: {
          fr: "Observe la suite des chiffres associés aux 4 premières cases sur le ruban. Que remarque-tu ?",
          en: "Look at the sequence of numbers associated with the first 4 boxes on the ribbon. What do you notice?",
          es: "Observa la secuencia de números asociados a las 4 primeras casillas de la cinta. ¿Qué notas?",
          it: "Osserva la sequenza di numeri associati alle prime 4 caselle del nastro. Cosa noti?"
        },
        solution: {
          fr: "La suite numérique diminue de 1 à tous les 3 rangs (9, 9, 8, 7, 7, 6,...). Les 2 valeurs manquants sont donc 5 et 5. INDICE SECRET J24 : N",
            en: "The number sequence decreases by 1 every 3 positions (9, 9, 8, 7, 7, 6,...). The 2 missing values are therefore 5 and 5. SECRET CLUE D24 : H",
          es: "La secuencia numérica disminuye en 1 cada 3 posiciones (9, 9, 8, 7, 7, 6,...). Por lo tanto, los 2 valores que faltan son 5 y 5. PISTA SECRETA D24 : N",
          it: "La sequenza numerica diminuisce di 1 ogni 3 posizioni (9, 9, 8, 7, 7, 6,...). I 2 valori mancanti sono quindi 5 e 5. INDIZIO SEGRETO G24 : N"
        },
        hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 3 : Le code des fusibles d’urgence ",
          en: "Day 3: The Emergency Fuse Code",
          es: "Día 3: El código de los fusibles de emergencia",
          it: "Giorno 3: Il codice dei fusibili di emergenza"
        },
        correctAnswers: ["XKTPB","X K T P B"],
        hint: {
          fr: "« Monter crescendo » signifie classer les résultats du plus petit au plus grand.",
          en: "“Rising crescendo” means ranking the results from smallest to largest.",
          es: "«Subir en crescendo» significa ordenar los resultados de menor a mayor.",
          it: "«Salire in crescendo» significa ordinare i risultati dal più piccolo al più grande."
        },
        solution: {
          fr: "P = 330 Hz. X = 80 Hz.  B = 440 Hz.  K = 170 Hz. T = 240 Hz.Code secret à saisir après classement par ordre croissant : X K T P B ",
           en: "P = 330 Hz. X = 80 Hz. B = 440 Hz. K = 170 Hz. T = 240 Hz. Secret code to enter after sorting in ascending order: X K T P B",
          es: "P = 330 Hz. X = 80 Hz. B = 440 Hz. K = 170 Hz. T = 240 Hz. Código secreto que hay que introducir tras ordenar de menor a mayor: X K T P B",
          it: "P = 330 Hz. X = 80 Hz. B = 440 Hz. K = 170 Hz. T = 240 Hz. Codice segreto da inserire dopo aver ordinato in ordine crescente: X K T P B"
        },
      hasHint: true,
      hasSolution: true
      }, {
        title: {
          fr: "Jour 4 : La Voiture-Restaurant ",
          en: "Day 4 : the dining car",
          es: "Día 4 : El vagón restaurante",
          it: "Giorno 4 : Il vagone ristorante"
        },
        correctAnswers: ["HUIT"],
        hint: {
          fr: "Compte le nombre de lettres qui composent chaque mot.",
          en: "Count the number of letters in each word.",
          es: "Cuenta el número de letras que componen cada palabra.",
          it: "Conta il numero di lettere che compongono ogni parola."
        },
        solution: {
          fr: "FOURCHETTE = 10 lettres. COUTEAU = 7 lettres. CUILLÈRE = 8 lettres. Le résultat est 8. Comme la combinaison est un code alphabétique, le code est « HUIT »",
          en: "Lorem ipsum dolor sit amet",
          es: "TENEDOR = 7 letras. CUCHARA = 7 letras .CUCHILLO = 8 letras. El resultado es 8. Como la combinación es un código alfabético, el código es « OCHO »",
          it: "FOURCHETTE = 9 lettere. CUCCHIAIO = 9 lettere. COLTELO = 8 lettere. Il risultato è 8. Poiché la combinazione è un codice alfabetico, il codice è « OTTO »."
        },
         hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 5 : Le garde-manger",
           en: "Day 5: The Pantry",
          es: "Día 5: La despensa",
          it: "Giorno 5: La dispensa"
        },
        correctAnswers: ["1397"],
        hint: {
          fr: "Regarde attentivement chaque flacon. Il y a un lien entre l’année et le niveau de liquide.",
         en: "Look carefully at each flask. There is a link between the year and the liquid level.",
          es: "Observa con atención cada frasco. Hay una relación entre el año y el nivel del líquido.",
          it: "Osserva attentamente ogni flacone. C'è un legame tra l'anno e il livello del liquido."
        },
        solution: {
          fr: "Le niveau de liquide indique quel chiffre isoler dans son millésime. 1924 : 1 (1er chiffre sur les 4). 1938 : 3 (3ème chiffre sur les 4). 1915 : 9 (2ème chiffre sur les 4). 1947 : (4ème chiffre sur les 4). Les chiffres assemblés de gauches à droite donne la combinaison : 1397. INDICE SECRET J24 : A ",
          en: "The liquid level indicates which digit to isolate in its vintage year. 1924: 1 (1st digit out of 4). 1938: 3 (3rd digit out of 4). 1915: 9 (2nd digit out of 4). 1947: (4th digit out of 4). The digits assembled from left to right give the combination: 1397. SECRET CLUE D24 : N",
          es: "El nivel del líquido indica qué cifra hay que aislar en su año de cosecha. 1924: 1 (1.ª cifra de las 4). 1938: 3 (3.ª cifra de las 4). 1915: 9 (2.ª cifra de las 4). 1947: (4.ª cifra de las 4). Las cifras reunidas de izquierda a derecha dan la combinación: 1397. PISTA SECRETA D24: A",
          it: "Il livello del liquido indica quale cifra isolare nella sua annata. 1924: 1 (1ª cifra su 4). 1938: 3 (3ª cifra su 4). 1915: 9 (2ª cifra su 4). 1947: (4ª cifra su 4). Le cifre unite da sinistra a destra danno la combinazione: 1397. INDIZIO SEGRETO G24: B"
        },
        hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 6 : Le Code Crypté de la Boussole",
          en: "Day 6 : The Compass's Encrypted Code",
          es: "Día 6 : El código de la brújula encriptada",
          it: "Giorno 6 : Il codice cifrato della bussola"
        },
        correctAnswers:["KBPL","K B P L"],
        hint: {
          fr: "Les quatre coins du monde désignent les 4 grandes directions de la boussole dans le sens horaire : Le premier souffle correspond à la 1ère lettre de chaque mot",
          en: "Lorem ipsum dolor sit amet",
          es: "«Los cuatro rincones del mundo» se refiere a las cuatro direcciones principales de la brújula en el sentido de las agujas del reloj : el «primer soplo» corresponde a la primera letra de cada palabra.",
          it: "Per “i quattro angoli del mondo” si intendono le quattro principali direzioni della bussola in senso orario : il “primo soffio” corrisponde alla prima lettera di ciascuna parola."
        },
        solution: {
          fr: "Nord, Est, Sud, Ouest = (N E S O). On recule chacune des lettres de 3 rangs dans l’alphabet, ce qui nous donne le code secret à 4 lettres : K B P L",
          en: "Lorem ipsum dolor sit amet",
          es: "Norte, Este, Sur, Oeste = (N E S O). Desplazamos cada una de las letras tres posiciones hacia atrás en el alfabeto, lo que nos da el código secreto de cuatro letras: K B P L",
          it: "Nord, Est, Sud, Ovest = (N E S O). Spostiamo ciascuna delle lettere di tre posizioni all'indietro nell'alfabeto, ottenendo così il codice segreto di quattro lettere: I B P L"
        },
         hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 7 : La Pression de la Chaudière ",
          en: "Day 7: The Boiler Pressure",
          es: "Día 7: La presión de la caldera",
          it: "Giorno 7: La pressione della caldaia"
        },
        correctAnswers: ["17","17 BAR"],
        hint: {
          fr: "Examine attentivement les 3 chiffres situées sur le bord extérieur droit de chaque cadrant.",
         en: "Carefully examine the 3 numbers located on the outer right edge of each dial.",
          es: "Examina con atención los 3 números situados en el borde exterior derecho de cada esfera.",
          it: "Esamina attentamente i 3 numeri situati sul bordo esterno destro di ogni quadrante."
        },
        solution: {
          fr: "Additionne simplement les 3 chiffres du bord extérieur droit de chaque cadran.  Cadran 1 : 3 + 7 + 5 = 15. Cadran 2 : 4 + 2 + 9 = 15. Cadran 3 : 6 + 3 + 8 = 17. La valeur manquante est donc 17 BAR",
          en: "Simply add up the 3 numbers on the outer right edge of each dial. Dial 1: 3 + 7 + 5 = 15. Dial 2: 4 + 2 + 9 = 15. Dial 3: 6 + 3 + 8 = 17. The missing value is therefore 17 BAR",
          es: "Suma simplemente los 3 números del borde exterior derecho de cada esfera. Esfera 1: 3 + 7 + 5 = 15. Esfera 2: 4 + 2 + 9 = 15. Esfera 3: 6 + 3 + 8 = 17. Por lo tanto, el valor que falta es 17 BAR",
          it: "Somma semplicemente i 3 numeri del bordo esterno destro di ogni quadrante. Quadrante 1: 3 + 7 + 5 = 15. Quadrante 2: 4 + 2 + 9 = 15. Quadrante 3: 6 + 3 + 8 = 17. Il valore mancante è quindi 17 BAR"
        },
         hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 8 : Le wagon de tri postal ",
         en: "Day 8: The Postal Sorting Wagon",
          es: "Día 8: El vagón de clasificación postal",
          it: "Giorno 8: Il vagone di smistamento postale"
        },
        correctAnswers: ["4501","4 5 0 1"],
        hint: {
          fr: "Ne te contente pas de compter. A toi de cherchez les écarts, les soustractions et les absences entre les différentes lignes.",
          en: "Don't just count. Look for the gaps, the subtractions and the absences between the different rows.",
          es: "No te limites a contar. Busca las diferencias, las restas y las ausencias entre las distintas filas.",
          it: "Non limitarti a contare. Cerca le differenze, le sottrazioni e le assenze tra le diverse righe."
        },
        solution: {
          fr: "R1 : 2 espaces entre les trous X 2 = 4. R2 : 8 trous – 3 = 5. R3 : 0 trou. R4 : 4 trous – 3 = 1. INDICE SECRET J24 : B",
          en: "R1: 2 spaces between the holes X 2 = 4. R2: 8 holes – 3 = 5. R3: 0 holes. R4: 4 holes – 3 = 1. SECRET CLUE D24 :T",
          es: "R1: 2 espacios entre los agujeros X 2 = 4. R2: 8 agujeros – 3 = 5. R3: 0 agujeros. R4: 4 agujeros – 3 = 1. PISTA SECRETA D24 : B",
          it: "R1: 2 spazi tra i fori X 2 = 4. R2: 8 fori – 3 = 5. R3: 0 fori. R4: 4 fori – 3 = 1. INDIZIO SEGRETO G24 : C"
        },
      hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr:"Jour 9 : Le Rhéostat de Vitesse",
          en: "Day 9: The Speed Rheostat",
          es: "Día 9: El reóstato de velocidad",
          it: "Giorno 9: Il reostato di velocità"
        },
        correctAnswers: ["33"],
        hint: {
          fr: "Observe l'écart entre chaque résistance consécutive. Que remarques-tu sur les nombres ajoutés à chaque étape ?",
         en: "Look at the gap between each consecutive resistance. What do you notice about the numbers added at each step?",
          es: "Observa la diferencia entre cada resistencia consecutiva. ¿Qué notas en los números que se suman en cada etapa?",
          it: "Osserva la differenza tra ogni resistenza consecutiva. Cosa noti nei numeri aggiunti a ogni passaggio?"
        },
        solution: {
          fr: "L'écart double à chaque fois (2, 4, 8 , 16). Donc R5 = 17 + 16 = 33. Tu peux aussi trouver le même résultat en multipliant par 2 chaque valeur puis en soustrayant 1.(17 x 2) – 1 = 33",
          en: "The gap doubles each time (2, 4, 8, 16). So R5 = 17 + 16 = 33. You can also get the same result by multiplying each value by 2 and then subtracting 1. (17 x 2) – 1 = 33",
          es: "La diferencia se duplica cada vez (2, 4, 8, 16). Por lo tanto, R5 = 17 + 16 = 33. También puedes obtener el mismo resultado multiplicando cada valor por 2 y restando 1. (17 x 2) – 1 = 33",
          it: "La differenza raddoppia ogni volta (2, 4, 8, 16). Quindi R5 = 17 + 16 = 33. Puoi ottenere lo stesso risultato anche moltiplicando per 2 ogni valore e sottraendo 1. (17 x 2) – 1 = 33"
        },
        hasHint: true,
        hasSolution: true
      }, {
        title: {
          fr: "Jour 10 : Le Cryptogramme du Miroir",
          en: "Day 10: The Mirror Cryptogram",
          es: "Día 10: El criptograma del espejo",
          it: "Giorno 10: Il crittogramma dello specchio"
        },
        correctAnswers: ["DBBC","D B B C"],
        hint: {
          fr: "Chaque repère (Chiffre, Lettre) indique une position dans la grille du miroir. Attention au reflet !",
          en: "Each marker (Number, Letter) indicates a position in the mirror grid. Beware of the reflection!",
          es: "Cada referencia (Cifra, Letra) indica una posición en la cuadrícula del espejo. ¡Cuidado con el reflejo!",
          it: "Ogni riferimento (Cifra, Lettera) indica una posizione nella griglia dello specchio. Attenzione al riflesso!"
        },
        solution: {
          fr: "Il faut déjà commencer par lire les valeurs de gauche vers la droite. Pour chaque coordonnée, le chiffre indique la ligne (1 à 4) et la lettre indique la colonne (A, B ou C) dans la grille du miroir. En croisant les lignes et les colonnes dans l'ordre de la plaque. On obtient (2 , A) = D, (4, B) = B, (1, B) = B et (3, C) = C. Le code secret de la réserve est donc : DBBC.",
          en: "First, you need to read the values from left to right. For each coordinate, the number indicates the row (1 to 4) and the letter indicates the column (A, B or C) in the mirror grid. By crossing the rows and columns in the order of the plate, we get (2, A) = D, (4, B) = B, (1, B) = B and (3, C) = C. The secret code of the storeroom is therefore: DBBC.",
          es: "Primero hay que leer los valores de izquierda a derecha. Para cada coordenada, la cifra indica la fila (1 a 4) y la letra indica la columna (A, B o C) en la cuadrícula del espejo. Cruzando las filas y las columnas en el orden de la placa, obtenemos (2, A) = D, (4, B) = B, (1, B) = B y (3, C) = C. Por lo tanto, el código secreto de la reserva es: DBBC.",
          it: "Per prima cosa bisogna leggere i valori da sinistra a destra. Per ogni coordinata, la cifra indica la riga (da 1 a 4) e la lettera indica la colonna (A, B o C) nella griglia dello specchio. Incrociando righe e colonne nell'ordine della targa, otteniamo (2, A) = D, (4, B) = B, (1, B) = B e (3, C) = C. Il codice segreto della riserva è quindi: DBBC."
        },
        hasHint: true,
        hasSolution: true
       },
    {
     title: {
          fr: "Jour 11 : La clé de l’injecteur d’eau ",
          en: "Day 11: The Water Injector Key",
          es: "Día 11: La llave del inyector de agua",
          it: "Giorno 11: La chiave dell'iniettore d'acqua"
        },
        correctAnswers: ["3 4 6","346"],
        hint: {
          fr: "Dénombre les côtés des 3 formes",
         en: "Count the sides of the 3 shapes",
          es: "Cuenta los lados de las 3 formas",
          it: "Conta i lati delle 3 forme"
        },
        solution: {
          fr: "Triangle (3), Carré (4), Hexagone (6).Code secret à saisir : 3 4 6 (ou 346)",
          en: "Triangle (3), Square (4), Hexagon (6). Secret code to enter: 3 4 6 (or 346)",
          es: "Triángulo (3), Cuadrado (4), Hexágono (6). Código secreto que hay que introducir: 3 4 6 (o 346)",
          it: "Triangolo (3), Quadrato (4), Esagono (6). Codice segreto da inserire: 3 4 6 (o 346)"
        },
        hasHint: true,
        hasSolution: true
    },
   {
     title: {
          fr: "Jour 12 : La Vanne d'Évacuation",
          en: "Day 12: The Drain Valve",
          es: "Día 12: La válvula de evacuación",
          it: "Giorno 12: La valvola di scarico"
        },
        correctAnswers: ["225","225°"],
        hint: {
          fr: "Un demi-tour complet équivaut à une rotation de 180 degrés. ",
         en: "A full half-turn is equivalent to a 180-degree rotation.",
          es: "Una vuelta completa equivale a una rotación de 180 grados.",
          it: "Un giro completo equivale a una rotazione di 180 gradi."
        },
        solution: {
          fr: "45° + 180° = 225°. INDICE SECRET J24 : E",
          en: "45° + 180° = 225°. SECRET CLUE D24: G",
          es: "45° + 180° = 225°. PISTA SECRETA D24: E",
          it: "45° + 180° = 225°. INDIZIO SEGRETO G24: I"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 13 : Le bureau et le cryptographe  ",
          en: "Day 13: The Office and the Cryptographer",
          es: "Día 13: La oficina y el criptógrafo",
          it: "Giorno 13: L'ufficio e il crittografo"
        },
        correctAnswers: ["WRSA","W R S A"],
        hint: {
          fr: "Le résultat de l’opération inscrite te donne une clé de déchiffrement. ",
          en: "The result of the written operation gives you a decryption key.",
          es: "El resultado de la operación escrita te da una clave de descifrado.",
          it: "Il risultato dell'operazione indicata ti fornisce una chiave di decodifica."
        },
        solution: {
          fr: "16/ 4 = 4 . Application du décalage (+4) sur le mot SNOW. S+4 = W. N+4 = R. O+4 = S. W+4 = A (après le Z, l’alphabet repart à A). La combinaison est : WRSA",
          en: "16 / 4 = 4. Applying the shift (+4) to the word SNOW. S+4 = W. N+4 = R. O+4 = S. W+4 = A (after Z, the alphabet starts again at A). The combination is: WRSA",
          es: "16 / 4 = 4. Aplicación del desplazamiento (+4) a la palabra SNOW. S+4 = W. N+4 = R. O+4 = S. W+4 = A (después de la Z, el alfabeto vuelve a empezar en A). La combinación es: WRSA",
          it: "16/4 = 4. Applicazione dello spostamento (+4) alla parola NEVE. N+4 = R. E+4 = I. V+4 = C (dopo la Z, l’alfabeto ricomincia dalla A). E+4 = I. La combinazione è: RICI"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 14 :  Les pignons du télescope d'observation ",
          en: "Day 14: The Observation Telescope Gears",
          es: "Día 14: Los engranajes del telescopio de observación",
          it: "Giorno 14: Gli ingranaggi del telescopio di osservazione"
        },
        correctAnswers: ["B","position B"],
        hint: {
          fr: "L’énergie mécanique se transmet en inversant le sens de rotation à chaque contact.",
          en: "Mechanical energy is transmitted by reversing the direction of rotation at each contact.",
          es: "La energía mecánica se transmite invirtiendo el sentido de giro en cada contacto.",
          it: "L'energia meccanica si trasmette invertendo il senso di rotazione a ogni contatto."
        },
        solution: {
          fr: "Le mouvement initial tourne dans le sens horaire. En alternant le sens à chaque point de contact, le mouvement final tourne dans le sens anti-horaire, ce qui correspond à la position B ",
          en: "The initial movement turns clockwise. By alternating the direction at each contact point, the final movement turns counterclockwise, which corresponds to position B",
          es: "El movimiento inicial gira en sentido horario. Al alternar el sentido en cada punto de contacto, el movimiento final gira en sentido antihorario, lo que corresponde a la posición B",
          it: "Il movimento iniziale ruota in senso orario. Alternando il senso a ogni punto di contatto, il movimento finale ruota in senso antiorario, il che corrisponde alla posizione B"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 15 : La Balance mécanique  ",
          en: "Day 15: The Mechanical Scale",
          es: "Día 15: La balanza mecánica",
          it: "Giorno 15: La bilancia meccanica"
        },
        correctAnswers: ["7"],
        hint: {
          fr: "Trouve le poids d'une pelle grâce à la première balance (12/3), déduis-en celui de la briquette sur la seconde balance",
           en: "Find the weight of one shovel using the first scale (12/3), then deduce from it the weight of the briquette on the second scale",
          es: "Encuentra el peso de una pala gracias a la primera balanza (12/3) y deduce de ahí el del briquete en la segunda balanza",
          it: "Trova il peso di una pala grazie alla prima bilancia (12/3), poi deduci da esso quello del mattonetto sulla seconda bilancia"
        },
        solution: {
          fr: "Poids d'une pelle : 12/3 = 4Kg. Poids de la briquette : 2 pelles = 2 x 4 = 8kg. Sur la 2ème balance 8kg + briquette = 11 kg. Donc une briquette = 11 – 8 = 3 kg. Le code d’accès est égal à la somme d’une briquette et de la pelle, ce qui fait 3 + 4 = 7. INDICE SECRET J24 : D",
          en: "Weight of one shovel: 12/3 = 4 kg. Weight of the briquette: 2 shovels = 2 x 4 = 8 kg. On the 2nd scale 8 kg + briquette = 11 kg. So one briquette = 11 – 8 = 3 kg. The access code is equal to the sum of one briquette and one shovel, which gives 3 + 4 = 7. SECRET CLUE D24 : C",
          es: "Peso de una pala: 12/3 = 4 kg. Peso del briquete: 2 palas = 2 x 4 = 8 kg. En la 2.ª balanza 8 kg + briquete = 11 kg. Por lo tanto, un briquete = 11 – 8 = 3 kg. El código de acceso es igual a la suma de un briquete y una pala, es decir, 3 + 4 = 7. PISTA SECRETA D24 : D",
          it: "Peso di una pala: 12/3 = 4 kg. Peso del mattonetto: 2 pale = 2 x 4 = 8 kg. Sulla 2ª bilancia 8 kg + mattonetto = 11 kg. Quindi un mattonetto = 11 – 8 = 3 kg. Il codice di accesso è uguale alla somma di un mattonetto e di una pala, cioè 3 + 4 = 7. INDIZIO SEGRETO G24 : N"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 16 :  L'aiguillage des trois voies  ",
           en: "Day 16: The Three-Track Switch",
          es: "Día 16: El cambio de agujas de las tres vías",
          it: "Giorno 16: Lo scambio dei tre binari"
        },
        correctAnswers: ["12"],
        hint: {
          fr: "Concentre-toi uniquement sur les voies A et B. Trouve le plus petit commun multiple (PPCM) entre 4 et 6. ",
           en: "Focus only on tracks A and B. Find the lowest common multiple (LCM) of 4 and 6.",
          es: "Concéntrate únicamente en las vías A y B. Encuentra el mínimo común múltiplo (m.c.m.) de 4 y 6.",
          it: "Concentrati solo sui binari A e B. Trova il minimo comune multiplo (m.c.m.) di 4 e 6."
        },
        solution: {
          fr: "Multiples de 4 : 4, 8, 12, 16… Multiples de 6 : 6, 12, 18… Le nombre 12 est le plus petit multiple commun à 4 et 6",
           en: "Multiples of 4: 4, 8, 12, 16… Multiples of 6: 6, 12, 18… The number 12 is the smallest common multiple of 4 and 6",
          es: "Múltiplos de 4: 4, 8, 12, 16… Múltiplos de 6: 6, 12, 18… El número 12 es el menor múltiplo común de 4 y 6",
          it: "Multipli di 4: 4, 8, 12, 16… Multipli di 6: 6, 12, 18… Il numero 12 è il più piccolo multiplo comune di 4 e 6"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 17 : Le Code-barres du fourgon blindé ",
         en: "Day 17: The Armored Van Barcode",
          es: "Día 17: El código de barras de la furgoneta blindada",
          it: "Giorno 17: Il codice a barre del furgone blindato"
        },
        correctAnswers: ["20"],
        hint: {
          fr: "Compte le nombre de barres fines (1 pt), le nombre barres moyennes (2 pts) et le nombre de barres épaisses (5 pts).",
          en: "Count the number of thin bars (1 pt), the number of medium bars (2 pts) and the number of thick bars (5 pts).",
          es: "Cuenta el número de barras finas (1 pto), el número de barras medianas (2 ptos) y el número de barras gruesas (5 ptos).",
          it: "Conta il numero di barre sottili (1 pt), il numero di barre medie (2 pt) e il numero di barre spesse (5 pt)."
        },
        solution: {
          fr: "(8 X 1) + (1 X 2) + (2 X 5) = 8 + 2 + 10 = 20",
         en: "(8 X 1) + (1 X 2) + (2 X 5) = 8 + 2 + 10 = 20",
          es: "(8 X 1) + (1 X 2) + (2 X 5) = 8 + 2 + 10 = 20",
          it: "(8 X 1) + (1 X 2) + (2 X 5) = 8 + 2 + 10 = 20"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 18 : La boussole du gyroscope ",
          en: "Day 18: The Gyroscope Compass",
          es: "Día 18: La brújula del giroscopio",
          it: "Giorno 18: La bussola del giroscopio"
        },
        correctAnswers: ["270"],
        hint: {
          fr: "Observe attentivement les cap pointés par les aiguilles de direction",
          en: "Look carefully at the headings pointed to by the direction needles",
          es: "Observa con atención los rumbos señalados por las agujas de dirección",
          it: "Osserva attentamente le rotte indicate dagli aghi di direzione"
        },
        solution: {
          fr: "0 + 30 + 240 = 270. INDICE SECRET J24 : L",
         en: "0 + 30 + 240 = 270. SECRET CLUE D24 : L",
          es: "0 + 30 + 240 = 270. PISTA SECRETA D24 : L",
          it: "0 + 30 + 240 = 270. INDIZIO SEGRETO G24 : C"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 19 : Le Verrou de la cabine du caporal ",
           en: "Day 19: The Corporal's Cabin Lock",
          es: "Día 19: El cerrojo del camarote del cabo",
          it: "Giorno 19: Il chiavistello della cabina del caporale"
        },
        correctAnswers: ["9"],
        hint: {
          fr: "Repère la case ciblée par l'impact. Calcule le produit du rang de la lettre C par le numéro de la colonne.",
           en: "Locate the square targeted by the impact. Calculate the product of the rank of the letter C by the column number.",
          es: "Localiza la casilla alcanzada por el impacto. Calcula el producto del número de orden de la letra C por el número de la columna.",
          it: "Individua la casella colpita dall'impatto. Calcola il prodotto della posizione della lettera C per il numero della colonna."
        },
        solution: {
          fr: "L'impact marque la case C3. Lettre C = 3ᵉ lettre de l'alphabet. 3 ( C ) X 3 (colonne) = 9",
          en: "The impact marks square C3. Letter C = 3rd letter of the alphabet. 3 (C) X 3 (column) = 9",
          es: "El impacto marca la casilla C3. Letra C = 3.ª letra del alfabeto. 3 (C) X 3 (columna) = 9",
          it: "L'impatto segna la casella C3. Lettera C = 3ª lettera dell'alfabeto. 3 (C) X 3 (colonna) = 9"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 20 : Le Raccord de la dynamo ",
           en: "Day 20: The Dynamo Connection",
          es: "Día 20: La conexión de la dinamo",
          it: "Giorno 20: Il raccordo della dinamo"
        },
        correctAnswers: ["010101"],
        hint: {
          fr: "Distingue les chiffres divisibles par 2 de ceux qui ne le sont pas, puis applique le bon signal à chacun.",
         en: "Distinguish the digits divisible by 2 from those that are not, then apply the right signal to each one.",
          es: "Distingue las cifras divisibles por 2 de las que no lo son y luego aplica la señal correcta a cada una.",
          it: "Distingui le cifre divisibili per 2 da quelle che non lo sono, poi applica il segnale giusto a ciascuna."
        },
        solution: {
          fr: "Code secret à saisir : 010101. INDICE SECRET J24 : G",
           en: "Secret code to enter: 010101. SECRET CLUE D24 : A",
          es: "Código secreto que hay que introducir: 010101. PISTA SECRETA D24 : J",
          it: "Codice segreto da inserire: 010101. INDIZIO SEGRETO G24 : L"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 21 : Le module de commutation ",
         en: "Day 21: The Switching Module",
          es: "Día 21: El módulo de conmutación",
          it: "Giorno 21: Il modulo di commutazione"
        },
        correctAnswers: ["180"],
        hint: {
          fr: "Le jour correspond au nombre de touches allumées et la nuit au nombre de touches éteintes. Le carré correspond au nombre total de touche.",
           en: "Day corresponds to the number of lit keys and night to the number of unlit keys. The square corresponds to the total number of keys.",
          es: "El día corresponde al número de teclas encendidas y la noche al número de teclas apagadas. El cuadrado corresponde al número total de teclas.",
          it: "Il giorno corrisponde al numero di tasti accesi e la notte al numero di tasti spenti. Il quadrato corrisponde al numero totale di tasti."
        },
        solution: {
          fr: "5 X 4 X 9 = 180",
           en: "5 X 4 X 9 = 180",
          es: "5 X 4 X 9 = 180",
          it: "5 X 4 X 9 = 180"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 22 : Le verrou à réglettes",
          en: "Day 22: The Slider Lock",
          es: "Día 22: El cerrojo de regletas",
          it: "Giorno 22: Il chiavistello a cursori"
        },
        correctAnswers: ["32"],
        hint: {
          fr: "Associe la valeur simple de la première glissière au double de la seconde et au triple de la troisième. ",
          en: "Combine the simple value of the first slider with double the second and triple the third.",
          es: "Combina el valor simple de la primera corredera con el doble de la segunda y el triple de la tercera.",
          it: "Combina il valore semplice del primo cursore con il doppio del secondo e il triplo del terzo."
        },
        solution: {
          fr: "4 + (5 X 2) + (6 X 3) = 32",
          en: "4 + (5 X 2) + (6 X 3) = 32",
          es: "4 + (5 X 2) + (6 X 3) = 32",
          it: "4 + (5 X 2) + (6 X 3) = 32"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 23 : L’émetteur de secours  ",
          en: "Day 23: The Emergency Transmitter",
          es: "Día 23: El emisor de emergencia",
          it: "Giorno 23: Il trasmettitore di emergenza"
        },
        correctAnswers: ["180"],
        hint: {
          fr: "Associe les deux valeurs des cadrans extérieurs avant d'en retrancher le signal central. ",
         en: "Combine the two values of the outer dials before subtracting the central signal.",
          es: "Combina los dos valores de las esferas exteriores antes de restar la señal central.",
          it: "Combina i due valori dei quadranti esterni prima di sottrarre il segnale centrale."
        },
        solution: {
          fr: "(120 + 240) – 180 = 180. INDICE SECRET J24 : I",
         en: "(120 + 240) – 180 = 180. SECRET CLUE D24 : I",
          es: "(120 + 240) – 180 = 180. PISTA SECRETA D24 : I",
          it: "(120 + 240) – 180 = 180. INDIZIO SEGRETO G24 : O"
        },
        hasHint: true,
        hasSolution: true
    }, {
     title: {
          fr: "Jour 24 : Le Frein d'urgence ultime  ",
         en: "Day 24: The Ultimate Emergency Brake",
          es: "Día 24: El freno de emergencia definitivo",
          it: "Giorno 24: Il freno di emergenza definitivo"
        },
        correctAnswers: ["BLINDAGE24"],
        hint: {
          fr: "Dénombre les côtés des 3 formes",
          en: "Count the sides of the 3 shapes",
          es: "Cuenta los lados de las 3 formas",
          it: "Conta i lati delle 3 forme"
        },
        solution: {
          fr: "BLINDAGE24",
          en: "LATCHING24",
          es: "BLINDAJE24",
          it: "BLOCCONI24"
        },
        hasHint: false,
        hasSolution: true
    },
    ];
 const translations = {
      fr: {
        currentLang: "Français &#9662;",
        verifyText: "Vérifie ta réponse !",
        placeholderResponse: "Réponse",
        validateBtn: "Valider",
        hintBtn: "Indice",
        solutionBtn: "Voir la réponse",
        legalMentions: "Mentions légales",
        correctMessage: "Bravo ! Vous avez trouvé la bonne réponse",
        incorrectMessage: "Incorrect. Essayez encore",
        hintPenalty: "Pénalité de 5 minutes !",
        solutionPenalty: "Pénalité de 10 minutes !",
        timeRemaining: "Temps restant :",
        timeUp: "Temps écoulé !"
      },
      en: {
        currentLang: "English &#9662;",
        verifyText: "Check your answer !",
        placeholderResponse: "Answer",
        validateBtn: "Validate",
        hintBtn: "Hint",
        solutionBtn: "See answer",
        legalMentions: "Legal mentions",
        correctMessage: "Congratulations ! You found the correct answer",
        incorrectMessage: "Incorrect. Try again",
        hintPenalty: "5 minute penalty !",
        solutionPenalty: "10 minute penalty !",
        timeRemaining: "Time remaining:",
        timeUp: "Time's up!"
      },
      es: {
        currentLang: "Español &#9662;",
        verifyText: "¡ Verifica tu respuesta !",
        placeholderResponse: "Respuesta",
        validateBtn: "Validar",
        hintBtn: "Pista",
        solutionBtn: "Ver la respuesta",
        legalMentions: "Menciones legales",
        correctMessage: "¡ Bravo ! Has encontrado la respuesta correcta",
        incorrectMessage: "Incorrecto. Intenta de nuevo",
        hintPenalty: "Penalización de 5 minutos !",
        solutionPenalty: "Penalización de 10 minutos !",
        timeRemaining: "Tiempo restante:",
        timeUp: "¡Se acabó el tiempo!"
      },
      it: {
        currentLang: "Italiano &#9662;",
        verifyText: "Verifica la tua risposta !",
        placeholderResponse: "Risposta",
        validateBtn: "Validare",
        hintBtn: "Indice",
        solutionBtn: "Vedi la risposta",
        legalMentions: "Menzioni legali",
        correctMessage: "Bravo ! Hai trovato la risposta corretta",
        incorrectMessage: "Errato. Prova di nuovo",
        hintPenalty: "Penalità di 5 minuti !",
        solutionPenalty: "Penalità di 10 minuti !",
        timeRemaining: "Tempo rimanente:",
        timeUp: "Tempo scaduto!"
      },

    };



    
    let currentPageIndex = 0;
    let currentLanguage = "fr"; // langue par défaut de la page principale 
    

    const pageTitle = document.getElementById("enigme-title");
    const responseInput = document.getElementById("response");
    const validateBtn = document.getElementById("validateBtn");
    const hintBtn = document.getElementById("hintBtn");
    const solutionBtn = document.getElementById("solutionBtn");
    const hintText = document.getElementById("hintText");
    const solutionText = document.getElementById("solutionText");
    const messageElement = document.getElementById("message");
    const prevBtn = document.querySelector(".arrow-left");
    const nextBtn = document.querySelector(".arrow-right");
    const dropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn"); // S'assurer que c'est le bon dropdown
    const verifyText = document.querySelector("[data-translate='verifyText']");
    const transitionSound = new Audio('sounds/sound1.mp3'); // son flèche transition
    const hintSolutionSound = new Audio('sounds/sound2.mp3'); // son bouton indice et réponse
    const incorrectSound = new Audio('sounds/sound3.mp3'); // son réponse incorecte
    const correctSound = new Audio('sounds/sound4.mp3'); // son réponse correcte
    const languageChangeSound = new Audio('sounds/sound5.mp3'); // son sélecteur langage

    let hintUsed = false;


// Pénalités de temps 

    const showPenalties = false; // changer false en true pour afficher des pénalités de temps au clic sur les boutons indice et voir la réponse 
    let hintPenaltyApplied = new Set(); // Pour suivre les pénalités d'indices appliquées
    let solutionPenaltyApplied = new Set(); // Pour suivre les pénalités de solutions appliquées


hintBtn.addEventListener("click", () => {
  if (hintText.style.display === "block") {
    hintText.style.display = "none";
  } else {
    hintText.style.display = "block";
    playHintSolutionSound();

    if (showPenalties && !hintPenaltyApplied.has(currentPageIndex)) {
      showPopup(translations[currentLanguage].hintPenalty);
      countdownDuration -= 5 * 60; // Soustraire 5 minutes (300 secondes)
      hintPenaltyApplied.add(currentPageIndex); // Marquer cette question comme ayant eu sa pénalité d'indice
    }
  }

  hintUsed = true;
  // Afficher le bouton solution seulement si la page le permet
  if (pages[currentPageIndex].hasSolution) {
    solutionBtn.style.display = "inline-block";
  }
  hintBtn.disabled = false;
});

    solutionBtn.addEventListener("click", () => {
      if (solutionText.style.display === "block") {
        solutionText.style.display = "none";
      } else {
        solutionText.style.display = "block";
        playHintSolutionSound();

        if (showPenalties && !solutionPenaltyApplied.has(currentPageIndex)) {
          showPopup(translations[currentLanguage].solutionPenalty);
          countdownDuration -= 10 * 60; // Soustraire 10 minutes (600 secondes)
          solutionPenaltyApplied.add(currentPageIndex); // Marquer cette question comme ayant eu sa pénalité de solution
        }
      }
    });


    // NOUVELLE FONCTION : Mettre à jour l'affichage du score

    function updateScoreDisplay() {
      const scoreElement = document.getElementById("score-display");
      if (scoreElement) {
        // Calculer le nombre total de pages valides (exclure les pages vides)
        const totalValidPages = pages.filter(page => page.title).length;
        const correctAnswersCount = answeredQuestions.size;
        scoreElement.textContent = `Score: ${correctAnswersCount}/${totalValidPages}`;
      }
    }

    function playTransitionSound() {
      transitionSound.currentTime = 0;
      transitionSound.play();
    }

    function playHintSolutionSound() {
      hintSolutionSound.currentTime = 0;
      hintSolutionSound.play();
    }

    function loadPage(index) {
      const page = pages[index];

      responseInput.value = "";
      hintText.style.display = "none";
      solutionText.style.display = "none";
      messageElement.style.display = "none";
      hintUsed = false;

      pageTitle.textContent = page.title[currentLanguage];

      updateNavigation(index);

      if (page.isRedirect) {
        handleRedirectPage(page);
      } else {
        handleRegularPage(page);
      }

      updateTextWithTranslations();
    }

    // LOGIQUE DE VALIDATION MODIFIÉE
    validateBtn.addEventListener("click", () => {
      const userResponse = responseInput.value.trim().toLowerCase();
      const currentPage = pages[currentPageIndex];

      let isCorrect = false;

      if (Array.isArray(currentPage.correctAnswers)) {
        isCorrect = currentPage.correctAnswers.some(answer =>
          userResponse === answer.toLowerCase()
        );
      } else if (typeof currentPage.correctAnswers === "object") {
        isCorrect = userResponse === currentPage.correctAnswers[currentLanguage].toLowerCase();
      } else {
        isCorrect = userResponse === currentPage.correctAnswers.toLowerCase();
      }

      if (isCorrect) {
        // NOUVELLE LOGIQUE : Gérer le score pour les bonnes réponses
        if (!answeredQuestions.has(currentPageIndex)) {
          // Première fois que cette question est résolue correctement
          answeredQuestions.add(currentPageIndex);
          console.log(`Question ${currentPageIndex + 1} résolue ! Score: ${answeredQuestions.size}/${pages.filter(page => page.title).length}`);
        }

        messageElement.style.display = "block";
        messageElement.style.color = "green";
        messageElement.textContent = translations[currentLanguage].correctMessage;
        correctSound.play();
        animateMessage(messageElement, 'correct');

        // Mettre à jour l'affichage du score
        updateScoreDisplay();

      } else {
        // Pour les mauvaises réponses, on ne change plus le score
        messageElement.style.display = "block";
        messageElement.style.color = "red";
        messageElement.textContent = translations[currentLanguage].incorrectMessage;
        incorrectSound.play();
        animateMessage(messageElement, 'incorrect');
      }
    });

    function showPopup(message) {
      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.textContent = message;
      document.body.appendChild(popup);

      setTimeout(() => {
        popup.classList.add('show');
      }, 10);

      setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 500);
      }, 3000);
    }



    function animateMessage(element, type) {
      element.classList.remove('animate-correct', 'animate-incorrect');
      void element.offsetWidth;
      element.classList.add(`animate-${type}`);
    }

    prevBtn.addEventListener("click", () => {
      if (currentPageIndex > 0) {
        currentPageIndex--;
        loadPage(currentPageIndex);
        playTransitionSound();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        loadPage(currentPageIndex);
        playTransitionSound();
      }
    });

    function updateNavigation(index) {
      prevBtn.style.display = index > 0 ? "block" : "none";
      nextBtn.style.display = index < (pages.length - 1) ? "block" : "none";

      console.log('Current index:', index);
      console.log('Total pages:', pages.length);
      console.log('Should show next button:', index < (pages.length - 1));
    }

    function handleRedirectPage(page) {
      responseInput.style.display = "none";
      validateBtn.style.display = "none";
      hintBtn.style.display = "none";
      solutionBtn.style.display = "none";
      hintText.style.display = "none";
      solutionText.style.display = "none";
      messageElement.style.display = "none";
      verifyText.style.display = "none";

      let redirectButton = document.getElementById('redirectButton');

      if (!redirectButton) {
        redirectButton = document.createElement('button');
        redirectButton.id = 'redirectButton';
        redirectButton.className = 'redirect-button';
        redirectButton.addEventListener('click', () => {
          playTransitionSound();
          window.location.href = page.redirectUrl;
        });
        pageTitle.insertAdjacentElement('afterend', redirectButton);
      }

      redirectButton.textContent = page.buttonText[currentLanguage];
      redirectButton.style.display = "block";
    }

    function handleRegularPage(page) {
      const redirectButton = document.getElementById('redirectButton');
      if (redirectButton) {
        redirectButton.remove();
      }

      responseInput.style.display = "inline-block";
      validateBtn.style.display = "inline-block";
      verifyText.style.display = "block";


      hintText.textContent = page.hint[currentLanguage];
      solutionText.textContent = page.solution[currentLanguage];

      // Gérer l'affichage des boutons indice et solution
      hintBtn.style.display = page.hasHint ? "inline-block" : "none";
      solutionBtn.style.display = page.hasSolution ? "inline-block" : "none";
    }

    // Gestion de la traduction pour la page principale
    function updateTextWithTranslations() {
      // Mettre à jour le texte du bouton principal du dropdown
      const dropdownBtnMain = document.querySelector("#translate-dropdown .dropdown-btn");
      if (dropdownBtnMain) {
        dropdownBtnMain.innerHTML = translations[currentLanguage].currentLang;
      }

      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
          if (el.tagName === 'INPUT') {
            el.placeholder = translations[currentLanguage][key];
          } else {
            el.innerHTML = translations[currentLanguage][key];
          }
        }
      });

      // Mise à jour spécifique du titre de l'énigme
      if (pages[currentPageIndex] && pages[currentPageIndex].title) {
        pageTitle.textContent = pages[currentPageIndex].title[currentLanguage];
      }
      // Mise à jour spécifique de l'indice
      if (pages[currentPageIndex] && pages[currentPageIndex].hint && hintText.style.display === "block") {
        hintText.textContent = pages[currentPageIndex].hint[currentLanguage];
      }
      // Mise à jour spécifique de la solution
      if (pages[currentPageIndex] && pages[currentPageIndex].solution && solutionText.style.display === "block") {
        solutionText.textContent = pages[currentPageIndex].solution[currentLanguage];
      }
    }


    // Gestionnaire d'événements pour le sélecteur de langue de la page principale
    // 💡 Déplacé ici, après que le HTML de l'application principale a été créé
document.querySelectorAll('#translate-dropdown .dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const newLang = e.target.getAttribute('data-lang');
    if (currentLanguage !== newLang) {
      currentLanguage = newLang;
      
      // NOUVEAU : Sauvegarder la langue dans sessionStorage ET localStorage
      sessionStorage.setItem('selectedLanguage', newLang);
      localStorage.setItem('language', newLang); // ✅ Ajout de cette ligne
      
      updateTextWithTranslations();
      loadPage(currentPageIndex);
      try {
        languageChangeSound.currentTime = 0;
        languageChangeSound.play();
      } catch (e) {
        // Son non disponible
      }
    }
  });
});

    // Écouteur pour le bouton dropdown de la page principale pour afficher/masquer le contenu
    const mainDropdownBtn = document.querySelector("#translate-dropdown .dropdown-btn");
    const mainDropdownContent = document.querySelector("#translate-dropdown .dropdown-content");

    if (mainDropdownBtn && mainDropdownContent) {
      mainDropdownBtn.addEventListener('click', () => {
        mainDropdownContent.style.display = mainDropdownContent.style.display === 'block' ? 'none' : 'block';
      });

      // Fermer le dropdown si on clique en dehors
      document.addEventListener('click', (event) => {
        if (!event.target.closest('#translate-dropdown')) {
          mainDropdownContent.style.display = 'none';
        }
      });
    }

    // Initialisation du compteur
    let countdownInterval;

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function startCountdownTimer() {
      const timerDisplay = document.getElementById("countdown-timer");
      clearInterval(countdownInterval); // S'assurer qu'il n'y a qu'un seul intervalle

      countdownInterval = setInterval(() => {
        if (countdownDuration <= 0) {
          clearInterval(countdownInterval);
          timerDisplay.textContent = translations[currentLanguage].timeUp;
          // Gérer la fin du jeu ici (ex: rediriger, afficher un message final)
        } else {
          countdownDuration--;
          timerDisplay.innerHTML = `${translations[currentLanguage].timeRemaining} ${formatTime(countdownDuration)}`;
        }
      }, 1000);
    }

    // Initialiser le jeu
    loadPage(currentPageIndex);
    updateScoreDisplay(); // Initialiser l'affichage du score
    startCountdownTimer(); // Démarrer le compte à rebours
    initializeLanguageDisplay(); // Initialiser l'affichage de la langue sélectionnée
  }

  // Vérifier l'authentification au chargement initial de la page
  if (LOGIN_CONFIG.enabled && !isAuthenticated()) {
    showLoginScreen();
  } else {
    initializeMainApp();
  }
});
