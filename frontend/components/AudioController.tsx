'use client';

import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

type AudioControllerProps = {
    isNight: boolean;
};

export let currentBeat = 0;

export default function AudioController({ isNight }: AudioControllerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayingRef = useRef(true);
    const hasStartedManuallyRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const audioSrc = isNight ? '/sakura-night.mp3' : '/sakura-music.mp3';

    // Smooth volume fade
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

    // Play audio with fade-in
    const playAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            audio.volume = 0; // Start at 0 for fade-in
            await audio.play();
            isPlayingRef.current = true;
            setIsPlaying(true);
            setError(null);
            fadeVolume(1, 400); // Fade in over 400ms
        } catch (err) {
            console.warn('Audio playback failed:', err);
            setError('Failed to play audio. Please try again.');
        }
    };

    // Pause audio with fade-out
    const pauseAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        fadeVolume(0, 400); // Fade out over 400ms
        setTimeout(() => {
            audio.pause();
            isPlayingRef.current = false;
            setIsPlaying(false);
        }, 400);
    };

    // Toggle play/pause
    const togglePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    // Toggle mute
    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Load and attempt to play on source change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.load();

        if (isPlaying) {
            playAudio();
        }

        // Reset mute state on source change
        audio.muted = false;
        setIsMuted(false);
    }, [audioSrc, isPlaying]);

    // Handle first user interaction for autoplay
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasStartedManuallyRef.current) {
                playAudio();
                hasStartedManuallyRef.current = true;
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
    }, [playAudio]);

    // Beat detection
    // Beat detection
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();

        if (sourceRef.current) return; // ✅ Prevent double connect
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
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
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


    // Volume fade on tab change
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
            <audio ref={audioRef} src={audioSrc} autoPlay loop className="hidden" />
            <div className="fixed bottom-4 right-4 z-[9999] flex gap-2">
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
                <button
                    onClick={toggleMute}
                    className="px-4 py-2 bg-black/70 text-white rounded-full backdrop-blur-md hover:bg-black transition focus-visible:ring-2 focus-visible:ring-sand-400"
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    aria-pressed={isMuted}
                >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>
        </>
    );
}