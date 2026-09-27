import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '../data/articles';
import { CalendarIcon, ClockIcon, ArrowLeftIcon, TagIcon } from '@heroicons/react/24/outline';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);
    if (!article) return {};
    return {
        title: `${article.title} | Blog`,
        description: article.excerpt,
    };
}

function renderContent(content: string) {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">
                    {line.replace('## ', '')}
                </h2>
            );
        } else if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    {line.replace('### ', '')}
                </h3>
            );
        } else if (line.startsWith('```')) {
            const lang = line.replace('```', '').trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            elements.push(
                <div key={i} className="my-6 rounded-xl overflow-hidden border border-white/10">
                    {lang && (
                        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-muted-foreground font-mono">
                            {lang}
                        </div>
                    )}
                    <pre className="p-4 bg-[#0d1117] overflow-x-auto text-sm">
                        <code className="text-[#e6edf3] font-mono leading-relaxed">
                            {codeLines.join('\n')}
                        </code>
                    </pre>
                </div>
            );
        } else if (line.startsWith('- ')) {
            const listItems: string[] = [];
            while (i < lines.length && lines[i].startsWith('- ')) {
                listItems.push(lines[i].replace('- ', ''));
                i++;
            }
            elements.push(
                <ul key={i} className="my-4 space-y-2 pl-4">
                    {listItems.map((item, idx) => {
                        const parts = item.split(/\*\*(.*?)\*\*/g);
                        return (
                            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>
                                    {parts.map((part, pIdx) =>
                                        pIdx % 2 === 1 ? (
                                            <strong key={pIdx} className="text-foreground font-semibold">{part}</strong>
                                        ) : (
                                            part
                                        )
                                    )}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            );
            continue;
        } else if (line.trim() === '') {
            // skip empty lines
        } else {
            // Paragraph with inline bold/code
            const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
            elements.push(
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        if (part.startsWith('`') && part.endsWith('`')) {
                            return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-sm">{part.slice(1, -1)}</code>;
                        }
                        return part;
                    })}
                </p>
            );
        }
        i++;
    }

    return elements;
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) notFound();

    const related = articles
        .filter((a) => a.id !== article.id && a.category === article.category)
        .slice(0, 2);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    return (
        <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
            <Header />

            <article className="pt-28 pb-20 px-6 md:px-10 max-w-4xl mx-auto">
                {/* Back */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
                >
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Voltar ao Blog
                </Link>

                {/* Category + Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-medium">
                        {article.category}
                    </span>
                    {article.tags.slice(1).map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--card-border)] text-muted-foreground text-xs"
                        >
                            <TagIcon className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                    {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-10 pb-10 border-b border-[var(--card-border)]">
                    <span className="font-medium text-foreground">{article.author}</span>
                    <span className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4" />
                        {article.readTime} min de leitura
                    </span>
                </div>

                {/* Cover Image */}
                <div className="rounded-2xl overflow-hidden mb-12 border border-[var(--card-border)]">
                    <img
                        src={article.image}
                        alt={article.alt}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                </div>

                {/* Excerpt */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 pl-4 border-l-2 border-primary/50 italic">
                    {article.excerpt}
                </p>

                {/* Content */}
                <div className="prose-custom">
                    {renderContent(article.content)}
                </div>
            </article>

            {/* Related Articles */}
            {related.length > 0 && (
                <section className="px-6 md:px-10 max-w-4xl mx-auto pb-24">
                    <div className="border-t border-[var(--card-border)] pt-12">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
                            Artigos relacionados
                        </h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {related.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="group flex gap-4 p-4 rounded-xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] bg-[var(--card)] transition-all duration-300"
                                >
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={rel.image}
                                            alt={rel.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs text-primary font-medium">{rel.category}</span>
                                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                                            {rel.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground mt-1 block">{rel.readTime} min de leitura</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
