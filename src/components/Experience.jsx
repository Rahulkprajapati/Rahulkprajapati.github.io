import React from 'react';
import { motion } from 'framer-motion';
import alteryxIcon from '../assets/alteryx-icon.png';
import airasiaIcon from '../assets/airasia-icon.png';
import searceIcon from '../assets/searce-icon.png';
import zeotapIcon from '../assets/zeotap-icon.jpeg';

const Experience = () => {
    const experiences = [
        {
            company: 'Alteryx',
            role: 'Cloud Engineer',
            period: 'Jun 2024 - Present',
            location: 'Bangalore, IN',
            icon: alteryxIcon,
            description: [
                'Automated multi-cloud infrastructure (GCP, AWS, Azure) across data, control, & management planes, reducing manual ops by 70%.',
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
            icon: zeotapIcon,
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
            icon: airasiaIcon,
            description: [
                'Designed new architecture for the flight\'s Infra to achieve a 10X scaling strategy.',
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
            icon: searceIcon,
            description: [
                'Developed infrastructure as code using Terraform with a fully modularized approach.',
                'Built networking infrastructure, GKE clusters, load balancers, MIG, databases, and IAM.',
                'Performed migration of AWS resources into Google Cloud and debugged migration issues.'
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">My professional journey in Cloud and DevOps.</p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500 origin-top"
                    ></motion.div>

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'}`}
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"
                            ></motion.div>

                            {/* Content card */}
                            <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    {/* Company header */}
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={exp.icon}
                                            alt={exp.company}
                                            className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                                            <p className="text-cyan-500 font-semibold">{exp.role}</p>
                                        </div>
                                    </div>

                                    {/* Period and location */}
                                    <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center">
                                            📅 {exp.period}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center">
                                            📍 {exp.location}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-cyan-500 mr-2 flex-shrink-0">▸</span>
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
