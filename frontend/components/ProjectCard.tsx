'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

type ProjectProps = {
    title: string;
    description: string;
    tech: string[];
    repo: string;
    live: string;
    image?: string;
};

const ProjectCard: React.FC<ProjectProps> = ({
    title,
    description,
    tech,
    repo,
    live,
    image,
}) => {
    return (
        <motion.div
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all overflow-hidden group"
            whileHover={{ scale: 1.02, y: -6 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
            {/* Image */}
            {image && (
                <div className="rounded-lg overflow-hidden mb-4 border border-white/10">
                    <img
                        src={image}
                        alt={`${title} preview`}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold tracking-wide mb-2">{title}</h2>

            {/* Description */}
            <p className="text-base text-white/90 mb-4">{description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((item, index) => (
                    <motion.span
                        key={`${item}-${index}`}
                        className="bg-white/10 text-sand-100 text-sm px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {item}
                    </motion.span>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 hover-fade">
                {repo && (
                    <a
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repo"
                        className="p-2 bg-black/30 rounded-full backdrop-blur-md border border-white/20 hover:scale-110 transition-transform"
                    >
                        <FaGithub className="text-white" size={18} />
                    </a>
                )}
                {live && (
                    <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Project"
                        className="p-2 bg-black/30 rounded-full backdrop-blur-md border border-white/20 hover:scale-110 transition-transform"
                    >
                        <FaExternalLinkAlt className="text-white" size={16} />
                    </a>
                )}
            </div>

        </motion.div>
    );
};

export default memo(ProjectCard);
