// Awards Manager Module
export class AwardsManager {
    constructor(awardsData) {
        this.awards = awardsData;
    }

    // Get all awards
    getAllAwards() {
        return this.awards;
    }

    // Get awards by category
    getAwardsByCategory(category) {
        return this.awards.filter(award => award.category === category);
    }

    // Get recent awards (last 3 years)
    getRecentAwards(yearsBack = 3) {
        const currentYear = new Date().getFullYear();
        const cutoffYear = currentYear - yearsBack;
        
        return this.awards.filter(award => {
            const awardYear = parseInt(award.year);
            return awardYear >= cutoffYear;
        });
    }

    // Render awards section
    renderAwards(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const awardsHtml = this.awards.map(award => `
            <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h3 class="card-title h5">${award.title}</h3>
                            <span class="badge bg-primary">${award.year}</span>
                        </div>
                        <div class="text-primary fw-semibold mb-2">${award.organization}</div>
                        <p class="card-text text-muted">${award.description}</p>
                        ${award.details ? `<div class="text-muted small">${award.details}</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <h2 class="display-6 fw-bold text-center mb-4">Awards & Recognition</h2>
                </div>
                ${awardsHtml}
            </div>
        `;
    }

    // Render awards timeline
    renderAwardsTimeline(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sort awards by year (most recent first)
        const sortedAwards = [...this.awards].sort((a, b) => parseInt(b.year) - parseInt(a.year));

        const timelineHtml = sortedAwards.map(award => `
            <div class="mb-4">
                <div class="position-relative ps-4 pb-4">
                    <div class="position-absolute top-0 start-0 bg-primary rounded-circle" style="width: 12px; height: 12px; margin-top: 6px;"></div>
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h3 class="h5 mb-1">${award.title}</h3>
                                <span class="badge bg-primary">${award.year}</span>
                            </div>
                            <div class="text-primary fw-semibold mb-2">${award.organization}</div>
                            <p class="text-muted mb-0">${award.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="awards-timeline">
                <h2 class="display-6 fw-bold text-center mb-4">Awards Timeline</h2>
                <div class="position-relative">
                    ${timelineHtml}
                </div>
            </div>
        `;
    }

    // Get awards statistics
    getAwardsStats() {
        const categories = [...new Set(this.awards.map(award => award.category))];
        const years = [...new Set(this.awards.map(award => award.year))];
        
        return {
            totalAwards: this.awards.length,
            categories: categories.length,
            yearRange: {
                earliest: Math.min(...years.map(y => parseInt(y))),
                latest: Math.max(...years.map(y => parseInt(y)))
            },
            categoriesBreakdown: categories.map(category => ({
                category,
                count: this.getAwardsByCategory(category).length
            }))
        };
    }
}
