import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';

const AboutMe = () => {
    return (
        <section className="bg-[#023047] py-16 text-center">
            <h2 className="text-[#fb6107] text-4xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
                About Me
            </h2>
            <div className="max-w-5xl mx-auto px-4">
                <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed mb-8 opacity-0 animate-fadeIn animation-delay-300">
                    I’m Ryukih, a passionate developer and tech enthusiast. I specialize in AI, algorithms, and full-stack development, with a focus on building innovative solutions that push the boundaries of technology.
                </p>
                <Link to="/builds" className="inline-block opacity-0 animate-fadeIn animation-delay-600">
                    <button className="cta-button">
                        <span>View My Projects</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10" className="cta-button-icon">
                            <path d="M1,5 L11,5" stroke="#f2cc8f" strokeWidth="2" />
                            <polyline points="8 1 12 5 8 9" stroke="#f2cc8f" strokeWidth="2" />
                        </svg>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default AboutMe;