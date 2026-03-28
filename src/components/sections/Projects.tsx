import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, GitBranch } from 'lucide-react';
import { resumeData } from '../../data/resume';

function ProjectCard({
  title,
  description,
  tech,
  image,
  index,
}: {
  title: string;
  description: string;
  tech: string[];
  image: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden bg-dark-700/40 border border-slate-800/50 hover:border-primary-500/30 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
            <GitBranch size={16} className="text-white" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
            <ExternalLink size={16} className="text-white" />
          </button>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 font-display group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20"
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
    <section id="projects" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
