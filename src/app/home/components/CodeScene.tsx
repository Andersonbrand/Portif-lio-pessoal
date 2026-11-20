'use client';

import React, { useEffect, useRef, useState } from 'react';

type TokenType = 'kw' | 'fn' | 'str' | 'prop' | 'pun' | 'com' | 'var' | 'plain';
type Token = [string, TokenType];

/* Cores vindas da própria paleta do portfólio (ciano, roxo, verde, âmbar) */
const colors: Record<TokenType, string> = {
    kw: '#A78BFA',
    fn: '#06B6D4',
    str: '#22C55E',
    prop: '#7DD3FC',
    pun: '#64748B',
    com: '#475569',
    var: '#F59E0B',
    plain: '#E2E8F0'
};

const lines: Token[][] = [
    [['const ', 'kw'], ['anderson', 'var'], [' = {', 'pun']],
    [['  nome', 'prop'], [': ', 'pun'], ["'Anderson Brandão'", 'str'], [',', 'pun']],
    [['  foco', 'prop'], [': ', 'pun'], ["'Front-End'", 'str'], [',', 'pun']],
    [['  stack', 'prop'], [': [', 'pun'], ["'HTML'", 'str'], [', ', 'pun'], ["'CSS'", 'str'], [', ', 'pun'], ["'JS'", 'str'], [', ', 'pun'], ["'React'", 'str'], [', ', 'pun'], ["'Supabase'", 'str'], ['],', 'pun']],
    [['  freelancer', 'prop'], [': ', 'pun'], ["'desde 2023'", 'str'], [',', 'pun']],
    [['  emProducao', 'prop'], [': ', 'pun'], ["'LogiFlow'", 'str'], [',', 'pun']],
    [['};', 'pun']],
    [],
    [['export function ', 'kw'], ['resolver', 'fn'], ['(', 'pun'], ['problema', 'var'], [') {', 'pun']],
    [['  return ', 'kw'], ['codigoLimpo', 'fn'], ['(', 'pun'], ['problema', 'var'], [')', 'pun']],
    [['    .', 'pun'], ['responsivo', 'fn'], ['()', 'pun']],
    [['    .', 'pun'], ['pensadoParaQuemUsa', 'fn'], ['();', 'pun']],
    [['}', 'pun']],
    [],
    [['// projetos que resolvem ✓', 'com']]
];

const total = lines.reduce((acc, l) => acc + l.reduce((a, t) => a + t[0].length, 0), 0);

/* Linhas de "código de fundo" que sobem devagar atrás da janela */
const rain = [
    '<section id="about">', 'useEffect(() => {', 'supabase.from("frota")', 'display: grid;', 'await fetch(api)',
    'export default App', 'flex-direction: column', '.map((item) =>', 'git commit -m "feat"', 'npm run build',
    'const [state, set] =', '@media (max-width: 768px)'
];

const chips = [
    { label: 'React', color: '#06B6D4', pos: '-top-4 -right-3', delay: '0s' },
    { label: 'Supabase', color: '#22C55E', pos: 'top-[38%] -left-6', delay: '-1.5s' },
    { label: 'CSS', color: '#A78BFA', pos: 'bottom-[22%] -right-5', delay: '-3s' }
];

export default function CodeScene() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    /* inicia a digitação quando a cena entra na tela */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setCount(total);
            setStarted(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    io.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!started || count >= total) return;
        const id = setTimeout(() => setCount((c) => Math.min(total, c + 1)), count === 0 ? 400 : 24);
        return () => clearTimeout(id);
    }, [started, count]);

    /* tilt 3D sutil seguindo o mouse */
    const onMove = (e: React.MouseEvent) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = () => {
        wrapRef.current?.style.setProperty('--px', '0');
        wrapRef.current?.style.setProperty('--py', '0');
    };

    /* renderização: caracteres ainda não digitados ficam invisíveis, mantendo o layout fixo */
    let offset = 0;
    let cursorPlaced = false;
    const done = count >= total;

    const renderedLines = lines.map((line, li) => {
        const parts = line.map((tok, ti) => {
            const [text, type] = tok;
            const visible = Math.max(0, Math.min(text.length, count - offset));
            const hasCursor = !cursorPlaced && !done && count >= offset && count <= offset + text.length && (visible > 0 || count === 0);
            if (hasCursor) cursorPlaced = true;
            offset += text.length;
            return (
                <React.Fragment key={ti}>
                    <span style={{ color: colors[type] }}>{text.slice(0, visible)}</span>
                    {hasCursor && <span className="code-cursor" />}
                    <span className="invisible">{text.slice(visible)}</span>
                </React.Fragment>
            );
        });
        const isLastLine = li === lines.length - 1;
        return (
            <div key={li} className="flex min-h-[1.55em]">
                <span className="w-7 shrink-0 select-none text-right pr-3 text-[#334155]">{li + 1}</span>
                <span className="whitespace-pre">
                    {parts}
                    {done && isLastLine && <span className="code-cursor" />}
                </span>
            </div>
        );
    });

    return (
        <div
            ref={wrapRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full max-w-md mx-auto lg:mx-0"
            role="img"
            aria-label="Janela de código mostrando o perfil de Anderson Brandão: desenvolvedor Front-End com HTML, CSS, JavaScript, React e Supabase, freelancer desde 2023">

            {/* brilho ciano/roxo atrás da janela */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-primary/5 to-accent/20 blur-3xl pointer-events-none" aria-hidden="true" />

            <div
                className="relative code-tilt"
                style={{ transform: 'perspective(1000px) rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -4deg))' }}>

                <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 gradient-border bg-[#050D1F] shadow-2xl shadow-primary/10">

                    {/* chuva de código ao fundo */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.16]" aria-hidden="true">
                        {rain.map((r, i) => (
                            <span
                                key={r}
                                className="code-rain absolute font-mono text-[10px] text-primary whitespace-nowrap"
                                style={{
                                    left: `${(i * 37) % 78}%`,
                                    ['--dur' as string]: `${14 + (i % 4) * 3}s`,
                                    ['--delay' as string]: `${-i * 2.3}s`
                                }}>
                                {r}
                            </span>
                        ))}
                    </div>

                    {/* grade pontilhada */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        aria-hidden="true"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(6,182,212,0.18) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
                        }} />

                    {/* barra de título */}
                    <div className="relative flex items-center gap-2 px-4 h-11 border-b border-white/8 bg-white/[0.03]">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                        <div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/8">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="font-mono text-[11px] text-[#94A3B8]">anderson.tsx</span>
                        </div>
                    </div>

                    {/* código */}
                    <div className="relative px-4 py-5 font-mono text-[12.5px] sm:text-[13px] leading-[1.55] overflow-hidden" aria-hidden="true">
                        {renderedLines}
                    </div>

                    {/* linha de scan */}
                    <div className="scan-line" aria-hidden="true" />

                    {/* barra de status */}
                    <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 h-8 border-t border-white/8 bg-primary/10 font-mono text-[10.5px] text-[#94A3B8]">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                            LogiFlow em produção
                        </span>
                        <span>TSX · UTF-8</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* chips flutuantes de tecnologia */}
                {chips.map((c) => (
                    <div
                        key={c.label}
                        className={`absolute ${c.pos} px-3 py-1.5 rounded-lg border bg-[#0A1628]/90 backdrop-blur-md shadow-xl code-chip hidden sm:block`}
                        style={{ borderColor: `${c.color}55`, ['--delay' as string]: c.delay }}
                        aria-hidden="true">
                        <p className="text-[11px] font-mono" style={{ color: c.color }}>{`<${c.label} />`}</p>
                    </div>
                ))}

                {/* badge Freelancer (mantido) */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 p-4 rounded-xl border border-white/10 bg-[#0A1628]/90 backdrop-blur-md shadow-2xl animate-float">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-foreground">Freelancer</p>
                            <p className="text-[11px] text-muted-foreground">Desde 2023</p>
                        </div>
                    </div>
                </div>

                {/* tag <FrontEnd /> (mantida) */}
                <div className="absolute -top-4 -left-4 px-3 py-2 rounded-xl border border-white/10 bg-[#0A1628]/90 backdrop-blur-md shadow-xl">
                    <p className="text-xs font-mono text-primary">{'<FrontEnd />'}</p>
                </div>
            </div>
        </div>
    );
}
