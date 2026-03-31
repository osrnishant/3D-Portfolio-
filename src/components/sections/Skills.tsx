import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resume';

const categoryColors: Record<string, string> = {
  Marketing: 'from-primary-400 to-primary-600',
  Channels: 'from-accent-400 to-accent-600',
  Web3: 'from-warm-400 to-warm-500',
  Tools: 'from-primary-300 to-accent-400',
  Other: 'from-surface-400 to-surface-600',
};

const categoryBorders: Record<string, string> = {
  Marketing: 'border-primary-500/30 hover:border-primary-500/50',
  Channels: 'border-accent-500/30 hover:border-accent-500/50',
  Web3: 'border-warm-400/30 hover:border-warm-400/50',
  Tools: 'border-primary-400/30 hover:border-primary-400/50',
  Other: 'border-surface-400/30 hover:border-surface-400/50',
};

function SkillCategory({
  category,
  skills,
  index,
}: {
  category: string;
  skills: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card rounded-2xl p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
        <h3 className="text-sm font-semibold text-surface-900 tracking-wider uppercase">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.04 }}
            className={`px-4 py-2 text-xs rounded-full border ${categoryBorders[category]} text-surface-600 bg-surface-50/80 hover:bg-white transition-all duration-300 cursor-default`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = Object.entries(resumeData.skills);

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-primary-500 text-xs font-medium tracking-[0.2em] uppercase">
            Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-surface-900 mt-4">
            CORE <span className="gradient-text">SKILLS</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([category, skills], i) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skills}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
