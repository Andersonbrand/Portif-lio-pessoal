'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const navLinks = [
    { label: 'Início', href: '#home', id: 'home' },
    { label: 'Sobre', href: '#about', id: 'about' },
    { label: 'Experiência', href: '#experience', id: 'experience' },
    { label: 'Projetos', href: '#projects', id: 'projects' },
    { label: 'Soluções', href: '#services', id: 'services' },
    { label: 'Contato', href: '#contact', id: 'contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('home');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            setHidden(y > lastY && y > 400);
            lastY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // scroll-spy: highlight the section currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        navLinks.forEach((l) => {
            const el = document.getElementById(l.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'} ${scrolled || menuOpen
                    ? 'bg-[#020817]/80 backdrop-blur-md border-white/5 py-3'
                    : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group" aria-label="Anderson Brandão — Início">
                    <AppLogo
                        size={32}
                        iconName="CodeBracketIcon"
                        className="text-primary"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                    <span className="font-display font-semibold text-lg text-foreground tracking-tight hidden sm:block">
                        Anderson<span className="text-primary">.dev</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={active === link.id ? 'location' : undefined}
                            className={`nav-link text-sm font-medium transition-colors pb-0.5 ${active === link.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300"
                    >
                        {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                    </button>

                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300 glow-cyan-sm"
                    >
                        Vamos conversar
                    </a>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-[28rem]' : 'max-h-0'}`}>
                <nav className="px-6 pb-6 pt-3 flex flex-col border-t border-white/5 bg-[#020817]/95 backdrop-blur-md">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-baseline gap-4 py-3 border-b border-white/5 text-foreground hover:text-primary transition-colors"
                        >
                            <span className="font-mono text-xs text-primary">0{i + 1}</span>
                            <span className="font-display text-2xl">{link.label}</span>
                        </a>
                    ))}
                    <a
                        href="mailto:andersonbteixeira@outlook.com"
                        className="mt-4 text-sm text-muted-foreground"
                    >
                        andersonbteixeira@outlook.com
                    </a>
                </nav>
            </div>
        </header>
    );
}
