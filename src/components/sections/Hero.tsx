import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroScene from '../three/HeroScene';
import { resumeData } from '../../data/resume';

function HeroAvatar() {
  return (
    <div className="relative">
      <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full border-2 border-white/10 shadow-2xl shadow-primary-500/10 flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden">
        <span className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text select-none">
          NS
        </span>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-400/5" />
      </div>
      <div className="absolute -inset-4 rounded-full border border-primary-400/10 animate-[spin_20s_linear_infinite]" />
      <div className="absolute -inset-10 rounded-full border border-accent-400/5 animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-primary-500/20 blur-xl animate-glow" />
      <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-accent-400/15 blur-xl animate-glow" />
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="absolute inset-0 -z-10 bg-dark-950">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-400/5" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Suspense fallback={<SceneLoading />}>
        <div className="hidden md:block">
          <HeroScene />
        </div>
      </Suspense>

      <div className="absolute inset-0 md:hidden bg-dark-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-400/5" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/30 via-transparent to-dark-950 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-slate-500 text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                {resumeData.availability}
              </p>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="text-white">I am</span>{' '}
              <span className="gradient-text">{resumeData.name.split(' ')[0]}</span>
              <br />
              <span className="gradient-text">{resumeData.name.split(' ')[1]}</span>
              <span className="text-primary-400">.</span>
            </motion.h1>

            <motion.p
              className="text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {resumeData.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a
                href="#work"
                className="group relative px-8 py-4 bg-white text-dark-950 rounded-full font-medium text-sm tracking-wide hover:bg-primary-400 transition-colors duration-300 overflow-hidden"
              >
                <span className="relative z-10">VIEW MY WORK</span>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-slate-700/50 text-slate-300 rounded-full font-medium text-sm tracking-wide hover:border-primary-400/50 hover:text-white transition-all duration-300"
              >
                GET IN TOUCH
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center items-center mt-8 lg:mt-0"
          >
            <HeroAvatar />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-600 hover:text-primary-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-[0.15em] uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
