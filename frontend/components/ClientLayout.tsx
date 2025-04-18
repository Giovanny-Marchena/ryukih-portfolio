'use client';

import { useEffect, useState } from 'react';
import AudioController from '@/components/AudioController';
import NightToggle from '@/components/NightToggle';
import SakuraBackground from '@/components/SakuraBackground';
import { AnimatePresence, motion } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isNight, setIsNight] = useState(false);

    // 🧠 Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('night-mode');
        if (stored !== null) {
            setIsNight(stored === 'true');
        } else {
            // Default based on time
            const hour = new Date().getHours();
            setIsNight(hour >= 19 || hour < 6);
        }
    }, []);

    // 💾 Save to localStorage
    useEffect(() => {
        localStorage.setItem('night-mode', String(isNight));
    }, [isNight]);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 🌸 Sakura Background (always rendered behind) */}
            <SakuraBackground isNight={isNight} />

            {/* 🌕 Background color layer with smooth transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isNight ? 'night' : 'day'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 z-0 ${isNight ? 'bg-[#583101]' : 'bg-[#FFEDD8]'
                        }`}
                />
            </AnimatePresence>

            {/* 🌙 Toggle + Audio */}
            <NightToggle isNight={isNight} onToggle={() => setIsNight(!isNight)} />
            <AudioController isNight={isNight} />

            {/* 🧠 Page Content */}
            <main
                className={`relative z-10 transition-colors duration-500 ${isNight ? 'text-[#FFEDD8]' : 'text-[#583101]'
                    }`}
            >
                {children}
            </main>
        </div>
    );
}
