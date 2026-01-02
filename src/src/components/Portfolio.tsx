"use client";

import { portfolioData } from "@/data/portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <i className="fas fa-code text-4xl"></i>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  View Project <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
