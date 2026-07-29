import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaMedium, FaPlaneDeparture, FaTerminal } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';
import Terminal from './Terminal';
import PipelineAnimation from './PipelineAnimation';
import { highlights, profile } from '../data/profile';

const Hero = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <>
            <section id="home" className="min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-16 items-center">
                    <Motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/80 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-200">
                            <FaPlaneDeparture className="text-red-600 dark:text-red-300" />
                            AirAsia MOVE - building cloud platforms at travel scale
                        </div>
                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black tracking-normal text-gray-950 dark:text-white">
                            Rahul Prajapati
                        </h1>
                        <div className="mt-5 min-h-10 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Senior Software Engineer Platform',
                                        'Kubernetes Platform Builder',
                                        'Terraform Automation Engineer',
                                        'GitOps & Observability Specialist',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 50,
                                    delay: 80,
                                }}
                            />
                        </div>

                        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300">
                            {profile.summary} {profile.current}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                            <button
                                onClick={() => setShowTerminal(true)}
                                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                            >
                                <FaTerminal />
                                <span>Try Terminal</span>
                            </button>
                            <a
                                href="/Rahul_Prajapati.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-950 shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 hover:text-red-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-red-300/50"
                            >
                                <FaDownload />
                                <span>Resume</span>
                            </a>
                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-950 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-emerald-300/50"
                            >
                                <span>Contact</span>
                                <FaArrowRight />
                            </button>
                        </div>

                        <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:text-gray-950 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:hover:text-white">
                                <FaGithub size={22} />
                            </a>
                            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:text-blue-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:hover:text-blue-300">
                                <FaLinkedin size={22} />
                            </a>
                            <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="grid h-11 w-11 place-items-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:hover:text-emerald-300">
                                <FaMedium size={22} />
                            </a>
                        </div>

                        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {highlights.map((item) => (
                                <div key={item.label} className="rounded-lg border border-gray-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
                                    <div className="text-2xl font-black text-gray-950 dark:text-white">{item.value}</div>
                                    <div className="mt-1 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-red-500/20 via-cyan-400/15 to-emerald-400/20 blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-gray-950/10 dark:border-white/10 dark:bg-gray-950">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={profileImage} alt="Rahul Prajapati" className="h-full w-full object-cover" />
                            </div>
                            <div className="border-t border-gray-100 bg-white p-5 dark:border-white/10 dark:bg-gray-950">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Current Focus</p>
                                        <p className="mt-1 text-lg font-black text-gray-950 dark:text-white">AirAsia MOVE Platform</p>
                                    </div>
                                    <div className="rounded-lg bg-red-600 px-3 py-2 text-sm font-black text-white">2026</div>
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
