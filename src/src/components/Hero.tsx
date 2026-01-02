"use client";

import { portfolioData } from "@/data/portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const iconMap: any = {
  github: faGithub,
  twitter: faTwitter,
  linkedin: faLinkedin,
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white pt-20">
      <div className="container mx-auto px-6 text-center" data-aos="fade-up">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Hi, I'm <span className="text-indigo-600">{portfolioData.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {portfolioData.title}
        </p>
        <div className="flex justify-center space-x-6 mb-12">
          {portfolioData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 text-3xl transition-transform hover:-translate-y-1"
            >
              <FontAwesomeIcon icon={iconMap[social.icon]} />
            </a>
          ))}
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-gray-600 hover:text-indigo-600 text-3xl transition-transform hover:-translate-y-1"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <a
          href="#portfolio"
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          View My Work
        </a>
      </div>
    </section>
  );
}
