import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaAws, FaCloud, FaCode, FaDocker, FaGitlab, FaJenkins, FaLinux, FaMobileAlt, FaRobot, FaServer } from 'react-icons/fa';
import { SiGooglecloud, SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiArgo, SiHelm, SiCircleci, SiPython, SiGo, SiGnubash, SiDatadog, SiGithubactions, SiMysql, SiNewrelic, SiOpenai, SiRedis } from 'react-icons/si';
import { certifications, profile } from '../data/profile';

const About = () => {
    const skills = [
        { name: 'Cloud Platforms', icon: <FaServer />, description: 'GCP, AWS, Azure, IAM, networking, cost controls', accent: 'bg-red-500' },
        { name: 'Platform Engineering', icon: <FaCode />, description: 'Terraform, Kubernetes, Docker, Helm, ArgoCD', accent: 'bg-cyan-500' },
        { name: 'Automation & AI', icon: <FaRobot />, description: 'Agents, Python, Go, Bash, GitLab CI, Jenkins, CircleCI', accent: 'bg-emerald-500' },
        { name: 'Reliability', icon: <FaMobileAlt />, description: 'Prometheus, Grafana, Datadog, New Relic, SLOs', accent: 'bg-amber-500' },
    ];

    const tools = [
        { name: 'AWS', icon: <FaAws className="text-[#FF9900]" /> },
        { name: 'GCP', icon: <SiGooglecloud className="text-[#4285F4]" /> },
        { name: 'Azure', icon: <FaCloud className="text-[#0078D4]" /> },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-[#326CE5]" /> },
        { name: 'Docker', icon: <FaDocker className="text-[#2496ED]" /> },
        { name: 'Terraform', icon: <SiTerraform className="text-[#7B42BC]" /> },
        { name: 'Ansible', icon: <SiAnsible className="text-[#EE0000]" /> },
        { name: 'Jenkins', icon: <FaJenkins className="text-[#D24939]" /> },
        { name: 'GitLab', icon: <FaGitlab className="text-[#FC6D26]" /> },
        { name: 'ArgoCD', icon: <SiArgo className="text-[#EF7B4D]" /> },
        { name: 'CircleCI', icon: <SiCircleci className="text-[#343434]" /> },
        { name: 'GitHub Actions', icon: <SiGithubactions className="text-[#2088FF]" /> },
        { name: 'Helm', icon: <SiHelm className="text-[#0F1689]" /> },
        { name: 'Prometheus', icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: 'Grafana', icon: <SiGrafana className="text-[#F46800]" /> },
        { name: 'Datadog', icon: <SiDatadog className="text-[#632CA6]" /> },
        { name: 'New Relic', icon: <SiNewrelic className="text-[#1CE783]" /> },
        { name: 'Cloud SQL / DMS', icon: <SiMysql className="text-[#4479A1]" /> },
        { name: 'Redis / Memorystore', icon: <SiRedis className="text-[#DC382D]" /> },
        { name: 'AI Agents', icon: <SiOpenai className="text-[#111827]" /> },
        { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
        { name: 'Go', icon: <SiGo className="text-[#00ADD8]" /> },
        { name: 'Bash', icon: <SiGnubash className="text-[#4EAA25]" /> },
        { name: 'Linux', icon: <FaLinux className="text-black" /> },
    ];

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
                >
                    <div>
                        <p className="text-sm font-black uppercase text-red-600 dark:text-red-300">About Rahul</p>
                        <h2 className="mt-3 text-3xl md:text-5xl font-black text-gray-950 dark:text-white">Cloud systems that stay calm under pressure.</h2>
                    </div>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-8">
                        <p>
                            I build the parts users never see and teams feel immediately when they fail: <span className="font-black text-gray-950 dark:text-white">cloud platforms, data layers, release paths, reliability loops, and AI agents</span>.
                        </p>
                        <p>
                            My work lives at the intersection of <span className="font-black text-red-600 dark:text-red-300">scale, safety, and speed</span>: moving databases without drama, hardening Kubernetes without slowing teams down, and turning long operational runbooks into clear, repeatable automation.
                        </p>
                        <p>
                            I like systems that explain themselves. Dashboards that point to action. CI/CD that fails early. Terraform that encodes good defaults. Secrets that do not become folklore. AI agents that remove toil without removing engineering judgment.
                        </p>
                        <p>
                            I care about the quiet details that make engineering organizations faster: clean ownership, safer migrations, useful evidence, better defaults, sharper alerts, and platforms developers can trust without needing to understand every wire underneath.
                        </p>
                        <p>
                            My taste is simple: <span className="font-black text-gray-950 dark:text-white">boring infrastructure for users, deeply intentional engineering underneath.</span> If a deploy, migration, or incident needs luck, the platform is not finished.
                        </p>
                    </div>
                </Motion.div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {skills.map((skill, index) => (
                        <Motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
                        >
                            <div className={`absolute left-0 top-0 h-full w-1 ${skill.accent}`} />
                            <div className="flex items-start justify-between gap-4">
                                <div className="grid h-12 w-12 place-items-center rounded-lg bg-white text-2xl text-gray-900 shadow-sm ring-1 ring-gray-100 dark:bg-gray-950 dark:text-white dark:ring-white/10">
                                    {skill.icon}
                                </div>
                                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black uppercase text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    Active
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-black text-gray-950 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-300">
                                {skill.name}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {skill.description}
                            </p>
                        </Motion.div>
                    ))}
                </div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 rounded-2xl border border-gray-200 bg-gray-950 p-5 shadow-2xl shadow-gray-950/10 dark:border-white/10"
                >
                    <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-black uppercase text-cyan-300">Toolkit</p>
                            <h3 className="mt-2 text-2xl md:text-3xl font-black text-white">Daily platform stack</h3>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-gray-300">{profile.title} across cloud, delivery, reliability, and automation.</p>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {tools.map((tool, index) => (
                            <Motion.div
                                key={tool.name}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-white p-3 text-center shadow-sm"
                                title={tool.name}
                            >
                                <div className="text-3xl">{tool.icon}</div>
                                <span className="text-xs font-black text-gray-700">{tool.name}</span>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {certifications.map((item) => (
                        <div key={item} className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-bold leading-6 text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                            {item}
                        </div>
                    ))}
                </Motion.div>
            </div>
        </section>
    );
};

export default About;
