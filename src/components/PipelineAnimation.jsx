import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaCode, FaCogs, FaCheckCircle, FaRocket } from 'react-icons/fa';

const PipelineAnimation = () => {
    const stages = [
        { icon: <FaCode />, label: 'Commit', color: 'text-gray-500' },
        { icon: <FaCogs />, label: 'Build', color: 'text-yellow-500' },
        { icon: <FaCheckCircle />, label: 'Test', color: 'text-green-500' },
        { icon: <FaRocket />, label: 'Deploy', color: 'text-purple-500' },
    ];

    return (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50/80 p-3 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:gap-4">
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center">
                    <Motion.div
                        className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/10 sm:h-20 sm:w-20 ${stage.color}`}
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
                    </Motion.div>

                    {index < stages.length - 1 && (
                        <div className="relative mx-1 h-1 w-5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:mx-2 sm:w-10">
                            <Motion.div
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
