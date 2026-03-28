import { resumeData } from '../data/resume';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 sm:px-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <a
          href="#home"
          className="font-display text-xl font-bold text-white tracking-tight"
        >
          NS
        </a>

        <p className="text-xs text-slate-600 tracking-wider">
          {new Date().getFullYear()} {resumeData.name}. All rights reserved.
        </p>

        <a
          href={resumeData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-primary-400 transition-colors tracking-wider"
        >
          linkedin.com/in/avnishant
        </a>
      </div>
    </footer>
  );
}
