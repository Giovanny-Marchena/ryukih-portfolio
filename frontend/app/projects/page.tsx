'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

type Project = {
    title: string;
    description: string;
    tech: string[];
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/projects') // Use your domain in production
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="min-h-screen px-6 py-20">
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </main>
    );
}
