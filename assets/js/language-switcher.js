// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.translations = this.getTranslations();
        this.init();
    }

    getCurrentLanguage() {
        return (
            localStorage.getItem('preferredLanguage') ||
            document.documentElement.lang ||
            'pt' // Default to Portuguese
        );
    }

    getTranslations() {
        return {
            en: {
                // Navigation
                home: 'Home',
                about: 'About Us',
                services: 'Services',
                contact: 'Contact',
                
                // Footer
                sitemap: 'Site Map',
                company: 'Company',
                digitalCompany: 'We are a digital company',
                basedIn: 'Based in São Paulo - SP',
                hours: 'We serve from Monday to Friday from 9:00 to 17:00',
            },
            pt: {
                // Navigation
                home: 'Home',
                about: 'Sobre Nós',
                services: 'Serviços',
                contact: 'Contato',
                
                // Footer
                sitemap: 'Mapa do Site',
                company: 'Empresa',
                digitalCompany: 'Somos uma empresa digital',
                basedIn: 'Sediada em São Paulo - SP',
                hours: 'Atendemos de segunda a sexta das 9:00 às 17:00',
            }
        };
    }

    setLanguage(lang) {
        if (lang === this.currentLang) return;
        
        localStorage.setItem('preferredLanguage', lang);
        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update the page
        this.updatePageContent();
        this.updateActiveButton(lang);
        
        // Dispatch event for other components to listen to
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }

    updateActiveButton(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    }

    updatePageContent() {
        this.updateMetaTags();
        this.updateNavigation();
        this.updatePageSpecificContent();
        this.updateFooter();
    }

    updateMetaTags() {
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
        
        // Update content-language meta tag
        let metaLanguage = document.querySelector('meta[http-equiv="content-language"]');
        if (!metaLanguage) {
            metaLanguage = document.createElement('meta');
            metaLanguage.setAttribute('http-equiv', 'content-language');
            document.head.appendChild(metaLanguage);
        }
        metaLanguage.setAttribute('content', this.currentLang);
        
        // Update og:locale meta tag
        let metaLocale = document.querySelector('meta[property="og:locale"]');
        if (metaLocale) {
            metaLocale.setAttribute('content', this.currentLang === 'pt' ? 'pt_BR' : 'en_US');
        }
    }

    updateNavigation() {
        const map = this.translations[this.currentLang];
        
        document.querySelectorAll('#navbarContent a, .navbar-nav a, nav a').forEach(link => {
            const href = link.getAttribute('href') || '';
            const text = link.textContent.trim();
            
            // Match by href patterns
            if (href.includes('index.html') || href === '/' || text.match(/home|início/i)) {
                link.textContent = map.home;
            } else if (href.includes('sobre-equanta.html') || text.match(/sobre|about/i)) {
                link.textContent = map.about;
            } else if (href.includes('servicos-ambientais.html') || text.match(/serviços|services/i)) {
                link.textContent = map.services;
            } else if (href.includes('contato-equanta.html') || text.match(/contato|contact/i)) {
                link.textContent = map.contact;
            }
        });
    }

    updatePageSpecificContent() {
        // Add page-specific content updates here if needed
        this.redirectToLanguageVersion();
    }

    redirectToLanguageVersion() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop();
        
        if (this.currentLang === 'en' && !fileName.includes('-en')) {
            // Switching to English - redirect to English version
            const newFileName = fileName.replace('.html', '-en.html');
            const newPath = currentPath.replace(fileName, newFileName);
            
            // Check if English version exists, otherwise stay on current page
            this.checkPageExists(newPath).then(exists => {
                if (exists && newPath !== currentPath) {
                    window.location.href = newPath;
                }
            });
            
        } else if (this.currentLang === 'pt' && fileName.includes('-en')) {
            // Switching to Portuguese - redirect to Portuguese version (no suffix)
            const newFileName = fileName.replace('-en.html', '.html').replace('-en', '');
            const newPath = currentPath.replace(fileName, newFileName);
            
            // Check if Portuguese version exists
            this.checkPageExists(newPath).then(exists => {
                if (exists && newPath !== currentPath) {
                    window.location.href = newPath;
                }
            });
        }
    }

    checkPageExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }

    updateFooter() {
        const map = this.translations[this.currentLang];
        
        // Update footer titles
        document.querySelectorAll('.footer--widget-title h5, .footer-widget h5').forEach(title => {
            const text = title.textContent.trim();
            if (text === 'Mapa do Site' || text === 'Site Map') {
                title.textContent = map.sitemap;
            } else if (text === 'Empresa' || text === 'Company') {
                title.textContent = map.company;
            }
        });

        // Update footer content
        document.querySelectorAll('.widget--content p, .footer-content p').forEach(text => {
            const content = text.innerHTML;
            if (content.includes('Somos uma empresa digital') || content.includes('We are a digital company')) {
                const lines = content.split('<br>');
                if (lines.length >= 3) {
                    lines[0] = map.digitalCompany;
                    lines[1] = map.basedIn;
                    lines[2] = map.hours;
                    text.innerHTML = lines.join('<br>');
                }
            }
        });
    }

    init() {
        this.createLanguageSwitcher();
        this.updateActiveButton(this.currentLang);
        this.updatePageContent();
    }

    createLanguageSwitcher() {
        // Don't create if already exists
        if (document.querySelector('.language-switcher')) return;
        
        const switcherHTML = `
            <div class="language-switcher" role="group" aria-label="Language selector">
                <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" 
                        data-lang="pt" 
                        aria-label="Português"
                        aria-pressed="${this.currentLang === 'pt'}">
                    PT
                </button>
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" 
                        data-lang="en" 
                        aria-label="English"
                        aria-pressed="${this.currentLang === 'en'}">
                    EN
                </button>
            </div>
        `;

        // Try these safe locations in order
        const locations = [
            // Try to find an existing header actions area
            { selector: '.header-actions', position: 'beforeend' },
            { selector: '.navbar-actions', position: 'beforeend' },
            { selector: '.header-right', position: 'beforeend' },
            { selector: '.navbar-right', position: 'beforeend' },
            
            // Try to create a new container in the navbar
            { selector: '.navbar .container', position: 'beforeend' },
            { selector: '.header .container', position: 'beforeend' },
            
            // Try after the navbar brand (safe position)
            { selector: '.navbar-brand', position: 'afterend' },
            
            // Try before the navigation toggle button (for mobile)
            { selector: '.navbar-toggler', position: 'beforebegin' },
            
            // Fallback to header/navbar end
            { selector: '.navbar', position: 'beforeend' },
            { selector: '.header', position: 'beforeend' },
            { selector: 'header', position: 'beforeend' }
        ];

        for (const location of locations) {
            const element = document.querySelector(location.selector);
            if (element) {
                console.log('Inserting language switcher after:', location.selector);
                element.insertAdjacentHTML(location.position, switcherHTML);
                this.addEventListeners();
                return;
            }
        }
        
        // If no locations found, insert at body start as last resort
        console.log('No suitable location found, inserting at body start');
        document.body.insertAdjacentHTML('afterbegin', switcherHTML);
        this.addEventListeners();
    }

    addEventListeners() {
        // Use event delegation for dynamic elements
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                this.setLanguage(e.target.dataset.lang);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('lang-btn') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.setLanguage(e.target.dataset.lang);
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new LanguageSwitcher();
    }, 100);
});
