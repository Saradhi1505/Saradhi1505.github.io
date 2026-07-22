import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

const initialForm = { name: '', email: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.message.trim()) {
    errors.message = 'Please add a short message.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');

    // ------------------------------------------------------------------
    // WIRE THIS UP TO A REAL BACKEND: this demo just simulates a request.
    //
    // Option A — Formspree (no backend needed):
    //   1. Create a form at https://formspree.io and grab your endpoint,
    //      e.g. https://formspree.io/f/xyzabcd
    //   2. Replace the block below with:
    //        const res = await fetch('https://formspree.io/f/xyzabcd', {
    //          method: 'POST',
    //          headers: { Accept: 'application/json' },
    //          body: new FormData(e.target),
    //        });
    //        if (!res.ok) throw new Error('Submission failed');
    //
    // Option B — EmailJS (sends straight from the browser):
    //   1. npm install @emailjs/browser
    //   2. Set up a service + template at https://www.emailjs.com
    //   3. Replace the block below with:
    //        import emailjs from '@emailjs/browser';
    //        await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
    //
    // Either way, keep the try/catch + status states so the UI stays
    // consistent (success/error feedback, disabled button while sending).
    // ------------------------------------------------------------------
    try {
      await new Promise((resolve) => setTimeout(resolve, 900)); // simulated latency
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('idle');
      setErrors({ form: 'Something went wrong sending your message. Please try emailing directly.' });
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Open to full-time AI/ML and Full-Stack roles. Reach out directly or send a message below."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Direct links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-4 rounded-2xl border border-hairline bg-surface-elevated hover:border-clay transition-colors duration-200"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-clay-soft text-clay shrink-0">
                <MailIcon />
              </span>
              <div>
                <p className="text-sm text-ink-faint">Email</p>
                <p className="text-ink font-medium break-all">{profile.email}</p>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-hairline bg-surface-elevated hover:border-clay transition-colors duration-200"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-clay-soft text-clay shrink-0">
                <LinkedinIcon />
              </span>
              <div>
                <p className="text-sm text-ink-faint">LinkedIn</p>
                <p className="text-ink font-medium">pardha-saradhi-alapati</p>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-hairline bg-surface-elevated hover:border-clay transition-colors duration-200"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-clay-soft text-clay shrink-0">
                <GithubIcon />
              </span>
              <div>
                <p className="text-sm text-ink-faint">GitHub</p>
                <p className="text-ink font-medium">Saradhi0515</p>
              </div>
            </a>

            <div className="p-4 rounded-2xl border border-hairline bg-surface-elevated">
              <p className="text-sm text-ink-faint mb-1">Phone</p>
              <p className="text-ink font-medium">{profile.phone}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-3 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-ink-muted mb-1.5">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface-elevated text-ink focus:border-clay transition-colors duration-200"
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-clay mt-1.5">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-ink-muted mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface-elevated text-ink focus:border-clay transition-colors duration-200"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-clay mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-ink-muted mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border border-hairline bg-surface-elevated text-ink focus:border-clay transition-colors duration-200 resize-none"
                placeholder="What would you like to build together?"
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-clay mt-1.5">
                  {errors.message}
                </p>
              )}
            </div>

            {errors.form && <p className="text-sm text-clay">{errors.form}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'submitting'}
              className="self-start mt-2 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </Button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-clay"
                role="status"
              >
                Thanks — your message was sent! I'll get back to you soon.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
