'use client';

import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

type AudioControllerProps = {
    isNight: boolean;
};

export let currentBeat = 0;

export default function AudioController({ isNight }: AudioControllerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayingRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const audioSrc = isNight ? '/sakura-night.mp3' : '/sakura-music.mp3';

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

    const playAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            audio.volume = 1;
            audio.muted = false;

            await audio.play();

            // ✅ Resume audio context if suspended
            if (audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            isPlayingRef.current = true;
            setIsPlaying(true);
            setError(null);
        } catch (err) {
            console.warn('Audio playback failed:', err);
            setError('Failed to play audio. Please try again.');
        }
    };

    const pauseAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        fadeVolume(0, 400);
        setTimeout(() => {
            audio.pause();
            isPlayingRef.current = false;
            setIsPlaying(false);
        }, 400);
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.load();
        audio.muted = false;
        setIsMuted(false);
    }, [audioSrc]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();

        if (sourceRef.current) return;
        const source = audioCtx.createMediaElementSource(audio);
        sourceRef.current = source;

        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const update = () => {
            analyser.getByteFrequencyData(dataArray);
            currentBeat = dataArray[2] / 255;
            animationFrameRef.current = requestAnimationFrame(update);
        };

        update();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (sourceRef.current) {
                sourceRef.current.disconnect();
                sourceRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(console.warn);
                audioContextRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const fadeVolumeTab = (target: number, duration: number) => {
            const audio = audioRef.current;
            if (!audio || isMuted) return;

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
                fadeVolumeTab(0, 400);
            } else {
                fadeVolumeTab(1, 800);
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [isMuted]);

    return (
        <>
            <audio ref={audioRef} src={audioSrc} loop className="hidden" />
            <div className="fixed bottom-4 left-4 z-[9999] flex gap-2">
                {error && (
                    <span className="px-4 py-2 bg-black/70 text-sand-400 rounded-full backdrop-blur-md">
                        {error}
                    </span>
                )}
                <button
                    onClick={togglePlayPause}
                    className="px-4 py-2 bg-black/70 text-white rounded-full backdrop-blur-md hover:bg-black transition focus-visible:ring-2 focus-visible:ring-sand-400"
                    aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                    aria-pressed={isPlaying}
                >
                    {isPlaying ? '❚❚' : '▶'}
                </button>
                {isPlaying && (
                    <button
                        onClick={toggleMute}
                        className="px-4 py-2 bg-black/70 text-white rounded-full backdrop-blur-md hover:bg-black transition focus-visible:ring-2 focus-visible:ring-sand-400"
                        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                        aria-pressed={isMuted}
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                )}
            </div>
        </>
    );
}
