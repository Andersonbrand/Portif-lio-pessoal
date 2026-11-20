'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface CarouselSlide {
    image: string;
    title: string;
    description: string;
    redacted?: boolean;
}

interface ScreensCarouselModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    accent?: 'primary' | 'accent';
    slides: CarouselSlide[];
}

export default function ScreensCarouselModal({ open, onClose, title, accent = 'primary', slides }: ScreensCarouselModalProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const goTo = useCallback((i: number) => {
        setIndex(((i % slides.length) + slides.length) % slides.length);
    }, [slides.length]);

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    // reset to first slide whenever modal opens
    useEffect(() => {
        if (open) {
            setIndex(0);
            setPaused(false);
        }
    }, [open]);

    // auto-advance
    useEffect(() => {
        if (!open || paused) return;
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 5000);
        return () => clearInterval(t);
    }, [open, paused, slides.length]);

    // keyboard navigation
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') { setPaused(true); next(); }
            if (e.key === 'ArrowLeft') { setPaused(true); prev(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose, next, prev]);

    // lock body scroll while open
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
    }, [open]);

    if (!open) return null;

    const slide = slides[index];
    const accentClass = accent === 'accent' ? 'text-accent border-accent/30 bg-accent/10' : 'text-primary border-primary/30 bg-primary/10';
    const dotActive = accent === 'accent' ? 'bg-accent w-6' : 'bg-primary w-6';

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Capturas de tela — ${title}`}>

            {/* backdrop */}
            <div
                className="absolute inset-0 bg-[#020817]/90 backdrop-blur-sm"
                onClick={onClose} />

            <div
                className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#070d1c] overflow-hidden shadow-2xl animate-fade-in-scale"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setPaused(true); }}
                onTouchEnd={(e) => {
                    if (touchStartX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    if (dx > 50) prev();
                    else if (dx < -50) next();
                    touchStartX.current = null;
                }}>

                {/* header */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${accentClass} flex-shrink-0`}>
                            {title}
                        </span>
                        <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                            {index + 1} / {slides.length}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Fechar"
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/8 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* image stage */}
                <div className="relative bg-[#020817] aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        key={slide.image}
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-contain animate-fade-in" />

                    {/* blue duotone wash to match the theme, lighter than card thumbnails so detail stays readable */}
                    <div className="absolute inset-0 bg-primary/8 mix-blend-color pointer-events-none" />

                    {slide.redacted &&
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#020817]/85 backdrop-blur-sm border border-white/10 text-muted-foreground text-[10px] font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                            </svg>
                            Dados sensíveis borrados
                        </div>
                    }

                    {/* prev / next */}
                    <button
                        onClick={() => { setPaused(true); prev(); }}
                        aria-label="Imagem anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#020817]/70 border border-white/10 text-foreground hover:bg-[#020817]/90 hover:border-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => { setPaused(true); next(); }}
                        aria-label="Próxima imagem"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#020817]/70 border border-white/10 text-foreground hover:bg-[#020817]/90 hover:border-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* caption + dots */}
                <div className="px-5 md:px-7 py-5">
                    <h4 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1.5">
                        {slide.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[2.5rem]">
                        {slide.description}
                    </p>

                    <div className="flex items-center justify-center gap-2">
                        {slides.map((s, i) =>
                            <button
                                key={s.image}
                                onClick={() => { setPaused(true); goTo(i); }}
                                aria-label={`Ir para imagem ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? dotActive : 'w-1.5 bg-white/15 hover:bg-white/30'}`} />
                        )}
                    </div>
                </div>
            </div>
        </div>);

}
