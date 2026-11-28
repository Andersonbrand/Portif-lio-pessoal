'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Grade de pontinhos reativa ao cursor.
 * - perto do ponteiro os pontos crescem, ganham cor (ciano → violeta) e se esticam na direção do movimento;
 * - o ponteiro "puxa" levemente a grade (efeito de lente) e a grade volta ao lugar com suavidade;
 * - clique/toque dispara uma onda circular;
 * - parada no tempo ocioso: uma onda diagonal bem discreta passa pela grade, para o efeito existir também no celular;
 * - pausa fora da tela e respeita "reduzir movimento".
 */

interface DotGridProps {
    spacing?: number;
    className?: string;
}

const CYAN = [6, 182, 212];
const VIOLET = [167, 139, 250];
const RADIUS = 170; // alcance do cursor (px)
const PULSE_MS = 1100;

const smooth = (k: number) => k * k * (3 - 2 * k);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function DotGrid({ spacing = 26, className }: DotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !host || !ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const base = 1.15; // raio do ponto em repouso

        let w = 0;
        let h = 0;
        let dpr = 1;
        let raf = 0;
        let visible = false;

        const ptr = { x: 0, y: 0, inside: false };
        const sm = { x: 0, y: 0, vx: 0, vy: 0, strength: 0, ready: false };
        const pulses: { x: number; y: number; t: number }[] = [];

        const resize = () => {
            const r = host.getBoundingClientRect();
            w = r.width;
            h = r.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (reduceMotion) draw(performance.now());
        };

        const draw = (now: number) => {
            ctx.clearRect(0, 0, w, h);

            // suaviza ponteiro e velocidade
            const prevX = sm.x;
            const prevY = sm.y;
            if (ptr.inside) {
                if (!sm.ready) {
                    sm.x = ptr.x;
                    sm.y = ptr.y;
                    sm.ready = true;
                } else {
                    sm.x += (ptr.x - sm.x) * 0.17;
                    sm.y += (ptr.y - sm.y) * 0.17;
                }
            }
            sm.vx += (sm.x - prevX - sm.vx) * 0.2;
            sm.vy += (sm.y - prevY - sm.vy) * 0.2;
            sm.strength += ((ptr.inside ? 1 : 0) - sm.strength) * 0.09;

            const speed = Math.hypot(sm.vx, sm.vy);
            const angle = Math.atan2(sm.vy, sm.vx);
            const stretch = 1 + Math.min(speed, 26) * 0.07;

            while (pulses.length && now - pulses[0].t > PULSE_MS) pulses.shift();

            const cols = Math.ceil(w / spacing) + 1;
            const rows = Math.ceil(h / spacing) + 1;
            const offX = (w - (cols - 1) * spacing) / 2;
            const offY = (h - (rows - 1) * spacing) / 2;

            // pontos em repouso: um único path, uma única pintura
            ctx.fillStyle = 'rgba(148,163,184,0.2)';
            ctx.beginPath();
            const active: { x: number; y: number; inf: number; dx: number }[] = [];

            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                    const bx = offX + i * spacing;
                    const by = offY + j * spacing;

                    let inf = 0;
                    const dx = bx - sm.x;
                    const dy = by - sm.y;

                    if (sm.strength > 0.01) {
                        const d = Math.hypot(dx, dy);
                        if (d < RADIUS) inf = smooth(1 - d / RADIUS) * sm.strength;
                    }

                    for (let p = 0; p < pulses.length; p++) {
                        const age = (now - pulses[p].t) / PULSE_MS;
                        const ring = age * 340;
                        const dd = Math.abs(Math.hypot(bx - pulses[p].x, by - pulses[p].y) - ring);
                        if (dd < 46) inf += (1 - dd / 46) * (1 - age) * 0.85;
                    }

                    if (!reduceMotion) {
                        // onda diagonal muito sutil, só para a grade não parecer morta
                        const idle = 0.5 + 0.5 * Math.sin((bx + by) * 0.011 - now * 0.0008);
                        inf += Math.pow(idle, 8) * 0.16;
                    }

                    if (inf < 0.02) {
                        ctx.moveTo(bx + base, by);
                        ctx.arc(bx, by, base, 0, Math.PI * 2);
                    } else {
                        active.push({ x: bx, y: by, inf: Math.min(1, inf), dx });
                    }
                }
            }
            ctx.fill();

            for (let n = 0; n < active.length; n++) {
                const a = active[n];
                const k = a.inf;
                // lente: o ponteiro puxa os pontos próximos um pouco na sua direção
                const pull = sm.strength * k * 0.1;
                const x = a.x - (a.x - sm.x) * pull;
                const y = a.y - (a.y - sm.y) * pull;

                const r = base + k * 3.1;
                const t = clamp01(0.5 + a.dx / (RADIUS * 2));
                const cr = Math.round(CYAN[0] + (VIOLET[0] - CYAN[0]) * t);
                const cg = Math.round(CYAN[1] + (VIOLET[1] - CYAN[1]) * t);
                const cb = Math.round(CYAN[2] + (VIOLET[2] - CYAN[2]) * t);

                ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.22 + k * 0.73})`;
                ctx.beginPath();
                ctx.ellipse(x, y, r * (1 + (stretch - 1) * k), r, angle, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = (now: number) => {
            if (!visible) return;
            draw(now);
            raf = requestAnimationFrame(loop);
        };

        const toLocal = (e: PointerEvent) => {
            const r = host.getBoundingClientRect();
            ptr.x = e.clientX - r.left;
            ptr.y = e.clientY - r.top;
            ptr.inside = ptr.x >= -40 && ptr.x <= r.width + 40 && ptr.y >= -40 && ptr.y <= r.height + 40;
        };

        const onMove = (e: PointerEvent) => {
            toLocal(e);
        };
        const onDown = (e: PointerEvent) => {
            toLocal(e);
            if (ptr.inside && !reduceMotion) pulses.push({ x: ptr.x, y: ptr.y, t: performance.now() });
        };
        const onLeave = () => {
            ptr.inside = false;
        };
        const onUp = (e: PointerEvent) => {
            if (e.pointerType === 'touch') ptr.inside = false;
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                cancelAnimationFrame(raf);
                if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
                else if (visible) draw(performance.now());
            },
            { threshold: 0 }
        );
        io.observe(host);

        const ro = new ResizeObserver(resize);
        ro.observe(host);
        resize();

        if (!reduceMotion) {
            window.addEventListener('pointermove', onMove, { passive: true });
            window.addEventListener('pointerdown', onDown, { passive: true });
            window.addEventListener('pointerup', onUp, { passive: true });
            document.addEventListener('pointerleave', onLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [spacing]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)'
            }}
        />
    );
}
