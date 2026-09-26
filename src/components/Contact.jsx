import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaMobileAlt, FaPaperPlane } from 'react-icons/fa';
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
                        className="surface h-fit p-6"
                    >
                        <div className="space-y-5">
                            <div className="surface-flat flex items-center gap-4 p-4">
                                <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl" style={{ background: 'var(--surface-inset)', color: 'var(--accent)' }}>
                                    <FaEnvelope size={22} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="eyebrow" style={{ color: 'var(--text-subtle)' }}>Email</h3>
                                    <p className="mt-0.5 break-words text-sm font-medium" style={{ color: 'var(--text)' }}>{profile.email}</p>
                                </div>
                            </div>
                            <div className="surface-flat flex items-center gap-4 p-4">
                                <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl" style={{ background: 'var(--surface-inset)', color: 'var(--tech)' }}>
                                    <FaMobileAlt size={22} />
                                </div>
                                <div>
                                    <h3 className="eyebrow" style={{ color: 'var(--text-subtle)' }}>Phone</h3>
                                    <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--text)' }}>{profile.phone}</p>
                                </div>
                            </div>
                            <div className="surface-flat flex items-center gap-4 p-4">
                                <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl" style={{ background: 'var(--surface-inset)', color: 'var(--ok)' }}>
                                    <FaMapMarkerAlt size={22} />
                                </div>
                                <div>
                                    <h3 className="eyebrow" style={{ color: 'var(--text-subtle)' }}>Location</h3>
                                    <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--text)' }}>{profile.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                            <h3 className="eyebrow" style={{ color: 'var(--text-subtle)' }}>Follow</h3>
                            <div className="mt-4 flex gap-3">
                                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5" style={{ border: '1px solid var(--border)', background: 'var(--surface-inset)', color: 'var(--text-muted)' }}>
                                    <FaGithub size={22} />
                                </a>
                                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5" style={{ border: '1px solid var(--border)', background: 'var(--surface-inset)', color: 'var(--text-muted)' }}>
                                    <FaLinkedin size={22} />
                                </a>
                                <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-200 hover:-translate-y-0.5" style={{ border: '1px solid var(--border)', background: 'var(--surface-inset)', color: 'var(--text-muted)' }}>
                                    <FaMedium size={22} />
                                </a>
                            </div>
                        </div>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
