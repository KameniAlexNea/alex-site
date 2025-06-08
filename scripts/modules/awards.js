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
            <div class="award-item">
                <div class="award-header">
                    <h3 class="award-title">${award.title}</h3>
                    <span class="award-year">${award.year}</span>
                </div>
                <div class="award-organization">${award.organization}</div>
                <p class="award-description">${award.description}</p>
                ${award.details ? `<div class="award-details">${award.details}</div>` : ''}
            </div>
        `).join('');

        container.innerHTML = `
            <div class="awards-section">
                <h2>Awards & Recognition</h2>
                <div class="awards-grid">
                    ${awardsHtml}
                </div>
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
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${award.title}</h3>
                        <span class="timeline-year">${award.year}</span>
                    </div>
                    <div class="timeline-organization">${award.organization}</div>
                    <p class="timeline-description">${award.description}</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="awards-timeline">
                <h2>Awards Timeline</h2>
                <div class="timeline">
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
