import { Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, GraduationCap, Globe, FileText } from 'lucide-react';
import { resumeData } from '../../data/resume';

const AboutScene = lazy(() => import('../three/AboutScene'));

function StatCounter({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-slate-500 tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const infoCards = [
    { icon: MapPin, label: 'Location', value: resumeData.location },
    { icon: Briefcase, label: 'Current Role', value: 'Web3 Marketing Lead' },
    { icon: GraduationCap, label: 'Education', value: resumeData.education[0].degree },
    { icon: Globe, label: 'Languages', value: resumeData.languages.join(', ') },
  ];

  return (
    <section id="about" className="relative py-32 sm:py-40 px-6 sm:px-8">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-24">
          {resumeData.stats.map((stat, i) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} index={i} />
          ))}
        </div>

        <div className="glow-line mb-24" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary-400 text-xs font-medium tracking-[0.2em] uppercase">
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-8 leading-tight">
              WHAT<br />
              <span className="gradient-text">I DO</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {resumeData.about}
            </p>

            <p className="text-slate-500 leading-relaxed">
              Strong track record of driving user acquisition, building ambassador programs,
              managing cross-functional teams, and delivering measurable revenue outcomes.
            </p>

            <Suspense fallback={null}>
              <div className="mt-10 h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/5 hidden md:block">
                <AboutScene />
              </div>
            </Suspense>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {infoCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group cursor-default"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <card.icon size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-600 uppercase tracking-[0.15em]">
                    {card.label}
                  </p>
                  <p className="text-sm text-slate-200 font-medium mt-0.5">{card.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-4 mt-6"
            >
              <a
                href={resumeData.resumePdf}
                download="Nishant_Sharma_Resume.pdf"
                className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors tracking-wider"
              >
                <FileText size={14} />
                DOWNLOAD RESUME
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
