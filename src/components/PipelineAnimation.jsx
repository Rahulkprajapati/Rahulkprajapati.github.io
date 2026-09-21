import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaCheckCircle, FaCode, FaCogs, FaRocket } from 'react-icons/fa';

const stages = [
    { icon: <FaCode />, label: 'commit', tone: 'var(--text-subtle)' },
    { icon: <FaCogs />, label: 'build', tone: 'var(--tech)' },
    { icon: <FaCheckCircle />, label: 'test', tone: 'var(--ok)' },
    { icon: <FaRocket />, label: 'deploy', tone: 'var(--accent)' },
];

const PipelineAnimation = () => {
    return (
        <div
            className="mt-5 flex items-center justify-between gap-1 rounded-xl p-3 sm:gap-2"
            style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)' }}
        >
            {stages.map((stage, index) => (
                <React.Fragment key={stage.label}>
                    <Motion.div
                        className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg py-2.5"
                        style={{ color: stage.tone }}
                        animate={{ opacity: [0.45, 1, 0.45] }}
                        transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: index * 0.55,
                            ease: 'easeInOut',
                        }}
                    >
                        <span className="text-lg">{stage.icon}</span>
                        <span className="font-mono text-[0.62rem] font-medium tracking-wide">{stage.label}</span>
                    </Motion.div>

                    {index < stages.length - 1 && (
                        <div
                            className="relative h-px w-4 flex-shrink-0 overflow-hidden sm:w-7"
                            style={{ background: 'var(--border-strong)' }}
                        >
                            <Motion.div
                                className="absolute inset-y-0 w-1/2"
                                style={{ background: stages[index + 1].tone }}
                                initial={{ x: '-120%' }}
                                animate={{ x: '220%' }}
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    delay: index * 0.55,
                                    ease: 'linear',
                                }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PipelineAnimation;
