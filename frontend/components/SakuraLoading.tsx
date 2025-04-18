'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SakuraLoadingProps {
    isNight: boolean;
}

const SakuraLoading: React.FC<SakuraLoadingProps> = ({ isNight }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [petals, setPetals] = useState<
        Array<{
            id: number;
            left: string;
            size: number;
            delay: number;
            duration: number;
            rotate: number;
        }>
    >([]);

    // Generate petals on client only
    useEffect(() => {
        setPetals(
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}vw`, // Random x-position
                size: Math.random() * 8 + 4, // Size between 4–12px
                delay: Math.random() * 2, // Delay up to 2s
                duration: Math.random() * 3 + 3, // Duration between 3–6s
                rotate: Math.random() * 60 - 30, // Rotate between -30° to 30°
            }))
        );

        const timer = setTimeout(() => setIsVisible(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isVisible && petals.length > 0 && (
                <motion.div
                    className={`fixed inset-0 z-[9999] ${isNight ? 'bg-sand-900' : 'bg-sand-50'}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    aria-hidden="true"
                >
                    {petals.map((petal) => (
                        <motion.div
                            key={petal.id}
                            className="absolute bg-pink-200 opacity-50 rounded-full"
                            style={{
                                left: petal.left,
                                width: petal.size,
                                height: petal.size,
                                top: '-10%',
                            }}
                            animate={{
                                y: '110vh',
                                rotate: petal.rotate,
                            }}
                            transition={{
                                duration: petal.duration,
                                delay: petal.delay,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </>
    );
};

export default SakuraLoading;