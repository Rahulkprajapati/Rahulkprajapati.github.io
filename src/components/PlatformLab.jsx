import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaCubes, FaDatabase, FaDollarSign, FaLayerGroup, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
import { SiGithubactions, SiGrafana, SiKubernetes, SiTerraform } from 'react-icons/si';
import { SectionHeader } from './Frame';

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
        <section id="platform-lab" className="section section-divider">
            <div className="shell">
                <SectionHeader
                    index="02"
                    label="Platform Lab"
                    meta="Sanitised · no client data"
                    title="A sanitised view of how I think."
                    aside="A surface for the usually invisible work: architecture trade-offs, self-service DevEx, GitOps delivery, observability, migration evidence and efficiency."
                />

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="surface p-6"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="eyebrow flex items-center gap-2" style={{ color: 'var(--tech)' }}>
                                    <FaProjectDiagram />
                                    Interactive Architecture
                                </div>
                                <h3 className="mt-2.5 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Production platform control plane</h3>
                            </div>
                            <span className="rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>Sanitised</span>
                        </div>

                        <div
                            className="relative mt-6 min-h-[440px] overflow-hidden rounded-lg"
                            style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)' }}
                        >
                            <div className="grid-paper absolute inset-0 opacity-70" style={{ backgroundSize: '42px 42px' }} />
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M11 26 C24 27, 24 38, 35 41 S55 22, 69 22" fill="none" style={{ stroke: 'var(--tech)' }} strokeOpacity="0.55" strokeWidth="0.45" />
                                <path d="M35 41 C47 47, 60 50, 73 51 S83 43, 89 38" fill="none" style={{ stroke: 'var(--alert)' }} strokeOpacity="0.55" strokeWidth="0.45" />
                                <path d="M18 64 C28 67, 31 71, 35 72 S48 79, 57 79" fill="none" style={{ stroke: 'var(--accent)' }} strokeOpacity="0.55" strokeWidth="0.45" />
                                <path d="M57 79 C68 77, 76 76, 85 75" fill="none" style={{ stroke: 'var(--tech)' }} strokeOpacity="0.55" strokeWidth="0.45" />
                                <path d="M69 22 C73 30, 74 40, 73 51" fill="none" style={{ stroke: 'var(--accent)' }} strokeOpacity="0.55" strokeWidth="0.45" />
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
                                        className="rounded-lg border px-3 py-2 text-left text-sm font-semibold transition hover:-translate-y-1"
                                        style={
                                            activeNode?.id === node.id
                                                ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--on-accent)', boxShadow: 'var(--shadow-md)' }
                                                : { background: 'var(--surface-strong)', borderColor: 'var(--border-strong)', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' }
                                        }
                                    >
                                        {node.label}
                                    </button>

                                    {activeNode?.id === node.id && (
                                        <div
                                            className={`absolute z-50 w-80 max-w-[min(20rem,80vw)] rounded-lg p-4 text-left backdrop-blur ${node.tooltip === 'left' ? 'right-0' : 'left-0'} ${node.vertical === 'top' ? 'bottom-12' : 'top-12'}`}
                                            style={{ background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg)' }}
                                        >
                                            <p className="micro" style={{ color: 'var(--accent)' }}>{node.label}</p>
                                            <p className="mt-2 text-sm font-medium leading-6" style={{ color: 'var(--text)' }}>{node.detail}</p>
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
                            className="surface p-6"
                        >
                            <div className="eyebrow flex items-center gap-2">
                                <FaLayerGroup />
                                Mock IDP
                            </div>
                            <h3 className="mt-2.5 text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Service catalog mindset</h3>
                            <div className="mt-5 grid gap-3">
                                {serviceCatalog.map((service) => (
                                    <div key={service.name} className="surface-flat p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{service.name}</p>
                                            <span className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider" style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}>{service.status}</span>
                                        </div>
                                        <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>{service.owner}</p>
                                        <p className="mt-2 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{service.action}</p>
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
                                <div key={item.label} className="surface-flat p-4">
                                    <div className="text-xl" style={{ color: 'var(--accent)' }}>{item.icon}</div>
                                    <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.value}</p>
                                    <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>{item.label}</p>
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
                        className="surface p-6"
                    >
                        <div className="eyebrow flex items-center gap-2" style={{ color: 'var(--tech)' }}>
                            <SiGithubactions />
                            CI/CD Visualizer
                        </div>
                        <div className="mt-5 grid gap-3">
                            {pipelineStages.map((stage, index) => (
                                <div key={stage} className="flex items-center gap-3">
                                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg font-mono text-xs font-semibold" style={{ background: 'var(--surface-inset)', color: 'var(--text)' }}>{index + 1}</span>
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--surface-inset)' }}>
                                        <div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--tech), var(--accent))', width: `${52 + index * 6}%` }} />
                                    </div>
                                    <span className="w-24 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stage}</span>
                                </div>
                            ))}
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="surface p-6"
                    >
                        <div className="eyebrow flex items-center gap-2" style={{ color: 'var(--tech)' }}>
                            <SiTerraform />
                            IaC Showcase
                        </div>
                        <pre
                            className="mt-5 overflow-x-auto rounded-lg p-4 font-mono text-xs leading-6"
                            style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        ><code>{`module "service_db" {
  source  = "app.terraform.io/platform/cloud-sql/google"
  version = "~> 2.4"
  env     = var.environment

  guardrails = {
    ssl_required = true
    secrets_sync = true
    audit_labels = local.labels
  }
}`}</code></pre>
                        <p className="mt-4 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                            The point is not just provisioning. It is repeatable defaults, audit labels, secrets discipline, and safer promotion paths.
                        </p>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="surface p-6"
                    >
                        <div className="eyebrow flex items-center gap-2" style={{ color: 'var(--tech)' }}>
                            <SiGrafana />
                            Observability
                        </div>
                        <div className="mt-5 grid gap-3">
                            {[
                                { label: 'Availability lens', value: 'SLO-first' },
                                { label: 'Signals', value: 'Logs · Metrics · Traces' },
                                { label: 'Response', value: 'Alert → Runbook → Evidence' },
                            ].map((metric) => (
                                <div key={metric.label} className="surface-flat p-4">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{metric.value}</p>
                                    <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>{metric.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
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
