'use client';

import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useNavFeedback from '@/hooks/useNavFeedback';

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

type Props = {
    href: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

export default function NavLink({ href, label, active, onClick }: Props) {
    const [japaneseLetters, setJapaneseLetters] = useState<string[]>([]);
    const { trigger } = useNavFeedback();

    useEffect(() => {
        const converted: string[] = [];

        label.split('').forEach((char, i) => {
            setTimeout(() => {
                converted[i] = japaneseMap[char] ?? char;
                setJapaneseLetters([...converted]);
            }, i * 50);
        });
    }, [label]);

    const handleClick = () => {
        trigger();
        onClick?.();
    };

    return (
        <Link href={href} onClick={handleClick}>
            <motion.span
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative text-sm uppercase tracking-wide transition-colors ${active ? 'text-pink-500' : 'text-white/80'
                    } hover:text-white hover-underline flex gap-0.5`}
            >
                {japaneseLetters.map((char, idx) => (
                    <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Link>
    );
}
