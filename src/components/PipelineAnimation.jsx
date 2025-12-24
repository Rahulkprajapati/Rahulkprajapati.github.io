import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCogs, FaCheckCircle, FaRocket } from 'react-icons/fa';

const PipelineAnimation = () => {
    const stages = [
        { icon: <FaCode />, label: 'Commit', color: 'text-gray-500' },
        { icon: <FaCogs />, label: 'Build', color: 'text-yellow-500' },
        { icon: <FaCheckCircle />, label: 'Test', color: 'text-green-500' },
        { icon: <FaRocket />, label: 'Deploy', color: 'text-purple-500' },
    ];

    return (
        <div className="flex items-center justify-center space-x-2 md:space-x-4 my-8 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800">
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center">
                    <motion.div
                        className={`flex flex-col items-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${stage.color}`}
                        animate={{
                            scale: [1, 1.1, 1],
                            borderColor: ['transparent', 'currentColor', 'transparent'],
                            borderWidth: '2px',
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="text-xl md:text-2xl mb-1">{stage.icon}</span>
                        <span className="text-xs font-mono font-semibold">{stage.label}</span>
                    </motion.div>

                    {index < stages.length - 1 && (
                        <div className="w-8 md:w-12 h-1 bg-gray-200 dark:bg-gray-700 mx-2 relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-full bg-cyan-500"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                    ease: "linear"
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PipelineAnimation;
