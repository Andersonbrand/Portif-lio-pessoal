'use client';

import React from 'react';
import { useReveal } from '@/components/useReveal';

const roles = [
    {
        period: 'Jan 2023 — Atual',
        title: 'Desenvolvedor Front-End',
        company: 'Freelancer',
        meta: 'Guanambi-BA · Remoto · Autônomo',
        summary: 'Desenvolvimento de landingpages, sistemas web e sites responsivos para clientes e projetos próprios.',
        bullets: [
            'Entrega de sites e aplicações publicadas e acessíveis online, do layout ao deploy.',
            'Criação do LogiFlow, sistema de gestão logística em produção, com React e Supabase.',
            'Projetos práticos publicados no GitHub para facilitar o dia a dia de quem usa.'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Supabase']
    },
    {
        period: 'Abr 2019 — Atual',
        title: 'Gerente de Logística',
        company: 'Operação logística',
        meta: 'Guanambi-BA · Presencial · Tempo integral',
        summary: 'Organização e controle de estoque e da logística em geral — a vivência que inspira os sistemas que eu construo.',
        bullets: [
            'Conhecimento real da operação: romaneios, frota, estoque e fretes.',
            'Visão de produto que une tecnologia e rotina operacional.'
        ],
        tech: ['Logística', 'Estoque', 'Gestão']
    },
    {
        period: 'Jan 2023 — Dez 2023',
        title: 'Formação Full Stack',
        company: 'DevClub',
        meta: 'Online · Formação do zero ao avançado',
        summary: 'Aplicação teórica e prática das tecnologias web, do front-end ao back-end.',
        bullets: [
            'HTML, CSS, JavaScript, React e React Native.',
            'Node, bancos de dados relacionais e não relacionais e Docker.'
        ],
        tech: ['React', 'React Native', 'Node.js', 'Docker']
    }
];

export default function ExperienceSection() {
    const ref = useReveal<HTMLElement>();
    return (
        <section id="experience" ref={ref} className="py-24 px-6 md:px-10 section-deep border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
            <div className="max-w-5xl mx-auto relative">
                <div className="animate-on-scroll mb-16">
                    <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">02 / Experiência</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        Onde já <span className="italic text-muted-foreground font-light">construí</span>
                    </h2>
                </div>

                <ol className="relative">
                    <span className="timeline-line absolute left-[15px] md:left-[19px] top-2 bottom-0 w-px" aria-hidden="true" />
                    {roles.map((r, i) => (
                        <li key={r.title + r.company} className="animate-on-scroll relative pl-12 md:pl-16 pb-14 last:pb-0" style={{ transitionDelay: `${i * 90}ms` }}>
                            <span className="timeline-dot absolute left-[10px] md:left-[14px] top-2 w-[11px] h-[11px] rounded-full bg-primary" aria-hidden="true" />
                            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">0{i + 1} · {r.period}</span>
                                <span className="text-xs text-muted-foreground">{r.meta}</span>
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-foreground">
                                {r.title} <span className="text-muted-foreground font-light italic">· {r.company}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-2xl">{r.summary}</p>
                            <ul className="mt-4 space-y-2 max-w-2xl">
                                {r.bullets.map((b) => (
                                    <li key={b} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {r.tech.map((t) => (
                                    <span key={t} className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-[11px] text-muted-foreground">{t}</span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
