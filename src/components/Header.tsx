'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const navLinks = [
    { label: 'Projetos', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#020817]/80 dark:bg-[#020817]/80 backdrop-blur-md border-b border-white/5 dark:border-white/5 py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
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

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks?.map((link) => (
                        link?.href?.startsWith('/') ? (
                            <Link
                                key={link?.href}
                                href={link?.href}
                                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pb-0.5"
                            >
                                {link?.label}
                            </Link>
                        ) : (
                            <a
                                key={link?.href}
                                href={link?.href}
                                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pb-0.5"
                            >
                                {link?.label}
                            </a>
                        )
                    ))}
                </nav>

                {/* CTA + Theme Toggle */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 dark:border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="w-4 h-4" />
                        ) : (
                            <MoonIcon className="w-4 h-4" />
                        )}
                    </button>

                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300 glow-cyan-sm"
                    >
                        Contratar
                    </a>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Menu"
                    >
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <nav className="px-6 pb-5 pt-3 flex flex-col gap-4 border-t border-white/5 bg-[#020817]/95 backdrop-blur-md">
                    {navLinks?.map((link) => (
                        link?.href?.startsWith('/') ? (
                            <Link
                                key={link?.href}
                                href={link?.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                            >
                                {link?.label}
                            </Link>
                        ) : (
                            <a
                                key={link?.href}
                                href={link?.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                            >
                                {link?.label}
                            </a>
                        )
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all w-fit"
                    >
                        Contratar
                    </a>
                </nav>
            </div>
        </header>
    );
}