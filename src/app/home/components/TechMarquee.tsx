import React from 'react';

const items = ['Front-End', 'Performance', 'UX', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Supabase', 'Node.js', 'Git & GitHub', 'Docker', 'Vercel'];

export default function TechMarquee() {
    const group = (key: string, hidden = false) => (
        <div className="marquee-group" aria-hidden={hidden} key={key}>
            {items.map((t) => (
                <span key={t} className="inline-flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                    {t}
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                </span>
            ))}
        </div>
    );
    return (
        <div className="border-b border-white/5 bg-[#030B18] py-5" aria-label="Tecnologias que utilizo">
            <div className="marquee">
                {group('a')}
                {group('b', true)}
            </div>
        </div>
    );
}
