// src/components/Mind.jsx
import React from 'react';
import { ReactTyped } from 'react-typed';

const Mind = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-[#023047]/70 z-[5]"></div>
      <div className="circuits-background z-[10]"></div>

      {/* Content */}
      <div className="relative z-[20] px-4 py-12">
        {/* Title */}
        <ReactTyped
          strings={['Mind: Your Intellectual CS Side']}
          typeSpeed={50}
          className="text-[#fb6107] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Outfit'] font-bold mb-4 opacity-0 animate-fadeIn"
        />

        {/* Subtitle */}
        <p className="text-[#f2cc8f] text-base sm:text-lg md:text-xl lg:text-2xl font-['Outfit'] font-medium mb-12 opacity-0 animate-fadeIn animation-delay-300">
          Algorithms, AI, Problem-Solving
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Pathfinding Visualizer */}
          <div className="bg-[#023047]/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-[#fb6107] text-xl font-['Outfit'] font-bold mb-2">
              Pathfinding Visualizer
            </h3>
            <p className="text-[#f2cc8f] text-sm font-['Outfit'] mb-4">
              An interactive tool to visualize pathfinding algorithms like A*, Dijkstra’s, and BFS on a grid.
            </p>
            <a
              href="#"
              className="text-[#fb6107] hover:text-[#f2cc8f] font-['Outfit'] font-medium transition-colors duration-300"
            >
              Explore Project
            </a>
          </div>

          {/* AI Experiments */}
          <div className="bg-[#023047]/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-[#fb6107] text-xl font-['Outfit'] font-bold mb-2">
              AI Experiments
            </h3>
            <p className="text-[#f2cc8f] text-sm font-['Outfit'] mb-4">
              A collection of experiments with machine learning models, neural networks, and generative AI.
            </p>
            <a
              href="#"
              className="text-[#fb6107] hover:text-[#f2cc8f] font-['Outfit'] font-medium transition-colors duration-300"
            >
              Explore Project
            </a>
          </div>

          {/* Code Puzzles */}
          <div className="bg-[#023047]/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-[#fb6107] text-xl font-['Outfit'] font-bold mb-2">
              Code Puzzles
            </h3>
            <p className="text-[#f2cc8f] text-sm font-['Outfit'] mb-4">
              Challenging coding puzzles to test your problem-solving skills and algorithmic thinking.
            </p>
            <a
              href="#"
              className="text-[#fb6107] hover:text-[#f2cc8f] font-['Outfit'] font-medium transition-colors duration-300"
            >
              Explore Project
            </a>
          </div>
        </div>

        {/* See More Button */}
        <div className="mt-12">
          <a
            href="#"
            className="inline-block bg-[#fb6107] text-white font-['Outfit'] font-medium text-lg px-6 py-3 rounded-full hover:bg-[#f2cc8f] hover:text-[#023047] transition-all duration-300"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mind;