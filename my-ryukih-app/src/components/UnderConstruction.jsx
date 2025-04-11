// src/components/UnderConstruction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Reuse the same styles as NotFound

const UnderConstruction = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#1b2a33] text-center overflow-hidden">
            {/* Pixelated Animation (reused from NotFound) */}
            <aside className="loader" style={{ '--wh-number': 24 }}>
                <div className="pixel"></div>
            </aside>

            {/* Preloader Spinner */}
            <div className="preloader">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="text">
                    {/* Optional text for the spinner */}
                </div>
            </div>

            {/* Under Construction Message and Link */}
            <div className="mt-8">
                <h1 className="text-[#fb6107] text-4xl sm:text-5xl md:text-6xl font-['Outfit'] font-bold mb-4">
                    Page Under Construction
                </h1>
                <p className="text-[#f2cc8f] text-lg sm:text-xl md:text-2xl font-['Outfit'] font-medium mb-8">
                    This page is in the progress of being built. Check back soon!
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-[#fb6107] text-[#1b2a33] font-['Outfit'] font-semibold text-lg rounded-md hover:bg-[#f2cc8f] hover:text-[#023047] transition-all duration-300"
                >
                    Return to Home
                </Link>
            </div>
        </section>
    );
};

export default UnderConstruction;