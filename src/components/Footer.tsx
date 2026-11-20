import React from 'react';

import AppLogo from '@/components/ui/AppLogo';

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/Andersonbrand',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/anderson-tbrand%C3%A3o/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/5577999106357',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.02 2C6.5 2 2.01 6.48 2.01 12c0 1.98.52 3.83 1.42 5.44L2 22l4.68-1.4A9.96 9.96 0 0012.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.13c-1.7 0-3.35-.46-4.78-1.32l-.34-.2-3.02.9.9-2.94-.22-.35a8.13 8.13 0 01-1.26-4.32c0-4.5 3.66-8.15 8.16-8.15 4.5 0 8.16 3.65 8.16 8.15 0 4.49-3.66 8.23-8.6 8.23z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#020817] pt-16 pb-8 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <AppLogo size={32} iconName="CodeBracketIcon" className="text-primary" />
                            <span className="font-display text-lg font-semibold text-foreground">
                                Anderson<span className="text-primary">.dev</span>
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Desenvolvedor Front-End em Guanambi, Bahia. Landingpages, sistemas web e sites responsivos com React e Supabase.
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">Navegação</p>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {[['Início', '#home'], ['Sobre mim', '#about'], ['Experiência', '#experience'], ['Projetos', '#projects'], ['Soluções', '#services'], ['Contato', '#contact']].map(([l, h]) => (
                                <li key={h}><a href={h} className="hover:text-foreground transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">Contato</p>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><a href="mailto:andersonbteixeira@outlook.com" className="hover:text-foreground transition-colors break-all">andersonbteixeira@outlook.com</a></li>
                            <li><a href="https://wa.me/5577999106357" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">(77) 99910-6357</a></li>
                            <li>Guanambi, BA — Brasil</li>
                        </ul>
                        <div className="flex items-center gap-3 mt-5">
                            {socialLinks?.map((s) => (
                                <a
                                    key={s?.label}
                                    href={s?.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s?.label}
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                                >
                                    {s?.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Anderson Brandão. Todos os direitos reservados.</p>
                    <a href="#home" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                        Voltar ao topo
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
