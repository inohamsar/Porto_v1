import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import SequenceScroll from "@/components/sections/SequenceScroll";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Separator from "@/components/ui/Separator";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navbar />
      
      <main className="relative min-h-screen">
        {/* Scroll Sequence Section */}
        <SequenceScroll />
        
        {/* Post-Scroll Sections */}
        <div className="relative z-10">
          <Projects />
          <Separator />
          <About />
          <Separator />
          <Services />
          <Separator />
          <Certifications />
          <Separator />
          <Contact />
        </div>
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}
