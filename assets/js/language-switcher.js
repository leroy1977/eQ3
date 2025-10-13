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
        
        // Portuguese pages: sobre-equanta.html, servicos-ambientais.html, etc. (no suffix)
        // English pages: sobre-equanta-en.html, servicos-ambientais-en.html, etc. (-en suffix)
        
        if (this.currentLang === 'en' && !fileName.includes('-en')) {
            // Switching to English - redirect to English version
            const newFileName = fileName.replace('.html', '-en.html');
            const newPath = currentPath.replace(fileName, newFileName);
            
            // Check if English version exists, otherwise stay on current page
            this.checkPageExists(newPath).then(exists => {
                if (exists && newPath !== currentPath) {
                    window.location.href = newPath;
                } else {
                    // English version doesn't exist, just update content
                    console.log('English version not found, updating content in place');
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
                } else {
                    // Portuguese version doesn't exist, just update content
                    console.log('Portuguese version not found, updating content in place');
                }
            });
        }
        // If already on correct version, do nothing
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

        // Try different possible header locations
        const headerSelectors = ['.header', 'header', '.navbar', '.site-header', '.main-header'];
        let header = null;
        
        for (const selector of headerSelectors) {
            header = document.querySelector(selector);
            if (header) break;
        }
        
        if (header) {
            header.insertAdjacentHTML('beforeend', switcherHTML);
        } else {
            // Fallback to body start
            document.body.insertAdjacentHTML('afterbegin', switcherHTML);
        }

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

// Initialize with better error handling
function initLanguageSwitcher() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new LanguageSwitcher();
        });
    } else {
        // DOM already ready
        new LanguageSwitcher();
    }
}

// Start the language switcher
initLanguageSwitcher();// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    getCurrentLanguage() {
        return (
            localStorage.getItem('preferredLanguage') ||
            document.documentElement.lang ||
            'en'
        );
    }

    setLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
        this.currentLang = lang;
        document.documentElement.lang = lang;
        this.updatePageContent();
        this.updateActiveButton(lang);
    }

    updateActiveButton(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    updatePageContent() {
        this.updateMetaTags();
        this.updateNavigation();
        this.updatePageSpecificContent();
        this.updateFooter();
    }

    updateMetaTags() {
        const metaLanguage = document.querySelector('meta[http-equiv="content-language"]');
        if (metaLanguage) metaLanguage.setAttribute('content', this.currentLang);
    }

    updateNavigation() {
        const translations = {
            en: { home: 'Home', about: 'About Us', services: 'Services', contact: 'Contact' },
            pt: { home: 'Home', about: 'Sobre Nós', services: 'Serviços', contact: 'Contato' },
        };

        document.querySelectorAll('#navbarContent a').forEach(link => {
            const href = link.getAttribute('href') || '';
            const map = translations[this.currentLang];
            if (href.includes('index.html')) link.textContent = map.home;
            else if (href.includes('sobre-equanta.html')) link.textContent = map.about;
            else if (href.includes('servicos-ambientais.html')) link.textContent = map.services;
            else if (href.includes('contato-equanta.html')) link.textContent = map.contact;
        });
    }

    updatePageSpecificContent() {
        this.redirectToLanguageVersion();
    }

    redirectToLanguageVersion() {
        const fileName = window.location.pathname.split('/').pop();
        if (this.currentLang === 'en' && !fileName.includes('-en')) window.location.reload();
    }

    updateFooter() {
        const translations = {
            en: {
                sitemap: 'Site Map',
                company: 'Company',
                digitalCompany: 'We are a digital company',
                basedIn: 'Based in São Paulo - SP',
                hours: 'We serve from Monday to Friday from 9:00 to 17:00',
            },
            pt: {
                sitemap: 'Mapa do Site',
                company: 'Empresa',
                digitalCompany: 'Somos uma empresa digital',
                basedIn: 'Sediada em São Paulo - SP',
                hours: 'Atendemos de segunda a sexta das 9:00 às 17:00',
            },
        };

        const map = translations[this.currentLang];
        document.querySelectorAll('.footer--widget-title h5').forEach(title => {
            if (/Mapa do Site|Site Map/.test(title.textContent)) title.textContent = map.sitemap;
            else if (/Empresa|Company/.test(title.textContent)) title.textContent = map.company;
        });

        document.querySelectorAll('.widget--content p').forEach(text => {
            if (/Somos uma empresa digital|We are a digital company/.test(text.textContent)) {
                const lines = text.innerHTML.split('<br>');
                if (lines.length >= 3) {
                    [lines[0], lines[1], lines[2]] = [map.digitalCompany, map.basedIn, map.hours];
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
        const switcherHTML = `
            <div class="language-switcher">
                <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">PT</button>
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            </div>
        `;

        const header = document.querySelector('.header, header, .navbar, .site-header');
        if (header) header.insertAdjacentHTML('beforeend', switcherHTML);
        else document.body.insertAdjacentHTML('afterbegin', switcherHTML);

        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
        });
    }
}

// Wait until header exists before initializing
document.addEventListener('DOMContentLoaded', () => {
    const wait = setInterval(() => {
        if (document.querySelector('.header, header, .navbar, .site-header')) {
            clearInterval(wait);
            new LanguageSwitcher();
        }
    }, 100);
});
