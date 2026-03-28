import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, ArrowUpRight, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { LinkedInIcon } from '../icons';
import { supabase } from '../../lib/supabase';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('contact_messages').insert({
      name: formState.name,
      email: formState.email,
      message: formState.message,
    });

    if (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('sent');
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
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
                <span className="text-primary-400"><LinkedInIcon /></span>
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
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm disabled:opacity-50"
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
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm disabled:opacity-50"
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
                disabled={status === 'sending'}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 placeholder-slate-700 focus:outline-none focus:border-primary-500/30 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none text-sm disabled:opacity-50"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="px-8 py-4 bg-white text-dark-950 rounded-full font-medium text-sm tracking-wide hover:bg-primary-400 transition-colors duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' && (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    SENDING...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <CheckCircle2 size={14} />
                    MESSAGE SENT
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={14} />
                    FAILED TO SEND
                  </>
                )}
                {status === 'idle' && (
                  <>
                    SEND MESSAGE
                    <Send size={14} />
                  </>
                )}
              </button>

              {status === 'error' && (
                <span className="text-xs text-red-400">Please try again later.</span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
