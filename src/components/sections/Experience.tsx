import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { resumeData } from '../../data/resume';

const INITIAL_VISIBLE = 5;

function ExperienceCard({
  role,
  company,
  duration,
  type,
  highlights,
  index,
}: {
  role: string;
  company: string;
  duration: string;
  type: string;
  highlights: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [expanded, setExpanded] = useState(index < 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.08 }}
      className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group"
    >
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-primary-400 bg-dark-950 z-10 group-hover:bg-primary-400 transition-colors duration-300" />
      <div className="absolute left-[5px] top-5 bottom-0 w-px bg-gradient-to-b from-primary-500/30 to-transparent" />

      <div
        className="glass-card rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
              <h3 className="text-base sm:text-lg font-semibold text-white font-display">
                {role}
              </h3>
              <span className="text-primary-400 text-sm">{company}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xs text-slate-500 tracking-wider">{duration}</span>
              <span className="text-[10px] text-slate-600 px-2 py-0.5 rounded-full border border-slate-800/50">
                {type}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-600 mt-1 shrink-0"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="mt-4 space-y-2.5 border-t border-white/5 pt-4">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-primary-400/60 mt-2 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const visibleExperience = showAll
    ? resumeData.experience
    : resumeData.experience.slice(0, INITIAL_VISIBLE);

  const hiddenCount = resumeData.experience.length - INITIAL_VISIBLE;

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-6 sm:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-primary-400 text-xs font-medium tracking-[0.2em] uppercase">
            Career Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            WORK <span className="gradient-text">EXPERIENCE</span>
          </h2>
        </motion.div>

        <div>
          {visibleExperience.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} {...exp} index={i} />
          ))}
        </div>

        {!showAll && hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 border border-slate-700/50 text-slate-400 rounded-full text-sm tracking-wider hover:border-primary-400/40 hover:text-white transition-all duration-300"
            >
              SHOW {hiddenCount} MORE POSITIONS
            </button>
          </motion.div>
        )}

        {showAll && hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setShowAll(false)}
              className="px-6 py-3 border border-slate-700/50 text-slate-400 rounded-full text-sm tracking-wider hover:border-primary-400/40 hover:text-white transition-all duration-300"
            >
              SHOW LESS
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
