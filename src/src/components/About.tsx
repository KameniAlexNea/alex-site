"use client";

import { portfolioData } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {portfolioData.about.text}
            </p>
            <div className="flex flex-wrap gap-3">
              {portfolioData.about.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-gray-200 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-5xl">
                {/* Placeholder for profile image */}
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
