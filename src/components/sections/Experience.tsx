import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { resumeData } from '../../data/resume';

function TimelineItem({
  role,
  company,
  duration,
  description,
  highlights,
  index,
}: {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-8 mb-12 last:mb-0">
      <div className="hidden md:block flex-1">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right pr-8"
          >
            <TimelineContent
              role={role}
              company={company}
              duration={duration}
              description={description}
              highlights={highlights}
            />
          </motion.div>
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring' }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center z-10 shadow-lg shadow-primary-600/20"
        >
          <Briefcase size={18} className="text-white" />
        </motion.div>
        <div className="w-px h-full bg-gradient-to-b from-primary-500/50 to-transparent absolute top-12" />
      </div>

      <div className="flex-1 md:hidden">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TimelineContent
            role={role}
            company={company}
            duration={duration}
            description={description}
            highlights={highlights}
          />
        </motion.div>
      </div>

      <div className="hidden md:block flex-1">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pl-8"
          >
            <TimelineContent
              role={role}
              company={company}
              duration={duration}
              description={description}
              highlights={highlights}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TimelineContent({
  role,
  company,
  duration,
  description,
  highlights,
}: {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
}) {
  return (
    <div className="p-6 rounded-2xl bg-dark-700/40 border border-slate-800/50 hover:border-primary-500/20 transition-all duration-300">
      <span className="text-xs text-primary-400 font-medium tracking-wider uppercase">{duration}</span>
      <h3 className="text-xl font-semibold text-white mt-1 font-display">{role}</h3>
      <p className="text-sm text-accent-400 mb-3">{company}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
      <ul className="space-y-2">
        {highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium tracking-wider uppercase">
            Career Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Experience
          </h2>
        </motion.div>

        <div>
          {resumeData.experience.map((exp, i) => (
            <TimelineItem key={i} {...exp} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="font-display text-2xl font-bold text-white mb-8 text-center">Education</h3>
          {resumeData.education.map((edu, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 rounded-2xl bg-dark-700/40 border border-slate-800/50 max-w-xl mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-accent-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                <p className="text-sm text-slate-400">
                  {edu.institution} &middot; {edu.year}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
