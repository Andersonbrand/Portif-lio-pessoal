'use client';

import React, { useRef } from 'react';

const bubbles = [
    { left: '8%', size: 8, dur: '10s', delay: '0s', bx: '14px', bo: 0.45 },
    { left: '18%', size: 5, dur: '8s', delay: '-3s', bx: '-10px', bo: 0.5 },
    { left: '30%', size: 11, dur: '12s', delay: '-6s', bx: '16px', bo: 0.35 },
    { left: '46%', size: 6, dur: '9s', delay: '-1.5s', bx: '-12px', bo: 0.5 },
    { left: '60%', size: 9, dur: '11s', delay: '-7s', bx: '12px', bo: 0.4 },
    { left: '72%', size: 5, dur: '8.5s', delay: '-4s', bx: '-8px', bo: 0.55 },
    { left: '84%', size: 10, dur: '13s', delay: '-9s', bx: '14px', bo: 0.35 },
    { left: '92%', size: 6, dur: '9.5s', delay: '-2s', bx: '-14px', bo: 0.45 }
];

const featherMask =
    'linear-gradient(to bottom, transparent 0%, #000 7%, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 9%, #000 88%, transparent 100%)';

const wavePath = 'M0 20 Q 25 4 50 20 T 100 20 T 150 20 T 200 20 V 40 H 0 Z';

export default function PortraitScene() {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = () => {
        ref.current?.style.setProperty('--px', '0');
        ref.current?.style.setProperty('--py', '0');
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full max-w-[340px] mx-auto aspect-[3/4] select-none"
            role="img"
            aria-label="Retrato de Anderson Brandão, desenvolvedor Front-End">

            {/* atmosfera azul: gradiente radial muito maior que a foto, sem bordas, que dissolve no fundo do hero */}
            <div
                className="absolute pointer-events-none portrait-aura"
                aria-hidden="true"
                style={{
                    inset: '-38% -55%',
                    background:
                        'radial-gradient(closest-side, rgba(14,140,220,0.10) 0%, rgba(6,182,212,0.05) 38%, rgba(99,102,241,0.02) 62%, transparent 100%)'
                }} />

            {/* soft aqua glow */}
            <div className="absolute inset-x-[-6%] top-[8%] bottom-[6%] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 blur-3xl" />

            {/* water ripples at the base */}
            <div className="absolute left-1/2 bottom-[1%] w-[125%] h-[16%] -translate-x-1/2 pointer-events-none" aria-hidden="true">
                {[0, 1.8, 3.6].map((d) => (
                    <span
                        key={d}
                        className="water-ripple absolute left-1/2 top-0 w-full h-full rounded-[50%] border border-primary/40"
                        style={{ ['--delay' as string]: `${d}s` }} />
                ))}
            </div>

            {/* rising bubbles */}
            <div
                className="absolute inset-x-[-14%] inset-y-[2%] pointer-events-none"
                aria-hidden="true"
                style={{
                    WebkitMaskImage: 'radial-gradient(ellipse closest-side, #000 55%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse closest-side, #000 55%, transparent 100%)'
                }}>
                {bubbles.map((b, i) => (
                    <span
                        key={i}
                        className="water-bubble absolute bottom-0 rounded-full border border-primary/50 bg-primary/10"
                        style={{
                            left: b.left,
                            width: b.size,
                            height: b.size,
                            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.35)',
                            ['--dur' as string]: b.dur,
                            ['--delay' as string]: b.delay,
                            ['--bx' as string]: b.bx,
                            ['--bo' as string]: String(b.bo)
                        }} />
                ))}
            </div>

            {/* portrait: black backdrop converted to transparency, bottom edge fades out */}
            <div
                className="absolute inset-0 gem-wrap portrait-float"
                style={{ transform: 'translate(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 6px))' }}>
                {/* base escura sob a foto: os pixels semitransparentes (cabelo, camisa) continuam escuros
                    como na imagem original, em vez de clarearem com o azul do fundo */}
                {[0, 1, 2].map((n) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={n}
                        src="/assets/images/anderson-portrait.webp"
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: 'brightness(0)',
                            WebkitMaskImage: featherMask,
                            maskImage: featherMask,
                            WebkitMaskComposite: 'source-in',
                            maskComposite: 'intersect'
                        }} />
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/images/anderson-portrait.webp"
                    alt=""
                    draggable={false}
                    className="relative w-full h-full object-cover"
                    style={{
                        /* bordas suavizadas em todos os lados: o respingo que encosta no limite da imagem
                           dissolve no fundo em vez de terminar em linha reta */
                        WebkitMaskImage: featherMask,
                        maskImage: featherMask,
                        WebkitMaskComposite: 'source-in',
                        maskComposite: 'intersect'
                    }} />
            </div>

            {/* gentle wave lines along the bottom */}
            <div className="absolute inset-x-[-10%] bottom-[-2%] h-[12%] overflow-hidden pointer-events-none" aria-hidden="true"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 20%, #000 80%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 20%, #000 80%, transparent)' }}>
                <svg className="water-wave absolute bottom-0 left-0 h-full w-[200%]" style={{ ['--dur' as string]: '14s' }} viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d={wavePath} fill="none" stroke="#06B6D4" strokeOpacity="0.35" strokeWidth="0.6" />
                </svg>
                <svg className="water-wave absolute bottom-0 left-0 h-[80%] w-[200%]" style={{ ['--dur' as string]: '22s' }} viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d={wavePath} fill="none" stroke="#A78BFA" strokeOpacity="0.3" strokeWidth="0.5" />
                </svg>
            </div>
        </div>
    );
}
