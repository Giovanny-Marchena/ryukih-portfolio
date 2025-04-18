'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { currentBeat } from './AudioController';

type Props = {
    isNight: boolean;
};

export default function SakuraBackground({ isNight }: Props) {
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(true);
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        const handleVisibility = () => {
            setVisible(document.visibilityState === 'visible');
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        const frontCanvas = frontCanvasRef.current;
        const backCanvas = backCanvasRef.current;
        if (!frontCanvas || !backCanvas) return;

        const allVariants = ['/sakura1.png', '/sakura2.png', '/sakura3.png', '/sakura4.png'];
        const selectedVariants =
            typeof window !== 'undefined' && sessionStorage.getItem('sakura-variants')
                ? JSON.parse(sessionStorage.getItem('sakura-variants')!)
                : shuffleArray(allVariants).slice(0, 2);

        sessionStorage.setItem('sakura-variants', JSON.stringify(selectedVariants));

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let idleTimeout: ReturnType<typeof setTimeout>;

        const resetIdle = () => {
            setIsIdle(false);
            clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => setIsIdle(true), 12000); // pause after 12 seconds
        };

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            resetIdle();
        });

        resetIdle(); // start timer

        type Petal = {
            x: number;
            y: number;
            r: number;
            speed: number;
            drift: number;
            rotation: number;
            rotateSpeed: number;
            floatTimer: number;
            wobbleOffset: number;
            img: HTMLImageElement;
            opacity: number;
            shimmer: boolean;
        };

        const createAnimation = (canvas: HTMLCanvasElement, petalCount: number, blur = false) => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);
            let wind = 0;

            const petals: Petal[] = [];
            const loadedImages: HTMLImageElement[] = [];
            let loaded = 0;

            selectedVariants.forEach((src: string) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loadedImages.push(img);
                    loaded++;
                    if (loaded === selectedVariants.length) init();
                };
            });

            const getHueByTime = (): number => {
                const hour = new Date().getHours();
                if (hour >= 6 && hour < 12) return 20; // morning warm
                if (hour >= 12 && hour < 18) return 0;  // neutral
                return -20; // evening cool
            };

            const init = () => {
                for (let i = 0; i < petalCount; i++) {
                    const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
                    petals.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        r: blur ? Math.random() * 10 + 5 : Math.random() * 15 + 10,
                        speed: (blur ? Math.random() * 0.3 + 0.1 : Math.random() * 1 + 0.5) * (isNight ? 0.5 : 1),
                        drift: Math.random() * 0.5 - 0.25,
                        rotation: Math.random() * 360,
                        rotateSpeed: Math.random() * 0.5 - 0.25,
                        floatTimer: Math.random() * 100 + 50,
                        wobbleOffset: Math.random() * Math.PI * 2,
                        img,
                        opacity: isNight ? 0.4 : 1,
                        shimmer: false,
                    });
                }

                const animate = () => {
                    if (isIdle) {
                        requestAnimationFrame(animate);
                        return;
                    }

                    ctx.clearRect(0, 0, width, height);

                    // 🎨 Time-based tint
                    ctx.filter = `hue-rotate(${getHueByTime()}deg)`;

                    if (currentBeat > 0.6) {
                        wind = (Math.random() - 0.5) * 10;
                    } else {
                        wind *= 0.95;
                    }

                    petals.forEach((p) => {
                        if (p.floatTimer > 0) {
                            p.floatTimer -= 1;
                            p.y += Math.sin(p.wobbleOffset + p.floatTimer / 20) * 0.3;
                        } else {
                            p.y += p.speed;
                        }

                        const centerDrift = (p.x - mouseX) / width;
                        p.x += p.drift + centerDrift * 0.5 + wind * 0.3;
                        p.rotation += p.rotateSpeed;

                        p.shimmer = distance(mouseX, mouseY, p.x, p.y) < p.r;

                        if (p.y > height) {
                            p.y = -10;
                            p.x = Math.random() * width;
                            p.floatTimer = Math.random() * 100 + 50;
                        }

                        const beatScale = 1 + currentBeat * 0.1;

                        ctx.save();
                        ctx.globalAlpha = p.opacity;
                        if (p.shimmer) {
                            ctx.shadowColor = 'rgba(255,255,255,0.8)';
                            ctx.shadowBlur = 10;
                        }

                        ctx.translate(p.x, p.y);
                        ctx.rotate((p.rotation * Math.PI) / 180);
                        ctx.drawImage(p.img, -p.r / 2, -p.r / 2, p.r * beatScale, p.r * beatScale);
                        ctx.restore();
                    });

                    requestAnimationFrame(animate);
                };

                animate();
            };

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });
        };

        requestAnimationFrame(() => {
            createAnimation(backCanvas, 20, true);
            createAnimation(frontCanvas, 35, false);
        });
    }, [isNight, isIdle]);

    const fadeProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.8, ease: 'easeInOut' },
    };

    return (
        <AnimatePresence>
            {visible && (
                <>
                    <motion.canvas
                        ref={backCanvasRef}
                        className="absolute inset-0 w-full h-full z-0 pointer-events-none blur-sm opacity-40"
                        {...fadeProps}
                    />
                    <motion.canvas
                        ref={frontCanvasRef}
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        {...fadeProps}
                    />
                </>
            )}
        </AnimatePresence>
    );
}

// Utils
function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}
