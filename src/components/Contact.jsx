import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaCopy, FaGithub, FaLinkedin, FaMedium, FaPaperPlane } from 'react-icons/fa';
import { profile } from '../data/profile';
import { SectionHeader } from './Frame';

const Contact = () => {
    const [submitStatus, setSubmitStatus] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
    });

    const [copied, setCopied] = React.useState(false);
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const subject = `Portfolio Contact from ${name}`;
        const fallbackMessage = `To: ${profile.email}
Subject: ${subject}

Name: ${name}
Email: ${email}

Message:
${message}`;

        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: subject,
                    _template: 'table',
                    _captcha: 'false',
                }),
            });

            if (!response.ok) {
                throw new Error('Message delivery failed');
            }

            setSubmitStatus('Message sent. I will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            await navigator.clipboard?.writeText(fallbackMessage);
            setSubmitStatus('Could not send directly, so I copied the message. Paste it into Gmail or LinkedIn and send it to me.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(`Portfolio Contact from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    return (
        <section id="contact" className="section section-divider">
            <div className="shell">
                <SectionHeader
                    index="04"
                    label="Contact"
                    meta="Bangalore · IST (UTC+5:30)"
                    align="center"
                    title="Let’s build something reliable."
                    aside="Platform engineering, DevOps automation, Kubernetes reliability or cloud architecture — happy to talk shop."
                />

                <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
                    <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="surface p-6 sm:p-8"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="name" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-xl px-4 py-3 text-base outline-none transition-colors duration-200"
                                    style={{ border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--text)' }}
                                    placeholder="Your Name"
                                />
                            </Motion.div>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-xl px-4 py-3 text-base outline-none transition-colors duration-200"
                                    style={{ border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--text)' }}
                                    placeholder="your.email@example.com"
                                />
                            </Motion.div>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-xl px-4 py-3 text-base outline-none transition-colors duration-200"
                                    style={{ border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--text)' }}
                                    placeholder="Your message..."
                                ></textarea>
                            </Motion.div>
                            <Motion.button
                                type="submit"
                                disabled={isSubmitting}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FaPaperPlane />
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            </Motion.button>
                            {submitStatus && (
                                <div className="rounded-xl p-4 text-sm leading-[1.7]"
                                    style={{ border: '1px solid var(--border)', background: 'var(--ok-soft)', color: 'var(--text)' }}>
                                    {submitStatus}
                                    <a
                                        href={gmailComposeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 font-semibold underline underline-offset-4" style={{ color: 'var(--accent)' }}
                                    >
                                        Open Gmail compose
                                    </a>
                                </div>
                            )}
                        </form>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="panel h-fit overflow-hidden"
                    >
                        <span aria-hidden className="ticks" />
                        <div className="px-6 pb-3 pt-7">
                            <span className="micro">Direct line</span>
                        </div>
                        <dl className="m-0">
                            <div className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                                <dt className="micro">Email</dt>
                                <dd className="m-0 min-w-0">
                                    <a href={`mailto:${profile.email}`} className="block truncate text-sm font-medium underline-offset-4 hover:underline" style={{ color: 'var(--text)' }}>
                                        {profile.email}
                                    </a>
                                </dd>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                                    className="flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider transition-colors"
                                    style={{
                                        border: '1px solid var(--border-strong)',
                                        color: copied ? 'var(--on-accent)' : 'var(--text-muted)',
                                        background: copied ? 'var(--accent)' : 'transparent',
                                    }}
                                >
                                    {copied ? <FaCheck size={9} /> : <FaCopy size={9} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                                <dt className="micro">Phone</dt>
                                <dd className="m-0">
                                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: 'var(--text)' }}>
                                        {profile.phone}
                                    </a>
                                </dd>
                            </div>
                            <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                                <dt className="micro">Base</dt>
                                <dd className="m-0 text-sm font-medium" style={{ color: 'var(--text)' }}>
                                    {profile.location} <span className="micro ml-1">IST · UTC+5:30</span>
                                </dd>
                            </div>
                        </dl>

                        <div className="px-6 pb-3 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                            <span className="micro">Elsewhere</span>
                        </div>
                        <ul className="m-0 list-none p-0 pb-2">
                            {[
                                { label: 'GitHub', icon: FaGithub, href: profile.links.github },
                                { label: 'LinkedIn', icon: FaLinkedin, href: profile.links.linkedin },
                                { label: 'Medium', icon: FaMedium, href: profile.links.medium },
                            ].map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.label} style={{ borderTop: '1px solid var(--border)' }}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer me"
                                            className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 px-6 py-3.5 transition-colors hover:bg-[var(--surface-inset)]"
                                        >
                                            <span className="micro flex items-center gap-2">
                                                <Icon size={12} />
                                                {link.label}
                                            </span>
                                            <span className="truncate font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {link.href.replace(/^https?:\/\//, '')}
                                            </span>
                                            <FaArrowRight size={10} className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--accent)' }} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
