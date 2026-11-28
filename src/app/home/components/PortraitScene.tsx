'use client';

import React, { useRef } from 'react';

const bubbles = [
    { left: '6%', size: 8, dur: '10s', delay: '0s', bx: '14px', bo: 0.45 },
    { left: '16%', size: 5, dur: '8s', delay: '-3s', bx: '-10px', bo: 0.5 },
    { left: '28%', size: 11, dur: '12s', delay: '-6s', bx: '16px', bo: 0.35 },
    { left: '70%', size: 6, dur: '9s', delay: '-1.5s', bx: '-12px', bo: 0.5 },
    { left: '80%', size: 9, dur: '11s', delay: '-7s', bx: '12px', bo: 0.4 },
    { left: '90%', size: 5, dur: '8.5s', delay: '-4s', bx: '-8px', bo: 0.55 }
];

// trechos de código flutuando atrás da foto (só nas laterais, para nunca competir com o rosto)
const codeTokens = [
    { t: '</>', left: '2%', top: '14%', dur: '9s', delay: '0s', s: 15 },
    { t: 'const dev = true;', left: '-8%', top: '36%', dur: '11s', delay: '-4s', s: 11 },
    { t: '{ }', left: '10%', top: '60%', dur: '10s', delay: '-2s', s: 17 },
    { t: 'npm run dev', left: '-2%', top: '78%', dur: '12s', delay: '-7s', s: 11 },
    { t: '=>', left: '86%', top: '10%', dur: '10s', delay: '-3s', s: 16 },
    { t: 'useState()', left: '74%', top: '30%', dur: '12s', delay: '-6s', s: 11 },
    { t: '[ ]', left: '88%', top: '54%', dur: '9s', delay: '-1s', s: 17 },
    { t: 'git push', left: '76%', top: '76%', dur: '11s', delay: '-8s', s: 11 }
];

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
            className="relative w-full max-w-[360px] mx-auto aspect-[4/5] select-none"
            role="img"
            aria-label="Retrato de Anderson Brandão, desenvolvedor Front-End">

            {/* 1. atmosfera: névoa azul bem maior que a cena, sem bordas, dissolvendo no fundo do hero */}
            <div
                className="absolute pointer-events-none"
                aria-hidden="true"
                style={{
                    inset: '-30% -60%',
                    background:
                        'radial-gradient(closest-side, rgba(14,120,220,0.22) 0%, rgba(6,182,212,0.09) 40%, rgba(99,102,241,0.03) 66%, transparent 100%)'
                }} />

            {/* 2. halo atrás do corpo: é ele que separa a camisa preta do fundo escuro */}
            <div
                className="absolute inset-x-[-10%] top-[2%] bottom-[8%] rounded-full pointer-events-none portrait-halo"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 50% at 50% 48%, rgba(34,150,235,0.62) 0%, rgba(6,182,212,0.34) 34%, rgba(37,99,235,0.14) 62%, transparent 82%)',
                    filter: 'blur(10px)'
                }} />

            {/* 3. anéis orbitais com nós de luz (dev + órbita, mesmo vocabulário da seção Sobre) */}
            <div
                className="absolute left-1/2 top-[44%] w-[132%] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
                style={{
                    transform: 'translate(calc(-50% + var(--px, 0) * -10px), calc(-50% + var(--py, 0) * -8px))',
                    WebkitMaskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)',
                    maskImage: 'radial-gradient(closest-side, #000 62%, transparent 100%)'
                }}>
                <svg className="absolute inset-0 w-full h-full orbit-cw" viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="150" stroke="#06B6D4" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 7" />
                    <circle cx="200" cy="50" r="4" fill="#06B6D4" />
                    <circle cx="200" cy="50" r="10" fill="#06B6D4" fillOpacity="0.18" />
                    <circle cx="344" cy="248" r="3" fill="#A78BFA" />
                </svg>
                <svg className="absolute inset-0 w-full h-full orbit-ccw" viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="118" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="1" />
                    <circle cx="200" cy="200" r="184" stroke="#A78BFA" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="14 10" />
                    <circle cx="86" cy="284" r="3.5" fill="#38BDF8" />
                    <circle cx="316" cy="96" r="3" fill="#A78BFA" />
                </svg>
            </div>

            {/* 4. código flutuante (profundidade média: se move um pouco com o mouse) */}
            <div
                className="absolute inset-x-[-6%] inset-y-0 pointer-events-none"
                aria-hidden="true"
                style={{ transform: 'translate(calc(var(--px, 0) * -16px), calc(var(--py, 0) * -10px))' }}>
                {codeTokens.map((c) => (
                    <span
                        key={c.t}
                        className="code-drift absolute font-mono whitespace-nowrap text-primary/45"
                        style={{
                            left: c.left,
                            top: c.top,
                            fontSize: c.s,
                            ['--dur' as string]: c.dur,
                            ['--delay' as string]: c.delay
                        }}>
                        {c.t}
                    </span>
                ))}
            </div>

            {/* 5. bolhas subindo (mantém a identidade "água" do hero) */}
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

            {/* 6. chão de luz + ondas: a foto "pisa" numa poça azul */}
            <div
                className="absolute left-1/2 bottom-[-3%] w-[150%] h-[26%] -translate-x-1/2 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 50% at 50% 38%, rgba(34,150,235,0.55) 0%, rgba(6,182,212,0.22) 42%, transparent 72%)',
                    filter: 'blur(6px)'
                }} />
            <div className="absolute left-1/2 bottom-[-2%] w-[130%] h-[16%] -translate-x-1/2 pointer-events-none" aria-hidden="true">
                {[0, 1.8, 3.6].map((d) => (
                    <span
                        key={d}
                        className="water-ripple absolute left-1/2 top-0 w-full h-full rounded-[50%] border border-primary/40"
                        style={{ ['--delay' as string]: `${d}s` }} />
                ))}
            </div>

            {/* 7. a foto, sem nenhum filtro de cor/brilho. O PNG recortado vai direto, só com luz de contorno
                   azul (drop-shadow) e uma dissolução na base, onde a imagem original termina em corte reto */}
            <div
                className="absolute inset-x-0 bottom-0 top-[-2%] flex justify-center portrait-float"
                style={{
                    transform: 'translate(calc(var(--px, 0) * 6px), calc(var(--py, 0) * 4px))',
                    /* o brilho de contorno fica no pai: se ficasse na <img>, a máscara cortaria a sombra num retângulo */
                    filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.45)) drop-shadow(0 0 2px rgba(125,211,252,0.6))'
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/images/anderson-hero.png"
                    alt=""
                    draggable={false}
                    className="relative h-full w-auto max-w-none object-contain"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 86%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, #000 0%, #000 86%, transparent 100%)'
                    }} />
            </div>

            {/* 8. brilho de topo: luz fria vinda de cima, só no ar ao redor da cabeça (não toca a foto) */}
            <div
                className="absolute left-1/2 top-[-14%] w-[90%] h-[36%] -translate-x-1/2 pointer-events-none"
                aria-hidden="true"
                style={{
                    background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(125,211,252,0.16), transparent 70%)',
                    filter: 'blur(14px)',
                    mixBlendMode: 'screen'
                }} />
        </div>
    );
}
