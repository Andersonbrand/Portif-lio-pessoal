'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

interface Option {
    value: string;
    hint: string;
    accent: string;
    icon: React.ReactNode;
}

const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
};

const options: Option[] = [
    {
        value: 'Website',
        hint: 'Site institucional completo',
        accent: '#06B6D4',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
            </svg>
        )
    },
    {
        value: 'Landing page',
        hint: 'Página focada em conversão',
        accent: '#A78BFA',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
        )
    },
    {
        value: 'Sistema web',
        hint: 'Painéis, dashboards e fluxos',
        accent: '#22C55E',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        )
    },
    {
        value: 'E-commerce / catálogo',
        hint: 'Loja ou catálogo com pedido',
        accent: '#F59E0B',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        )
    },
    {
        value: 'Melhoria de site existente',
        hint: 'Layout, performance e responsivo',
        accent: '#38BDF8',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        )
    },
    {
        value: 'Outro',
        hint: 'Conte sua ideia na mensagem',
        accent: '#F472B6',
        icon: (
            <svg viewBox="0 0 24 24" {...stroke}>
                <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
            </svg>
        )
    }
];

interface Props {
    id?: string;
    value: string;
    onChange: (value: string) => void;
}

export default function ProjectTypeSelect({ id = 'projectType', value, onChange }: Props) {
    const uid = useId();
    const listId = `${uid}-list`;
    const wrapRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
    const [active, setActive] = useState(selectedIndex);
    const selected = options[selectedIndex];

    const close = useCallback(() => setOpen(false), []);

    const openList = () => {
        setActive(selectedIndex);
        setOpen(true);
    };

    const choose = (index: number) => {
        onChange(options[index].value);
        setOpen(false);
        buttonRef.current?.focus();
    };

    /* fecha ao clicar fora */
    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent | TouchEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('touchstart', onDown);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('touchstart', onDown);
        };
    }, [open, close]);

    /* mantém a opção ativa visível ao navegar pelo teclado */
    useEffect(() => {
        if (!open) return;
        const el = listRef.current?.children[active] as HTMLElement | undefined;
        el?.scrollIntoView({ block: 'nearest' });
    }, [active, open]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!open) {
            if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
                e.preventDefault();
                openList();
            }
            return;
        }
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActive((i) => (i + 1) % options.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActive((i) => (i - 1 + options.length) % options.length);
                break;
            case 'Home':
                e.preventDefault();
                setActive(0);
                break;
            case 'End':
                e.preventDefault();
                setActive(options.length - 1);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                choose(active);
                break;
            case 'Escape':
                e.preventDefault();
                close();
                break;
            case 'Tab':
                close();
                break;
            default: {
                /* busca pela primeira letra */
                if (e.key.length === 1) {
                    const k = e.key.toLowerCase();
                    const next = options.findIndex((o, i) => i > active && o.value.toLowerCase().startsWith(k));
                    const idx = next >= 0 ? next : options.findIndex((o) => o.value.toLowerCase().startsWith(k));
                    if (idx >= 0) setActive(idx);
                }
            }
        }
    };

    return (
        <div ref={wrapRef} className="relative">
            <button
                ref={buttonRef}
                id={id}
                type="button"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
                onClick={() => (open ? close() : openList())}
                onKeyDown={onKeyDown}
                className={`group w-full flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-xl text-left text-foreground focus:outline-none transition-all duration-200 ${open ? 'bg-[#0D1D35] shadow-[0_0_28px_-8px_rgba(6,182,212,0.6)]' : 'bg-white/[0.06] hover:bg-white/10 focus-visible:shadow-[0_0_24px_-8px_rgba(6,182,212,0.6)]'}`}>
                <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                    style={{ color: selected.accent, background: `${selected.accent}1F` }}>
                    <span className="block h-[18px] w-[18px]">{selected.icon}</span>
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium leading-tight">{selected.value}</span>
                    <span className="truncate text-[11px] leading-tight text-muted-foreground">{selected.hint}</span>
                </span>
                <svg
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}
                    {...stroke}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label="Tipo de projeto"
                aria-hidden={!open}
                tabIndex={-1}
                className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-[340px] overflow-y-auto rounded-2xl bg-[#08121F]/95 p-1.5 backdrop-blur-xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75),0_0_40px_-12px_rgba(6,182,212,0.35)] origin-top transition-all duration-200 ${open ? 'opacity-100 translate-y-0 scale-100' : 'pointer-events-none opacity-0 -translate-y-1 scale-[0.98]'}`}>
                {options.map((o, i) => {
                    const isSel = i === selectedIndex;
                    const isActive = i === active;
                    return (
                        <li
                            key={o.value}
                            id={`${uid}-opt-${i}`}
                            role="option"
                            aria-selected={isSel}
                            onMouseEnter={() => setActive(i)}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => choose(i)}
                            className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-150 ${isActive ? 'bg-primary/10' : ''}`}>
                            <span
                                className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                            <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                style={{ color: o.accent, background: `${o.accent}1F` }}>
                                <span className="block h-[18px] w-[18px]">{o.icon}</span>
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className={`truncate text-sm leading-tight ${isSel ? 'font-semibold text-foreground' : 'font-medium text-foreground/90'}`}>{o.value}</span>
                                <span className="truncate text-[11px] leading-tight text-muted-foreground">{o.hint}</span>
                            </span>
                            {isSel && (
                                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-primary" {...stroke} strokeWidth={2.4}>
                                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                                </svg>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
