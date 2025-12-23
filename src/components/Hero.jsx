import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaMedium, FaTerminal } from 'react-icons/fa';
import profileImage from '../assets/profile.jpg';
import Terminal from './Terminal';

const Hero = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <>
            <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 md:mb-0 md:mr-12"
                    >
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500 shadow-2xl">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center md:text-left max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                            Hi, I'm <span className="text-cyan-500">Rahul Prajapati</span>
                        </h1>
                        <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-20">
                            <Typewriter
                                options={{
                                    strings: [
                                        'DevOps Engineer',
                                        'Cloud Architect',
                                        'Automation Expert',
                                        'Infrastructure Specialist'
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 50,
                                    delay: 80,
                                }}
                            />
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4 justify-center md:justify-start mb-8">
                            <a href="https://github.com/Rahulkprajapati" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                                <FaGithub size={28} />
                            </a>
                            <a href="https://linkedin.com/in/rahulkumarprajapati" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                                <FaLinkedin size={28} />
                            </a>
                            <a href="https://medium.com/@rahulkprajapati" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                                <FaMedium size={28} />
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => setShowTerminal(true)}
                                className="px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <FaTerminal />
                                <span>Try Terminal</span>
                            </button>
                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Contact Me
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Terminal Modal */}
            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
        </>
    );
};

export default Hero;
