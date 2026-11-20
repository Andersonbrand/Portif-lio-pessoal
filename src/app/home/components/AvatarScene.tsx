'use client';

import React, { useRef } from 'react';

type GemProps = { color: string; className?: string; style?: React.CSSProperties };

/** Faceted gem ("pedra") drawn with flat polygons. */
function Gem({ color, className, style }: GemProps) {
    const facets: [string, number][] = [
        ['30,20 70,20 60,40 40,40', 0.95],
        ['30,20 40,40 5,40', 0.6],
        ['70,20 95,40 60,40', 0.78],
        ['5,40 40,40 50,92', 0.45],
        ['95,40 60,40 50,92', 0.62],
        ['40,40 60,40 50,92', 0.85]
    ];
    return (
        <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
            {facets.map(([pts, o]) => (
                <polygon key={pts} points={pts} fill={color} fillOpacity={o} stroke="#fff" strokeOpacity={0.35} strokeWidth={0.8} strokeLinejoin="round" />
            ))}
            <polygon points="34,23 50,23 44,34 38,34" fill="#fff" fillOpacity={0.35} />
        </svg>
    );
}

const gems = [
    { color: '#06B6D4', pos: { left: '-2%', top: '10%' }, size: '22%', depth: 22, dur: '7s', delay: '0s', r0: '-12deg', r1: '4deg' },
    { color: '#A78BFA', pos: { right: '0%', top: '2%' }, size: '17%', depth: 30, dur: '8s', delay: '-2s', r0: '10deg', r1: '-6deg' },
    { color: '#06B6D4', pos: { right: '-4%', top: '46%' }, size: '11%', depth: 38, dur: '6s', delay: '-1s', r0: '-4deg', r1: '14deg' },
    { color: '#A78BFA', pos: { left: '2%', bottom: '10%' }, size: '19%', depth: 26, dur: '9s', delay: '-3s', r0: '8deg', r1: '-10deg' },
    { color: '#22D3EE', pos: { right: '8%', bottom: '4%' }, size: '21%', depth: 18, dur: '7.5s', delay: '-4s', r0: '-8deg', r1: '8deg' },
    { color: '#C4B5FD', pos: { left: '30%', top: '-4%' }, size: '8%', depth: 40, dur: '6.5s', delay: '-5s', r0: '0deg', r1: '18deg' },
    { color: '#67E8F9', pos: { left: '-6%', top: '52%' }, size: '7%', depth: 44, dur: '5.5s', delay: '-2.5s', r0: '-14deg', r1: '6deg' }
];

export default function AvatarScene() {
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
            className="relative w-full aspect-square max-w-[380px] mx-auto select-none"
            role="img"
            aria-label="Avatar ilustrado de Anderson Brandão, desenvolvedor Front-End">

            {/* glow */}
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl" />

            {/* orbit rings */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <g className="orbit-cw">
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#06B6D4" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 10" />
                    <circle cx="200" cy="10" r="4" fill="#06B6D4" />
                </g>
                <g className="orbit-ccw">
                    <circle cx="200" cy="200" r="168" fill="none" stroke="#A78BFA" strokeOpacity="0.3" strokeWidth="1" />
                    <circle cx="368" cy="200" r="3.5" fill="#A78BFA" />
                </g>
            </svg>

            {/* gems */}
            {gems.map((g, i) => (
                <div
                    key={i}
                    className="gem-wrap absolute aspect-square"
                    style={{
                        ...g.pos,
                        width: g.size,
                        transform: `translate(calc(var(--px, 0) * ${g.depth}px), calc(var(--py, 0) * ${g.depth}px))`
                    }}>
                    <Gem
                        color={g.color}
                        className="gem-float w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.45)]"
                        style={{ ['--dur' as string]: g.dur, ['--delay' as string]: g.delay, ['--r0' as string]: g.r0, ['--r1' as string]: g.r1 }} />
                </div>
            ))}

            {/* avatar */}
            <div
                className="absolute inset-[11%] avatar-breath gem-wrap"
                style={{ transform: 'translate(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 8px))' }}>
                <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="av-disc" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#0E2A47" />
                            <stop offset="1" stopColor="#2A1F5C" />
                        </linearGradient>
                        <linearGradient id="av-rim" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#06B6D4" />
                            <stop offset="1" stopColor="#A78BFA" />
                        </linearGradient>
                        <clipPath id="av-clip"><circle cx="200" cy="200" r="190" /></clipPath>
                    </defs>

                    <circle cx="200" cy="200" r="190" fill="url(#av-disc)" />
                    <g clipPath="url(#av-clip)">
                        {/* background grid + glow */}
                        <circle cx="200" cy="170" r="120" fill="#06B6D4" fillOpacity="0.12" />
                        <g stroke="#fff" strokeOpacity="0.05">
                            {[60, 120, 180, 240, 300, 360].map((v) => <line key={'v' + v} x1={v} y1="0" x2={v} y2="400" />)}
                            {[60, 120, 180, 240, 300, 360].map((v) => <line key={'h' + v} x1="0" y1={v} x2="400" y2={v} />)}
                        </g>

                        {/* shoulders / shirt */}
                        <path d="M30 420 C 30 350 85 312 158 296 L 200 338 L 242 296 C 315 312 370 350 370 420 Z" fill="#0A101E" />
                        <path d="M30 420 C 30 350 85 312 158 296" fill="none" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="2" />
                        <path d="M370 420 C 370 350 315 312 242 296" fill="none" stroke="#A78BFA" strokeOpacity="0.55" strokeWidth="2" />
                        {/* collar */}
                        <path d="M158 296 L 190 332 L 166 356 L 136 312 Z" fill="#121C33" stroke="#06B6D4" strokeOpacity="0.25" />
                        <path d="M242 296 L 210 332 L 234 356 L 264 312 Z" fill="#121C33" stroke="#A78BFA" strokeOpacity="0.25" />
                        {/* placket + buttons */}
                        <line x1="200" y1="338" x2="200" y2="420" stroke="#1B2742" strokeWidth="2" />
                        {[366, 392].map((y) => <circle key={y} cx="203" cy={y} r="3" fill="#2A3A5E" />)}

                        {/* neck */}
                        <path d="M172 250 L 172 300 C 182 322 218 322 228 300 L 228 250 Z" fill="#B97F5C" />
                        <path d="M172 262 C 186 282 214 282 228 262 L 228 250 L 172 250 Z" fill="#9C6446" fillOpacity="0.7" />

                        {/* ears */}
                        <ellipse cx="135" cy="188" rx="9" ry="15" fill="#C98F68" />
                        <ellipse cx="265" cy="188" rx="9" ry="15" fill="#C98F68" />
                        <ellipse cx="136" cy="189" rx="4" ry="8" fill="#A9704F" fillOpacity="0.7" />
                        <ellipse cx="264" cy="189" rx="4" ry="8" fill="#A9704F" fillOpacity="0.7" />

                        {/* face */}
                        <path d="M200 98 C 152 98, 136 138, 138 178 C 140 222, 160 262, 200 268 C 240 262, 260 222, 262 178 C 264 138, 248 98, 200 98 Z" fill="#DBA582" />
                        {/* soft cheek shading */}
                        <path d="M262 178 C 260 222, 240 262, 200 268 C 232 258, 248 226, 250 186 Z" fill="#B97F5C" fillOpacity="0.35" />

                        {/* hair (short, faded sides) */}
                        <path d="M134 168 C 126 104, 160 66, 202 66 C 244 66, 276 104, 266 168 C 263 146, 258 128, 247 118 C 230 108, 172 108, 154 118 C 142 128, 137 146, 134 168 Z" fill="#14161C" />
                        <path d="M150 112 C 170 96, 232 96, 252 112" fill="none" stroke="#2A2F3A" strokeWidth="3" strokeLinecap="round" />
                        <path d="M164 92 C 184 84, 218 84, 238 92" fill="none" stroke="#2A2F3A" strokeWidth="2.5" strokeLinecap="round" />
                        {/* fade at temples */}
                        <path d="M136 160 C 136 140, 140 128, 150 120 L 154 132 C 148 140, 146 150, 146 162 Z" fill="#14161C" fillOpacity="0.55" />
                        <path d="M264 160 C 264 140, 260 128, 250 120 L 246 132 C 252 140, 254 150, 254 162 Z" fill="#14161C" fillOpacity="0.55" />

                        {/* eyebrows */}
                        <path d="M158 160 Q 174 148 193 156 L 192 164 Q 175 158 160 168 Z" fill="#14161C" />
                        <path d="M242 160 Q 226 148 207 156 L 208 164 Q 225 158 240 168 Z" fill="#14161C" />

                        {/* eyes */}
                        <g className="avatar-blink">
                            <ellipse cx="175" cy="178" rx="10" ry="5.5" fill="#fff" />
                            <circle cx="175" cy="178" r="4.6" fill="#5A3721" />
                            <circle cx="175" cy="178" r="2.2" fill="#120A06" />
                            <circle cx="176.8" cy="176.4" r="1.2" fill="#fff" />
                        </g>
                        <g className="avatar-blink">
                            <ellipse cx="225" cy="178" rx="10" ry="5.5" fill="#fff" />
                            <circle cx="225" cy="178" r="4.6" fill="#5A3721" />
                            <circle cx="225" cy="178" r="2.2" fill="#120A06" />
                            <circle cx="226.8" cy="176.4" r="1.2" fill="#fff" />
                        </g>
                        <path d="M164 174 Q 175 169 186 174" fill="none" stroke="#14161C" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M214 174 Q 225 169 236 174" fill="none" stroke="#14161C" strokeWidth="1.6" strokeLinecap="round" />

                        {/* nose */}
                        <path d="M200 182 L 196 210 Q 200 215 207 211" fill="none" stroke="#A9704F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M193 213 Q 200 218 208 213" fill="none" stroke="#A9704F" strokeWidth="1.6" strokeLinecap="round" />

                        {/* jaw stubble + beard */}
                        <path d="M146 196 C 146 244, 168 270, 200 272 C 232 270, 254 244, 254 196 C 250 222, 238 232, 228 230 L 172 230 C 162 232, 150 222, 146 196 Z" fill="#14161C" fillOpacity="0.35" />
                        <path d="M170 228 C 174 244, 178 266, 200 270 C 222 266, 226 244, 230 228 C 222 238, 178 238, 170 228 Z" fill="#14161C" fillOpacity="0.9" />
                        {/* mustache */}
                        <path d="M176 226 Q 188 216 200 221 Q 212 216 224 226 Q 212 230 200 227 Q 188 230 176 226 Z" fill="#14161C" />
                        {/* mouth */}
                        <path d="M189 236 Q 200 241 211 236 Q 200 245 189 236 Z" fill="#B8705D" />

                        {/* glasses-less: subtle cheek highlight */}
                        <ellipse cx="162" cy="204" rx="10" ry="5" fill="#fff" fillOpacity="0.07" />
                        <ellipse cx="238" cy="204" rx="10" ry="5" fill="#fff" fillOpacity="0.07" />
                    </g>
                    <circle cx="200" cy="200" r="190" fill="none" stroke="url(#av-rim)" strokeWidth="3" />
                </svg>
            </div>

            {/* floating code badges */}
            <div
                className="gem-wrap absolute left-[-4%] bottom-[34%] px-3 py-1.5 rounded-lg border border-primary/30 bg-[#0A1628]/80 backdrop-blur-md font-mono text-xs text-primary shadow-lg"
                style={{ transform: 'translate(calc(var(--px, 0) * 34px), calc(var(--py, 0) * 34px))' }}>
                {'</>'}
            </div>
            <div
                className="gem-wrap absolute right-[-2%] top-[26%] px-3 py-1.5 rounded-lg border border-accent/30 bg-[#0A1628]/80 backdrop-blur-md font-mono text-xs text-accent shadow-lg"
                style={{ transform: 'translate(calc(var(--px, 0) * 30px), calc(var(--py, 0) * 30px))' }}>
                {'{ }'}
            </div>
        </div>
    );
}
