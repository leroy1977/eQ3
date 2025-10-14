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
        // Create language switcher UI if it doesn't exist
        this.createSwitcher();
        this.updateSwitcherState();
        this.bindEvents();
    }

    getCurrentLanguage() {
        // Check if current page is English version
        const currentPath = window.location.pathname;
        return currentPath.includes('-en.html') || currentPath.endsWith('index-en.html') ? 'en' : 'pt';
    }

    createSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('language-switcher')) {
            return;
        }

        // Create switcher element
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn pt-br ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">
                <span class="flag">🇧🇷</span>
                <span class="text">PT</span>
            </button>
            <button class="lang-btn en-us ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
                <span class="flag">🇺🇸</span>
                <span class="text">EN</span>
            </button>
        `;

        // Try to insert in header, or fallback to body
        const header = document.querySelector('header') || document.body;
        header.appendChild(switcher);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-btn')) {
                const button = e.target.closest('.lang-btn');
                const targetLang = button.getAttribute('data-lang');
                this.switchLanguage(targetLang);
            }
        });
    }

    switchLanguage(targetLang) {
        if (targetLang === this.currentLang) return;

        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        let newUrl;

        if (targetLang === 'en') {
            // Switch to English
            if (currentFile === 'index.html') {
                newUrl = 'index-en.html';
            } else if (currentFile.endsWith('.html') && !currentFile.includes('-en.html')) {
                newUrl = currentFile.replace('.html', '-en.html');
            } else {
                newUrl = currentFile;
            }
        } else {
            // Switch to Portuguese
            if (currentFile === 'index-en.html') {
                newUrl = 'index.html';
            } else if (currentFile.includes('-en.html')) {
                newUrl = currentFile.replace('-en.html', '.html');
            } else {
                newUrl = currentFile;
            }
        }

        // Preserve query parameters and hash
        const newFullUrl = newUrl + window.location.search + window.location.hash;
        window.location.href = newFullUrl;
    }

    updateSwitcherState() {
        const switcher = document.getElementById('language-switcher');
        if (!switcher) return;

        const ptBtn = switcher.querySelector('.pt-br');
        const enBtn = switcher.querySelector('.en-us');

        if (ptBtn && enBtn) {
            ptBtn.classList.toggle('active', this.currentLang === 'pt');
            enBtn.classList.toggle('active', this.currentLang === 'en');
        }
    }

    // Utility method to get opposite language page URL
    getOppositeLanguageUrl() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        if (this.currentLang === 'pt') {
            if (currentFile === 'index.html') return 'index-en.html';
            return currentFile.replace('.html', '-en.html');
        } else {
            if (currentFile === 'index-en.html') return 'index.html';
            return currentFile.replace('-en.html', '.html');
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.eQ2LanguageSwitcher = new LanguageSwitcher();
});

// Alternative initialization for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.eQ2LanguageSwitcher = new LanguageSwitcher();
    });
} else {
    window.eQ2LanguageSwitcher = new LanguageSwitcher();
}
