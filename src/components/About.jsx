import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaAws, FaCertificate, FaCloud, FaCode, FaDocker, FaGitlab, FaJenkins, FaLinux, FaChartLine, FaRobot, FaServer } from 'react-icons/fa';
import { SiGooglecloud, SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiArgo, SiHelm, SiCircleci, SiPython, SiGo, SiGnubash, SiDatadog, SiGithubactions, SiMysql, SiNewrelic, SiOpenai, SiRedis } from 'react-icons/si';
import { certifications, profile } from '../data/profile';

const skills = [
    {
        name: 'Cloud Platforms',
        icon: <FaServer />,
        description: 'GCP, AWS, Azure, IAM, networking, cost controls',
        tone: 'var(--accent)',
    },
    {
        name: 'Platform Engineering',
        icon: <FaCode />,
        description: 'Terraform, Kubernetes, Docker, Helm, ArgoCD',
        tone: 'var(--tech)',
    },
    {
        name: 'Automation & AI',
        icon: <FaRobot />,
        description: 'Agents, Python, Go, Bash, GitLab CI, Jenkins, CircleCI',
        tone: 'var(--ok)',
    },
    {
        name: 'Reliability',
        icon: <FaChartLine />,
        description: 'Prometheus, Grafana, Datadog, New Relic, SLOs',
        tone: 'var(--accent)',
    },
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
    { name: 'CircleCI', icon: <SiCircleci className="text-[#343434] dark:text-gray-200" /> },
    { name: 'GitHub Actions', icon: <SiGithubactions className="text-[#2088FF]" /> },
    { name: 'Helm', icon: <SiHelm className="text-[#0F1689] dark:text-[#6f7bd8]" /> },
    { name: 'Prometheus', icon: <SiPrometheus className="text-[#E6522C]" /> },
    { name: 'Grafana', icon: <SiGrafana className="text-[#F46800]" /> },
    { name: 'Datadog', icon: <SiDatadog className="text-[#632CA6] dark:text-[#a78bfa]" /> },
    { name: 'New Relic', icon: <SiNewrelic className="text-[#00ac69] dark:text-[#1CE783]" /> },
    { name: 'Cloud SQL', icon: <SiMysql className="text-[#4479A1] dark:text-[#7fb3dc]" /> },
    { name: 'Memorystore', icon: <SiRedis className="text-[#DC382D]" /> },
    { name: 'AI Agents', icon: <SiOpenai className="text-[#111827] dark:text-white" /> },
    { name: 'Python', icon: <SiPython className="text-[#3776AB] dark:text-[#6ba4d8]" /> },
    { name: 'Go', icon: <SiGo className="text-[#00ADD8]" /> },
    { name: 'Bash', icon: <SiGnubash className="text-[#4EAA25]" /> },
    { name: 'Linux', icon: <FaLinux className="text-[#111827] dark:text-white" /> },
];

const About = () => {
    return (
        <section id="about" className="section section-divider">
            <div className="shell">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
                >
                    <div className="lg:sticky lg:top-28">
                        <div className="flex items-center gap-4">
                            <span className="micro" style={{ color: 'var(--accent)' }}>01</span>
                            <span className="micro" style={{ color: 'var(--text)' }}>About</span>
                            <span aria-hidden className="h-px flex-1" style={{ background: 'var(--border)' }} />
                        </div>
                        <h2
                            className="mt-8 text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
                            style={{ color: 'var(--text)' }}
                        >
                            Cloud systems that stay calm under pressure.
                        </h2>
                        <p className="micro mt-6">Principle 01 — If it needs luck, it isn’t finished.</p>
                    </div>

                    <div className="space-y-5">
                        <p className="text-lg leading-[1.75] sm:text-xl" style={{ color: 'var(--text)' }}>
                            I build the parts users never see and teams feel immediately when they fail:{' '}
                            <span style={{ color: 'var(--accent)' }}>cloud platforms, data layers, release paths, reliability loops, and AI agents</span>.
                        </p>
                        <div className="space-y-4 text-base leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                My work lives at the intersection of <strong style={{ color: 'var(--text)', fontWeight: 600 }}>scale, safety, and speed</strong>: moving databases without drama, hardening Kubernetes without slowing teams down, and turning long operational runbooks into clear, repeatable automation.
                            </p>
                            <p>
                                I like systems that explain themselves. Dashboards that point to action. CI/CD that fails early. Terraform that encodes good defaults. Secrets that do not become folklore. AI agents that remove toil without removing engineering judgment.
                            </p>
                            <p>
                                I care about the quiet details that make engineering organizations faster: clean ownership, safer migrations, useful evidence, better defaults, sharper alerts, and platforms developers can trust without needing to understand every wire underneath.
                            </p>
                        </div>
                        <blockquote
                            className="mt-6 rounded-r-xl py-3 pl-5 text-base leading-[1.75]"
                            style={{ borderLeft: '3px solid var(--accent)', background: 'var(--accent-soft)', color: 'var(--text)' }}
                        >
                            Boring infrastructure for users, deeply intentional engineering underneath. If a deploy, migration, or incident needs luck, the platform is not finished.
                        </blockquote>
                    </div>
                </Motion.div>

                <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {skills.map((skill, index) => (
                        <Motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                            className="surface lift group relative overflow-hidden p-6"
                        >
                            <div
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-0.5 opacity-70"
                                style={{ background: skill.tone }}
                            />
                            <div
                                className="grid h-12 w-12 place-items-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                                style={{ background: 'var(--surface-inset)', color: skill.tone }}
                            >
                                {skill.icon}
                            </div>
                            <h3 className="mt-5 text-base font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                                {skill.name}
                            </h3>
                            <p className="mt-2 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                                {skill.description}
                            </p>
                        </Motion.div>
                    ))}
                </div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className="surface mb-16 overflow-hidden p-6 sm:p-8"
                >
                    <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                        <div>
                            <p className="eyebrow" style={{ color: 'var(--tech)' }}>Toolkit</p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl" style={{ color: 'var(--text)' }}>
                                Daily platform stack
                            </h3>
                        </div>
                        <p className="max-w-md text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                            {profile.title} across cloud, delivery, reliability, and automation.
                        </p>
                    </div>

                    <div className="mt-7 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {tools.map((tool, index) => (
                            <Motion.div
                                key={tool.name}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.015 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                                className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg p-3 text-center transition-colors duration-200"
                                style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)' }}
                                title={tool.name}
                            >
                                <div className="text-[1.5rem] opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">{tool.icon}</div>
                                <span className="font-mono text-[0.62rem] uppercase leading-tight tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                    {tool.name}
                                </span>
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <p className="eyebrow mb-5">Certifications</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {certifications.map((item) => (
                            <div key={item} className="surface-flat lift flex items-start gap-3 p-4">
                                <FaCertificate className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} size={15} />
                                <span className="text-sm font-medium leading-[1.6]" style={{ color: 'var(--text)' }}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </Motion.div>
            </div>
        </section>
    );
};

export default About;
