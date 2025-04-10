import React from 'react';

const ScrollIndicator = () => (
  <a
    href="#featured-projects"
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeIn animation-delay-600"
  >
    <div className="scroll-down-indicator">
      <svg width="30" height="50" viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="28" height="48" rx="14" stroke="#f2cc8f" strokeWidth="2" />
        <circle cx="15" cy="15" r="3" fill="#f2cc8f" className="animate-bounce" />
      </svg>
    </div>
  </a>
);

export default ScrollIndicator;
