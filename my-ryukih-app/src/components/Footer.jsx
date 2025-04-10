import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/buttons.css';

const Footer = () => {
  return (
    <footer className="bg-[#023047] py-8 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center gap-6 mb-4 animate-fadeIn">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <p className="text-[#f2cc8f] font-['Outfit'] text-lg mb-4 animate-fadeIn">
          © 2025 Ryukih. All rights reserved.
        </p>
        <a href="#contact" className="inline-block animate-fadeIn">
          <button className="cta-button">
            <span>Get in Touch</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10" className="cta-button-icon">
              <path d="M1,5 L11,5" stroke="#f2cc8f" strokeWidth="2" />
              <polyline points="8 1 12 5 8 9" stroke="#f2cc8f" strokeWidth="2" />
            </svg>
          </button>
        </a>
      </div>
    </footer>
  );
};

export default Footer;