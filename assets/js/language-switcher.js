// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    // Get current language from localStorage or default to PT
    getCurrentLanguage() {
        return localStorage.getItem("preferredLanguage") || "pt";
    }

    // Set language and reload page or update content
    setLanguage(lang) {
        if (lang === this.currentLang) return;
        localStorage.setItem("preferredLanguage", lang);
        this.currentLang = lang;
        this.updateActiveButton();
        this.reloadToLanguage(lang);
    }

    // Redirect or reload depending on structure
    reloadToLanguage(lang) {
        const currentPage = window.location.pathname.split("/").pop();
        // You can replace this logic with real translated HTML files later
        window.location.href = currentPage;
    }

    // Create language switcher as a normal navbar item
    createLanguageSwitcher() {
        const navList = document.querySelector(".navbar-nav.ml-auto");
        if (!navList) {
            console.warn("⚠️ Navbar not found: .navbar-nav.ml-auto");
            return;
        }

        // Use <a> elements instead of <button> for menu-like behavior
        const switcherHTML = `
            <li class="nav-item dropdown language-switcher">
                <a href="#" class="lang-link menu-item ${this.currentLang === "pt" ? "active" : ""}" data-lang="pt">PT</a>
                <span class="divider">|</span>
                <a href="#" class="lang-link menu-item ${this.currentLang === "en" ? "active" : ""}" data-lang="en">EN</a>
            </li>
        `;

        navList.insertAdjacentHTML("beforeend", switcherHTML);
        this.addEventListeners();
    }

    // Add click listeners
    addEventListeners() {
        document.querySelectorAll(".lang-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const lang = link.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    // Highlight active language
    updateActiveButton() {
        document.querySelectorAll(".lang-link").forEach((link) => {
            link.classList.toggle("active", link.dataset.lang === this.currentLang);
        });
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.createLanguageSwitcher();
            this.updateActiveButton();
        });
    }
}

// Initialize
new LanguageSwitcher();
