import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';

const Blog = () => {
    const posts = [
        {
            id: 'post1',
            title: 'The Future of AI in 2025',
            excerpt: 'Exploring the latest trends in artificial intelligence and their impact on various industries.',
            date: 'April 5, 2025',
        },
        {
            id: 'post2',
            title: 'Optimizing Algorithms for Real-Time Applications',
            excerpt: 'A deep dive into pathfinding algorithms and their optimization for real-time use cases.',
            date: 'April 1, 2025',
        },
    ];

    return (
        <section className="bg-[#023047] py-16 text-center">
            <h2 className="text-[#fb6107] text-4xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
                Blog & Insights
            </h2>
            <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="block bg-[#1b2a33] p-6 rounded-lg hover:bg-[#1b2a33]/80 hover:shadow-[0_0_10px_#fb6107] transition-all duration-300 opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${posts.indexOf(post) * 300}ms` }}
                        >
                            <h3 className="text-[#FC6D1A] text-xl md:text-2xl font-['Outfit'] font-bold mb-2">
                                {post.title}
                            </h3>
                            <p className="text-[#f2cc8f] font-['Outfit'] text-base mb-4">{post.excerpt}</p>
                            <p className="text-[#ff00ff] font-['Outfit'] text-sm mb-4">{post.date}</p>
                            <Link to={`/blog/${post.id}`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;