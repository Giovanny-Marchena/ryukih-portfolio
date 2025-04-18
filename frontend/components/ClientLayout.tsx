'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AudioController from '@/components/AudioController';
import NightToggle from '@/components/NightToggle';
import SakuraBackground from '@/components/SakuraBackground';
import BackToTopButton from '@/components/BackToTopButton';
import { AnimatePresence, motion } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('night-mode');
        if (stored !== null) {
            setIsNight(stored === 'true');
        } else {
            const hour = new Date().getHours();
            setIsNight(hour >= 19 || hour < 6);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('night-mode', String(isNight));
    }, [isNight]);

    return (
        <>
            <SakuraBackground isNight={isNight} />
            <Navbar isNight={isNight} onToggle={() => setIsNight(!isNight)} />

            {/* 🌙 Mobile Toggle (only visible on small screens) */}
            <div className="fixed top-4 right-4 z-[9999] md:hidden">
                <NightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
            </div>

            {/* Background color */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isNight ? 'night' : 'day'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 z-0 ${isNight ? 'bg-[#583101]' : 'bg-[#FFEDD8]'}`}
                />
            </AnimatePresence>

            {/* Buttons */}
            <div className="fixed bottom-6 right-6 z-50">
                <BackToTopButton />
            </div>

            <AudioController isNight={isNight} />

            <main
                className={`relative z-10 transition-colors duration-500 pt-20 ${isNight ? 'text-[#FFEDD8]' : 'text-[#583101]'
                    }`}
            >
                {children}
            </main>
        </>
    );
}
