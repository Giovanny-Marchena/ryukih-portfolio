import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useProjectImages from '../hooks/useProjectImages.jsx';
import '../styles/buttons.css';

const ProjectPage = () => {
    const { projectId } = useParams();

    const projectsData = [
        {
            id: 'project1',
            title: 'Project 1 | AI',
            tag: 'Machine Learning',
            baseImagePath: '/assets/project1',
            fallbackImage: 'https://placehold.co/800x400?text=Project+1',
            description: `
        This project focuses on leveraging machine learning to solve real-world problems in the healthcare industry. Using deep learning models, we developed a system to analyze medical images and detect early signs of diseases such as cancer.

        The project involved training a convolutional neural network (CNN) on a large dataset of medical images, achieving an accuracy of over 95%. We also implemented a user-friendly interface for doctors to interact with the system and review the AI's predictions.

        Technologies used: Python, TensorFlow, React, Flask.
      `,
        },
        {
            id: 'project2',
            title: 'Project 2 | Algorithms',
            tag: 'Pathfinding',
            baseImagePath: '/assets/project2',
            fallbackImage: 'https://placehold.co/800x400?text=Project+2',
            description: `
        This project explores pathfinding algorithms for real-time applications, such as autonomous navigation systems. We implemented and optimized the A* algorithm to handle dynamic environments where obstacles change in real time.

        The system was tested in a simulated environment with moving obstacles, achieving a 50% reduction in computation time compared to traditional methods. We also integrated the algorithm into a robotic platform for real-world testing.

        Technologies used: C++, ROS (Robot Operating System), Python.
      `,
        },
        {
            id: 'project3',
            title: 'Project 3 | Data Analysis',
            tag: 'Big Data',
            baseImagePath: '/assets/project3',
            fallbackImage: 'https://placehold.co/800x400?text=Project+3',
            description: `
        This project involved analyzing large datasets to uncover insights for a retail company. We used big data tools to process and analyze customer purchase data, identifying trends and patterns that helped the company optimize its marketing strategies.

        The project included building a data pipeline using Apache Spark and visualizing the results with Tableau. Our analysis led to a 20% increase in sales by targeting specific customer segments with personalized offers.

        Technologies used: Apache Spark, Tableau, Python, SQL.
      `,
        },
        {
            id: 'project4',
            title: 'Project 4 | Web Dev',
            tag: 'Full Stack',
            baseImagePath: '/assets/project4',
            fallbackImage: 'https://placehold.co/800x400?text=Project+4',
            description: `
        This project is a full-stack web application for a local business, designed to streamline their online presence and customer interactions. The application includes a responsive front-end, a secure back-end, and a database for managing customer data.

        The front-end was built with React and Tailwind CSS, providing a modern and user-friendly interface. The back-end was developed with Node.js and Express, with MongoDB as the database. We also integrated payment processing using Stripe.

        Technologies used: React, Tailwind CSS, Node.js, Express, MongoDB, Stripe.
      `,
        },
    ];

    const projectsWithImages = useProjectImages(projectsData);

    // Convert array to object for lookup by projectId
    const projects = projectsWithImages.reduce((acc, project) => {
        acc[project.id] = project;
        return acc;
    }, {});

    const project = projects[projectId] || {
        title: 'Project Not Found',
        tag: '',
        image: 'https://placehold.co/800x400?text=Project+Not+Found',
        description: 'The project you are looking for does not exist.',
    };

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
                <h1 className="text-[#FC6D1A] text-3xl md:text-5xl font-['Outfit'] font-bold mb-4 opacity-0 animate-fadeIn">
                    {project.title}
                </h1>
                <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg mb-4 opacity-0 animate-fadeIn animation-delay-300">
                    {project.tag}
                </p>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-8 opacity-0 animate-fadeIn animation-delay-600"
                />
                <div className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed opacity-0 animate-fadeIn animation-delay-900">
                    {project.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;