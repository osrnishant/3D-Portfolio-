import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

const socials = [
  {
    label: 'LinkedIn',
    href: resumeData.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed left-6 sm:left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-5"
    >
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-primary-400 hover:bg-white/5 transition-all duration-300"
          title={s.label}
        >
          {s.icon}
        </a>
      ))}
      <div className="w-px h-16 bg-gradient-to-b from-slate-700 to-transparent mx-auto mt-2" />
    </motion.div>
  );
}
