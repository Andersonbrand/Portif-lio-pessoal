'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
            if (ref.current) ref.current.style.transform = `scaleX(${p})`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, []);
    return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
