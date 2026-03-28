import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resume';

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-200 group-hover:text-primary-400 transition-colors">
          {name}
        </span>
        <span className="text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function SkillOrb({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const size = 60 + (level / 100) * 40;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="rounded-full flex items-center justify-center border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-accent-500/5 hover:from-primary-500/20 hover:to-accent-500/10 transition-all duration-300 hover:scale-110 cursor-default"
        style={{ width: size, height: size }}
      >
        <span className="text-xs font-bold text-primary-300">{level}%</span>
      </div>
      <span className="text-xs text-slate-400 text-center">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [...new Set(resumeData.skills.map((s) => s.category))];

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Technical Proficiency
          </h2>
        </motion.div>

        <div className="hidden md:flex flex-wrap justify-center gap-6 mb-16">
          {resumeData.skills.map((skill, i) => (
            <SkillOrb key={skill.name} name={skill.name} level={skill.level} index={i} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat} className="p-6 rounded-2xl bg-dark-700/30 border border-slate-800/50">
              <h3 className="text-lg font-semibold text-white mb-6 font-display">{cat}</h3>
              <div className="space-y-5">
                {resumeData.skills
                  .filter((s) => s.category === cat)
                  .map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
