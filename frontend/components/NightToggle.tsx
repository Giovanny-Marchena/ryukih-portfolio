'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {
    isNight: boolean;
    onToggle: () => void;
};

export default function NightToggle({ isNight, onToggle }: Props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={onToggle}
            aria-label="Toggle Night Mode"
            className="rounded-full p-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-lg transition-all backdrop-blur-md"
        >
            {isNight ? (
                <FaSun className="text-yellow-300 w-5 h-5" />
            ) : (
                <FaMoon className="text-blue-300 w-5 h-5" />
            )}
        </motion.button>
    );
}
