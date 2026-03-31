import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { resumeData } from '../../data/resume';

function HeroAvatar() {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full border-2 border-surface-200 shadow-2xl shadow-primary-500/10 flex items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200 overflow-hidden">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={resumeData.profileImage}
          alt={`Professional headshot of ${resumeData.name}, ${resumeData.title}`}
          className="w-full h-full object-cover aspect-square"
          loading="eager"
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            setImageLoading(false);
            if (resumeData.profileImageFallback) {
              e.currentTarget.src = resumeData.profileImageFallback;
              setImageError(false);
            } else {
              setImageError(true);
              e.currentTarget.style.display = 'none';
            }
          }}
          style={{ display: imageError ? 'none' : 'block' }}
        />
        <span
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text select-none absolute inset-0 items-center justify-center"
          style={{ display: imageError ? 'flex' : 'none' }}
        >
          NS
        </span>
      </div>
      <div className="absolute -inset-3 rounded-full border border-primary-400/15 animate-[spin_20s_linear_infinite]" />
      <div className="absolute -inset-8 rounded-full border border-accent-400/10 animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-primary-500/10 blur-xl animate-glow" />
      <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-accent-400/10 blur-xl animate-glow" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50/90 via-surface-50/70 to-surface-100/90 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-surface-500 text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                {resumeData.availability}
              </p>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-surface-900">I am</span>{' '}
              <span className="gradient-text">{resumeData.name.split(' ')[0]}</span>
              <br />
              <span className="gradient-text">{resumeData.name.split(' ')[1]}</span>
              <span className="text-primary-500">.</span>
            </motion.h1>

            <motion.p
              className="text-surface-500 text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {resumeData.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center whitespace-nowrap min-w-[160px] px-8 py-4 bg-surface-900 text-white rounded-xl font-medium text-sm tracking-wide hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-surface-900/10"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center whitespace-nowrap min-w-[160px] px-8 py-4 border border-surface-300 text-surface-700 rounded-xl font-medium text-sm tracking-wide hover:border-primary-400 hover:text-primary-600 transition-all duration-300"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
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
        transition={{ delay: 1.3 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-surface-400 hover:text-primary-500 transition-colors"
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
