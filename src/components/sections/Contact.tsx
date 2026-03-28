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
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium tracking-wider uppercase">
            Let's Connect
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm always open to new opportunities and interesting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/40 border border-slate-800/50 hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <Mail size={20} className="text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-slate-200">{resumeData.email}</p>
                </div>
                <ArrowUpRight size={18} className="text-slate-600 group-hover:text-primary-400 transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/40 border border-slate-800/50">
                <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center">
                  <MapPin size={20} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-slate-200">{resumeData.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-slate-400 mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-800/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-slate-400 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-800/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-slate-400 mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-800/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-medium hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-600/20 hover:shadow-primary-500/30 flex items-center justify-center gap-2"
            >
              {submitted ? (
                'Message Sent!'
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
