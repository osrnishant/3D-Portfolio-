import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroScene from '../three/HeroScene';
import { resumeData } from '../../data/resume';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-transparent to-dark-900" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full border border-primary-500/30 text-primary-400 bg-primary-500/5">
            Portfolio
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white">{resumeData.name.split(' ')[0]}</span>
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 bg-clip-text text-transparent">
            {resumeData.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-4 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {resumeData.title}
        </motion.p>

        <motion.p
          className="text-base sm:text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {resumeData.tagline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#projects"
            className="px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-medium hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-slate-700 text-slate-300 rounded-xl font-medium hover:border-primary-500/50 hover:text-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary-400 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
