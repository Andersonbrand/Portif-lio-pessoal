'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

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
        <section id="about" ref={sectionRef} className="py-24 px-6 md:px-10 bg-background relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-on-scroll relative">
                        <div className="relative w-full max-w-md mx-auto lg:mx-0">
                            <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/8 gradient-border">
                                <AppImage
                                    src="/assets/images/anderson-photo.png"
                                    alt="Anderson Brandão, desenvolvedor Front-End"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 1024px) 100vw, 50vw" />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/60 via-transparent to-transparent" />
                            </div>

                            <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-white/10 bg-[#0A1628]/90 backdrop-blur-md shadow-2xl animate-float">
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

                            <div className="absolute -top-4 -left-4 px-3 py-2 rounded-xl border border-white/10 bg-[#0A1628]/90 backdrop-blur-md shadow-xl">
                                <p className="text-xs font-mono text-primary">
                                    {'<FrontEnd />'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="animate-on-scroll delay-100">
                            <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-4">Sobre mim</span>
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
            </div>
        </section>);

}
