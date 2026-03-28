import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { LinkedInIcon, TwitterIcon, TelegramIcon } from './icons';

const socials = [
  {
    label: 'LinkedIn',
    href: resumeData.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: <TwitterIcon />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me',
    icon: <TelegramIcon />,
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
