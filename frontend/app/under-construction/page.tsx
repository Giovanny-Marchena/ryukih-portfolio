'use client';

import SakuraBackground from '@/components/SakuraBackground';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function UnderConstruction() {
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-sand-100 dark:bg-sand-900 overflow-hidden">
            {/* Sakura Background */}
            <SakuraBackground isNight={false} />

            {/* Centered Logo */}
            <div className="z-20 mb-6">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="mx-auto"
                />
            </div>

            {/* Main Content */}
            <motion.div
                className="z-10 text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-sand-900 dark:text-white mb-4">
                    夢を描く
                </h1>
                <p className="text-lg md:text-xl text-sand-800 dark:text-sand-200">
                    This website is under construction. Stay tuned.
                </p>
            </motion.div>
        </div>
    );
}
