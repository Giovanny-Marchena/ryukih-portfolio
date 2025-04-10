import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/buttons.css';
import '../styles/contact.css';

const Connect = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange = (e) => {
        handleChange(e);
        const inputBlock = e.target.parentElement;
        const label = inputBlock.querySelector('.input-label');
        if (e.target.value) {
            label.classNameList.add('hidden');
        } else {
            label.classNameList.remove('hidden');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
                'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
                {
                    from_email: formData.email,
                    message: formData.message,
                },
                'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
            )
            .then(
                (result) => {
                    console.log('Email sent successfully:', result.text);
                    alert('Message sent successfully!');
                    setFormData({ email: '', message: '' });
                    document.querySelectorAll('.input-label').forEach((label) => {
                        label.classNameList.remove('hidden');
                    });
                },
                (error) => {
                    console.error('Failed to send email:', error.text);
                    alert('Failed to send message. Please try again later.');
                }
            );
    };

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
                    Connect
                </h1>
                <p className="text-[#f2cc8f] font-['Outfit'] text-base md:text-lg leading-relaxed mb-8 opacity-0 animate-fadeIn animation-delay-300">
                    Get in touch with me to collaborate or discuss new opportunities.
                </p>
                <div className="max-w-[520px] mx-auto opacity-0 animate-fadeIn animation-delay-600">
                    <div className="contact-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="input-block">
                                <input
                                    className="input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="email" className="input-label">
                                    Email
                                </label>
                            </div>
                            <div className="input-block">
                                <textarea
                                    className="input textarea"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="message" className="input-label">
                                    Message
                                </label>
                            </div>
                            <button type="submit" className="submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connect;