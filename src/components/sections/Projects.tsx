import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { resumeData } from '../../data/resume';

const projectGradients = [
  'from-primary-500 to-primary-700',
  'from-accent-500 to-accent-600',
  'from-warm-400 to-warm-500',
  'from-primary-600 to-accent-500',
  'from-surface-700 to-primary-600',
  'from-accent-400 to-primary-500',
];

const projectIcons = [
  'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
];

function ProjectCard({
  title,
  description,
  tags,
  index,
}: {
  title: string;
  description: string;
  tags: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:scale-[1.02]"
    >
      <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${projectGradients[index % projectGradients.length]} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d={projectIcons[index % projectIcons.length]} />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-lg font-semibold text-white font-display drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-surface-500 text-sm leading-relaxed mb-5">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-[11px] rounded-full border border-surface-200 text-surface-500 bg-surface-50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-primary-500 text-xs font-medium tracking-[0.2em] uppercase">
            Featured Campaigns
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-surface-900 mt-4">
            MY <span className="gradient-text">WORK</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
