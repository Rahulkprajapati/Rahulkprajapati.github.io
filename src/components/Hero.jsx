import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaMedium, FaTerminal } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';
import Terminal from './Terminal';
import PipelineAnimation from './PipelineAnimation';
import { highlights, profile } from '../data/profile';

const socials = [
    { key: 'github', label: 'GitHub', icon: FaGithub },
    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
    { key: 'medium', label: 'Medium', icon: FaMedium },
];

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

const Hero = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <>
            <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
                {/* Soft accent wash anchoring the fold */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[70rem] -translate-x-1/2 opacity-60 blur-3xl"
                    style={{
                        background:
                            'radial-gradient(45% 50% at 30% 40%, var(--accent-soft), transparent 70%), radial-gradient(40% 45% at 72% 55%, var(--tech-soft), transparent 70%)',
                    }}
                />

                <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                    <div className="text-center lg:text-left">
                        <Motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                            <span
                                className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium"
                                style={{
                                    border: '1px solid var(--border)',
                                    background: 'var(--surface-muted)',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span
                                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                                        style={{ background: 'var(--accent)' }}
                                    />
                                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
                                </span>
                                Building cloud platforms at travel scale &mdash; AirAsia MOVE
                            </span>
                        </Motion.div>

                        <Motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={1}
                            className="mt-7 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                            style={{ color: 'var(--text)' }}
                        >
                            Rahul
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(120deg, var(--accent), var(--tech))',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                Prajapati
                            </span>
                        </Motion.h1>

                        <Motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={2}
                            className="mt-5 flex min-h-8 items-center justify-center font-mono text-base sm:text-lg lg:justify-start"
                            style={{ color: 'var(--tech)' }}
                        >
                            <span aria-hidden className="mr-2 opacity-50">&gt;</span>
                            <Typewriter
                                options={{
                                    strings: [
                                        'Senior Software Engineer, Platform',
                                        'Kubernetes Platform Builder',
                                        'Terraform Automation Engineer',
                                        'GitOps & Observability Specialist',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 40,
                                    delay: 70,
                                }}
                            />
                        </Motion.div>

                        <Motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={3}
                            className="mx-auto mt-6 max-w-2xl text-base leading-[1.75] sm:text-lg lg:mx-0"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {profile.summary} {profile.current}
                        </Motion.p>

                        <Motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={4}
                            className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
                        >
                            <button onClick={() => setShowTerminal(true)} className="btn btn-primary">
                                <FaTerminal size={14} />
                                <span>Try the terminal</span>
                            </button>
                            <a href="/Rahul_Prajapati.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                <FaDownload size={14} />
                                <span>Resume</span>
                            </a>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn btn-ghost group"
                            >
                                <span>Get in touch</span>
                                <FaArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </Motion.div>

                        <Motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={5}
                            className="mt-7 flex items-center justify-center gap-2.5 lg:justify-start"
                        >
                            {socials.map((social) => {
                                const Icon = social.icon;
                                return (
                                <a
                                    key={social.key}
                                    href={profile.links[social.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="grid h-11 w-11 place-items-center rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                                    style={{
                                        border: '1px solid var(--border)',
                                        background: 'var(--surface-muted)',
                                        color: 'var(--text-muted)',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-ring)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                                >
                                    <Icon size={19} />
                                </a>
                                );
                            })}
                        </Motion.div>

                        <Motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={6}
                            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
                        >
                            {highlights.map((item) => (
                                <div key={item.label} className="surface-flat lift p-4 text-left">
                                    <div
                                        className="font-mono text-[0.7rem] font-semibold tracking-[0.18em]"
                                        style={{ color: 'var(--accent)' }}
                                    >
                                        {item.value}
                                    </div>
                                    <div className="mt-1.5 text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </Motion.div>
                    </div>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div
                            aria-hidden
                            className="absolute -inset-5 rounded-[2.5rem] opacity-70 blur-2xl"
                            style={{
                                background:
                                    'linear-gradient(140deg, var(--accent-soft), var(--tech-soft), var(--ok-soft))',
                            }}
                        />
                        <div className="surface relative overflow-hidden" style={{ borderRadius: 'var(--r-xl)' }}>
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt="Rahul Prajapati"
                                    className="h-full w-full object-cover"
                                    loading="eager"
                                />
                                <div
                                    aria-hidden
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.45), transparent 55%)' }}
                                />
                            </div>

                            <div className="p-5" style={{ borderTop: '1px solid var(--border)' }}>
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="eyebrow" style={{ color: 'var(--text-subtle)' }}>Current focus</p>
                                        <p className="mt-1.5 text-lg font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                                            AirAsia MOVE Platform
                                        </p>
                                    </div>
                                    <span
                                        className="rounded-xl px-3 py-1.5 font-mono text-sm font-semibold"
                                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                                    >
                                        2026
                                    </span>
                                </div>
                                <PipelineAnimation />
                            </div>
                        </div>
                    </Motion.div>
                </div>
            </section>

            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
        </>
    );
};

export default Hero;
