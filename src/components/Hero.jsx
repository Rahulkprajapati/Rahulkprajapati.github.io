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

                    <div className="grid items-center gap-14 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:pt-16 xl:gap-14">
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
                            className="relative"
                        >
                            {/* On mobile the badge sits above the panel; on desktop it floats inside it */}
                            <div className="relative z-20 flex justify-center lg:absolute lg:-left-[2%] lg:top-1/2 xl:-left-[3%] lg:block lg:-translate-y-1/2">
                                <Motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: -3 }}
                                    transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <IdBadge photo={profileImage} name={profile.name} role={profile.headline} />
                                </Motion.div>
                            </div>

                            <Panel
                                className="grid-paper -mt-28 aspect-square w-full overflow-hidden sm:aspect-[4/3] lg:mt-0 lg:aspect-square"
                                // Annotations live on the right: the badge covers the left edge on desktop
                                tr={
                                    <span className="hidden flex-col items-end gap-1 lg:flex">
                                        <span style={{ color: 'var(--text)' }}>Fig. 01 — Fleet topology</span>
                                        <span>100+ clusters · 3 clouds</span>
                                    </span>
                                }
                                // On mobile the badge covers the top of the panel, so the
                                // figure caption moves to the bottom-left corner instead
                                bl={<span className="lg:hidden">Fig. 01 — Fleet topology</span>}
                                br={
                                    <span className="flex items-center gap-1.5">
                                        <span className="hidden sm:inline">Drag to rotate</span>
                                        <span aria-hidden className="hidden sm:inline" style={{ color: 'var(--border-strong)' }}>/</span>
                                        <span className="signal-dot" style={{ width: 5, height: 5 }} />
                                        Live
                                    </span>
                                }
                            >
                                <ParticleSphere className="absolute inset-0 h-full w-full" />
                            </Panel>
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
