'use client';

import React, { useEffect, useRef, useState } from 'react';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ01';

function ScrambleText({ text, className, startDelay = 0, loopEvery }: { text: string; className?: string; startDelay?: number; loopEvery?: number }) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        let raf = 0;
        let timeoutId: ReturnType<typeof setTimeout>;
        let intervalId: ReturnType<typeof setInterval> | undefined;

        const runScramble = () => {
            const totalFrames = 70;
            let frame = 0;
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            const tick = () => {
                frame++;
                const progress = easeOutCubic(frame / totalFrames);
                const revealCount = Math.floor(progress * text.length);
                // only reshuffle the still-scrambled characters every other frame for a calmer flicker
                const shouldShuffle = frame % 2 === 0;
                setDisplay((prev) => {
                    const prevChars = prev.split('');
                    return text
                        .split('')
                        .map((ch, i) => {
                            if (ch === ' ') return ' ';
                            if (i < revealCount) return text[i];
                            if (!shouldShuffle && prevChars[i]) return prevChars[i];
                            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                        })
                        .join('');
                });
                if (frame < totalFrames) {
                    raf = requestAnimationFrame(tick);
                } else {
                    setDisplay(text);
                }
            };
            raf = requestAnimationFrame(tick);
        };

        timeoutId = setTimeout(() => {
            runScramble();
            if (loopEvery) {
                intervalId = setInterval(runScramble, loopEvery);
            }
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
            cancelAnimationFrame(raf);
        };
    }, [text, startDelay, loopEvery]);

    return <span className={className}>{display}</span>;
}

function BrandCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setTilt({ rx: (0.5 - py) * 24, ry: (px - 0.5) * 24, scale: 1.06 });
        setGlare({ x: px * 100, y: py * 100, opacity: 0.4 });
    };
    const handleLeave = () => {
        setTilt({ rx: 0, ry: 0, scale: 1 });
        setGlare((g) => ({ ...g, opacity: 0 }));
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-28 h-28 rounded-3xl flex items-center justify-center cursor-pointer transition-transform duration-300 ease-out will-change-transform"
            style={{
                background: 'linear-gradient(135deg, #06B6D4, #A78BFA)',
                transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${tilt.scale},${tilt.scale},${tilt.scale})`,
                boxShadow: glare.opacity > 0 ? '0 20px 40px -12px rgba(6,182,212,0.45)' : '0 8px 20px -8px rgba(6,182,212,0.25)',
            }}>

            <span className="font-display italic font-bold text-4xl text-[#020817] select-none">AB</span>
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6), transparent 60%)`,
                }} />

        </div>
    );
}

function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let animationId = 0;
        const mouse = { x: -9999, y: -9999 };

        const PRIMARY = '6, 182, 212';   // #06B6D4
        const ACCENT = '167, 139, 250';  // #A78BFA

        interface Particle {
            x: number; y: number; vx: number; vy: number; r: number; c: string;
        }
        let particles: Particle[] = [];

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            width = rect?.width || window.innerWidth;
            height = rect?.height || window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(70, Math.round((width * height) / 18000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6,
                c: Math.random() > 0.5 ? PRIMARY : ACCENT,
            }));
        };

        const step = () => {
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                // gentle drift toward the cursor
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 160) {
                    p.vx += (dx / dist) * 0.0025;
                    p.vy += (dy / dist) * 0.0025;
                }

                p.vx *= 0.99;
                p.vy *= 0.99;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.c}, 0.55)`;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${PRIMARY}, ${0.14 * (1 - d / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(step);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        resize();
        step();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between border-b border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#020817]" />
                <ParticleNetwork />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/40 via-[#020817]/55 to-[#020817] pointer-events-none" />
                <div className="grain-overlay" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            </div>

            <div className="h-20" />

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="max-w-3xl">
                    <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hero-reveal hero-reveal-delay-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
                            Disponível para novos projetos
                        </span>
                    </div>

                    <div className="overflow-hidden mb-3">
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-foreground hero-reveal hero-reveal-delay-2">
                            <ScrambleText text="Desenvolvedor" startDelay={300} loopEvery={9500} />
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-6">
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight italic hero-reveal hero-reveal-delay-3">
                            <ScrambleText text="Front-End." className="gradient-text" startDelay={500} loopEvery={9500} />
                        </h1>
                    </div>

                    <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-lg hero-reveal hero-reveal-delay-4">
                        Construo landingpages, sistemas web e sites responsivos com HTML, CSS e JavaScript — evoluindo para React e Supabase em projetos reais de produção.
                    </p>
                </div>

                <div className="flex flex-col gap-6 max-w-xs w-full hero-reveal hero-reveal-delay-4">
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm gradient-border flex items-center justify-center">
                        <div className="absolute inset-0 dot-grid opacity-40" />
                        <div className="absolute w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
                        <BrandCard />

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#020817] to-transparent">
                            <p className="text-sm font-semibold text-foreground">Anderson Brandão</p>
                            <p className="text-xs text-muted-foreground">Guanambi, Bahia 🇧🇷</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {[
                            {
                                label: 'GitHub',
                                href: 'https://github.com/Andersonbrand',
                                icon:
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                            },
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/in/anderson-tbrand%C3%A3o/',
                                icon:
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                            },
                            {
                                label: 'WhatsApp',
                                href: 'https://wa.me/5577999106357',
                                icon:
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12.02 2C6.5 2 2.01 6.48 2.01 12c0 1.98.52 3.83 1.42 5.44L2 22l4.68-1.4A9.96 9.96 0 0012.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.13c-1.7 0-3.35-.46-4.78-1.32l-.34-.2-3.02.9.9-2.94-.22-.35a8.13 8.13 0 01-1.26-4.32c0-4.5 3.66-8.15 8.16-8.15 4.5 0 8.16 3.65 8.16 8.15 0 4.49-3.66 8.23-8.6 8.23z" />
                                    </svg>
                            }].
                            map((s) =>
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300">

                                    {s.icon}
                                </a>
                            )}

                        <a
                            href="#projects"
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2">

                            <span className="opacity-70">Ver projetos</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>);

}
