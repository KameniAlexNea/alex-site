/**
 * HTML Loader Module
 * Dynamically loads HTML partials into containers
 * Handles asynchronous loading and error handling
 */

export class HTMLLoader {
    constructor() {
        this.loadedPartials = new Map();
        this.loadPromises = new Map();
    }

    /**
     * Load HTML partial into container
     * @param {string} partialPath - Path to the HTML partial
     * @param {string} containerId - ID of the container element
     * @returns {Promise<void>}
     */
    async loadPartial(partialPath, containerId) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Container with ID '${containerId}' not found`);
            }

            // Check if already loading
            const cacheKey = `${partialPath}-${containerId}`;
            if (this.loadPromises.has(cacheKey)) {
                return await this.loadPromises.get(cacheKey);
            }

            // Create loading promise
            const loadPromise = this._fetchAndInsert(partialPath, container);
            this.loadPromises.set(cacheKey, loadPromise);

            await loadPromise;
            this.loadPromises.delete(cacheKey);

        } catch (error) {
            console.error(`Error loading partial ${partialPath}:`, error);
            this._showError(containerId, error.message);
        }
    }

    /**
     * Load multiple partials in parallel
     * @param {Array<{path: string, container: string}>} partials
     * @returns {Promise<void>}
     */
    async loadPartials(partials) {
        const loadPromises = partials.map(({ path, container }) => 
            this.loadPartial(path, container)
        );
        
        try {
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('❌ Error loading partials:', error);
            throw error;
        }
    }

    /**
     * Fetch HTML content and insert into container
     * @private
     */
    async _fetchAndInsert(partialPath, container) {
        // Check cache first
        if (this.loadedPartials.has(partialPath)) {
            container.innerHTML = this.loadedPartials.get(partialPath);
            return;
        }

        const response = await fetch(partialPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${partialPath}: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        this.loadedPartials.set(partialPath, html);
        container.innerHTML = html;
    }

    /**
     * Show error message in container
     * @private
     */
    _showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error loading content: ${message}</p>
                </div>
            `;
        }
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.loadedPartials.clear();
        this.loadPromises.clear();
    }

    /**
     * Preload partials for better performance
     * @param {string[]} partialPaths
     */
    async preloadPartials(partialPaths) {
        const preloadPromises = partialPaths.map(async (path) => {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const html = await response.text();
                    this.loadedPartials.set(path, html);
                }
            } catch (error) {
                // Silently handle preload errors
            }
        });

        await Promise.allSettled(preloadPromises);
    }
}

// Export default instance
export default new HTMLLoader();
