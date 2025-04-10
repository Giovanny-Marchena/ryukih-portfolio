import React from 'react';
import { Link } from 'react-router-dom';

const Connect = () => {
    return (
        <div className="min-h-screen bg-[#1b2a33] text-[#f2cc8f] font-['Outfit'] p-4 md:p-8">
            {/* Header */}
            <h1 className="text-[#fb6107] text-3xl md:text-4xl font-bold mb-6 text-center">
                Connect With Me
            </h1>

            {/* Social Media Links */}
            <section className="mb-8">
                <h2 className="text-[#fb6107] text-2xl md:text-3xl font-semibold mb-4 text-center">
                    Social Media
                </h2>
                <div className="flex justify-center space-x-4 md:space-x-6">
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
                    <a
                        href="https://github.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors text-lg md:text-xl"
                    >
                        GitHub
                    </a>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-lg mx-auto bg-[#023047] p-6 rounded-lg">
                <h2 className="text-[#fb6107] text-2xl md:text-3xl font-semibold mb-4 text-center">
                    Send a Message
                </h2>
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
            </section>

            {/* Back to Home Link */}
            <div className="text-center mt-8">
                <Link
                    to="/"
                    className="text-[#f2cc8f] hover:text-[#fb6107] transition-colors text-lg md:text-xl"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Connect;