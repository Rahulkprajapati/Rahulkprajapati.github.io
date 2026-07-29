import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaCubes, FaDatabase, FaDollarSign, FaLayerGroup, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
import { SiGithubactions, SiGrafana, SiKubernetes, SiTerraform } from 'react-icons/si';

const architectureNodes = [
    {
        id: 'edge',
        label: 'Edge Gateway',
        x: '10%',
        y: '24%',
        tooltip: 'right',
        detail: 'Normalizes external traffic, keeps routing rules explicit, and gives platform teams one place to enforce ingress policy.',
    },
    {
        id: 'gke',
        label: 'GKE Platform',
        x: '34%',
        y: '38%',
        tooltip: 'right',
        detail: 'Runs service workloads with GitOps delivery, Workload Identity, admission controls, and progressive rollout patterns.',
    },
    {
        id: 'gitops',
        label: 'GitOps Controller',
        x: '34%',
        y: '74%',
        tooltip: 'right',
        vertical: 'top',
        detail: 'Keeps desired state visible, makes promotion reviewable, and turns deployment drift into something the platform can reason about.',
    },
    {
        id: 'data',
        label: 'Cloud SQL',
        x: '68%',
        y: '20%',
        tooltip: 'left',
        detail: 'Consolidated data layer with migration gates, access visibility, rollback discipline, and validation evidence.',
    },
    {
        id: 'cache',
        label: 'Redis / Cache',
        x: '72%',
        y: '48%',
        tooltip: 'left',
        detail: 'Low-latency state with AUTH/TLS readiness, service config mapping, and blocker tracking before migration.',
    },
    {
        id: 'secrets',
        label: 'Secrets Sync',
        x: '56%',
        y: '82%',
        tooltip: 'left',
        vertical: 'top',
        detail: 'Separates application delivery from secret handling, with ownership, rotation, and runtime access kept explicit.',
    },
    {
        id: 'observe',
        label: 'Observability',
        x: '88%',
        y: '35%',
        tooltip: 'left',
        detail: 'Connects metrics, logs, traces, alerts, and runbooks so incidents move from signal to evidence quickly.',
    },
    {
        id: 'ai',
        label: 'AI Ops Agent',
        x: '18%',
        y: '66%',
        tooltip: 'right',
        vertical: 'top',
        detail: 'Agentic automation for inventory, evidence capture, runbook acceleration, and operational validation loops.',
    },
    {
        id: 'release',
        label: 'Release Gates',
        x: '84%',
        y: '78%',
        tooltip: 'left',
        vertical: 'top',
        detail: 'Uses automated checks, approval points, and rollback-aware validation to make production changes less dramatic.',
    },
];

const serviceCatalog = [
    { name: 'Service Bootstrap', owner: 'Platform', status: 'Ready', action: 'Create repo, CI template, namespace, alerts' },
    { name: 'Database Request', owner: 'Data Layer', status: 'Governed', action: 'Cloud SQL schema, SecretSync, user mapping' },
    { name: 'Runtime Onboarding', owner: 'SRE', status: 'Automated', action: 'GKE, ArgoCD, dashboards, SLO checks' },
];

const pipelineStages = [
    'Lint',
    'SAST',
    'Build',
    'Image Scan',
    'Deploy STG',
    'Validate',
    'Promote',
    'Observe',
];

const evidenceItems = [
    { label: 'Change Failure Guard', value: 'Rollback-first', icon: <FaShieldAlt /> },
    { label: 'Migration Proof', value: 'Evidence gates', icon: <FaDatabase /> },
    { label: 'DevEx Pattern', value: 'Self-service', icon: <FaCubes /> },
    { label: 'Efficiency Lens', value: 'Right-sized', icon: <FaDollarSign /> },
];

const PlatformLab = () => {
    const [activeNode, setActiveNode] = useState(null);

    return (
        <section id="platform-lab" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <p className="text-sm font-black uppercase text-red-600 dark:text-red-300">Platform Lab</p>
                        <h2 className="mt-3 text-3xl md:text-5xl font-black text-gray-950 dark:text-white">A sanitized view of how I think.</h2>
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
                        A portfolio surface for the usually invisible work: architecture tradeoffs, self-service DevEx, GitOps delivery, observability, migration evidence, and efficiency.
                    </p>
                </Motion.div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-black uppercase text-cyan-700 dark:text-cyan-300">
                                    <FaProjectDiagram />
                                    Interactive Architecture
                                </div>
                                <h3 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">Production platform control plane</h3>
                            </div>
                            <span className="rounded-md bg-red-50 px-3 py-2 text-xs font-black uppercase text-red-700 dark:bg-red-400/10 dark:text-red-300">Sanitized</span>
                        </div>

                        <div className="relative mt-6 min-h-[440px] overflow-hidden rounded-lg border border-gray-200 bg-gray-950 dark:border-white/10">
                            <div className="absolute inset-0 opacity-30" style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
                                backgroundSize: '42px 42px',
                            }} />
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M11 26 C24 27, 24 38, 35 41 S55 22, 69 22" fill="none" stroke="rgba(103,232,249,.32)" strokeWidth="0.45" />
                                <path d="M35 41 C47 47, 60 50, 73 51 S83 43, 89 38" fill="none" stroke="rgba(248,113,113,.28)" strokeWidth="0.45" />
                                <path d="M18 64 C28 67, 31 71, 35 72 S48 79, 57 79" fill="none" stroke="rgba(16,185,129,.28)" strokeWidth="0.45" />
                                <path d="M57 79 C68 77, 76 76, 85 75" fill="none" stroke="rgba(103,232,249,.24)" strokeWidth="0.45" />
                                <path d="M69 22 C73 30, 74 40, 73 51" fill="none" stroke="rgba(250,204,21,.24)" strokeWidth="0.45" />
                            </svg>

                            {architectureNodes.map((node) => (
                                <div
                                    key={node.id}
                                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: node.x, top: node.y }}
                                >
                                    <button
                                        type="button"
                                        onMouseEnter={() => setActiveNode(node)}
                                        onFocus={() => setActiveNode(node)}
                                        className={`rounded-lg border px-3 py-2 text-left text-sm font-black shadow-lg transition hover:-translate-y-1 ${activeNode?.id === node.id ? 'border-cyan-300 bg-cyan-300 text-gray-950' : 'border-white/10 bg-white/10 text-white hover:border-cyan-300/60'}`}
                                    >
                                        {node.label}
                                    </button>

                                    {activeNode?.id === node.id && (
                                        <div className={`absolute z-50 w-80 max-w-[min(20rem,80vw)] rounded-lg border border-white/10 bg-gray-950/95 p-4 text-left shadow-2xl backdrop-blur ${node.tooltip === 'left' ? 'right-0' : 'left-0'} ${node.vertical === 'top' ? 'bottom-12' : 'top-12'}`}>
                                            <p className="text-xs font-black uppercase text-cyan-300">{node.label}</p>
                                            <p className="mt-2 text-sm font-medium leading-6 text-gray-200">{node.detail}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Motion.div>

                    <div className="grid gap-6">
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950"
                        >
                            <div className="flex items-center gap-2 text-sm font-black uppercase text-red-600 dark:text-red-300">
                                <FaLayerGroup />
                                Mock IDP
                            </div>
                            <h3 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">Service catalog mindset</h3>
                            <div className="mt-5 grid gap-3">
                                {serviceCatalog.map((service) => (
                                    <div key={service.name} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-black text-gray-950 dark:text-white">{service.name}</p>
                                            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black uppercase text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">{service.status}</span>
                                        </div>
                                        <p className="mt-1 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">{service.owner}</p>
                                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.action}</p>
                                    </div>
                                ))}
                            </div>
                        </Motion.div>

                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {evidenceItems.map((item) => (
                                <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-950">
                                    <div className="text-xl text-red-600 dark:text-red-300">{item.icon}</div>
                                    <p className="mt-3 text-sm font-black text-gray-950 dark:text-white">{item.value}</p>
                                    <p className="mt-1 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">{item.label}</p>
                                </div>
                            ))}
                        </Motion.div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950"
                    >
                        <div className="flex items-center gap-2 text-sm font-black uppercase text-cyan-700 dark:text-cyan-300">
                            <SiGithubactions />
                            CI/CD Visualizer
                        </div>
                        <div className="mt-5 grid gap-3">
                            {pipelineStages.map((stage, index) => (
                                <div key={stage} className="flex items-center gap-3">
                                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-950 text-xs font-black text-white dark:bg-white dark:text-gray-950">{index + 1}</span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-red-400" style={{ width: `${52 + index * 6}%` }} />
                                    </div>
                                    <span className="w-24 text-sm font-bold text-gray-700 dark:text-gray-300">{stage}</span>
                                </div>
                            ))}
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950"
                    >
                        <div className="flex items-center gap-2 text-sm font-black uppercase text-cyan-700 dark:text-cyan-300">
                            <SiTerraform />
                            IaC Showcase
                        </div>
                        <pre className="mt-5 overflow-hidden rounded-lg bg-gray-950 p-4 text-xs leading-6 text-gray-200"><code>{`module "service_db" {
  source  = "app.terraform.io/platform/cloud-sql/google"
  version = "~> 2.4"
  env     = var.environment

  guardrails = {
    ssl_required = true
    secrets_sync = true
    audit_labels = local.labels
  }
}`}</code></pre>
                        <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            The point is not just provisioning. It is repeatable defaults, audit labels, secrets discipline, and safer promotion paths.
                        </p>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-950"
                    >
                        <div className="flex items-center gap-2 text-sm font-black uppercase text-cyan-700 dark:text-cyan-300">
                            <SiGrafana />
                            Observability
                        </div>
                        <div className="mt-5 grid gap-3">
                            {[
                                { label: 'Availability lens', value: 'SLO-first' },
                                { label: 'Signals', value: 'Logs · Metrics · Traces' },
                                { label: 'Response', value: 'Alert → Runbook → Evidence' },
                            ].map((metric) => (
                                <div key={metric.label} className="rounded-lg bg-gray-50 p-4 dark:bg-white/5">
                                    <p className="text-sm font-black text-gray-950 dark:text-white">{metric.value}</p>
                                    <p className="mt-1 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                            <SiKubernetes className="text-[#326CE5]" />
                            Production operations designed for boring days.
                        </div>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default PlatformLab;
