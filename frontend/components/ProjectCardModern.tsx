// components/ProjectCardModern.tsx
'use client';

import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

type ProjectProps = {
    title: string;
    description: string;
    tech: string[];
    repo?: string;
    live?: string;
    image: string;
    size: 'sm' | 'md' | 'lg';
};

const sizeClasses: Record<ProjectProps['size'], string> = {
    sm: 'w-[508.75px] h-[426.27px]',
    md: 'w-[728.25px] h-[572.58px]',
    lg: 'w-[1277px] h-[938.38px]',
};

const ProjectCardModern: React.FC<ProjectProps> = ({
    title,
    description,
    tech,
    repo,
    live,
    image,
    size,
}) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: cardRef });
    const boxShadow = useTransform(scrollYProgress, [0, 1], [
        '0 2px 20px rgba(255,255,255,0.03)',
        '0 4px 40px rgba(255,255,255,0.15)',
    ]);

    return (
        <motion.div
            ref={cardRef}
            style={{ boxShadow }}
            className={`
        ${sizeClasses[size]}
        relative group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden 
        flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1
      `}
        >
            {/* Image Block */}
            <div className="relative h-2/3 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 scale-[1.02] group-hover:scale-105"
                />

                {/* Tech Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    {(tech ?? []).map((tag, i) => (
                        <span
                            key={i}
                            className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Hover Modal */}
                <motion.div
                    initial={{ y: '100%' }}
                    whileHover={{ y: '0%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-black/80 text-white p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <div>
                        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
                        <p className="text-sm text-white/80 mt-1 line-clamp-2">{description}</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                        {repo && (
                            <a
                                href={repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                            >
                                <FaGithub size={16} />
                                <span>Source</span>
                            </a>
                        )}
                        {live && (
                            <a
                                href={live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                            >
                                <FaExternalLinkAlt size={14} />
                                <span>Live</span>
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="p-4 h-1/3 flex flex-col justify-between">
                <h3 className="text-white font-semibold text-lg line-clamp-1">{title}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{description}</p>
            </div>
        </motion.div>
    );
};

export default memo(ProjectCardModern);