// Certifications Manager Module
export class CertificationsManager {
    constructor(certificationsData) {
        this.certifications = certificationsData.certifications;
        this.skills = certificationsData.skills;
    }

    // Get all certifications
    getAllCertifications() {
        return this.certifications;
    }

    // Get certifications by category
    getCertificationsByCategory(category) {
        return this.certifications.filter(cert => cert.category === category);
    }

    // Get certifications by provider
    getCertificationsByProvider(provider) {
        return this.certifications.filter(cert => cert.provider === provider);
    }

    // Get all skills
    getAllSkills() {
        return this.skills;
    }

    // Get skills by category
    getSkillsByCategory(category) {
        return this.skills.find(skillGroup => skillGroup.category === category)?.skills || [];
    }

    // Render certifications section
    renderCertifications(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Group certifications by category
        const categories = [...new Set(this.certifications.map(cert => cert.category))];
        
        const certificationsHtml = categories.map(category => {
            const categoryCerts = this.getCertificationsByCategory(category);
            const certsHtml = categoryCerts.map(cert => `
                <div class="col-md-6 mb-3">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h4 class="card-title h6 mb-0">${cert.title}</h4>
                                <span class="badge bg-primary">${cert.year}</span>
                            </div>
                            <div class="text-primary fw-semibold mb-2">${cert.provider}</div>
                            ${cert.credential ? `<div class="text-muted small mb-1">Credential ID: ${cert.credential}</div>` : ''}
                            ${cert.skills ? `<div class="text-muted small">Skills: ${cert.skills}</div>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

            return `
                <div class="mb-4">
                    <h3 class="h5 fw-bold text-primary mb-3">${category}</h3>
                    <div class="row">
                        ${certsHtml}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="certifications-section">
                <h2 class="display-6 fw-bold text-center mb-4">Professional Certifications</h2>
                <div class="certifications-content">
                    ${certificationsHtml}
                </div>
            </div>
        `;
    }

    // Render skills section
    renderSkills(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const skillsHtml = this.skills.map(skillGroup => `
            <div class="mb-4">
                <h3 class="h5 fw-bold text-primary mb-3">${skillGroup.category}</h3>
                <div class="d-flex flex-wrap gap-2">
                    ${skillGroup.skills.map(skill => `
                        <span class="badge bg-secondary">${skill}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="skills-section">
                <h2 class="display-6 fw-bold text-center mb-4">Technical Skills</h2>
                <div class="skills-content">
                    ${skillsHtml}
                </div>
            </div>
        `;
    }

    // Render combined certifications and skills
    renderCertificationsAndSkills(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="certifications-skills-section">
                <div id="certifications-container"></div>
                <div id="skills-container"></div>
            </div>
        `;

        // Render both sections
        this.renderCertifications('certifications-container');
        this.renderSkills('skills-container');
    }

    // Get certifications statistics
    getCertificationsStats() {
        const categories = [...new Set(this.certifications.map(cert => cert.category))];
        const providers = [...new Set(this.certifications.map(cert => cert.provider))];
        const years = [...new Set(this.certifications.map(cert => cert.year))];
        
        return {
            totalCertifications: this.certifications.length,
            categories: categories.length,
            providers: providers.length,
            totalSkills: this.skills.reduce((total, group) => total + group.skills.length, 0),
            skillCategories: this.skills.length,
            yearRange: {
                earliest: Math.min(...years.map(y => parseInt(y))),
                latest: Math.max(...years.map(y => parseInt(y)))
            },
            categoriesBreakdown: categories.map(category => ({
                category,
                count: this.getCertificationsByCategory(category).length
            })),
            providersBreakdown: providers.map(provider => ({
                provider,
                count: this.getCertificationsByProvider(provider).length
            }))
        };
    }

    // Search certifications and skills
    search(query) {
        const lowerQuery = query.toLowerCase();
        
        const matchingCertifications = this.certifications.filter(cert =>
            cert.title.toLowerCase().includes(lowerQuery) ||
            cert.provider.toLowerCase().includes(lowerQuery) ||
            (cert.skills && cert.skills.toLowerCase().includes(lowerQuery))
        );

        const matchingSkills = this.skills.filter(skillGroup =>
            skillGroup.category.toLowerCase().includes(lowerQuery) ||
            skillGroup.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
        );

        return {
            certifications: matchingCertifications,
            skills: matchingSkills
        };
    }
}
