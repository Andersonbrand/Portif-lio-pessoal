'use client';

import React, { useEffect, useRef } from 'react';
import CodeScene from './CodeScene';

const features = [
    { title: 'Código limpo', text: 'Organização e boas práticas para projetos fáceis de manter.' },
    { title: 'Foco em UX', text: 'Interfaces claras, pensadas para quem usa no dia a dia.' },
    { title: 'Responsivo', text: 'Layouts que funcionam bem do celular ao desktop.' },
    { title: 'Front-End', text: 'HTML, CSS, JavaScript e React como base do trabalho.' },
    { title: 'Supabase', text: 'Autenticação e banco de dados integrados ao front-end.' },
    { title: 'Freelancer', text: 'Atendimento direto, do briefing à publicação.' }];

const stats = [
    { value: '3+', label: 'Anos como freelancer', color: '#06B6D4' },
    { value: '8+', label: 'Projetos desenvolvidos', color: '#A78BFA' },
    { value: '5', label: 'Tecnologias no dia a dia', color: '#22C55E' },
    { value: '1', label: 'Sistema em produção', color: '#F59E0B' }];


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-visible');
                });
            },
            { threshold: 0.1 }
        );
        const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer?.observe(el));
        return () => observer?.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 px-6 md:px-10 bg-background relative overflow-hidden isolate section-wash">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-on-scroll relative">
                        <CodeScene />
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="animate-on-scroll delay-100">
                            <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-4">01 / Sobre mim</span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                                Código limpo,<br />
                                <span className="italic text-muted-foreground font-light">projetos que resolvem</span>
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed mb-4">
                                Sou Anderson Brandão, desenvolvedor Front-End baseado em Guanambi, Bahia. Atuo como freelancer desde 2023, com as tecnologias HTML, CSS e JavaScript, desenvolvendo landingpages, sistemas web e sites responsivos que facilitam o dia a dia de quem usa.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Fiz a formação Full Stack do DevClub e venho ampliando minha atuação com React, Node.js e Supabase — hoje aplicados na prática no desenvolvimento do LogiFlow, um sistema de gestão logística em produção.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 animate-on-scroll delay-200">
                            {stats?.map((stat) =>
                                <div
                                    key={stat?.label}
                                    className="p-5 rounded-xl border border-white/8 bg-white/2 hover:border-white/16 transition-colors group"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}>

                                    <p
                                        className="font-display text-4xl font-bold mb-1 transition-colors"
                                        style={{ color: stat?.color }}>

                                        {stat?.value}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{stat?.label}</p>
                                </div>
                            )}
                        </div>

                        <div className="animate-on-scroll delay-300 flex items-center gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-[#020817] text-sm font-semibold hover:bg-primary/90 transition-all duration-300 glow-cyan">

                                Falar comigo
                            </a>
                            <a
                                href="https://github.com/Andersonbrand"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium text-foreground hover:border-white/30 hover:bg-white/5 transition-all duration-300">

                                Ver GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                    {features.map((f, i) =>
                        <div
                            key={f.title}
                            className="animate-on-scroll num-card p-6 rounded-2xl border border-white/8"
                            style={{ background: 'rgba(255,255,255,0.02)', transitionDelay: `${i * 60}ms` }}>
                            <span className="num-card-num font-mono text-xs text-muted-foreground transition-colors">0{i + 1}</span>
                            <h3 className="font-display text-lg font-semibold text-foreground mt-3 mb-1">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}
