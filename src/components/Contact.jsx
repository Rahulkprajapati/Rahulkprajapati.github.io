import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMedium, FaMobileAlt, FaPaperPlane } from 'react-icons/fa';
import { profile } from '../data/profile';

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
        <section id="contact" className="py-20 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <p className="text-sm font-black uppercase text-red-600 dark:text-red-300">Contact</p>
                    <h2 className="mt-3 text-3xl md:text-5xl font-black text-gray-950 dark:text-white">Let us build something reliable.</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
                        Reach out for platform engineering, DevOps automation, Kubernetes reliability, or cloud architecture conversations.
                    </p>
                </Motion.div>

                <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
                    <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-950 shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:ring-red-400/10"
                                    placeholder="Your Name"
                                />
                            </Motion.div>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-950 shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:ring-red-400/10"
                                    placeholder="your.email@example.com"
                                />
                            </Motion.div>
                            <Motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-950 shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:ring-red-400/10"
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
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-8 py-3 font-black text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                            >
                                <FaPaperPlane />
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            </Motion.button>
                            {submitStatus && (
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                                    {submitStatus}
                                    <a
                                        href={gmailComposeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 font-black underline underline-offset-4"
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
                        className="rounded-xl border border-gray-200 bg-gray-950 p-6 text-white shadow-2xl shadow-gray-950/10 dark:border-white/10"
                    >
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                                <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-500/15 text-red-200">
                                    <FaEnvelope size={22} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-black uppercase text-gray-400">Email</h3>
                                    <p className="break-words text-white">{profile.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                                <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-500/15 text-cyan-200">
                                    <FaMobileAlt size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase text-gray-400">Phone</h3>
                                    <p className="text-white">{profile.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                                <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500/15 text-emerald-200">
                                    <FaMapMarkerAlt size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase text-gray-400">Location</h3>
                                    <p className="text-white">{profile.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <h3 className="text-sm font-black uppercase text-gray-400">Follow</h3>
                            <div className="mt-4 flex gap-3">
                                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-gray-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-950">
                                    <FaGithub size={22} />
                                </a>
                                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-gray-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-blue-700">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-gray-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-emerald-700">
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
