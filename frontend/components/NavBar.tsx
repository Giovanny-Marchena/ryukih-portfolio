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
        <nav className="fixed top-0 left-0 w-full z-[9999] px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur text-white shadow-md">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <img
                    src="/logo.svg"
                    alt="Ryukih logo"
                    className="h-8 w-auto max-w-[60px] object-contain transition-transform duration-200 hover:scale-105"
                />
            </Link>



            {/* Desktop Nav (top right) */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold ml-auto pr-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="text-gold hover:text-white hover-underline transition-colors duration-300"
                    >
                        {item.name}
                    </Link>
                ))}

                {/* Night toggle (optional inline) */}
                <div className="ml-4">
                    <NightToggle isNight={isNight} onToggle={onToggle} />
                </div>
            </div>


            {/* Mobile Hamburger (only on small screens) */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-[10000] group relative"
                aria-label="Toggle navigation"
            >
                <span className={`transition-all duration-300 ease-in-out h-0.5 w-6 bg-white mb-1 rounded-sm origin-center
                    ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                />
                <span className={`transition-all duration-300 ease-in-out h-0.5 w-6 bg-white mb-1 rounded-sm
    $               {menuOpen ? 'opacity-0' : ''}`}
                />
                <span className={`transition-all duration-300 ease-in-out h-0.5 w-6 bg-white rounded-sm origin-center
                    ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                />
            </button>


            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-4 py-6 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-white text-lg font-medium hover-underline"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
}
