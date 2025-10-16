// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        document.addEventListener("DOMContentLoaded", () => this.init());
    }

    // Detect saved preference or infer from filename
    getCurrentLanguage() {
        const saved = localStorage.getItem("preferredLanguage");
        if (saved) return saved;

        const file = window.location.pathname.split("/").pop();
        return file.includes("-en") ? "en" : "pt";
    }

    setLanguage(lang) {
        if (lang === this.currentLang) return;
        localStorage.setItem("preferredLanguage", lang);
        this.currentLang = lang;
        this.updateActiveButton();
        this.redirectToLanguageVersion(lang);
    }

    redirectToLanguageVersion(lang) {
        let path = window.location.pathname;
        let file = path.split("/").pop();

        // If URL is just the domain root (e.g. https://equanta.com.br/)
        if (!file || file === "") {
            file = "index.html";
        }

        const base = file.replace("-en", "").replace(".html", "");
        let newFile = lang === "en" ? `${base}-en.html` : `${base}.html`;

        // If your site is hosted in a subfolder, preserve its path:
        const dir = path.substring(0, path.lastIndexOf("/") + 1);
        const newPath = `${dir}${newFile}`;

        window.location.href = newPath;
    }

    createLanguageSwitcher() {
        const navList = document.querySelector(".navbar-nav.ml-auto");
        if (!navList) {
            console.warn("⚠️ Navbar not found: .navbar-nav.ml-auto");
            return;
        }

        const li = document.createElement("li");
        li.classList.add("nav-item", "language-switcher");

        li.innerHTML = `
            <a href="#" class="menu-item lang-link ${this.currentLang === "pt" ? "active" : ""}" data-lang="pt">PT</a>
            <span class="divider">    | </span>
            <a href="#" class="menu-item lang-link ${this.currentLang === "en" ? "active" : ""}" data-lang="en">EN</a>
        `;

        navList.appendChild(li);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll(".lang-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const lang = link.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    updateActiveButton() {
        document.querySelectorAll(".lang-link").forEach((link) => {
            const isActive = link.dataset.lang === this.currentLang;
            link.classList.toggle("active", isActive);
        });
    }

    init() {
        this.createLanguageSwitcher();
        this.updateActiveButton();
    }
}

// Initialize
new LanguageSwitcher();
