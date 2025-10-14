/**
 * eQ3 Language Switcher
 */

document.addEventListener('DOMContentLoaded', function() {
    // Remove existing switcher if any
    const existing = document.getElementById('language-switcher');
    if (existing) {
        existing.remove();
    }

    function getCurrentLanguage() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        return currentFile.includes('-en.html') || currentFile === 'index-en.html' ? 'en' : 'pt';
    }

    function createSwitcher() {
        const currentLang = getCurrentLanguage();
        
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt" type="button">
                <span>🇧🇷</span> PT
            </button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" type="button">
                <span>🇺🇸</span> EN
            </button>
        `;

        // Find the navbar container and append to it
        const navbar = document.querySelector('.navbar') || 
                      document.querySelector('nav') ||
                      document.querySelector('header');

        if (navbar) {
            navbar.appendChild(switcher);
        } else {
            // Fallback
            document.body.appendChild(switcher);
        }
    }

    function switchLanguage(targetLang) {
        const currentLang = getCurrentLanguage();
        if (targetLang === currentLang) return;

        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        let newFile = '';

        if (targetLang === 'en') {
            // Switch to English
            if (currentFile === 'index.html') {
                newFile = 'index-en.html';
            } else if (currentFile.endsWith('.html') && !currentFile.includes('-en.html')) {
                newFile = currentFile.replace('.html', '-en.html');
            } else {
                return;
            }
        } else {
            // Switch to Portuguese
            if (currentFile === 'index-en.html') {
                newFile = 'index.html';
            } else if (currentFile.includes('-en.html')) {
                newFile = currentFile.replace('-en.html', '.html');
            } else {
                return;
            }
        }

        window.location.href = newFile;
    }

    function bindEvents() {
        document.addEventListener('click', function(e) {
            const button = e.target.closest('.lang-btn');
            if (button) {
                e.preventDefault();
                const targetLang = button.getAttribute('data-lang');
                switchLanguage(targetLang);
            }
        });
    }

    createSwitcher();
    bindEvents();
});
