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
            projectElement.className = `col-lg-4 col-md-6 mb-4 portfolio-item ${project.category}`;
            projectElement.setAttribute('data-aos', 'fade-up');
            projectElement.setAttribute('data-aos-delay', (index * 100).toString());
            
            projectElement.innerHTML = `
                <div class="card h-100 border-0 shadow-sm">
                    <div class="position-relative overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="card-img-top" style="height: 200px; object-fit: cover;" loading="lazy">
                        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center opacity-0 hover-overlay" style="transition: opacity 0.3s ease;">
                            <div class="d-flex gap-2">
                                ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-light btn-sm rounded-circle" style="width: 40px; height: 40px;" aria-label="View on GitHub">
                                    <i class="fab fa-github"></i>
                                </a>` : ''}
                                ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-light btn-sm rounded-circle" style="width: 40px; height: 40px;" aria-label="View Demo">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>` : ''}
                                <button class="btn btn-light btn-sm rounded-circle portfolio-details-btn" style="width: 40px; height: 40px;" data-project-id="${project.id}" aria-label="View Details">
                                    <i class="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">${project.date}</small>
                            <div class="d-flex gap-1">
                                ${project.tags.slice(0, 2).map(tag => `<span class="badge bg-secondary">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text text-muted">${project.excerpt}</p>
                        <div class="d-flex flex-wrap gap-1 mt-auto">
                            ${project.technologies ? project.technologies.slice(0, 3).map(tech => `<span class="badge bg-primary">${tech}</span>`).join('') : ''}
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
        const filterButtons = document.querySelectorAll('[data-filter]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('btn-outline-primary');
                    btn.classList.remove('btn-primary');
                });
                // Add active class to clicked button
                button.classList.add('active');
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-primary');
                
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
