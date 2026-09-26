// Pure data, no asset imports: vite.config.js also reads this file in Node to
// pre-render a crawlable copy of the CV and the JSON-LD into index.html.
// Company logos are mapped from the `logo` key in src/data/logos.js.

export const SITE_URL = 'https://rahulkprajapati.github.io/';

export const profile = {
    name: 'Rahul Prajapati',
    title: 'Senior Software Engineer Platform',
    headline: 'Senior Platform Engineer',
    startYear: 2021,
    location: 'Bangalore, India',
    email: 'rahulkpkprajapati147@gmail.com',
    phone: '+91 6386658827',
    links: {
        github: 'https://github.com/Rahulkprajapati',
        linkedin: 'https://linkedin.com/in/rahulkumarprajapati',
        medium: 'https://medium.com/@rahulkprajapati',
    },
    // Search vocabulary for structured data and the pre-rendered CV. Every item
    // appears in the experience entries or toolkit, so nothing here is claimed
    // that the page doesn't already show.
    expertise: [
        'Platform Engineering',
        'Site Reliability Engineering (SRE)',
        'DevOps',
        'Google Cloud Platform (GCP)',
        'Google Kubernetes Engine (GKE)',
        'Kubernetes',
        'Terraform',
        'Infrastructure as Code',
        'GitOps',
        'Argo CD',
        'Helm',
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Cloud SQL',
        'Database Migration',
        'Redis',
        'Istio / Anthos Service Mesh',
        'Observability',
        'Prometheus',
        'Grafana',
        'CI/CD',
        'GitLab CI',
        'Python',
        'Go',
        'AI Agents',
    ],
    summary:
        'Senior software engineer platform building reliable, automated platforms across GCP, AWS, Azure, Kubernetes, Terraform, GitOps, AI agents, and observability.',
    current:
        'Currently at AirAsia MOVE, focused on Landing Zone migration, data-layer consolidation, AI-driven automation, platform hardening, and resilient systems for high-traffic travel products.',
};

export const metrics = [
    { value: '5+', unit: 'yrs', label: 'Production platforms', source: 'Aug 2021 to present' },
    { value: '100', unit: '+', label: 'Kubernetes clusters', source: 'Alteryx' },
    { value: '30', unit: '+', label: 'Terraform modules', source: 'Alteryx' },
    { value: '70', unit: '%', label: 'Manual ops removed', source: 'Alteryx' },
    { value: '60', unit: '%', label: 'Frontend cost cut', source: 'AirAsia, App Engine to Cloud Run' },
];

export const experiences = [
    {
        company: 'AirAsia MOVE',
        role: 'Senior Software Engineer Platform',
        period: 'Jun 2026 - Present',
        location: 'Bangalore, IN / Kuala Lumpur, MY',
        logo: 'airasia',
        status: 'Current',
        summary:
            'Leading Hotels platform modernization across Cloud SQL consolidation, Landing Zone migration, Redis and Firestore planning, GKE hardening, AI-assisted automation, and SRE incident response.',
        description: [
            'Led the full 7-phase STG Hotels MySQL consolidation end-to-end, from scope confirmation and inventory through target build, migration strategy, source preparation, data migration, and app switchover.',
            'Coordinated service migration readiness for consolidated Landing Zone Cloud SQL using write-freeze planning, validation gates, rollback discipline, and stakeholder alignment.',
            'Authored reusable migration assets including an E2E cutover example, Architecture Report Pack, Total Data Layer Migration plan, DMS runbooks, export-import runbook, validation evidence, SSL bastion commands, operator checks, and SecretSync handling.',
            'Inventoried Hotels Memorystore across STG and PRD, mapped service Redis host, port, AUTH, and TLS settings, documented blockers, and produced the Hotels Memorystore Migration Plan plus a reusable Redis migration example.',
            'Produced Firestore Landing Zone migration and right-sizing recommendations while resolving GKE foundation hardening items across config variabilization, internal DNS, log structuring, Workload Identity, admission compliance, and secrets management.',
            'Built agentic automation patterns for infrastructure inventory, migration evidence, validation workflows, and operational runbook acceleration.',
            'Updated Terraform modules for WIF and secrets, promoted production changes, validated GitOps/ArgoCD deployments, explored service mesh discovery, and remediated the GKE control plane public access finding.',
            'Handled a Hotels Kong gateway P0 traffic-blocking incident, resolved 15+ 5xx spike incidents across SSO/LB, GKE, Life GKE, and Cloud Run, and closed Cloud NAT port exhaustion alerts.',
            'Delivered infrastructure service requests for Kong base paths, reverse proxy routing, bucket access, BigQuery access, Workload Identity federation, OTA resources, domain/DNS mapping, and campaign scaling.',
        ],
    },
    {
        company: 'Alteryx',
        role: 'Cloud Engineer',
        period: 'Jun 2024 - Jul 2026',
        location: 'Bangalore, IN',
        logo: 'alteryx',
        summary:
            'Automated multi-cloud infrastructure and platform tooling across data, control, and management planes.',
        description: [
            'Automated multi-cloud infrastructure across GCP, AWS, and Azure, reducing manual operations by 70%.',
            'Built 30+ Terraform modules and CI/CD pipelines, improving infrastructure delivery speed by 3x.',
            'Developed internal tools for merge request automation, disk cleanup, and service provisioning, cutting operations time by 40%.',
            'Managed 100+ Kubernetes clusters with ArgoCD, Helm, and GitOps-based delivery.',
            'Integrated Teleport access for Kubernetes, ArgoCD, databases, and internal tools, reducing onboarding time by 60%.',
            'Deployed Apigee Developer Portal and configured Google-managed SSL certificates for internal APIs.',
            'Implemented Anthos Service Mesh with Istio to improve microservice observability and security.',
        ],
    },
    {
        company: 'Zeotap',
        role: 'DevOps Engineer',
        period: 'Nov 2023 - May 2024',
        location: 'Bangalore, IN',
        logo: 'zeotap',
        summary:
            'Improved observability, CI/CD, and private cloud networking for data platform workloads.',
        description: [
            'Built monitoring and alerting workflows with New Relic, Grafana, and Google Managed Prometheus, reducing downtime by 25%.',
            'Implemented CI/CD pipelines with CircleCI and Harness to streamline artifact and workload delivery.',
            'Designed a private cloud networking solution on GCP for a client-facing architecture.',
        ],
    },
    {
        company: 'AirAsia',
        role: 'Software Engineer DevOps',
        period: 'Apr 2022 - Oct 2023',
        location: 'Bangalore, IN',
        logo: 'airasia',
        summary:
            'Scaled product infrastructure, Kubernetes delivery, and frontend platform migrations.',
        description: [
            'Designed product infrastructure architecture for a 10x scaling strategy.',
            'Enabled GitLab CI for builds, artifacts, Kubernetes deployments, and end-to-end automation.',
            'Implemented multi-cluster architecture to support canary traffic and high availability.',
            'Migrated applications from GKE Standard to GKE Autopilot and introduced Anthos Service Mesh with Istio.',
            'Led frontend workload migration from App Engine to Cloud Run, reducing costs by 60%.',
        ],
    },
    {
        company: 'Searce Inc',
        role: 'Cloud Engineer',
        period: 'Aug 2021 - Mar 2022',
        location: 'Mumbai, IN',
        logo: 'searce',
        summary:
            'Built Google Cloud infrastructure, Terraform modules, and migration foundations.',
        description: [
            'Developed infrastructure as code using Terraform with a modularized approach.',
            'Built networking infrastructure, GKE clusters, load balancers, managed instance groups, databases, and IAM.',
            'Migrated AWS resources into Google Cloud and debugged migration issues.',
            'Developed DevOps pipelines using Jenkins and Cloud Build to update managed instance group images.',
            'Applied cloud best practices for secure and reliable GCP resource management.',
        ],
    },
];

export const certifications = [
    'Google Cloud Certified Professional Cloud Architect',
    'Google Cloud Certified Professional DevOps Engineer',
    'Google Cloud Certified Associate Engineer',
    'GitOps with ArgoCD',
    'Microsoft Certified Azure Fundamentals',
];
