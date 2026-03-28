import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { resumeData } from '../../data/resume';

function StatCard({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-dark-700/50 border border-slate-800/50">
      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
        <Icon size={18} className="text-primary-400" />
      </div>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-slate-200 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium tracking-wider uppercase">About Me</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Get to Know Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800/50">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 opacity-20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 opacity-10 blur-xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed text-lg">
              {resumeData.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatCard icon={MapPin} label="Location" value={resumeData.location} />
              <StatCard icon={Briefcase} label="Role" value={resumeData.title} />
              <StatCard
                icon={GraduationCap}
                label="Education"
                value={resumeData.education[0].degree}
              />
              <StatCard
                icon={Briefcase}
                label="Experience"
                value={`${resumeData.experience.length}+ Roles`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
