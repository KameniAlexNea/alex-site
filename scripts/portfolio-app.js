// Portfolio page specific initialization
import { PortfolioManager } from './modules/portfolio.js';
import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import htmlLoader from './modules/html-loader.js';
import { portfolioData } from './data/portfolio-data.js';

class PortfolioApp {
    constructor() {
        // Add fallback timeout to hide loading screen after 10 seconds
        this.fallbackTimeout = setTimeout(() => {
            this.hideLoadingScreen();
        }, 10000);
        
        this.init();
    }

    async init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAndInitialize());
        } else {
            this.loadAndInitialize();
        }
    }

    async loadAndInitialize() {
        try {
            // Load partials
            await htmlLoader.loadPartials([
                { path: 'partials/navigation.html', container: 'navigation-container' },
                { path: 'partials/portfolio.html', container: 'portfolio-container' },
                { path: 'partials/footer.html', container: 'footer-container' }
            ]);

            // Initialize managers
            this.navigation = new NavigationManager();
            this.portfolio = new PortfolioManager(portfolioData);
            this.animations = new AnimationManager();

            // Update active nav link
            this.updateActiveNav();

            // Hide loading screen
            this.hideLoadingScreen();
            
            // Clear fallback timeout since we succeeded
            if (this.fallbackTimeout) {
                clearTimeout(this.fallbackTimeout);
                this.fallbackTimeout = null;
            }

        } catch (error) {
            console.error('Portfolio initialization error:', error);
            this.hideLoadingScreen(); // Hide loading screen even on error
            
            // Clear fallback timeout
            if (this.fallbackTimeout) {
                clearTimeout(this.fallbackTimeout);
                this.fallbackTimeout = null;
            }
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }
    }

    updateActiveNav() {
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const portfolioLink = document.querySelector('a[href*="portfolio"]');
            if (portfolioLink) portfolioLink.classList.add('active');
        }, 100);
    }

}

new PortfolioApp();
