import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { FaCalendarAlt, FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';
import { experiences } from '../data/profile';

const COLLAPSED_COUNT = 4;

const ExperienceCard = ({ exp, index }) => {
    const [expanded, setExpanded] = useState(false);
    const isCurrent = index === 0;
    const hasMore = exp.description.length > COLLAPSED_COUNT;
    const visible = expanded ? exp.description : exp.description.slice(0, COLLAPSED_COUNT);

    return (
        <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-60px' }}
            className="relative grid gap-4 md:grid-cols-[3.5rem_1fr]"
        >
            {/* Timeline node */}
            <div className="hidden md:flex md:justify-center">
                <span
                    className="relative z-10 mt-6 grid h-4 w-4 place-items-center rounded-full"
                    style={{
                        background: isCurrent ? 'var(--accent)' : 'var(--surface-strong)',
                        border: `2px solid ${isCurrent ? 'var(--accent)' : 'var(--border-strong)'}`,
                        boxShadow: isCurrent ? '0 0 0 5px var(--accent-soft)' : 'none',
                    }}
                >
                    {isCurrent && (
                        <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                            style={{ background: 'var(--accent)' }}
                        />
                    )}
                </span>
            </div>

            <div className="surface lift p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={exp.icon}
                            alt=""
                            className="h-14 w-14 flex-shrink-0 rounded-xl bg-white object-contain p-2"
                            style={{ border: '1px solid var(--border)' }}
                        />
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                                    {exp.company}
                                </h3>
                                {exp.status && (
                                    <span
                                        className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider"
                                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                                    >
                                        {exp.status}
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-sm font-medium" style={{ color: 'var(--tech)' }}>
                                {exp.role}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="chip font-mono">
                            <FaCalendarAlt size={11} style={{ color: 'var(--accent)' }} />
                            {exp.period}
                        </span>
                        <span className="chip">
                            <FaMapMarkerAlt size={11} style={{ color: 'var(--ok)' }} />
                            {exp.location}
                        </span>
                    </div>
                </div>

                <p className="mt-5 text-base leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
                    {exp.summary}
                </p>

                <ul className="mt-5 grid gap-x-6 gap-y-3 lg:grid-cols-2">
                    <AnimatePresence initial={false}>
                        {visible.map((item) => (
                            <Motion.li
                                key={item}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="flex items-start gap-3 text-sm leading-[1.7]"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <span
                                    aria-hidden
                                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                    style={{ background: 'var(--tech)' }}
                                />
                                <span>{item}</span>
                            </Motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {hasMore && (
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border-none bg-transparent p-0 text-sm font-semibold transition-colors"
                        style={{ color: 'var(--accent)' }}
                        aria-expanded={expanded}
                    >
                        {expanded ? 'Show less' : `Show ${exp.description.length - COLLAPSED_COUNT} more`}
                        <Motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="grid place-items-center">
                            <FaChevronDown size={11} />
                        </Motion.span>
                    </button>
                )}
            </div>
        </Motion.div>
    );
};

const Experience = () => {
    return (
        <section id="experience" className="section section-divider">
            <div className="shell max-w-6xl">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <p className="eyebrow">Experience</p>
                        <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl" style={{ color: 'var(--text)' }}>
                            Production platform work
                        </h2>
                    </div>
                    <p className="max-w-md text-base leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
                        A career path across travel, analytics, customer data, and cloud consulting, with hands-on depth in infrastructure automation.
                    </p>
                </Motion.div>

                <div className="relative grid gap-6">
                    {/* Timeline spine */}
                    <Motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1.4, ease: 'easeInOut' }}
                        viewport={{ once: true }}
                        aria-hidden
                        className="absolute left-7 top-6 bottom-6 hidden w-px origin-top md:block"
                        style={{ background: 'linear-gradient(to bottom, var(--accent), var(--tech), transparent)' }}
                    />

                    {experiences.map((exp, index) => (
                        <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
