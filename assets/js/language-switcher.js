/**
 * eQ3 Language Switcher
 * Switches between Portuguese and English versions
 */

class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    init() {
        this.createSwitcher();
        this.updateSwitcherState();
        this.bindEvents();
    }

    getCurrentLanguage() {
        const currentPath = window.location.pathname;
        return currentPath.includes('-en.html') || currentPath.endsWith('index-en.html') ? 'en' : 'pt';
    }

    createSwitcher() {
        // Prevent duplication
        if (document.getElementById('language-switcher')) return;

        // Create switcher element
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">
                PT
            </button>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
                EN
            </button>
        `;

        // Insert into navigation menu if exists
        const navMenu = document.querySelector('.main-menu, nav ul, .navbar, header nav, .menu'); // adjust selector to your menu structure
        if (navMenu) {
            const listItem = document.createElement('li');
            listItem.className = 'menu-item language-switcher-item';
            listItem.appendChild(switcher);
            navMenu.appendChild(listItem);
        } else {
            // fallback if no menu found
            const header = document.querySelector('header') || document.body;
            header.appendChild(switcher);
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.lang-btn');
            if (!button) return;
            this.switchLanguage(button.dataset.lang);
        });
    }

    switchLanguage(targetLang) {
        if (targetLang === this.currentLang) return;

        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();

        let newUrl;

        if (targetLang === 'en') {
            if (currentFile === 'index.html') newUrl = 'index-en.html';
            else if (!currentFile.includes('-en.html')) newUrl = currentFile.replace('.html', '-en.html');
            else newUrl = currentFile;
        } else {
            if (currentFile === 'index-en.html') newUrl = 'index.html';
            else if (currentFile.includes('-en.html')) newUrl = currentFile.replace('-en.html', '.html');
            else newUrl = currentFile;
        }

        const newFullUrl = newUrl + window.location.search + window.location.hash;
        window.location.href = newFullUrl;
    }

    updateSwitcherState() {
        const switcher = document.getElementById('language-switcher');
        if (!switcher) return;

        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
