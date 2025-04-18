'use client';

import { useState, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NightToggle from './NightToggle';
import NavLink from './NavLink';

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Projects', href: '/projects' },
    { name: 'Labs', href: '/labs' },
    { name: 'Contact', href: '/contact' },
];

const clickSound = typeof Audio !== 'undefined' ? new Audio('/click.mp3') : null;

interface NavbarProps {
    isNight: boolean;
    onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isNight, onToggle }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        return () => setMenuOpen(false); // Cleanup on unmount
    }, []);

    const handleClick = () => {
        try {
            clickSound?.play();
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
        setMenuOpen(false);
    };

    if (!isMounted) return null;

    return (
        <nav
            className="fixed top-0 left-0 w-full z-[9999] bg-black/10 backdrop-blur-md shadow-md px-6 py-4"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[64px]">
                {/* Logo Placeholder */}
                <div className="flex-shrink-0 min-w-[100px] z-10">
                    <Link
                        href="/"
                        onClick={handleClick}
                        className="inline-block focus-visible:scale-105 transition-transform"
                        aria-label="Home"
                    >
                        <img
                            src="/logo.svg"
                            alt="Ryukih logo"
                            className="h-10 w-auto max-w-[60px] object-contain hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                                e.currentTarget.src = '/fallback-logo.png'; // Fallback image
                            }}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div
                    className="max-md:hidden md:flex items-center justify-end gap-20 md:gap-24 lg:gap-28 flex-grow min-w-0 nav-links"
                    role="navigation"
                    aria-label="Desktop navigation"
                >
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4, ease: 'easeOut' }}
                        >
                            <NavLink
                                href={item.href}
                                label={item.name}
                                active={pathname === item.href}
                                onClick={handleClick}
                            />
                        </motion.div>
                    ))}
                    <div className="ml-10 flex-shrink-0">
                        <NightToggle isNight={isNight} onToggle={onToggle} />
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="block sm:block md:hidden flex-shrink-0 min-w-[48px] z-10 hamburger-wrapper">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex flex-col justify-center items-center w-10 h-10 relative bg-transparent"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                    >
                        <span
                            className={`h-0.5 w-6 bg-white rounded-sm mb-1 transition-all duration-300 ease-in-out origin-center ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                        />
                        <span
                            className={`h-0.5 w-6 bg-white rounded-sm mb-1 transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`h-0.5 w-6 bg-white rounded-sm transition-all duration-300 ease-in-out origin-center ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-nav"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="md:hidden max-md:block absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-12 py-6 mobile-nav"
                        role="navigation"
                        aria-label="Mobile navigation"
                    >
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.3, ease: 'easeOut' }}
                            >
                                <NavLink
                                    href={item.href}
                                    label={item.name}
                                    active={pathname === item.href}
                                    onClick={handleClick}
                                    className="text-lg font-medium"
                                />
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
                        >
                            <NightToggle
                                isNight={isNight}
                                onToggle={() => {
                                    onToggle();
                                    handleClick();
                                }}
                                size="lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

/* 
Debugging Notes:
- If hamburger appears on desktop (≥768px), inspect `.hamburger-wrapper` in DevTools for `display` (should be `none`). Check `tailwind.config.ts` for `md` breakpoint (default: 768px).
- Verify no CSS overrides in `app/globals.css` (e.g., `.hamburger-wrapper { display: block !important; }`).
- Test on mobile (<768px) to confirm hamburger is visible, desktop (≥768px) to confirm it’s hidden.
- If issue persists, share `tailwind.config.ts` or a screenshot of the nav on desktop.
*/
export default memo(Navbar);