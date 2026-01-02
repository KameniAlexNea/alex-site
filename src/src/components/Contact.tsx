"use client";

import { portfolioData } from "@/data/portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-indigo-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Get In Touch</h2>
        <p className="text-indigo-100 text-lg mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-flex items-center bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
          {portfolioData.email}
        </a>
      </div>
    </section>
  );
}
