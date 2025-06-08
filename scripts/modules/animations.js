// Animations module - handles all animation-related functionality
export class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTypingAnimation();
        this.setupSkillsAnimation();
        this.setupFloatingElements();
        // this.setupLoadingScreen(); // Commented out - handled by App class
        this.setupLazyLoading();
        this.initAOS(); // Initialize AOS animations
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const roles = [
            'Machine Learning Engineer',
            'Data Scientist', 
            'AI Researcher',
            'Complex Systems Engineer'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeRole = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentRole.length) {
                speed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 500; // Pause before next role
            }
            
            setTimeout(typeRole, speed);
        };
        
        typeRole();
    }

    setupSkillsAnimation() {
        const skillBars = document.querySelectorAll('.progress-bar[data-progress]');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                    entry.target.setAttribute('aria-valuenow', progress);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillsObserver.observe(bar);
        });
    }

    setupFloatingElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 10 + 's';
            element.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(element);
        }
    }

    setupLoadingScreen() {
        // Hide loading screen after content is loaded
        const hideLoadingScreen = () => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 500); // Reduced delay for faster loading
            }
        };

        // Hide loading screen when window loads OR when DOM content loads (for faster response)
        if (document.readyState === 'complete') {
            hideLoadingScreen();
        } else {
            window.addEventListener('load', hideLoadingScreen);
            // Also try on DOMContentLoaded as backup
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(hideLoadingScreen, 1000);
            });
        }
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Initialize AOS if available
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true
            });
        }
    }
}
