'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NightToggle from './NightToggle';

const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Labs', href: '/labs' },
    { name: 'Contact', href: '/contact' },
];

type Props = {
    isNight: boolean;
    onToggle: () => void;
};

export default function Navbar({ isNight, onToggle }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[9999] bg-black/20 backdrop-blur text-white px-6 py-4">

            {/* Logo */}
            <Link href="/">
                <img src="/logo.svg" alt="Ryukih logo" className="h-8 w-auto hover:scale-105 transition" />
            </Link>

            {/* Desktop Nav + Toggle */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="hover-underline">
                        {item.name}
                    </Link>
                ))}
                <NightToggle isNight={isNight} onToggle={onToggle} />
            </div>

            {/* Mobile Toggle: only hamburger here */}
            <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center h-8 w-8"
                initial={false}
                animate={menuOpen ? 'open' : 'closed'}
                aria-label="Toggle menu"
            >
                <motion.span className="block h-0.5 w-6 bg-white mb-1" variants={{ open: { rotate: 45, y: 7 }, closed: { rotate: 0, y: 0 } }} />
                <motion.span className="block h-0.5 w-6 bg-white mb-1" variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} />
                <motion.span className="block h-0.5 w-6 bg-white" variants={{ open: { rotate: -45, y: -7 }, closed: { rotate: 0, y: 0 } }} />
            </motion.button>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-4 py-6 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-white hover-underline">
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
