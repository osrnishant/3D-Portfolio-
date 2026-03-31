import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { resumeData } from '../data/resume';
import type { NavLink } from '../types/resume';

const navLinks: NavLink[] = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'RESUME', href: resumeData.resumePdf, download: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl border-b border-surface-200/60 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <a
            href="#home"
            className="font-display text-xl font-bold text-surface-900 tracking-tight"
          >
            NS
          </a>

          <div className="hidden md:flex items-center">
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-surface-400 hover:text-primary-500 transition-colors tracking-wider mr-12"
            >
              linkedin.com/in/avnishant
            </a>
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.download ? {
                    download: 'Nishant_Sharma_Resume.pdf',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': 'Download resume PDF'
                  } : {})}
                  className="text-sm text-surface-500 hover:text-surface-900 transition-colors duration-300 tracking-wider font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-surface-700"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  {...(link.download ? {
                    download: 'Nishant_Sharma_Resume.pdf',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': 'Download resume PDF'
                  } : {})}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-display font-bold text-surface-900 py-3 border-b border-surface-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-primary-500 mt-4"
              >
                linkedin.com/in/avnishant
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
