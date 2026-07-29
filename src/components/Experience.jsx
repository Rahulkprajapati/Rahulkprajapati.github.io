import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { experiences } from '../data/profile';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <p className="text-sm font-black uppercase text-red-600 dark:text-red-300">Experience</p>
                        <h2 className="mt-3 text-3xl md:text-5xl font-black text-gray-950 dark:text-white">Production platform work</h2>
                    </div>
                    <p className="max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
                        A career path across travel, analytics, customer data, and cloud consulting, with hands-on depth in infrastructure automation.
                    </p>
                </Motion.div>

                <div className="relative grid gap-6">
                    <Motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="absolute left-5 top-4 hidden w-0.5 origin-top bg-gradient-to-b from-red-500 via-cyan-500 to-emerald-500 md:block"
                    ></Motion.div>

                    {experiences.map((exp, index) => (
                        <Motion.div
                            key={`${exp.company}-${exp.period}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative grid gap-4 md:grid-cols-[2.5rem_1fr]"
                        >
                            <div className="hidden md:flex">
                                <div className={`relative z-10 grid h-10 w-10 place-items-center rounded-lg border-4 border-gray-50 shadow-lg dark:border-gray-900 ${index === 0 ? 'bg-red-600 text-white' : 'bg-white text-cyan-600 dark:bg-gray-950 dark:text-cyan-300'}`}>
                                    {index === 0 ? <FaCheckCircle /> : <span className="h-2.5 w-2.5 rounded-sm bg-current" />}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-950">
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={exp.icon}
                                            alt={exp.company}
                                            className="h-14 w-14 rounded-lg bg-white object-contain p-2 shadow-sm ring-1 ring-gray-100"
                                        />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-xl font-black text-gray-950 dark:text-white">{exp.company}</h3>
                                                {exp.status && (
                                                    <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-black uppercase text-red-700 dark:bg-red-400/10 dark:text-red-300">
                                                        {exp.status}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 font-bold text-cyan-700 dark:text-cyan-300">{exp.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 dark:bg-white/10">
                                            <FaCalendarAlt className="text-red-500" />
                                            {exp.period}
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 dark:bg-white/10">
                                            <FaMapMarkerAlt className="text-emerald-500" />
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300">{exp.summary}</p>

                                <ul className="mt-5 grid gap-3 text-gray-700 dark:text-gray-300 lg:grid-cols-2">
                                    {exp.description.map((item) => (
                                        <li key={item} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 text-sm leading-6 dark:bg-white/5">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-sm bg-cyan-500"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
