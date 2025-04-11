// src/components/FeaturedProjects.jsx
import React, { useEffect, useMemo } from 'react';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import useProjectImages from '../hooks/useProjectImages.jsx';
import { Link } from 'react-router-dom';
import '@splidejs/splide/dist/css/splide.min.css';
import fallbackImage from '../assets/fallback-image.png';

const FeaturedProjects = () => {
    const projectsData = useMemo(() => [
        { title: 'Project 1 | AI', tag: 'Machine Learning', baseImagePath: '/assets/project1', slug: 'project1' },
        { title: 'Project 2 | Algorithms', tag: 'Pathfinding', baseImagePath: '/assets/project2', slug: 'project2' },
        { title: 'Project 3 | Data Analysis', tag: 'Big Data', baseImagePath: '/assets/project3', slug: 'project3' },
        { title: 'Project 4 | Web Dev', tag: 'Full Stack', baseImagePath: '/assets/project4', slug: 'project4' },
    ], []);

    const projects = useProjectImages(projectsData);

    useEffect(() => {
        if (projects.length === 0) return;

        const splide = new Splide('.splide', {
            type: 'loop',
            padding: '1rem',
            pagination: false,
            arrows: true,
            perPage: 1,
            perMove: 1,
            gap: '1rem',
            wheel: false,
            focus: 'center',
            autoScroll: {
                speed: 1,
                pauseOnHover: true,
                pauseOnFocus: false,
            },
            breakpoints: {
                640: {
                    padding: '2rem',
                    gap: '1.5rem',
                },
                768: {
                    padding: '3rem',
                    gap: '2rem',
                },
                1024: {
                    padding: '5rem',
                },
            },
        });

        splide.mount({ AutoScroll });

        return () => {
            splide.destroy();
        };
    }, [projects]);

    return (
        <section id="featured-projects" className="bg-[#023047] py-16 text-center relative min-h-[400px] pt-[120px] md:pt-16">
            <h2 className="text-[#fb6107] text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
                Featured Projects
            </h2>
            {projects.length === 0 ? (
                <div className="text-[#f2cc8f] text-base sm:text-lg">Loading projects...</div>
            ) : (
                <div className="splide max-w-[800px] mx-auto">
                    <div className="splide__track">
                        <ul className="splide__list">
                            {projects.map((project, index) => (
                                <li key={index} className="splide__slide">
                                    <Link to={`/${project.slug}`} className="block relative group">
                                        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-lg">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = fallbackImage;
                                                }}
                                            />
                                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#023047]/80 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-[#023047]/60 group-hover:shadow-[0_0_15px_#fb6107]">
                                                <h3 className="text-[#fb6107] text-base sm:text-lg md:text-xl lg:text-2xl font-['Outfit'] font-bold">
                                                    {project.title}
                                                </h3>
                                                <p className="text-[#f2cc8f] font-['Outfit'] text-sm sm:text-base md:text-lg font-medium">
                                                    {project.tag}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FeaturedProjects;