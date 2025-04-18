'use client';

import { useEffect, useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SakuraBackground from '@/components/SakuraBackground';
import AudioController from '@/components/AudioController';
import BackToTopButton from '@/components/BackToTopButton';

interface ClientLayoutProps {
    children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
    const [isNight, setIsNight] = useState<boolean>(false);
    const pathname = usePathname();

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
        document.documentElement.classList.toggle('night-mode', isNight);
    }, [isNight]);

    return (
        <>
            <SakuraBackground isNight={isNight} />
            <Navbar isNight={isNight} onToggle={() => setIsNight((prev) => !prev)} />

            {/* Background Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${pathname}-${isNight ? 'night' : 'day'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className={`absolute inset-0 z-0 ${isNight ? 'bg-sand-900' : 'bg-sand-50'}`}
                    aria-hidden="true"
                />
            </AnimatePresence>

            {/* Back to Top Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <BackToTopButton />
            </div>

            <AudioController isNight={isNight} />

            {/* Main Content */}
            <main
                className={`relative z-10 min-h-screen transition-colors duration-500 pt-28 ${isNight ? 'text-sand-50' : 'text-sand-900'
                    }`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </>
    );
};

export default memo(ClientLayout);