import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AOSProvider from "@/components/AOSProvider";

export default function Home() {
  return (
    <AOSProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Awards />
        <Contact />
        <Footer />
      </main>
    </AOSProvider>
  );
}
