'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

type ProjectProps = {
    title: string;
    description: string;
    tech: string[];
};

const ProjectCard: React.FC<ProjectProps> = ({ title, description, tech }) => {
    return (
        <motion.div
            className="bg-black/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            role="article"
            aria-labelledby={`project-${title}-title`}
        >
            <h2
                id={`project-${title}-title`}
                className="text-2xl font-semibold tracking-wide mb-4"
            >
                {title}
            </h2>
            <p className="text-base mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tech.map((item, index) => (
                    <motion.span
                        key={`${item}-${index}`}
                        className="inline-block bg-white/10 text-sand-600 text-sm px-2 py-1 rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                        {item}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

export default memo(ProjectCard);