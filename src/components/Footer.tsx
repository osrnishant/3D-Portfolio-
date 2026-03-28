import { Heart } from 'lucide-react';
import { resumeData } from '../data/resume';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#home" className="font-display text-lg font-bold text-white">
          NS<span className="text-primary-400">.</span>
        </a>

        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          Built with <Heart size={14} className="text-primary-500" /> by {resumeData.name}
        </p>

        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
