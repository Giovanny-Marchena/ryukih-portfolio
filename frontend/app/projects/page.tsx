'use client';

import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    repo: string;
    live: string;
    image: string;
}

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error('Failed to fetch projects:', err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section
            className="min-h-screen px-4 py-12 relative z-10 bg-white dark:bg-sand-900 text-sand-900 dark:text-white"
            aria-labelledby="projects-title"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    id="projects-title"
                    className="text-5xl md:text-6xl font-bold tracking-widest text-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    Projects
                </motion.h1>

                <AnimatePresence>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default memo(ProjectsPage);
