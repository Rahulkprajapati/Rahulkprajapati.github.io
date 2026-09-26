import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaAws, FaCloud, FaCode, FaDocker, FaGitlab, FaJenkins, FaLinux, FaChartLine, FaRobot, FaServer } from 'react-icons/fa';
import { SiGooglecloud, SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiArgo, SiHelm, SiCircleci, SiPython, SiGo, SiGnubash, SiDatadog, SiGithubactions, SiMysql, SiNewrelic, SiOpenai, SiRedis } from 'react-icons/si';
import { certifications } from '../data/profile';
import { Panel } from './Frame';

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

const pad = (n) => String(n).padStart(2, '0');

const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, margin: '-60px' },
};

// Split "Google Cloud Certified Professional Cloud Architect" into issuer and
// name for the ledger. Only known prefixes are split; nothing is invented.
const ISSUERS = [
    ['Google Cloud Certified ', 'Google Cloud'],
    ['Microsoft Certified ', 'Microsoft'],
];
const parseCert = (raw) => {
    const match = ISSUERS.find(([prefix]) => raw.startsWith(prefix));
    return match ? { issuer: match[1], name: raw.slice(match[0].length) } : { issuer: '—', name: raw };
};

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

                {/* Capabilities as a ruled spec grid: cells draw their own top/left
                    hairlines and the panel clips the outer ones */}
                <Motion.div {...reveal} className="mb-16">
                    <Panel className="overflow-hidden">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="group relative p-6 pt-7 transition-colors duration-300 hover:bg-[var(--surface-inset)]"
                                    style={{ boxShadow: '-1px 0 0 var(--border), 0 -1px 0 var(--border)' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="micro" style={{ color: skill.tone }}>A.{pad(index + 1)}</span>
                                        <span className="text-base opacity-70 transition-opacity group-hover:opacity-100" style={{ color: skill.tone }}>
                                            {skill.icon}
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
                                        {skill.name}
                                    </h3>
                                    <p className="mt-2 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                                        {skill.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </Motion.div>

                <Motion.div {...reveal} className="mb-16">
                    <div className="mb-5 flex items-end justify-between gap-6">
                        <div>
                            <p className="micro" style={{ color: 'var(--tech)' }}>Toolkit · {tools.length} tools</p>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: 'var(--text)' }}>
                                Daily platform stack
                            </h3>
                        </div>
                        <p className="hidden max-w-sm text-right text-sm leading-[1.7] md:block" style={{ color: 'var(--text-muted)' }}>
                            Cloud, delivery, reliability and automation. Hover for colour.
                        </p>
                    </div>

                    {/* 24 tools divide evenly into 3, 4, 6 and 8 columns, so the ruled
                        grid never ends on a ragged row */}
                    <Panel className="overflow-hidden">
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                            {tools.map((tool) => (
                                <div
                                    key={tool.name}
                                    title={tool.name}
                                    className="group flex min-h-[6.5rem] flex-col items-center justify-center gap-2.5 p-3 text-center transition-colors duration-200 hover:bg-[var(--surface-inset)]"
                                    style={{ boxShadow: '-1px 0 0 var(--border), 0 -1px 0 var(--border)' }}
                                >
                                    <div className="text-[1.45rem] opacity-55 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">
                                        {tool.icon}
                                    </div>
                                    <span className="font-mono text-[0.6rem] uppercase leading-tight tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </Motion.div>

                <Motion.div {...reveal}>
                    <div className="mb-5 flex items-end justify-between gap-6">
                        <div>
                            <p className="micro" style={{ color: 'var(--accent)' }}>Credentials · {pad(certifications.length)}</p>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: 'var(--text)' }}>
                                Certifications
                            </h3>
                        </div>
                    </div>
                    <Panel className="overflow-hidden">
                        <div className="hidden grid-cols-[4rem_1fr_12rem] gap-4 px-6 pb-3 pt-9 sm:grid">
                            <span className="micro">No.</span>
                            <span className="micro">Credential</span>
                            <span className="micro text-right">Issuer</span>
                        </div>
                        <ol className="m-0 list-none p-0 pt-5 sm:pt-0">
                            {certifications.map((raw, index) => {
                                const cert = parseCert(raw);
                                return (
                                    <li
                                        key={raw}
                                        className="grid grid-cols-[3rem_1fr] items-center gap-x-4 gap-y-1 px-6 py-4 transition-colors duration-200 hover:bg-[var(--surface-inset)] sm:grid-cols-[4rem_1fr_12rem]"
                                        style={{ borderTop: '1px solid var(--border)' }}
                                    >
                                        <span className="micro flex items-center gap-2">
                                            <span className="signal-dot" style={{ width: 5, height: 5 }} />
                                            C.{pad(index + 1)}
                                        </span>
                                        <span className="text-[0.95rem] font-medium" style={{ color: 'var(--text)' }}>
                                            {cert.name}
                                        </span>
                                        <span className="micro col-start-2 sm:col-start-auto sm:text-right">{cert.issuer}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    </Panel>
                </Motion.div>
            </div>
        </section>
    );
};

export default About;
