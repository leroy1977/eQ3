// Language Switcher for eQuanta website
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
