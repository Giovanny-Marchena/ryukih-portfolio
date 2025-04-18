// components/AudioController.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export let currentBeat: number = 0;

interface AudioControllerProps {
    nightMode?: boolean;
}

export default function AudioController({ nightMode = false }: AudioControllerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const pathname = usePathname();

    const audioSrc = (() => {
        if (nightMode) return '/sakura-night.mp3';
        if (pathname === '/') return '/sakura-music.mp3';
        if (pathname.startsWith('/projects')) return '/tech-ambient.mp3';
        if (pathname.startsWith('/labs')) return '/glitchy-lab.mp3';
        if (pathname.startsWith('/contact')) return '/wind-chimes.mp3';
        return '/sakura-music.mp3';
    })();

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

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                fadeVolume(0, 400);
            } else {
                fadeVolume(1, 800);
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }, [audioSrc]);

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

    useEffect(() => {
        if (!audioRef.current) return;
        const AudioContextClass =
            window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const update = () => {
            analyser.getByteFrequencyData(dataArray);
            currentBeat = dataArray[2] / 255;
            requestAnimationFrame(update);
        };

        update();
    }, []);

    return (
        <>
            <audio ref={audioRef} src={audioSrc} autoPlay loop />

            <motion.button
                onClick={togglePlay}
                className="group fixed bottom-6 right-6 bg-sand-200 hover:bg-sand-300 text-sand-800 p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                aria-label="Toggle background audio"
            >
                <span className="sr-only">{isPlaying ? 'Pause audio' : 'Play audio'}</span>
                <motion.div
                    animate={{ rotate: isPlaying ? 0 : 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.div>
                <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition">
                    {isPlaying ? 'Pause Music' : 'Play Music'}
                </span>
            </motion.button>
        </>
    );
}
