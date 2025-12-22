import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            company: 'Alteryx',
            role: 'Cloud Engineer',
            period: 'Jun 2024 - Present',
            location: 'Bangalore, IN',
            description: [
                'Automated multi-cloud infrastructure (GCP, AWS, Azure) across data, control, and management planes, reducing manual operations by 70%.',
                'Built 30+ Terraform modules and CI/CD pipelines for infra provisioning, boosting deployment speed by 3x.',
                'Developed internal tools for automated MR creation, compute disk cleanup, and service provisioning, cutting ops time by 40%.',
                'Managed 100+ Kubernetes clusters with ArgoCD and Helm for GitOps-based deployments.',
                'Integrated Teleport for unified access to Kubernetes, ArgoCD, databases, and internal tools, reducing onboarding time by 60%.',
                'Deployed Apigee Developer Portal for internal APIs and configured Google-managed SSL certificates.',
                'Implemented Anthos Service Mesh (ASM) with Istio across microservices to improve observability and security.'
            ]
        },
        {
            company: 'Zeotap',
            role: 'DevOps Engineer',
            period: 'Nov 2023 - May 2024',
            location: 'Bangalore, IN',
            description: [
                'Developed and implemented a system monitoring and alerting tool that reduced system downtime by 25% using New Relic, Grafana, and Google Managed Prometheus.',
                'Implemented CI/CD pipelines with CircleCI and Harness to streamline artifact and workload builds.',
                'Implemented a private cloud networking solution for a client on GCP, designing an efficient architecture.'
            ]
        },
        {
            company: 'AirAsia',
            role: 'Software Engineer DevOps',
            period: 'April 2022 - Oct 2023',
            location: 'Bangalore, IN',
            description: [
                'Designed new architecture for the flight’s Infra to achieve a 10X scaling strategy.',
                'Enabled GitLab CI for builds, artifacts, Kubernetes deployments, and end-to-end automation.',
                'Implemented Multi-cluster architecture to support canary traffic and HA.',
                'Migrated applications from GKE Standard to GKE Autopilot to reduce costs. Introduced ASM (Istio).',
                'Led the team in migrating frontend workloads from App Engine to Cloud Run, resulting in a 60% cost reduction.'
            ]
        },
        {
            company: 'Searce Inc',
            role: 'Cloud Engineer',
            period: 'Aug 2021 – March 2022',
            location: 'Mumbai, IN',
            description: [
                'Developed infrastructure as code using Terraform with a fully modularized approach.',
                'Built networking infrastructure, GKE clusters, load balancers, MIG, databases, and IAM.',
                'Performed migration of AWS resources into Google Cloud and debugged migration issues.'
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">My professional journey in Cloud and DevOps.</p>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border-l-4 border-blue-600 dark:border-blue-400"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0 text-sm md:text-base">
                                    <p>{exp.period}</p>
                                    <p>{exp.location}</p>
                                </div>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
