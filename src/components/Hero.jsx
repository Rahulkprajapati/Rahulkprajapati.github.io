import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 md:mb-0 md:mr-12"
                >
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
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
                    className="text-center md:text-left"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Rahul Prajapati</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
                        Cloud & DevOps Engineer | Automation Enthusiast
                    </h2>
                    <div className="flex space-x-4 justify-center md:justify-start">
                        <button
                            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            View Work
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
    );
};

export default Hero;
