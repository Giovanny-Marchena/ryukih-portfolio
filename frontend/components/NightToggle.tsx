'use client';

import { useEffect, useState } from 'react';

type NightToggleProps = {
    isNight: boolean;
    onToggle: () => void;
};

export default function NightToggle({ isNight, onToggle }: NightToggleProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <label className="relative h-[100px] w-[100px] block cursor-pointer">
                <input
                    type="checkbox"
                    checked={isNight}
                    onChange={onToggle}
                    className="absolute opacity-0 w-full h-full z-10 cursor-pointer"
                />
                {/* Glow background */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[72px] w-[72px] rounded-full bg-white opacity-20 pointer-events-none" />
                {/* Button */}
                <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            h-[68.8px] w-[68.8px] rounded-full 
            ${isNight ? 'bg-zinc-800' : 'bg-gray-100'} 
            shadow-lg transition-all duration-300`}
                />
                {/* Icon */}
                <span
                    className={`absolute inset-0 flex items-center justify-center text-2xl font-bold 
            ${isNight ? 'text-white' : 'text-black'} transition-colors`}
                >
                    {isNight ? '🌙' : '☼'}
                </span>
            </label>
        </div>
    );
}
