// Blog page specific initialization
import { BlogManager } from './modules/blog.js';
import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import htmlLoader from './modules/html-loader.js';
import { blogData } from './data/blog-data.js';

class BlogApp {
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
                { path: 'partials/blog.html', container: 'blog-container' },
                { path: 'partials/footer.html', container: 'footer-container' }
            ]);

            // Initialize managers
            this.navigation = new NavigationManager();
            this.blog = new BlogManager(blogData);
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
            console.error('Blog initialization error:', error);
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
            const blogLink = document.querySelector('a[href*="blog"]');
            if (blogLink) blogLink.classList.add('active');
        }, 100);
    }

}

new BlogApp();
