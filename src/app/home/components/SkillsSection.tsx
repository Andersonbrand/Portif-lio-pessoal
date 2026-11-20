'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Skill {
    name: string;
    level: number;
    color: string;
}

const skills: Skill[] = [
    { name: 'HTML', level: 90, color: '#F59E0B' },
    { name: 'CSS', level: 88, color: '#06B6D4' },
    { name: 'JavaScript', level: 82, color: '#EAB308' },
    { name: 'Git & GitHub', level: 80, color: '#A78BFA' },
];

const learning = [
    { name: 'React', bg: '#0E1A2B', text: '#61DAFB' },
    { name: 'Supabase', bg: '#0D1626', text: '#3ECF8E' },
    { name: 'Node.js', bg: '#0D1A11', text: '#68A063' },
    { name: 'React Native', bg: '#0E1A2B', text: '#61DAFB' },
    { name: 'Docker', bg: '#0A1929', text: '#2496ED' },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        if (entry.target === sectionRef.current) setVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-10 section-indigo border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/4 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-14 animate-on-scroll">
                    <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">04 / Stack técnica</span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            Ferramentas &<br />
                            <span className="italic text-muted-foreground font-light">tecnologias</span>
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Base sólida em Front-End, em evolução constante rumo ao Full Stack.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    {skills.map((skill, i) => (
                        <SkillBar key={skill.name} skill={skill} visible={visible} delay={i * 80} />
                    ))}
                </div>

                <div className="animate-on-scroll delay-300">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Aprendendo e aplicando na prática</p>
                    <div className="flex flex-wrap gap-3">
                        {learning.map((tech) => (
                            <div
                                key={tech.name}
                                className="px-4 py-2 rounded-lg border border-white/8 text-sm font-medium transition-all duration-200 hover:border-white/20 hover:scale-105 cursor-default"
                                style={{ background: tech.bg, color: tech.text }}
                            >
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillBar({ skill, visible, delay }: { skill: Skill; visible: boolean; delay: number }) {
    return (
        <div className="animate-on-scroll group">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: visible ? `${skill.level}%` : '0%',
                        background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)`,
                        transitionDelay: `${delay}ms`,
                        boxShadow: visible ? `0 0 8px ${skill.color}40` : 'none',
                    }}
                />
            </div>
        </div>
    );
}
