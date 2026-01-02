"use client";

import { portfolioData } from "@/data/portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Awards & Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {portfolioData.awards.map((award, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              data-aos="fade-up"
            >
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <FontAwesomeIcon icon={faTrophy} className="text-amber-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{award.title}</h3>
                <p className="text-gray-600 text-sm">{award.organization} • {award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
