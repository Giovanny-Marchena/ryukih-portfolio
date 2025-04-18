'use client';

import { useEffect, useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LandingReveal: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-zinc-900 text-white z-[9999] flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    aria-hidden="true"
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-wide"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        Welcome to Ryukih
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default memo(LandingReveal);