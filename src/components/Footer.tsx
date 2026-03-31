import { resumeData } from '../data/resume';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 sm:px-8 lg:px-12 border-t border-surface-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <a
          href="#home"
          className="font-display text-xl font-bold text-surface-900 tracking-tight"
        >
          NS
        </a>

        <p className="text-xs text-surface-400 tracking-wider">
          {new Date().getFullYear()} {resumeData.name}. All rights reserved.
        </p>

        <a
          href={resumeData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-surface-400 hover:text-primary-500 transition-colors tracking-wider"
        >
          linkedin.com/in/avnishant
        </a>
      </div>
    </footer>
  );
}
