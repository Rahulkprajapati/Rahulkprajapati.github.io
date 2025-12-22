import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobileAlt, FaDatabase, FaAws, FaDocker, FaJenkins, FaLinux, FaGitAlt, FaGitlab, FaCloud } from 'react-icons/fa';
import { SiGooglecloud, SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiArgo, SiHelm, SiCircleci, SiPython, SiGo, SiGnubash, SiDatadog } from 'react-icons/si';

const About = () => {
    const skills = [
        { name: 'Cloud', icon: <FaServer />, description: 'AWS, GCP, Azure' },
        { name: 'DevOps Tools', icon: <FaCode />, description: 'Terraform, Docker, K8s, Jenkins, ArgoCD, GitLab, Helm' },
        { name: 'Programming', icon: <FaDatabase />, description: 'Python, Go, Bash, Shell Scripting' },
        { name: 'Observability', icon: <FaMobileAlt />, description: 'Prometheus, Grafana, Datadog' },
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
        { name: 'Helm', icon: <SiHelm className="text-[#0F1689]" /> },
        { name: 'Prometheus', icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: 'Grafana', icon: <SiGrafana className="text-[#F46800]" /> },
        { name: 'Datadog', icon: <SiDatadog className="text-[#632CA6]" /> },
        { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
        { name: 'Go', icon: <SiGo className="text-[#00ADD8]" /> },
        { name: 'Bash', icon: <SiGnubash className="text-[#4EAA25]" /> },
        { name: 'Linux', icon: <FaLinux className="text-black dark:text-white" /> },
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
                    <div className="text-left max-w-4xl mx-auto space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        <p>
                            I’m a Cloud & DevOps Engineer currently driving infrastructure innovation at <span className="font-semibold text-blue-600 dark:text-blue-400">Alteryx</span>. With a background spanning AirAsia, Zeotap, and startups, I specialize in building scalable, automated multi-cloud environments (AWS & GCP).
                        </p>
                        <p>
                            Beyond the code, I’m a passionate mentor at <a href="https://cloudclan.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">cloudclan.co</a> and a tech writer on Medium, sharing insights on Cloud Native tools, Security, and System Design.
                        </p>
                        <p>
                            My core philosophy? <span className="font-bold text-gray-800 dark:text-white">Automate everything.</span> From CI/CD pipelines to complex infrastructure provisioning, I thrive on creating efficient, self-healing systems.
                        </p>
                        <p className="font-semibold text-blue-600 dark:text-blue-400 pt-2">
                            Let's connect and build something scalable together!
                        </p>
                    </div>
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

                {/* DevOps Toolkit Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">DevOps Toolkit</h3>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.name}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center space-y-2"
                                title={tool.name}
                            >
                                <div className="text-4xl md:text-5xl bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                                    {tool.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{tool.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

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
