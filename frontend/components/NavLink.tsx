'use client';

import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useNavFeedback from '@/hooks/useNavFeedback';

interface NavLinkProps {
    href: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

const japaneseMap: Record<string, string> = {
    P: 'プ',
    r: 'リ',
    o: 'オ',
    j: 'ジ',
    e: 'エ',
    c: 'ク',
    t: 'ト',
    s: 'ス',
    L: 'ラ',
    a: 'ア',
    b: 'ブ',
    C: 'コ',
    n: 'ン',
    d: 'ド',
    i: 'イ',
};

const NavLink: React.FC<NavLinkProps> = ({ href, label, active, onClick, className }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [displayLetters, setDisplayLetters] = useState<string[]>(label.split(''));
    const { trigger } = useNavFeedback();
    const pathname = usePathname();

    useEffect(() => {
        if (!isClicked || pathname !== href) {
            setDisplayLetters(label.split(''));
            setIsClicked(false);
        }
    }, [pathname, label, isClicked, href]);

    const handleClick = () => {
        setIsClicked(true);
        trigger();
        onClick?.();

        const converted = label.split('');
        label.split('').forEach((char, i) => {
            setTimeout(() => {
                converted[i] = japaneseMap[char] ?? char;
                setDisplayLetters([...converted]);
            }, i * 100);
        });
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className="focus:outline-none focus:ring-2 focus:ring-sand-400"
            aria-current={active ? 'page' : undefined}
        >
            <motion.span
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative text-sm uppercase tracking-wide transition-colors ${active ? 'text-white' : 'text-sand-600'
                    } hover:text-white hover-underline flex gap-0.5 ${className || ''}`}
            >
                {displayLetters.map((char, idx) => (
                    <motion.span
                        key={`${char}-${idx}`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.2 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Link>
    );
};

export default memo(NavLink);