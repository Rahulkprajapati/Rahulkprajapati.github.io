import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { experiences, profile } from '../data/profile';
import { logos } from '../data/logos';
import { Panel, SectionHeader } from './Frame';

const COLUMNS = 'lg:grid-cols-[3.5rem_10.5rem_1fr_14rem_2.5rem]';
const pad = (n) => String(n).padStart(2, '0');

const ManifestRow = ({ exp, number, total, open, onToggle }) => {
    const panelId = `manifest-${number}`;

    return (
        <li style={{ borderTop: '1px solid var(--border)' }}>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={panelId}
                className={`group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_2rem] items-center gap-x-4 gap-y-1 border-none bg-transparent px-5 py-5 text-left transition-colors duration-200 sm:px-6 ${COLUMNS}`}
                style={{ background: open ? 'var(--surface-inset)' : 'transparent' }}
            >
                <span className="micro row-span-2 self-start pt-1 lg:row-span-1 lg:self-center lg:pt-0" style={{ color: open ? 'var(--accent)' : undefined }}>
                    {pad(number)}
                </span>

                <span className="micro order-3 col-start-2 lg:order-none lg:col-start-auto" style={{ color: 'var(--text-muted)' }}>
                    {exp.period}
                </span>

                <span className="col-start-2 row-start-1 flex min-w-0 items-center gap-3 lg:col-start-auto lg:row-start-auto">
                    <img
                        src={logos[exp.logo]}
                        alt=""
                        width="36"
                        height="36"
                        loading="lazy"
                        className={`h-9 w-9 flex-shrink-0 rounded-md bg-white object-contain p-1 transition-all duration-300 ${open ? '' : 'grayscale group-hover:grayscale-0'}`}
                        style={{ border: '1px solid var(--border)' }}
                    />
                    <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold tracking-tight sm:text-lg" style={{ color: 'var(--text)' }}>
                                {exp.company}
                            </span>
                            {exp.status && (
                                <span
                                    className="micro flex items-center gap-1.5 rounded-full px-2 py-0.5"
                                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: '0.58rem' }}
                                >
                                    <span className="signal-dot" style={{ width: 4, height: 4 }} />
                                    {exp.status}
                                </span>
                            )}
                        </span>
                        <span className="mt-0.5 block font-mono text-xs lg:truncate" style={{ color: 'var(--tech)' }}>
                            {exp.role}
                        </span>
                    </span>
                </span>

                <span className="micro hidden lg:block">{exp.location}</span>

                <span
                    aria-hidden
                    className="col-start-3 row-span-2 row-start-1 grid h-8 w-8 place-items-center self-start justify-self-end rounded-full transition-all duration-300 lg:col-start-auto lg:row-span-1 lg:row-start-auto lg:self-center"
                    style={{
                        border: '1px solid var(--border-strong)',
                        color: open ? 'var(--on-accent)' : 'var(--text-muted)',
                        background: open ? 'var(--accent)' : 'transparent',
                        transform: open ? 'rotate(45deg)' : 'none',
                    }}
                >
                    <FaPlus size={10} />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <Motion.div
                        id={panelId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                        style={{ background: 'var(--surface-inset)' }}
                    >
                        <div className={`grid gap-6 px-5 pb-7 sm:px-6 ${COLUMNS}`}>
                            {/* Mobile hides the Base column, so show it here instead */}
                            <p className="micro lg:hidden">{exp.location}</p>
                            <div className="lg:col-span-2 lg:col-start-3">
                                <p className="max-w-3xl text-[0.95rem] leading-[1.75]" style={{ color: 'var(--text)' }}>
                                    {exp.summary}
                                </p>
                                <ol className="mt-5 grid gap-x-8 gap-y-3 xl:grid-cols-2">
                                    {exp.description.map((item, i) => (
                                        <li key={item} className="grid grid-cols-[2rem_1fr] text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                                            <span className="micro pt-[0.2rem]">{pad(i + 1)}</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="micro mt-6">
                                    Entry {pad(number)} of {pad(total)} · {exp.description.length} line items
                                </p>
                            </div>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </li>
    );
};

const Experience = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const total = experiences.length;
    const firstYear = profile.startYear;

    return (
        <section id="experience" className="section section-divider">
            <div className="shell">
                <SectionHeader
                    index="03"
                    label="Experience"
                    meta={`Manifest RP-${pad(total)} · ${firstYear} — present`}
                    title="Production platform work"
                    aside="Travel, analytics, customer data and cloud consulting — with hands-on depth in infrastructure automation, migrations and reliability."
                />

                <Motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <Panel className="overflow-hidden">
                        <div className={`hidden gap-x-4 px-6 pb-3 pt-10 lg:grid ${COLUMNS}`}>
                            <span className="micro">No.</span>
                            <span className="micro">Period</span>
                            <span className="micro">Operator / Role</span>
                            <span className="micro">Base</span>
                            <span />
                        </div>
                        <ol className="m-0 list-none p-0 pt-6 lg:pt-0">
                            {experiences.map((exp, index) => (
                                <ManifestRow
                                    key={`${exp.company}-${exp.period}`}
                                    exp={exp}
                                    number={total - index}
                                    total={total}
                                    open={openIndex === index}
                                    onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            ))}
                        </ol>
                    </Panel>
                </Motion.div>
            </div>
        </section>
    );
};

export default Experience;
