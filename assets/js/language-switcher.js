// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.translations = this.loadTranslations();
        this.init();
    }

    // Detect saved language or default to PT
    getCurrentLanguage() {
        return localStorage.getItem("siteLang") || "pt";
    }

    // Save selected language and update UI
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem("siteLang", lang);
        this.updateContent();
        this.updateActiveButton();
    }

    // Create the language switcher as a new <li> inside the navbar
    createLanguageSwitcher() {
        const switcherHTML = `
            <li class="nav-item language-switcher">
                <button class="lang-btn ${this.currentLang === "pt" ? "active" : ""}" data-lang="pt">PT</button>
                <button class="lang-btn ${this.currentLang === "en" ? "active" : ""}" data-lang="en">EN</button>
            </li>
        `;

        // Find your navbar <ul>
        const navList = document.querySelector(".navbar-nav.ml-auto");

        if (navList) {
            // Append the switcher at the end
            navList.insertAdjacentHTML("beforeend", switcherHTML);
            this.addEventListeners();
        } else {
            console.warn("⚠️ Navbar list (.navbar-nav.ml-auto) not found. Language switcher not inserted.");
        }
    }

    // Add click event to PT/EN buttons
    addEventListeners() {
        const buttons = document.querySelectorAll(".lang-btn");
        buttons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    // Update which button is active (underlined)
    updateActiveButton() {
        document.querySelectorAll(".lang-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === this.currentLang);
        });
    }

    // Example translations (replace or expand)
    loadTranslations() {
        return {
            pt: {
                title: "Bem-vindo à Equanta",
                description: "Estudos e serviços ambientais especializados.",
            },
            en: {
                title: "Welcome to Equanta",
                description: "Specialized environmental studies and services.",
            },
        };
    }

    // Replace text for all [data-i18n] elements
    updateContent() {
        const dict = this.translations[this.currentLang];
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (dict[key]) el.textContent = dict[key];
        });
    }

    // Initialize when the DOM is loaded
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.createLanguageSwitcher();
            this.updateContent();
        });
    }
}

// Start everything
new LanguageSwitcher();
