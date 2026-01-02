"use client";

import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Experience</h2>
        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-12 border-l-2 border-indigo-200 last:pb-0"
              data-aos="fade-up"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{exp.role}</h3>
                <p className="text-gray-600 font-medium mb-4">{exp.company}</p>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
