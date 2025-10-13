// Language Switcher for eQuanta website
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    // Get current language from localStorage or browser
    getCurrentLanguage() {
        return localStorage.getItem('preferredLanguage') || 
               document.documentElement.lang || 
               'en';
    }

    // Set language preference
    setLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
        this.currentLang = lang;
        document.documentElement.lang = lang;
        this.updatePageContent();
        this.updateActiveButton(lang);
    }

    // Update active button state
    updateActiveButton(lang) {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Update page content based on language
    updatePageContent() {
        // Update meta tags
        this.updateMetaTags();
        
        // Update navigation
        this.updateNavigation();
        
        // Update page-specific content
        this.updatePageSpecificContent();
        
        // Update footer
        this.updateFooter();
    }

    // Update meta tags
    updateMetaTags() {
        const metaLanguage = document.querySelector('meta[http-equiv="content-language"]');
        if (metaLanguage) {
            metaLanguage.setAttribute('content', this.currentLang);
        }
    }

    // Update navigation text
    updateNavigation() {
        const translations = {
            'en': {
                'home': 'Home',
                'about': 'About Us',
                'services': 'Services',
                'contact': 'Contact'
            },
            'pt': {
                'home': 'Home',
                'about': 'Sobre Nós',
                'services': 'Serviços',
                'contact': 'Contato'
            }
        };

        // Update navigation links
        const navLinks = document.querySelectorAll('#navbarContent a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('index.html') || href === 'index.html') {
                link.textContent = translations[this.currentLang].home;
            } else if (href.includes('sobre-equanta.html')) {
                link.textContent = translations[this.currentLang].about;
            } else if (href.includes('servicos-ambientais.html')) {
                link.textContent = translations[this.currentLang].services;
            } else if (href.includes('contato-equanta.html')) {
                link.textContent = translations[this.currentLang].contact;
            }
        });
    }

    // Update page-specific content
    updatePageSpecificContent() {
        // This would need to be customized for each page
        // For now, we'll just reload the page to show the correct language version
        this.redirectToLanguageVersion();
    }

    // Redirect to the appropriate language version of the page
    redirectToLanguageVersion() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop();
        
        // If we're on a Portuguese page and user selects English, redirect to English version
        if (this.currentLang === 'en' && !fileName.includes('_en')) {
            // For now, we'll just reload as we've already translated all pages
            // In a real implementation, you might have separate files or use a CMS
            window.location.reload();
        }
    }

    // Update footer content
    updateFooter() {
        const translations = {
            'en': {
                'sitemap': 'Site Map',
                'company': 'Company',
                'digitalCompany': 'We are a digital company',
                'basedIn': 'Based in São Paulo - SP',
                'hours': 'We serve from Monday to Friday from 9:00 to 17:00'
            },
            'pt': {
                'sitemap': 'Mapa do Site',
                'company': 'Empresa',
                'digitalCompany': 'Somos uma empresa digital',
                'basedIn': 'Sediada em São Paulo - SP',
                'hours': 'Atendemos de segunda a sexta das 9:00 às 17:00'
            }
        };

        // Update footer titles
        const footerTitles = document.querySelectorAll('.footer--widget-title h5');
        footerTitles.forEach(title => {
            if (title.textContent.includes('Mapa do Site') || title.textContent.includes('Site Map')) {
                title.textContent = translations[this.currentLang].sitemap;
            } else if (title.textContent.includes('Empresa') || title.textContent.includes('Company')) {
                title.textContent = translations[this.currentLang].company;
            }
        });

        // Update footer text
        const footerText = document.querySelectorAll('.widget--content p');
        footerText.forEach(text => {
            if (text.textContent.includes('Somos uma empresa digital') || 
                text.textContent.includes('We are a digital company')) {
                const lines = text.innerHTML.split('<br>');
                if (lines.length >= 3) {
                    lines[0] = translations[this.currentLang].digitalCompany;
                    lines[1] = translations[this.currentLang].basedIn;
                    lines[2] = translations[this.currentLang].hours;
                    text.innerHTML = lines.join('<br>');
                }
            }
        });
    }

    // Initialize the language switcher
    init() {
        // Create language switcher HTML
        this.createLanguageSwitcher();
        
        // Set initial active button
        this.updateActiveButton(this.currentLang);
        
        // Update page content on initial load
        this.updatePageContent();
    }

    // Create language switcher HTML
    createLanguageSwitcher() {
        const switcherHTML = `
            <div class="language-switcher">
                <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">PT</button>
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            </div>
        `;

        // Add to header (you might need to adjust the selector based on your header structure)
        const header = document.querySelector('.header');
        if (header) {
            header.insertAdjacentHTML('beforeend', switcherHTML);
        }

        // Add event listeners
        this.addEventListeners();
    }

    // Add event listeners to language buttons
    addEventListeners() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LanguageSwitcher();
});