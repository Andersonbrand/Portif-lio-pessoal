'use client';

import React from 'react';
import { useReveal } from '@/components/useReveal';

const services = [
    { title: 'Sites & Landing Pages', text: 'Páginas rápidas, responsivas e pensadas para converter visitantes em contatos e clientes.' },
    { title: 'Sistemas Web & Aplicações', text: 'Painéis e sistemas de gestão com React, do fluxo de login às telas de operação do dia a dia.' },
    { title: 'Integrações com Supabase', text: 'Autenticação, banco de dados e armazenamento conectados ao front-end de forma organizada.' },
    { title: 'E-commerce & Catálogos', text: 'Catálogos de produtos com busca, categorias e pedido de orçamento, como no projeto Grupo HC.' },
    { title: 'Interfaces & Animações', text: 'Microinterações e transições suaves que dão personalidade sem pesar na performance.' },
    { title: 'Melhoria de sites existentes', text: 'Revisão de layout, responsividade e organização do código de projetos que já estão no ar.' }
];

const steps = [
    { title: 'Entender', text: 'Conversa inicial para entender o objetivo, o público e o prazo.' },
    { title: 'Planejar', text: 'Estrutura das páginas, escopo e tecnologias antes de escrever código.' },
    { title: 'Desenhar', text: 'Layout e identidade visual validados antes do desenvolvimento.' },
    { title: 'Desenvolver', text: 'Código limpo, responsivo e versionado no GitHub.' },
    { title: 'Entregar', text: 'Testes em dispositivos, publicação e ajustes finais.' }
];

export default function ServicesSection() {
    const ref = useReveal<HTMLElement>();
    return (
        <section id="services" ref={ref} className="py-24 px-6 md:px-10 bg-background relative overflow-hidden isolate section-wash">
            <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
            <div className="max-w-7xl mx-auto relative">
                <div className="animate-on-scroll mb-14">
                    <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">05 / Soluções</span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            Tecnologia para levar<br />
                            <span className="italic text-muted-foreground font-light">seu negócio mais longe.</span>
                        </h2>
                        <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explorar projetos →</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
                    {services.map((s, i) => (
                        <article key={s.title} className="animate-on-scroll num-card p-7 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)', transitionDelay: `${i * 70}ms` }}>
                            <span className="num-card-num font-mono text-xs text-muted-foreground transition-colors">0{i + 1}</span>
                            <h3 className="font-display text-xl font-semibold text-foreground mt-4 mb-2">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                        </article>
                    ))}
                </div>

                <div className="animate-on-scroll">
                    <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">Como eu trabalho</span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
                        Do primeiro contato <span className="italic text-muted-foreground font-light">à publicação</span>
                    </h3>
                    <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {steps.map((s, i) => (
                            <li key={s.title} className="relative p-5 rounded-xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <span className="font-display text-4xl font-light text-primary/70">{i + 1}</span>
                                <p className="text-sm font-semibold text-foreground mt-2 mb-1">{s.title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
