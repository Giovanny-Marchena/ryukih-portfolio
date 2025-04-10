import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';

const Insights = () => {
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
                  ></path>
                </svg>
              </span>
              <span className="nav-button-elem">
                <svg viewBox="0 0 46 40">
                  <path
                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </Link>
        <h1 className="text-[#FC6D1A] text-3xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
          Insights
        </h1>
        <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed opacity-0 animate-fadeIn animation-delay-300">
          Dive into my blog posts and articles on technology, AI, and more.
        </p>
      </div>
    </div>
  );
};

export default Insights;