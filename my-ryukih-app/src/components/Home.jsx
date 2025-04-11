// src/components/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useImagePath from '../hooks/useImagePath';
import fallbackImage from '../assets/fallback-image.png';
import Hero from './Hero';
import FeaturedProjects from './FeaturedProjects';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logo = useImagePath('/assets/logo', fallbackImage);

    const handleImageError = (e) => {
        e.target.src = fallbackImage;
    };

    return (
        <div className="min-h-screen bg-[#1b2a33] text-[#f2cc8f] font-['Outfit'] w-full">
            {/* Hero Section */}
            <Hero />

            {/* Navigation */}
            <nav className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 md:h-12"
                        onError={handleImageError}
                    />
                </div>
                <div className="md:hidden flex justify-end">
                    <button onClick={toggleMenu} className="text-[#fb6107] focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`${isMenuOpen ? 'flex' : 'hidden'
                        } md:flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4 md:space-x-6 text-sm md:text-base absolute md:static top-12 right-4 bg-[#1b2a33] md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none z-10`}
                >
                    <Link
                        to="/"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/mind"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Mind
                    </Link>
                    <Link
                        to="/builds"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Builds
                    </Link>
                    <Link
                        to="/insights"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Insights
                    </Link>
                    <Link
                        to="/connect"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Connect
                    </Link>
                    <Link
                        to="/core"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Core
                    </Link>
                </div>
            </nav>

            {/* Skills Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-8">
                <div className="bg-[#023047] p-4 rounded-lg text-center">
                    <h3 className="text-[#fb6107] text-lg md:text-xl font-semibold">Expert</h3>
                    <p>Development</p>
                </div>
                <div className="bg-[#023047] p-4 rounded-lg text-center">
                    <h3 className="text-[#fb6107] text-lg md:text-xl font-semibold">Intermediate</h3>
                    <p>Data Analysis</p>
                </div>
                <div className="bg-[#023047] p-4 rounded-lg text-center">
                    <h3 className="text-[#fb6107] text-lg md:text-xl font-semibold">Beginner</h3>
                    <p>UI/UX Design</p>
                </div>
            </section>

            {/* Blog & Insights Section */}
            <section className="p-4 md:p-8">
                <h2 className="text-[#fb6107] text-3xl md:text-4xl font-bold mb-6">Blog & Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#023047] p-6 rounded-lg relative">
                        <h3 className="text-[#f2cc8f] text-lg md:text-xl font-semibold mb-2">
                            The Future of AI in 2025
                        </h3>
                        <p className="text-[#f2cc8f] text-sm md:text-base">
                            Exploring the latest trends in artificial intelligence and their impact on various industries.
                        </p>
                        <p className="text-[#f2cc8f] text-xs md:text-sm mt-4">April 5, 2025</p>
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#fb6107] rounded-full shadow-[0_0_8px_#ff8c38]"></div>
                    </div>
                    <div className="bg-[#023047] p-6 rounded-lg relative">
                        <h3 className="text-[#f2cc8f] text-lg md:text-xl font-semibold mb-2">
                            Optimizing Algorithms for Real-Time Applications
                        </h3>
                        <p className="text-[#f2cc8f] text-sm md:text-base">
                            A deep dive into pathfinding algorithms and their optimization for real-time use cases.
                        </p>
                        <p className="text-[#f2cc8f] text-xs md:text-sm mt-4">April 1, 2025</p>
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#fb6107] rounded-full shadow-[0_0_8px_#ff8c38]"></div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <FeaturedProjects />

            {/* Contact Me Section */}
            <section className="p-4 md:p-8">
                <h2 className="text-[#fb6107] text-3xl md:text-4xl font-bold mb-6 text-center">
                    Contact Me
                </h2>
                <div className="max-w-lg mx-auto bg-[#023047] p-6 rounded-lg">
                    <div className="mb-6 text-center">
                        <p className="text-[#f2cc8f] text-sm md:text-base mb-2">
                            Email: your.email@example.com
                        </p>
                        <p className="text-[#f2cc8f] text-sm md:text-base mb-2">
                            Phone: +1 (123) 456-7890
                        </p>
                        <div className="flex justify-center space-x-4 md:space-x-6 mt-4">
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors text-lg md:text-xl"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://twitter.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors text-lg md:text-xl"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-[#f2cc8f] text-sm md:text-base mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 rounded-md bg-[#1b2a33] text-[#f2cc8f] border border-[#fb6107] focus:outline-none focus:ring-2 focus:ring-[#ff8c38]"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[#f2cc8f] text-sm md:text-base mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 rounded-md bg-[#1b2a33] text-[#f2cc8f] border border-[#fb6107] focus:outline-none focus:ring-2 focus:ring-[#ff8c38]"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-[#f2cc8f] text-sm md:text-base mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full p-2 rounded-md bg-[#1b2a33] text-[#f2cc8f] border border-[#fb6107] focus:outline-none focus:ring-2 focus:ring-[#ff8c38]"
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#fb6107] text-[#1b2a33] font-semibold rounded-md hover:bg-[#ff8c38] transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;