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

        // Try to insert in navigation menu (priority order)
        const navMenu = document.querySelector('.navbar-nav') || 
                       document.querySelector('nav ul') || 
                       document.querySelector('.navigation') ||
                       document.querySelector('.menu');
        
        const navbar = document.querySelector('.navbar') || 
                      document.querySelector('header nav') ||
                      document.querySelector('nav');

        if (navMenu) {
            // Create list item and add to navigation
            const listItem = document.createElement('li');
            listItem.style.listStyle = 'none';
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.appendChild(switcher);
            navMenu.appendChild(listItem);
        } else if (navbar) {
            // Add directly to navbar
            navbar.appendChild(switcher);
        } else {
            // Fallback to header
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(switcher);
            } else {
                // Last resort - body with fixed positioning
                switcher.style.position = 'fixed';
                switcher.style.top = '15px';
                switcher.style.right = '15px';
                switcher.style.zIndex = '1000';
                document.body.appendChild(switcher);
            }
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
                return; // No English version found
            }
        } else {
            // Switch to Portuguese
            if (currentFile === 'index-en.html') {
                newFile = 'index.html';
            } else if (currentFile.includes('-en.html')) {
                newFile = currentFile.replace('-en.html', '.html');
            } else {
                return; // No Portuguese version found
            }
        }

        // Navigate to new page
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

    // Initialize everything
    createSwitcher();
    bindEvents();
});
