// Experience Manager - handles experience and education timeline
import { experienceData } from '../data/experience-data.js';

export class ExperienceManager {
    constructor() {
        this.data = experienceData;
        this.init();
    }

    init() {
        this.renderTimeline();
    }

    renderTimeline() {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;

        // Clear existing content
        timelineContainer.innerHTML = '';

        // Combine work experience and education, sort by date
        const allItems = [
            ...this.data.workExperience.map(item => ({ ...item, type: 'work' })),
            ...this.data.education.map(item => ({ ...item, type: 'education' }))
        ];

        // Sort by most recent first (rough date sorting)
        allItems.sort((a, b) => {
            const aYear = this.extractYear(a.duration);
            const bYear = this.extractYear(b.duration);
            return bYear - aYear;
        });

        // Render each item
        allItems.forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            timelineContainer.appendChild(timelineItem);
        });
    }

    extractYear(duration) {
        // Extract the starting year from duration string
        const match = duration.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
    }

    createTimelineItem(item, index) {
        const itemElement = document.createElement('div');
        itemElement.className = 'mb-4';
        itemElement.setAttribute('data-aos', 'fade-up');
        itemElement.setAttribute('data-aos-delay', (index * 100).toString());

        const isWork = item.type === 'work';
        const title = isWork ? item.title : item.degree;
        const company = isWork ? item.company : item.institution;
        const duration = item.duration;

        let skillsHtml = '';
        if (item.skills && item.skills.length > 0) {
            skillsHtml = `
                <div class="d-flex flex-wrap gap-1 mt-2">
                    ${item.skills.map(skill => `<span class="badge bg-primary">${skill}</span>`).join('')}
                </div>
            `;
        }

        let achievementsHtml = '';
        if (item.achievements && item.achievements.length > 0) {
            achievementsHtml = `
                <ul>
                    ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            `;
        }

        itemElement.innerHTML = `
            <div class="position-relative ps-4 pb-4">
                <div class="position-absolute top-0 start-0 bg-primary rounded-circle" style="width: 12px; height: 12px; margin-top: 6px;"></div>
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h3 class="h5 mb-1">${title}</h3>
                                <span class="text-primary fw-semibold">${company}</span>
                            </div>
                            <span class="badge bg-light text-dark ms-2">${duration}</span>
                        </div>
                        <div class="text-muted">
                            <p class="mb-2">${item.description}</p>
                            ${achievementsHtml}
                            ${skillsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return itemElement;
    }

    // Method to add new experience/education item
    addItem(item, type) {
        if (type === 'work') {
            this.data.workExperience.unshift(item);
        } else if (type === 'education') {
            this.data.education.unshift(item);
        }
        this.renderTimeline();
    }

    // Method to get statistics
    getStats() {
        return {
            totalWorkExperience: this.data.workExperience.length,
            totalEducation: this.data.education.length,
            totalYearsExperience: this.calculateTotalExperience(),
            companies: [...new Set(this.data.workExperience.map(item => item.company))].length
        };
    }

    calculateTotalExperience() {
        // Simple calculation based on work experience
        let totalMonths = 0;
        this.data.workExperience.forEach(item => {
            const duration = item.duration.toLowerCase();
            if (duration.includes('present')) {
                // Calculate from start date to present
                const startYear = this.extractYear(item.duration);
                const currentYear = new Date().getFullYear();
                totalMonths += (currentYear - startYear) * 12;
            }
            // Add more sophisticated duration parsing if needed
        });
        return Math.floor(totalMonths / 12);
    }
}

export default ExperienceManager;
