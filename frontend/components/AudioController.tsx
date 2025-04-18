'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function AudioController() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const pathname = usePathname();

    // 🎵 Choose background audio based on route
    const audioSrc = (() => {
        if (pathname === '/') return '/sakura-music.mp3';
        if (pathname.startsWith('/projects')) return '/tech-ambient.mp3';
        if (pathname.startsWith('/labs')) return '/glitchy-lab.mp3';
        if (pathname.startsWith('/contact')) return '/wind-chimes.mp3';
        return '/sakura-music.mp3';
    })();

    // 📦 Fade volume smoothly
    const fadeVolume = (target: number, duration: number) => {
        if (!audioRef.current) return;
        const start = audioRef.current.volume;
        const steps = 20;
        const stepTime = duration / steps;
        let step = 0;

        const fade = setInterval(() => {
            step++;
            const newVol = start + (target - start) * (step / steps);
            audioRef.current!.volume = Math.max(0, Math.min(1, newVol));
            if (step >= steps) clearInterval(fade);
        }, stepTime);
    };

    // 💤 Fade out on tab switch
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                fadeVolume(0, 400); // fade out fast
            } else {
                fadeVolume(1, 800); // fade in smooth
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    // 🔄 Handle audio switching between routes
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }, [audioSrc]);

    // 🎚️ Play/Pause toggle
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={audioSrc} autoPlay loop />

            <motion.button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 bg-sand-200 hover:bg-sand-300 text-sand-800 p-3 rounded-full shadow-lg z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                aria-label="Toggle background audio"
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
        </>
    );
}
