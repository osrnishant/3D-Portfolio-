import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { resumeData } from '../../data/resume';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 sm:py-40 px-6 sm:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-xs font-medium tracking-[0.2em] uppercase">
            Let's Connect
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            GET IN <span className="gradient-text">TOUCH</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            I'm always open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <a
              href={`mailto:${resumeData.email}`}
              className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group block"
            >
              <div className="w-11 h-11 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <Mail size={18} className="text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-600 uppercase tracking-[0.15em]">Email</p>
                <p className="text-sm text-slate-200 truncate">{resumeData.email}</p>
              </div>
              <ArrowUpRight size={16} className="text-slate-700 group-hover:text-primary-400 transition-colors shrink-0" />
            </a>

            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <MapPin size={18} className="text-accent-400" />
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-[0.15em]">Location</p>
                <p className="text-sm text-slate-200">{resumeData.location}</p>
              </div>
            </div>

            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group block"
            >
              <div className="w-11 h-11 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary-400">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-slate-600 uppercase tracking-[0.15em]">LinkedIn</p>
                <p className="text-sm text-slate-200">linkedin.com/in/avnishant</p>
              </div>
              <ArrowUpRight size={16} className="text-slate-700 group-hover:text-primary-400 transition-colors shrink-0" />
            </a>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-[11px] text-slate-600 uppercase tracking-[0.15em] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[11px] text-slate-600 uppercase tracking-[0.15em] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[11px] text-slate-600 uppercase tracking-[0.15em] mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none text-sm"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-white text-dark-950 rounded-full font-medium text-sm tracking-wide hover:bg-primary-400 transition-colors duration-300 flex items-center gap-2"
            >
              {submitted ? (
                'Message Sent!'
              ) : (
                <>
                  SEND MESSAGE
                  <Send size={14} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
