"use client";

import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
        <p className="text-sm">
          Built with Next.js, Tailwind CSS, and ❤️
        </p>
      </div>
    </footer>
  );
}
