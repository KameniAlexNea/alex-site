// Main application file - imports and initializes all modules
import { NavigationManager } from './modules/navigation.js';
import { PortfolioManager } from './modules/portfolio.js';
import { BlogManager } from './modules/blog.js';
import { AnimationManager } from './modules/animations.js';
import { ContactManager } from './modules/contact.js';
import { ExperienceManager } from './modules/experience.js';
import { AwardsManager } from './modules/awards.js';
import { CertificationsManager } from './modules/certifications.js';
import htmlLoader from './modules/html-loader.js';
import { portfolioData } from './data/portfolio-data.js';
import { blogData } from './data/blog-data.js';
// import { experienceData } from './experience-data.js';
import { certificationsData } from './data/certifications-data.js';
import { awardsData } from './data/awards-data.js';

class App {
    constructor() {
        this.managers = {};
        this.htmlLoader = htmlLoader;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadHTMLAndInitialize());
        } else {
            this.loadHTMLAndInitialize();
        }

        // Fallback timeout to hide loading screen (safety net)
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                this.hideLoadingScreen();
            }
        }, 10000); // 10 second timeout
    }

    async loadHTMLAndInitialize() {
        try {
            // First load all HTML partials
            await this.loadHTMLPartials();
            
            // Then initialize managers
            this.initializeManagers();
        } catch (error) {
            // Hide loading screen even on error
            this.hideLoadingScreen();
        }
    }

    async loadHTMLPartials() {
        const partials = [
            { path: 'partials/navigation.html', container: 'navigation-container' },
            { path: 'partials/hero.html', container: 'hero-container' },
            { path: 'partials/about.html', container: 'about-container' },
            { path: 'partials/experience.html', container: 'experience-container' },
            { path: 'partials/portfolio.html', container: 'portfolio-container' },
            { path: 'partials/awards.html', container: 'awards-container' },
            { path: 'partials/certifications.html', container: 'certifications-container' },
            { path: 'partials/blog.html', container: 'blog-container' },
            { path: 'partials/publications.html', container: 'publications-container' },
            { path: 'partials/contact.html', container: 'contact-container' },
            { path: 'partials/footer.html', container: 'footer-container' }
        ];

        try {
            await this.htmlLoader.loadPartials(partials);
        } catch (error) {
            console.error('Error loading HTML partials:', error);
            throw error; // Re-throw to be caught by caller
        }
    }

    initializeManagers() {
        try {
            // Initialize all managers
            this.managers.navigation = new NavigationManager();
            this.managers.portfolio = new PortfolioManager(portfolioData);
            this.managers.blog = new BlogManager(blogData);
            this.managers.animations = new AnimationManager();
            this.managers.contact = new ContactManager();
            this.managers.experience = new ExperienceManager();
            this.managers.awards = new AwardsManager(awardsData);
            this.managers.certifications = new CertificationsManager({ 
                certifications: certificationsData.certifications, 
                skills: certificationsData.professionalSkills 
            });
            
            // Initialize content rendering
            this.initializeContent();
            
            // Hide loading screen after successful initialization
            this.hideLoadingScreen();
            
            // Add welcome message
            this.showWelcomeMessage();
        } catch (error) {
            console.error('Error initializing managers:', error);
            // Hide loading screen even on error to prevent infinite loading
            this.hideLoadingScreen();
        }
    }

    initializeContent() {
        // Render awards section
        if (this.managers.awards) {
            this.managers.awards.renderAwards('awards-content');
        }
        
        // Render certifications and skills
        if (this.managers.certifications) {
            this.managers.certifications.renderCertificationsAndSkills('certifications-content');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }
    }

    showWelcomeMessage() {
        console.log('%c👋 Hello! Welcome to Alex Kameni\'s Portfolio', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
        console.log('%cInterested in the code? Check out my GitHub: https://github.com/KameniAlexNea', 'color: #6b7280; font-size: 12px;');
    }

    // Method to get specific manager instance
    getManager(name) {
        return this.managers[name];
    }

    // Method to reinitialize all managers (useful for hot reloading)
    reinitialize() {
        this.initializeManagers();
    }

}

// Initialize the application
const app = new App();

// Make app instance available globally for debugging
window.app = app;

export default app;
