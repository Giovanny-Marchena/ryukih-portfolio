// src/components/ScrollIndicator.jsx
import React from 'react';

const ScrollIndicator = () => {
  return (
    <div className="flex justify-center mt-4">
      <div className="w-4 h-8 border-2 border-[#fb6107] rounded-full flex justify-center">
        <div className="w-1 h-3 bg-[#fb6107] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;