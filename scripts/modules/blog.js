// Blog module - handles blog posts display and management
export class BlogManager {
    constructor(blogData) {
        this.blogData = blogData;
        this.displayedPosts = 4;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupBlogSection();
        this.setupBlogFiltering();
        this.setupLoadMore();
        this.renderInitialBlog();
    }

    setupBlogSection() {
        // Add blog section to the page if it doesn't exist
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection && !document.getElementById('blog')) {
            const blogSection = this.createBlogSection();
            portfolioSection.insertAdjacentElement('afterend', blogSection);
        }
    }

    createBlogSection() {
        const section = document.createElement('section');
        section.id = 'blog';
        section.className = 'py-5';
        section.innerHTML = `
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="display-5 fw-bold">Latest Blog Posts</h2>
                    <p class="lead text-muted">Insights, tutorials, and thoughts on AI and machine learning</p>
                </div>
                
                <div class="d-flex justify-content-center mb-4">
                    <div class="btn-group" role="group">
                        <button class="btn btn-outline-primary active" data-filter="all">All Posts</button>
                        <button class="btn btn-outline-primary" data-filter="llm">LLM & NLP</button>
                        <button class="btn btn-outline-primary" data-filter="cv">Computer Vision</button>
                        <button class="btn btn-outline-primary" data-filter="ml">Machine Learning</button>
                        <button class="btn btn-outline-primary" data-filter="tools">Tools & Frameworks</button>
                    </div>
                </div>
                
                <div class="row" id="blog-grid">
                    <!-- Blog posts will be dynamically loaded -->
                </div>
                
                <div class="text-center mt-4">
                    <button class="btn btn-outline-primary" id="blog-load-more-btn">
                        <i class="fas fa-plus me-2"></i>
                        Load More Posts
                    </button>
                </div>
            </div>
        `;
        return section;
    }

    renderBlogPosts(posts, startIndex = 0, count = 4) {
        const blogGrid = document.getElementById('blog-grid');
        
        if (!blogGrid) return;

        if (startIndex === 0) {
            blogGrid.innerHTML = '';
        }
        
        const postsToShow = posts.slice(startIndex, startIndex + count);
        
        postsToShow.forEach((post, index) => {
            const postElement = document.createElement('article');
            postElement.className = 'col-lg-6 mb-4';
            postElement.setAttribute('data-aos', 'fade-up');
            postElement.setAttribute('data-aos-delay', (index * 100).toString());
            
            postElement.innerHTML = `
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted small">${this.formatDate(post.date)}</span>
                            <div class="d-flex gap-1">
                                ${post.tags.slice(0, 3).map(tag => `<span class="badge bg-secondary">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <h3 class="card-title h5">
                            <a href="${post.permalink}" class="text-decoration-none">${post.title}</a>
                        </h3>
                        <p class="card-text text-muted">${post.excerpt}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="text-muted small">${this.calculateReadTime(post.content)} min read</span>
                            <a href="${post.permalink}" class="btn btn-outline-primary btn-sm">
                                Read More
                                <i class="fas fa-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            blogGrid.appendChild(postElement);
        });
        
        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    filterBlogPosts(category) {
        this.currentFilter = category;
        this.displayedPosts = 4;
        
        let filteredPosts = this.getFilteredPosts(category);
        
        this.renderBlogPosts(filteredPosts, 0, this.displayedPosts);
        this.updateLoadMoreButton(filteredPosts);
    }

    getFilteredPosts(category) {
        if (category === 'all') {
            return this.blogData;
        }
        
        return this.blogData.filter(post => {
            const postTags = post.tags.map(tag => tag.toLowerCase());
            
            const categoryMap = {
                'llm': ['llms', 'nlp', 'ai', 'json', 'xml', 'python'],
                'cv': ['computer vision', 'object detection', 'transformers'],
                'ml': ['machine learning', 'ssl', 'continual learning'],
                'tools': ['tools', 'frameworks', 'rag']
            };
            
            const targetKeywords = categoryMap[category] || [category];
            return targetKeywords.some(keyword => 
                postTags.some(tag => tag.includes(keyword.toLowerCase()))
            );
        });
    }

    updateLoadMoreButton(filteredPosts) {
        const loadMoreBtn = document.getElementById('blog-load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredPosts.length > this.displayedPosts ? 'inline-flex' : 'none';
        }
    }

    setupBlogFiltering() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-group .btn[data-filter]')) {
                const filterButtons = document.querySelectorAll('.btn-group .btn[data-filter]');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');
                this.filterBlogPosts(filterValue);
            }
        });
    }

    setupLoadMore() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('#blog-load-more-btn') || e.target.parentElement?.matches('#blog-load-more-btn')) {
                let filteredPosts = this.getFilteredPosts(this.currentFilter);
                
                const nextBatch = 4;
                this.renderBlogPosts(filteredPosts, this.displayedPosts, nextBatch);
                this.displayedPosts += nextBatch;
                
                const loadMoreBtn = document.getElementById('blog-load-more-btn');
                if (this.displayedPosts >= filteredPosts.length) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        });
    }

    renderInitialBlog() {
        this.filterBlogPosts('all');
    }
}
