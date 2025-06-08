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
        section.className = 'blog';
        section.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Latest Blog Posts</h2>
                    <p class="section-subtitle">Insights, tutorials, and thoughts on AI and machine learning</p>
                </div>
                
                <div class="blog-filters">
                    <button class="filter-btn active" data-filter="all">All Posts</button>
                    <button class="filter-btn" data-filter="llm">LLM & NLP</button>
                    <button class="filter-btn" data-filter="cv">Computer Vision</button>
                    <button class="filter-btn" data-filter="ml">Machine Learning</button>
                    <button class="filter-btn" data-filter="tools">Tools & Frameworks</button>
                </div>
                
                <div class="blog-grid" id="blog-grid">
                    <!-- Blog posts will be dynamically loaded -->
                </div>
                
                <div class="blog-load-more">
                    <button class="btn btn-outline" id="blog-load-more-btn">
                        <i class="fas fa-plus"></i>
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
            postElement.className = 'blog-card';
            postElement.setAttribute('data-aos', 'fade-up');
            postElement.setAttribute('data-aos-delay', (index * 100).toString());
            
            postElement.innerHTML = `
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-date">${this.formatDate(post.date)}</span>
                        <div class="blog-tags">
                            ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <h3 class="blog-title">
                        <a href="${post.permalink}" class="blog-link">${post.title}</a>
                    </h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-footer">
                        <span class="read-time">${this.calculateReadTime(post.content)} min read</span>
                        <a href="${post.permalink}" class="read-more">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
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
            if (e.target.matches('.blog-filters .filter-btn')) {
                const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
                
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
