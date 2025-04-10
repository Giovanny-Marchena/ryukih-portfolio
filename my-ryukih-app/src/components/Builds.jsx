import React from 'react';
import { Link } from 'react-router-dom';
import useProjectImages from '../hooks/useProjectImages.jsx';
import '../styles/buttons.css';

const Builds = () => {
    const projectsData = [
        { title: 'Project 1 | AI', tag: 'Machine Learning', baseImagePath: '/assets/project1', slug: 'project1', fallbackImage: 'https://placehold.co/800x400?text=Project+1' },
        { title: 'Project 2 | Algorithms', tag: 'Pathfinding', baseImagePath: '/assets/project2', slug: 'project2', fallbackImage: 'https://placehold.co/800x400?text=Project+2' },
        { title: 'Project 3 | Data Analysis', tag: 'Big Data', baseImagePath: '/assets/project3', slug: 'project3', fallbackImage: 'https://placehold.co/800x400?text=Project+3' },
        { title: 'Project 4 | Web Dev', tag: 'Full Stack', baseImagePath: '/assets/project4', slug: 'project4', fallbackImage: 'https://placehold.co/800x400?text=Project+4' },
    ];

    const projects = useProjectImages(projectsData);

    return (
        <div className="min-h-screen bg-[#023047] text-[#f2cc8f] pt-[60px] pb-16">
            <div className="max-w-5xl mx-auto px-4">
                <Link to="/" className="inline-block mb-8 opacity-0 animate-fadeIn">
                    <button className="nav-button">
                        <div className="nav-button-box">
                            <span className="nav-button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                        fill="#ff00ff"
                                    />
                                </svg>
                            </span>
                            <span className="nav-button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                        fill="#ff00ff"
                                    />
                                </svg>
                            </span>
                        </div>
                    </button>
                </Link>
                <h1 className="text-[#FC6D1A] text-3xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
                    Builds
                </h1>
                <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed mb-8 opacity-0 animate-fadeIn animation-delay-300">
                    Check out my latest projects and builds, showcasing my work in technology and development.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Link
                            to={`/${project.slug}`}
                            key={index}
                            className="block relative group opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 300}ms` }}
                        >
                            <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = '/assets/fallback-image.png';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#023047]/80 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-[#023047]/60 group-hover:shadow-[0_0_15px_#fb6107]">
                                    <h3 className="text-[#FC6D1A] text-xl md:text-2xl font-['Outfit'] font-bold">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg font-medium">
                                        {project.tag}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Builds;