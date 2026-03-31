import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Achievements from './components/sections/Achievements';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

const GlobalScene = lazy(() => import('./components/three/GlobalScene'));

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <GlobalScene />
      </Suspense>
      <div className="relative z-10">
        <Navbar />
        <SocialSidebar />
        <main>
          <Hero />
          <About />
          <Achievements />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
