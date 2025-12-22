import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobileAlt, FaDatabase } from 'react-icons/fa';

const About = () => {
    const skills = [
        { name: 'Cloud', icon: <FaServer />, description: 'Google Cloud Platform (GCP), AWS' },
        { name: 'DevOps Tools', icon: <FaCode />, description: 'Terraform, Packer, Docker, Helm, Kubernetes, ArgoCD, Jenkins' },
        { name: 'Programming', icon: <FaDatabase />, description: 'Shell Scripting, Golang, Python' },
        { name: 'OS & Others', icon: <FaMobileAlt />, description: 'Linux, Ubuntu, GitOps, Networking' },
    ];

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        I am a Cloud and DevOps Engineer with extensive experience in automating multi-cloud infrastructure,
                        building CI/CD pipelines, and managing Kubernetes clusters. I hold multiple Google Cloud certifications
                        and love solving complex infrastructure challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="text-4xl text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">B.Tech in Electronics and Communication</h4>
                            <p className="text-blue-600 dark:text-blue-400">KIET Group of Institutions</p>
                            <p className="text-gray-500 dark:text-gray-400">March 2022 | CGPA: 7.9</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                            <li>Google Cloud Certified Professional Cloud Architect</li>
                            <li>Google Cloud Certified Professional DevOps Engineer</li>
                            <li>Google Cloud Certified Associate Engineer</li>
                            <li>GitOps with ArgoCD</li>
                            <li>Microsoft Certified Azure Fundamentals</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
