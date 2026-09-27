'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles, categories } from './data/articles';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const featured = articles.filter((a) => a.featured);
    const filtered =
        activeCategory === 'Todos'
            ? articles
            : articles.filter((a) => a.category === activeCategory);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
                <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
                        <TagIcon className="w-3.5 h-3.5" />
                        Blog & Artigos
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                        Insights &{' '}
                        <span className="gradient-text">Conhecimento Técnico</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Artigos sobre React, TypeScript, performance e as tecnologias que
                        uso no dia a dia. Compartilhando o que aprendo na prática.
                    </p>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="px-6 md:px-10 max-w-7xl mx-auto mb-20">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
                    Destaques
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((article, i) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className={`group relative rounded-2xl overflow-hidden border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300 card-shimmer ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                                }`}
                        >
                            <div
                                className={`relative overflow-hidden ${i === 0 ? 'h-64 md:h-72' : 'h-48'}`}
                            >
                                <img
                                    src={article.image}
                                    alt={article.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />
                                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium backdrop-blur-sm">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-5 bg-[var(--card)]">
                                <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-3.5 h-3.5" />
                                        {formatDate(article.publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <ClockIcon className="w-3.5 h-3.5" />
                                        {article.readTime} min de leitura
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Category Filter + Article List */}
            <section className="px-6 md:px-10 max-w-7xl mx-auto mb-24">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                        Todos os artigos
                    </h2>
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-primary/15 border-primary/50 text-primary' : 'border-[var(--card-border)] text-muted-foreground hover:border-[var(--card-border-hover)] hover:text-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {filtered.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="group flex gap-5 p-5 rounded-2xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] bg-[var(--card)] transition-all duration-300 card-shimmer relative overflow-hidden"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                    src={article.image}
                                    alt={article.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                                        {article.category}
                                    </span>
                                    {article.tags.slice(1, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded-full border border-[var(--card-border)] text-muted-foreground text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3 hidden md:block">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-3.5 h-3.5" />
                                        {formatDate(article.publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <ClockIcon className="w-3.5 h-3.5" />
                                        {article.readTime} min
                                    </span>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center self-center text-muted-foreground group-hover:text-primary transition-colors">
                                <svg className="w-5 h-5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">Nenhum artigo encontrado nesta categoria.</p>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
