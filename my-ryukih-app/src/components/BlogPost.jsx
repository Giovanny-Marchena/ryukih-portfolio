import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/buttons.css';

const BlogPost = () => {
    const { postId } = useParams();

    // Mock data for blog posts (in a real app, this would come from an API or database)
    const posts = {
        post1: {
            title: 'The Future of AI in 2025',
            date: 'April 5, 2025',
            content: `
        Artificial Intelligence (AI) continues to evolve at a rapid pace, transforming industries and reshaping the way we interact with technology. In 2025, we can expect AI to become even more integrated into our daily lives, from personalized healthcare solutions to advanced autonomous systems.

        One of the most exciting developments is the rise of AI-driven diagnostics in healthcare. Machine learning models are now capable of analyzing medical images with a level of accuracy that rivals human experts, enabling early detection of diseases like cancer. Additionally, AI is being used to develop personalized treatment plans by analyzing a patient’s genetic makeup and medical history.

        In the realm of autonomous systems, self-driving cars are becoming more reliable, thanks to improvements in computer vision and reinforcement learning. Companies like Tesla and Waymo are leading the charge, with fully autonomous vehicles expected to hit the market in the coming years.

        However, with these advancements come challenges. Ethical concerns around AI bias, privacy, and job displacement are more pressing than ever. As AI continues to grow, it will be crucial to address these issues through robust regulations and transparent practices.
      `,
        },
        post2: {
            title: 'Optimizing Algorithms for Real-Time Applications',
            date: 'April 1, 2025',
            content: `
        Real-time applications, such as autonomous vehicles, online gaming, and financial trading systems, require algorithms that can process data and make decisions in milliseconds. Optimizing these algorithms is a complex but critical task.

        One approach to optimization is to use pathfinding algorithms like A* or Dijkstra’s algorithm, which are commonly used in navigation systems. However, for real-time applications, these algorithms need to be adapted to handle dynamic environments where obstacles and conditions change rapidly. Techniques like precomputing paths or using hierarchical pathfinding can significantly reduce computation time.

        Another strategy is to leverage parallel processing. By distributing computations across multiple CPU or GPU cores, algorithms can process large datasets more efficiently. For example, in online gaming, parallel processing can be used to update the positions of thousands of players simultaneously.

        Finally, machine learning can be used to optimize algorithms by predicting future states and precomputing solutions. For instance, in financial trading, reinforcement learning models can learn optimal trading strategies by simulating market conditions.

        Optimizing algorithms for real-time applications requires a balance between speed, accuracy, and resource usage. As technology advances, we can expect even more innovative solutions to emerge.
      `,
        },
    };

    const post = posts[postId] || { title: 'Post Not Found', date: '', content: 'The blog post you are looking for does not exist.' };

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
                <h1 className="text-[#FC6D1A] text-3xl md:text-5xl font-['Outfit'] font-bold mb-4 opacity-0 animate-fadeIn">
                    {post.title}
                </h1>
                <p className="text-[#ff00ff] font-['Outfit'] text-sm md:text-base mb-8 opacity-0 animate-fadeIn animation-delay-300">
                    {post.date}
                </p>
                <div className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed opacity-0 animate-fadeIn animation-delay-600">
                    {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;