import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaArrowDown, FaDownload, FaGithub, FaLinkedin, FaMedium, FaTerminal } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';
import IdBadge from './IdBadge';
import ParticleSphere from './ParticleSphere';
import { Panel, Readout } from './Frame';
import { metrics, profile } from '../data/profile';

// xterm is ~300 kB; only fetch it when someone actually opens the terminal
const Terminal = lazy(() => import('./Terminal'));

const socials = [
    { key: 'github', label: 'GitHub', icon: FaGithub },
    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
    { key: 'medium', label: 'Medium', icon: FaMedium },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
};

const istFormat = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
});

const LocalTime = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(id);
    }, []);
    return (
        <span className="micro tabular-nums">
            BLR <span style={{ color: 'var(--text)' }}>{istFormat.format(now)}</span> IST
        </span>
    );
};

const Hero = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    // ` opens the terminal from anywhere, unless the visitor is typing in a field
    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== '`' || e.metaKey || e.ctrlKey || e.altKey) return;
            const el = e.target;
            if (el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
            e.preventDefault();
            setShowTerminal(true);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <section id="home" className="relative overflow-hidden pt-20 pb-16 lg:pb-20">
                <div className="shell">
                    {/* Meta rail, like the header strip on a spec sheet */}
                    <div
                        className="flex items-center justify-between gap-4 py-4"
                        style={{ borderBottom: '1px solid var(--border)' }}
                    >
                        <span className="micro">RP / Platform engineering</span>
                        <span className="micro hidden md:inline">12.97°N 77.59°E</span>
                        <LocalTime />
                    </div>

                    <div className="grid items-center gap-14 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:pt-16 xl:grid-cols-[1.08fr_0.92fr] xl:gap-14">
                        <div>
                            <Motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-2.5">
                                <span className="signal-dot" />
                                <span className="micro" style={{ color: 'var(--text-muted)' }}>
                                    Systems nominal · AirAsia MOVE
                                </span>
                            </Motion.div>

                            <Motion.h1
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={1}
                                className="mt-7 text-[3.6rem] font-semibold leading-[0.9] sm:text-7xl lg:text-[6.2rem]"
                                style={{ color: 'var(--text)', letterSpacing: '-0.05em' }}
                            >
                                Rahul
                                <br />
                                Prajapati<span style={{ color: 'var(--accent)' }}>.</span>
                            </Motion.h1>

                            <Motion.p
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={2}
                                className="mt-7 font-mono text-sm sm:text-[0.95rem]"
                                style={{ color: 'var(--text)' }}
                            >
                                {profile.headline}
                                <span style={{ color: 'var(--text-subtle)' }}> — GCP · Kubernetes · Terraform · SRE</span>
                            </Motion.p>

                            <Motion.p
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={3}
                                className="mt-5 max-w-xl text-base leading-[1.75] sm:text-[1.05rem]"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {profile.summary} {profile.current}
                            </Motion.p>

                            <Motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={4}
                                className="mt-9 flex flex-wrap gap-3"
                            >
                                <button
                                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn btn-primary group"
                                >
                                    <span>View experience</span>
                                    <FaArrowDown size={12} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                                </button>
                                <a href="/Rahul_Prajapati.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                    <FaDownload size={12} />
                                    <span>Résumé</span>
                                    <span className="micro">PDF</span>
                                </a>
                                <button onClick={() => setShowTerminal(true)} className="btn btn-ghost hidden sm:inline-flex" aria-label="Open interactive terminal">
                                    <FaTerminal size={12} />
                                    <span className="font-mono text-sm">~/rp</span>
                                    <kbd
                                        className="rounded px-1.5 py-px font-mono text-[0.65rem] leading-4"
                                        style={{ border: '1px solid var(--border-strong)', color: 'var(--text-subtle)' }}
                                    >
                                        `
                                    </kbd>
                                </button>
                            </Motion.div>

                            <Motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={5}
                                className="mt-8 flex items-center gap-5"
                            >
                                {socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.key}
                                            href={profile.links[social.key]}
                                            target="_blank"
                                            rel="noopener noreferrer me"
                                            className="group flex items-center gap-2 transition-colors duration-200"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            <Icon size={15} className="transition-colors group-hover:text-[var(--accent)]" />
                                            <span className="micro transition-colors group-hover:text-[var(--text)]">{social.label}</span>
                                        </a>
                                    );
                                })}
                            </Motion.div>
                        </div>

                        <Motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="pt-4 lg:pt-0"
                        >
                            {/* The card is in normal flow and sets the figure's height, so the
                                caption below always clears it. On desktop the panel sits behind
                                it offset to the right: photo on the left, topology on the right.
                                On mobile the panel spans the full width behind a centred card. */}
                            <div className="relative flex justify-center py-2 lg:justify-start">
                                <Panel className="grid-paper absolute inset-x-0 top-1/2 h-[19rem] -translate-y-1/2 overflow-hidden sm:h-[21rem] lg:left-[22%] xl:h-[22rem]">
                                    <ParticleSphere className="absolute inset-0 h-full w-full" desktopFocusX={0.64} />
                                </Panel>
                                <Motion.div
                                    className="relative z-10"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: -3 }}
                                    transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <IdBadge photo={profileImage} name={profile.name} role={profile.headline} />
                                </Motion.div>
                            </div>

                            {/* Figure caption sits below the panel, where the card can't cover it */}
                            <div className="mt-5 flex items-start justify-between gap-4">
                                <span className="micro whitespace-nowrap">
                                    <span style={{ color: 'var(--text)' }}>Fig. 01</span> — Fleet topology
                                </span>
                                <span className="micro hidden flex-shrink-0 items-center gap-1.5 sm:flex">
                                    Drag to rotate
                                    <span aria-hidden style={{ color: 'var(--border-strong)' }}>/</span>
                                    <span className="signal-dot" style={{ width: 5, height: 5 }} />
                                    Live
                                </span>
                            </div>
                        </Motion.div>
                    </div>

                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="mt-16"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <span className="micro">Telemetry · from the CV</span>
                            <span className="micro hidden sm:inline">Hover a reading for its source</span>
                        </div>
                        <Readout items={metrics} />
                    </Motion.div>
                </div>
            </section>

            {showTerminal && (
                <Suspense fallback={null}>
                    <Terminal onClose={() => setShowTerminal(false)} />
                </Suspense>
            )}
        </>
    );
};

export default Hero;
