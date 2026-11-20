'use client';

import React, { useEffect, useState } from 'react';

export default function PageLoader() {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        let raf = 0;
        const start = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) raf = requestAnimationFrame(tick);
            else {
                setTimeout(() => {
                    setDone(true);
                    document.body.style.overflow = '';
                }, 250);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(raf); document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="page-loader" data-done={done} role="status" aria-live="polite" aria-label="Carregando portfólio" aria-busy={!done}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="font-display text-lg normal-case tracking-tight text-foreground">Anderson<span className="text-primary">.dev</span></span>
                <span>Portfólio · Anderson Brandão</span>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="page-loader-ring">
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                        <circle className="page-loader-track" cx="50" cy="50" r="48.5" fill="none" />
                        <circle className="page-loader-arc" cx="50" cy="50" r="48.5" fill="none" pathLength={100} style={{ strokeDashoffset: 100 - progress }} />
                    </svg>
                    <div className="absolute inset-[14px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.25)]">
                        <span className="font-display italic font-bold text-5xl text-[#020817]">AB</span>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div className="font-display text-6xl md:text-7xl font-light text-foreground tabular-nums leading-none">
                    {String(progress).padStart(3, '0')}<small className="text-lg text-primary ml-1">%</small>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Front-End · React · Supabase</span>
            </div>
        </div>
    );
}
