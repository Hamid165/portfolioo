import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Modern lenis requires its CSS
import './App.css';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillIcons from './components/SkillIcons';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Activities from './components/Activities';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Lenis >= 1.0 supports autoRaf
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      {/* Single global 3D background — scroll-driven */}
      <Background3D />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Activities />
        <SkillIcons />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
