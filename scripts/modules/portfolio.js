// Portfolio module - handles portfolio display and filtering
export class PortfolioManager {
    constructor(portfolioData) {
        this.portfolioData = portfolioData;
        this.displayedProjects = 6;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupFiltering();
        this.setupLoadMore();
        this.setupProjectModals();
        this.renderInitialPortfolio();
    }

    renderPortfolioItems(projects, startIndex = 0, count = 6) {
        const portfolioGrid = document.getElementById('portfolio-grid');
        
        if (!portfolioGrid) return;

        if (startIndex === 0) {
            portfolioGrid.innerHTML = ''; // Clear existing items for new filter
        }
        
        const projectsToShow = projects.slice(startIndex, startIndex + count);
        
        projectsToShow.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = `portfolio-item ${project.category}`;
            projectElement.setAttribute('data-aos', 'fade-up');
            projectElement.setAttribute('data-aos-delay', (index * 100).toString());
            
            projectElement.innerHTML = `
                <div class="portfolio-card">
                    <div class="portfolio-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="portfolio-overlay">
                            <div class="portfolio-links">
                                ${project.github ? `<a href="${project.github}" target="_blank" class="portfolio-link" aria-label="View on GitHub">
                                    <i class="fab fa-github"></i>
                                </a>` : ''}
                                ${project.demo ? `<a href="${project.demo}" target="_blank" class="portfolio-link" aria-label="View Demo">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>` : ''}
                                <button class="portfolio-link portfolio-details-btn" data-project-id="${project.id}" aria-label="View Details">
                                    <i class="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-content">
                        <div class="portfolio-meta">
                            <span class="portfolio-date">${project.date}</span>
                            <div class="portfolio-tags">
                                ${project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <h3 class="portfolio-title">${project.title}</h3>
                        <p class="portfolio-description">${project.excerpt}</p>
                        <div class="portfolio-technologies">
                            ${project.technologies ? project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
                        </div>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(projectElement);
        });
        
        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    filterProjects(category) {
        this.currentFilter = category;
        this.displayedProjects = 6; // Reset to show first 6 projects
        
        let filteredProjects = this.getFilteredProjects(category);
        
        this.renderPortfolioItems(filteredProjects, 0, this.displayedProjects);
        this.updateLoadMoreButton(filteredProjects);
    }

    getFilteredProjects(category) {
        if (category === 'all') {
            return this.portfolioData;
        }
        
        const categoryMap = {
            'llm': ['nlp', 'ai'],
            'cv': ['computer-vision'],
            'ml': ['machine-learning'],
            'tools': ['optimization']
        };
        
        const targetCategories = categoryMap[category] || [category];
        return this.portfolioData.filter(project => 
            targetCategories.includes(project.category)
        );
    }

    updateLoadMoreButton(filteredProjects) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredProjects.length > this.displayedProjects ? 'inline-flex' : 'none';
        }
    }

    setupFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                this.filterProjects(filterValue);
            });
        });
    }

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                let filteredProjects = this.getFilteredProjects(this.currentFilter);
                
                const nextBatch = 6;
                this.renderPortfolioItems(filteredProjects, this.displayedProjects, nextBatch);
                this.displayedProjects += nextBatch;
                
                // Hide load more button if all projects are displayed
                if (this.displayedProjects >= filteredProjects.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }
    }

    setupProjectModals() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('portfolio-details-btn') || 
                e.target.parentElement?.classList.contains('portfolio-details-btn')) {
                const projectId = e.target.closest('.portfolio-details-btn').getAttribute('data-project-id');
                const project = this.portfolioData.find(p => p.id == projectId);
                
                if (project) {
                    this.showProjectModal(project);
                }
            }
        });
    }

    showProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <img src="${project.image}" alt="${project.title}" class="modal-image">
                        <div class="modal-title-section">
                            <h2>${project.title}</h2>
                            <p class="modal-date">${project.date}</p>
                            <div class="modal-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <p class="modal-description">${project.description}</p>
                        ${project.technologies ? `
                            <div class="modal-technologies">
                                <h4>Technologies Used:</h4>
                                <div class="tech-list">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        <div class="modal-actions">
                            ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary">
                                <i class="fab fa-github"></i>
                                View on GitHub
                            </a>` : ''}
                            ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-outline">
                                <i class="fas fa-external-link-alt"></i>
                                Live Demo
                            </a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        this.setupModalEvents(modal);
    }

    setupModalEvents(modal) {
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                closeModal();
            }
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    renderInitialPortfolio() {
        this.filterProjects('all');
    }
}
