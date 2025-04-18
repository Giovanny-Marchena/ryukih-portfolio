'use client';

import { memo, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface NightToggleProps {
    isNight: boolean;
    onToggle: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    ariaLabelPrefix?: string;
}

const NightToggle: React.FC<NightToggleProps> = ({
    isNight,
    onToggle,
    className = '',
    size = 'md',
    ariaLabelPrefix = 'Switch to',
}) => {
    const handleToggle = useCallback(() => {
        try {
            onToggle();
        } catch (error) {
            console.warn('Night mode toggle failed:', error);
        }
    }, [onToggle]);

    const sizeStyles = useMemo(() => {
        switch (size) {
            case 'sm':
                return 'p-2 text-sm';
            case 'lg':
                return 'p-4 text-lg';
            case 'md':
            default:
                return 'p-3 text-base';
        }
    }, [size]);

    const iconSize = useMemo(() => {
        switch (size) {
            case 'sm':
                return 'w-4 h-4';
            case 'lg':
                return 'w-6 h-6';
            case 'md':
            default:
                return 'w-5 h-5';
        }
    }, [size]);

    const buttonVariants: Variants = {
        rest: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        hover: { scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
        tap: { scale: 0.9 },
        toggled: {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transition: { duration: 0.2 },
        },
    };

    const ariaLabel = `${ariaLabelPrefix} ${isNight ? 'day' : 'night'} mode`;

    return (
        <motion.button
            variants={buttonVariants}
            initial="rest"
            animate={isNight ? 'toggled' : 'rest'}
            whileHover="hover"
            whileTap="tap"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={handleToggle}
            role="switch"
            aria-checked={isNight}
            aria-label={ariaLabel}
            className={twMerge(
                'rounded-full border border-white/20 shadow-lg transition-all backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-400',
                sizeStyles,
                isNight ? 'bg-white/15' : 'bg-white/10',
                className
            )}
        >
            {isNight ? (
                <FaSun className={twMerge('text-yellow-300', iconSize)} />
            ) : (
                <FaMoon className={twMerge('text-blue-300', iconSize)} />
            )}
        </motion.button>
    );
};

export default memo(NightToggle, (prevProps, nextProps) => {
    return (
        prevProps.isNight === nextProps.isNight &&
        prevProps.onToggle === nextProps.onToggle &&
        prevProps.className === nextProps.className &&
        prevProps.size === nextProps.size &&
        prevProps.ariaLabelPrefix === nextProps.ariaLabelPrefix
    );
});