'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProjectTypeSelect from './ProjectTypeSelect';

const contactLinks = [
    {
        label: 'GitHub',
        handle: '@Andersonbrand',
        href: 'https://github.com/Andersonbrand',
        description: 'Veja meu código',
        color: '#FFFFFF',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        handle: 'anderson-tbrandão',
        href: 'https://www.linkedin.com/in/anderson-tbrand%C3%A3o/',
        description: 'Conecte-se comigo',
        color: '#0A66C2',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        handle: '(77) 99910-6357',
        href: 'https://wa.me/5577999106357',
        description: 'Chama no zap',
        color: '#25D366',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.02 2C6.5 2 2.01 6.48 2.01 12c0 1.98.52 3.83 1.42 5.44L2 22l4.68-1.4A9.96 9.96 0 0012.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.13c-1.7 0-3.35-.46-4.78-1.32l-.34-.2-3.02.9.9-2.94-.22-.35a8.13 8.13 0 01-1.26-4.32c0-4.5 3.66-8.15 8.16-8.15 4.5 0 8.16 3.65 8.16 8.15 0 4.49-3.66 8.23-8.6 8.23z" />
            </svg>
        ),
    },
    {
        label: 'E-mail',
        handle: 'andersonbteixeira@outlook.com',
        href: 'mailto:andersonbteixeira@outlook.com',
        description: 'Envie uma proposta',
        color: '#06B6D4',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
];

interface FormState {
    name: string;
    email: string;
    message: string;
}

interface SubmitState {
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
    const [projectType, setProjectType] = useState('Website');
    const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState({ status: 'loading', message: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, message: `[Tipo de projeto: ${projectType}]\n\n${form.message}` }),
            });
            const data = await res.json();

            if (res.ok) {
                setSubmitState({ status: 'success', message: data.message || 'Mensagem enviada com sucesso!' });
                setForm({ name: '', email: '', message: '' });
            } else {
                setSubmitState({ status: 'error', message: data.error || 'Falha ao enviar. Tente novamente.' });
            }
        } catch {
            setSubmitState({ status: 'error', message: 'Erro de conexão. Tente novamente.' });
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="py-28 px-6 md:px-10 relative overflow-hidden section-deep">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.06)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/8 blur-[80px] animate-float pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/8 blur-[80px] animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <p className="animate-on-scroll text-xs uppercase tracking-widest text-primary font-semibold mb-4">06 / Vamos conversar</p>
                <div className="animate-on-scroll inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Disponível agora</span>
                </div>

                <h2 className="animate-on-scroll delay-100 font-display text-5xl md:text-7xl font-bold text-foreground leading-[0.92] tracking-tight mb-6">
                    Vamos construir<br />
                    <span className="italic gradient-text font-light">algo juntos?</span>
                </h2>

                <p className="animate-on-scroll delay-200 text-lg text-muted-foreground font-light leading-relaxed mb-14 max-w-xl mx-auto">
                    Estou aberto a projetos freelance e colaborações. Me manda uma mensagem — respondo em até 24h.
                </p>

                <div className="animate-on-scroll delay-250 mb-12 text-left">
                    <form onSubmit={handleSubmit} className="bg-white/2 border border-white/8 rounded-2xl p-6 md:p-8 space-y-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Envie uma mensagem</h3>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="projectType" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tipo de projeto</label>
                            <ProjectTypeSelect id="projectType" value={projectType} onChange={setProjectType} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nome</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome"
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border-0 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none focus:bg-white/10 focus:shadow-[0_0_24px_-8px_rgba(6,182,212,0.6)] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border-0 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none focus:bg-white/10 focus:shadow-[0_0_24px_-8px_rgba(6,182,212,0.6)] transition-all duration-200"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mensagem</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Conte sobre seu projeto ou proposta..."
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border-0 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none focus:bg-white/10 focus:shadow-[0_0_24px_-8px_rgba(6,182,212,0.6)] transition-all duration-200 resize-none"
                            />
                        </div>

                        {submitState.status === 'success' && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {submitState.message}
                            </div>
                        )}
                        {submitState.status === 'error' && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {submitState.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitState.status === 'loading'}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-[#020817] font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-cyan hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {submitState.status === 'loading' ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Solicitar orçamento
                                </>
                            )}
                        </button>
                        <a
                            href={`https://wa.me/5577999106357?text=${encodeURIComponent(`Olá, Anderson! Vim pelo seu portfólio. Tenho um projeto do tipo "${projectType}"${form.name ? ` — meu nome é ${form.name}` : ''}.${form.message ? `\n\n${form.message}` : ''}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto sm:ml-3 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-[#25D366]/40 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/10 transition-all duration-300">
                            Enviar pelo WhatsApp
                        </a>
                    </form>
                </div>

                <div className="animate-on-scroll delay-300 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {contactLinks?.map((link) => (
                        <a
                            key={link?.label}
                            href={link?.href}
                            target={link?.href?.startsWith('mailto') ? undefined : '_blank'}
                            rel={link?.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/4 transition-all duration-300 text-left"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${link?.color}15`, color: link?.color }}
                            >
                                {link?.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground mb-0.5">{link?.label}</p>
                                <p className="text-xs text-muted-foreground truncate">{link?.handle}</p>
                                <p className="text-xs text-muted-foreground/60 mt-0.5">{link?.description}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0 group-hover:translate-x-1 group-hover:text-foreground transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    ))}
                </div>

                <div className="animate-on-scroll delay-400">
                    <a
                        href="mailto:andersonbteixeira@outlook.com"
                        className="btn-shimmer relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-[#020817] font-semibold text-base hover:bg-primary/90 transition-all duration-300 glow-cyan hover:scale-105 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Enviar e-mail agora
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">Resposta garantida em até 24 horas</p>
                </div>
            </div>
        </section>
    );
}
