// components/SakuraBackground.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { currentBeat } from './AudioController';

export default function SakuraBackground() {
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(true);

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

        const petalVariants = ['/sakura1.png', '/sakura2.png', '/sakura3.png', '/sakura4.png'];
        let mouseX = window.innerWidth / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
        });

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
        };

        const createAnimation = (canvas: HTMLCanvasElement, petalCount: number, blur = false) => {
            const context = canvas.getContext('2d');
            if (!context) return;
            const ctx = context as CanvasRenderingContext2D;

            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);
            let wind = 0;

            const petals: Petal[] = [];
            const loadedImages: HTMLImageElement[] = [];
            let loaded = 0;

            petalVariants.forEach((src, i) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loadedImages[i] = img;
                    loaded++;
                    if (loaded === petalVariants.length) init();
                };
            });

            const init = () => {
                for (let i = 0; i < petalCount; i++) {
                    const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
                    petals.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        r: blur ? Math.random() * 10 + 5 : Math.random() * 15 + 10,
                        speed: blur ? Math.random() * 0.3 + 0.1 : Math.random() * 1 + 0.5,
                        drift: Math.random() * 0.5 - 0.25,
                        rotation: Math.random() * 360,
                        rotateSpeed: Math.random() * 0.5 - 0.25,
                        floatTimer: Math.random() * 100 + 50,
                        wobbleOffset: Math.random() * Math.PI * 2,
                        img,
                    });
                }

                window.addEventListener('scroll', () => {
                    wind = (Math.random() - 0.5) * 2;
                    setTimeout(() => (wind = 0), 300);
                });

                function animate() {
                    ctx.clearRect(0, 0, width, height);
                    petals.forEach((p, i) => {
                        if (p.floatTimer > 0) {
                            p.floatTimer -= 1;
                            p.y += Math.sin(p.wobbleOffset + p.floatTimer / 20) * 0.3;
                        } else {
                            p.y += p.speed;
                        }

                        const centerDrift = (p.x - mouseX) / width;
                        p.x += p.drift + centerDrift * 0.5 + wind * 0.5;
                        p.rotation += p.rotateSpeed;

                        for (let j = 0; j < petals.length; j++) {
                            if (i === j) continue;
                            const other = petals[j];
                            const dx = p.x - other.x;
                            const dy = p.y - other.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < (p.r + other.r) / 2) {
                                p.x += dx * 0.01;
                                p.y += dy * 0.01;
                            }
                        }

                        if (p.y > height) {
                            p.y = -10;
                            p.x = Math.random() * width;
                            p.floatTimer = Math.random() * 100 + 50;
                        }

                        const beatScale = 1 + currentBeat * 0.3;
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate((p.rotation * Math.PI) / 180);
                        ctx.drawImage(p.img, -p.r / 2, -p.r / 2, p.r * beatScale, p.r * beatScale);
                        ctx.restore();
                    });
                    requestAnimationFrame(animate);
                }

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
    }, []);

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