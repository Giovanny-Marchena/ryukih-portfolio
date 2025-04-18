'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

const Hero: React.FC = () => {
    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10"
            aria-labelledby="hero-title"
        >
            <motion.h1
                id="hero-title"
                className="text-5xl md:text-6xl font-bold mb-4 tracking-widest"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                夢を描く
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl max-w-xl mb-4 text-opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            >
                Yume o egaku — Drawing dreams
            </motion.p>
        </section>
    );
};

export default memo(Hero);