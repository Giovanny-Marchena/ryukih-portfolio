'use client';

import { useEffect, useRef, useState } from 'react';

type AudioControllerProps = {
    isNight: boolean;
};

export let currentBeat = 0;

export default function AudioController({ isNight }: AudioControllerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayingRef = useRef(true);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);
    const [wasManuallyStarted, setWasManuallyStarted] = useState(false);

    const audioSrc = isNight ? '/sakura-night.mp3' : '/sakura-music.mp3';

    // 🔁 Autoplay + retry if blocked
    const tryPlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            await audio.play();
            isPlayingRef.current = true;
            setAutoplayBlocked(false);
        } catch (err) {
            console.warn('Autoplay blocked:', err);
            setAutoplayBlocked(true);
        }
    };

    // 🚫 Try to play on source change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.load();

        tryPlay();
    }, [audioSrc]);

    // ✅ Listen for first user interaction (anywhere on page)
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!wasManuallyStarted) {
                tryPlay();
                setWasManuallyStarted(true);
            }
        };

        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [wasManuallyStarted]);

    // 🎧 Beat detection
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        const audioCtx = new AudioContextClass();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audio);
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

    // 🎛 Volume fade on tab change
    useEffect(() => {
        const fadeVolume = (target: number, duration: number) => {
            const audio = audioRef.current;
            if (!audio) return;

            const start = audio.volume;
            const steps = 20;
            const stepTime = duration / steps;
            let step = 0;

            const fade = setInterval(() => {
                step++;
                const newVol = start + (target - start) * (step / steps);
                audio.volume = Math.max(0, Math.min(1, newVol));
                if (step >= steps) clearInterval(fade);
            }, stepTime);
        };

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

    return (
        <>
            <audio ref={audioRef} src={audioSrc} autoPlay loop className="hidden" />

            {autoplayBlocked && (
                <button
                    onClick={tryPlay}
                    className="fixed bottom-4 right-4 z-[9999] px-4 py-2 bg-black/70 text-white rounded-full backdrop-blur-md hover:bg-black transition"
                >
                    🔊 Start Audio
                </button>
            )}

        </>
    );
}
