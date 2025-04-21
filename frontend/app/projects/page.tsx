// Updated /app/projects/page.tsx with masonry and size-based cards
'use client';

import { memo, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import SakuraLoading from '@/components/SakuraLoading';
import ProjectCardModern from '@/components/ProjectCardModern';

const mockProjects = [
    {
        id: '1',
        title: 'Sakura Whisper',
        description: 'A poetic microblog platform inspired by seasonal blossoms.',
        tech: ['Next.js', 'TypeScript', 'Framer Motion'],
        repo: '#',
        live: '#',
        image: '/images/sakura-whisper.jpg',
        size: 'sm',
    },
    {
        id: '2',
        title: 'Zen Garden',
        description: 'Interactive design system builder with calming visual themes.',
        tech: ['React', 'Tailwind CSS', 'Zustand'],
        repo: '#',
        live: '#',
        image: '/images/zen-garden.jpg',
        size: 'md',
    },
    {
        id: '3',
        title: 'Moonlight Synth',
        description: 'Audio-reactive visualizer with night-mode and sakura trails.',
        tech: ['Canvas', 'Tone.js', 'Framer Motion'],
        repo: '#',
        live: '#',
        image: '/images/moonlight-synth.jpg',
        size: 'lg',
    },
    {
        id: '4',
        title: 'Mystic Bloom',
        description: 'Immersive floral animation experiment with WebGL.',
        tech: ['Three.js', 'GLSL', 'WebGPU'],
        repo: '#',
        live: '#',
        image: '/images/project-4.jpg',
        size: 'sm',
    },
];

const breakpoints = {
    default: 3,
    1280: 2,
    768: 1,
};

const ProjectsPage: React.FC = () => {
    const projects = useMemo(() => mockProjects, []);

    return (
        <>
            <SakuraLoading
                isNight={
                    typeof window !== 'undefined' &&
                    document.documentElement.classList.contains('night-mode')
                }
            />

            <section
                className="relative z-10 min-h-screen py-20 md:py-28"
                aria-labelledby="projects-title"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1
                            id="projects-title"
                            className="text-5xl md:text-6xl font-bold tracking-widest mb-2"
                        >
                            Projects
                        </h1>
                        <div className="w-24 h-1 mx-auto bg-gold rounded-full opacity-80" />
                    </div>

                    <div className="border-frame my-masonry-grid">
                        <Masonry
                            breakpointCols={breakpoints}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {projects.map((project) => (
                                <ProjectCardModern key={project.id} {...project} />
                            ))}
                        </Masonry>
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(ProjectsPage);
