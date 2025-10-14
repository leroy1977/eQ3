/**
 * eQ3 Language Switcher
 * Switches between Portuguese and English versions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if switcher already exists
    if (document.getElementById('language-switcher')) {
        return;
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
            <button class="lang-btn pt-br ${currentLang === 'pt' ? 'active' : ''}" data-lang="pt" type="button">
                <span class="flag">🇧🇷</span>
                <span class="text">PT</span>
            </button>
            <button class="lang-btn en-us ${currentLang === 'en' ? 'active' : ''}" data-lang="en" type="button">
                <span class="flag">🇺🇸</span>
                <span class="text">EN</span>
            </button>
        `;

        // Try to find the navigation menu to insert the language switcher
        const navMenu = document.querySelector('.navbar-nav') || 
                       document.querySelector('.nav') || 
                       document.querySelector('.navigation') ||
                       document.querySelector('nav ul') ||
                       document.querySelector('.menu');

        if (navMenu) {
            // Create a list item and append the switcher to it
            const listItem = document.createElement('li');
            listItem.className = 'menu-item-language-switcher';
            listItem.appendChild(switcher);
            navMenu.appendChild(listItem);
        } else {
            // Fallback: insert in header
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(switcher);
            } else {
                // Last resort: insert at body start
                document.body.insertBefore(switcher, document.body.firstChild);
            }
        }

        console.log('Language switcher created in menu');
    }

    function switchLanguage(targetLang) {
        const currentLang = getCurrentLanguage();
        if (targetLang === currentLang) {
            return;
        }

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

    function bindEvents() {
        document.addEventListener('click', function(e) {
            const langBtn = e.target.closest('.lang-btn');
            if (langBtn) {
                e.preventDefault();
                const targetLang = langBtn.getAttribute('data-lang');
                switchLanguage(targetLang);
            }
        });
    }

    // Initialize
    createSwitcher();
    bindEvents();
});
