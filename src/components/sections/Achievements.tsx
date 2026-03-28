import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resume';

function AchievementCard({
  metric,
  description,
  index,
}: {
  metric: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 group hover:scale-[1.02]"
    >
      <div className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-3">
        {metric}
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-primary-400 text-xs font-medium tracking-[0.2em] uppercase">
            Track Record
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            KEY <span className="gradient-text">ACHIEVEMENTS</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.achievements.map((a, i) => (
            <AchievementCard
              key={a.metric}
              metric={a.metric}
              description={a.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
