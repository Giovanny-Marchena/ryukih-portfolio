'use client';

import { useEffect, useRef } from 'react';

export default function useNavFeedback() {
    const playedRef = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const clickSound = new Audio('/click.mp3');
        clickSound.volume = 0.3;
        audioRef.current = clickSound;
    }, []);

    const trigger = () => {
        if (!playedRef.current && audioRef.current) {
            audioRef.current.play().catch(() => { });
            playedRef.current = true;
        }
    };

    return {
        trigger,
    };
}
