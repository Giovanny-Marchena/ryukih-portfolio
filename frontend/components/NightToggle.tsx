'use client';

import { useState, useEffect } from 'react';

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
            <label className="relative inline-block h-[100px] w-[100px] cursor-pointer">
                <input
                    type="checkbox"
                    checked={isNight}
                    onChange={onToggle}
                    className="absolute opacity-0 w-full h-full z-10 cursor-pointer"
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[72px] w-[72px] rounded-full bg-white opacity-20 pointer-events-none"></span>
                <span
                    className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            h-[68.8px] w-[68.8px] rounded-full 
            bg-gray-200 dark:bg-zinc-700 
            shadow-[0_15px_25px_-4px_rgba(0,0,0,0.5),inset_0_-3px_4px_-1px_rgba(0,0,0,0.2),
            0_-10px_15px_-1px_rgba(255,255,255,0.6),inset_0_3px_4px_-1px_rgba(255,255,255,0.2),
            inset_0_0_5px_1px_rgba(255,255,255,0.8),inset_0_20px_30px_0_rgba(255,255,255,0.2)] 
            transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
          `}
                ></span>
                <span
                    className={`absolute inset-0 flex items-center justify-center font-bold text-2xl transition-colors duration-300 ${isNight ? 'text-white' : 'text-black'
                        }`}
                >
                    {isNight ? '🌙' : '☼'}
                </span>
            </label>
        </div>
    );
}
