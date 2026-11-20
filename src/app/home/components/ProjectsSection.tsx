'use client';

import React, { useEffect, useRef, useState } from 'react';
import ScreensCarouselModal, { CarouselSlide } from './ScreensCarousel';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    liveUrl?: string;
    domain?: string;
    image?: string;
    locked?: boolean;
    private?: boolean;
    colSpan?: string;
    screens?: CarouselSlide[];
}

const logiflowScreens: CarouselSlide[] = [
    {
        image: '/assets/images/carousel/lf-login.jpg',
        title: 'Acesso restrito',
        description: 'Autenticação por e-mail e senha, com área exclusiva para administradores e equipe operacional da transportadora.'
    },
    {
        image: '/assets/images/carousel/lf-dashboard.jpg',
        title: 'Dashboard em tempo real',
        description: 'Visão geral de romaneios ativos, utilização da frota e peso despachado no dia, consolidando os indicadores operacionais em um só lugar.',
        redacted: true
    },
    {
        image: '/assets/images/carousel/lf-veiculos.jpg',
        title: 'Gestão de frota',
        description: 'Cadastro completo de veículos e carretas, com capacidade de carga, consumo médio e status de cada unidade.',
        redacted: true
    },
    {
        image: '/assets/images/carousel/lf-financeiro.jpg',
        title: 'Módulo financeiro',
        description: 'Acompanhamento de volume carregado e frete total por origem, dando suporte à análise de custos de cada rota.',
        redacted: true
    },
    {
        image: '/assets/images/carousel/lf-mapa-vendas.jpg',
        title: 'Mapa de vendas',
        description: 'Visualização geográfica do volume de vendas por cidade atendida, facilitando a leitura da operação em escala regional.'
    }
];

const grupoHcScreens: CarouselSlide[] = [
    {
        image: '/assets/images/carousel/ec-home.jpg',
        title: 'Página inicial',
        description: 'Apresentação das marcas do grupo com chamadas diretas para catálogo de produtos e solicitação de orçamento.'
    },
    {
        image: '/assets/images/carousel/ec-categorias.jpg',
        title: 'Catálogo por empresa',
        description: 'Navegação por categorias, com o portfólio de produtos organizado por cada empresa do grupo.'
    },
    {
        image: '/assets/images/carousel/ec-produtos.jpg',
        title: 'Listagem de produtos',
        description: 'Busca e filtro de produtos com imagens, pensados para facilitar a navegação em um catálogo extenso.'
    },
    {
        image: '/assets/images/carousel/ec-orcamento.jpg',
        title: 'Formulário de orçamento',
        description: 'Solicitação de orçamento sem compromisso diretamente pelo site, com envio dos dados de contato do cliente.',
        redacted: true
    },
    {
        image: '/assets/images/carousel/ec-login.jpg',
        title: 'Área do cliente',
        description: 'Login para acompanhamento de pedidos e histórico de compras na loja.',
        redacted: true
    }
];

const projects: Project[] = [
    {
        id: 1,
        title: 'LogiFlow',
        description: 'Sistema de gestão logística para uma empresa de transportes: controle de romaneios, checklist de motoristas e módulo de carretas. Por conter dados internos do cliente, o acesso é restrito — demonstração disponível sob solicitação.',
        tags: ['React', 'Supabase'],
        image: '/assets/images/projects/logiflow.jpg',
        locked: true,
        colSpan: 'md:col-span-2',
        screens: logiflowScreens
    },
    {
        id: 2,
        title: 'Grupo HC — Comercial Araguaia',
        description: 'Site institucional e catálogo para um grupo de materiais de construção e aço em Guanambi-BA, com apresentação de produtos e formulário de orçamento.',
        tags: ['Next.js', 'E-commerce'],
        image: '/assets/images/projects/grupo-hc.jpg',
        private: true,
        screens: grupoHcScreens
    },
    {
        id: 3,
        title: 'Users Registration',
        description: 'Aplicação de cadastro de usuários construída em React, com formulário e validação de dados.',
        tags: ['React'],
        liveUrl: 'https://spiffy-empanada-9d19b9.netlify.app/',
        domain: 'spiffy-empanada-9d19b9.netlify.app',
        image: '/assets/images/projects/users-registration.jpg'
    },
    {
        id: 4,
        title: 'Easy Shopping',
        description: 'Landing page para um conceito de compras via mobile, com layout responsivo focado em conversão.',
        tags: ['HTML', 'CSS'],
        liveUrl: 'https://div-shopping.netlify.app/',
        domain: 'div-shopping.netlify.app',
        image: '/assets/images/projects/easy-shopping.jpg'
    },
    {
        id: 5,
        title: 'Conversor de Moedas',
        description: 'Conversor entre Real, Dólar, Euro e Bitcoin com atualização dinâmica de valores.',
        tags: ['JavaScript'],
        liveUrl: 'https://devconvertmoney.netlify.app/',
        domain: 'devconvertmoney.netlify.app',
        image: '/assets/images/projects/currency-converter.jpg'
    },
    {
        id: 6,
        title: 'Menu Digital',
        description: 'Cardápio digital com filtro por categorias (café da manhã, almoço, shakes) para consumo em restaurantes.',
        tags: ['JavaScript', 'CSS'],
        liveUrl: 'https://projeto-dev-menu.vercel.app/',
        domain: 'projeto-dev-menu.vercel.app',
        image: '/assets/images/projects/menu.jpg'
    },
    {
        id: 7,
        title: 'Previsão do Tempo',
        description: 'App de previsão do tempo consumindo API pública (OpenWeather): temperatura, condição e umidade.',
        tags: ['JavaScript', 'API'],
        liveUrl: 'https://strong-piroshki-28f09b.netlify.app/',
        domain: 'strong-piroshki-28f09b.netlify.app',
        image: '/assets/images/projects/weather.jpg'
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openProject, setOpenProject] = useState<Project | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-visible');
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 px-6 md:px-10 bg-background relative overflow-hidden isolate section-wash section-wash-alt">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="animate-on-scroll">
                        <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                            03 / Projetos
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            Trabalhos <span className="italic text-muted-foreground font-light">recentes</span>
                        </h2>
                    </div>
                    <a
                        href="https://github.com/Andersonbrand"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animate-on-scroll delay-200 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">

                        Ver todos no GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {projects.map((project, i) =>
                        <ProjectCard key={project.id} project={project} index={i} onOpenScreens={() => setOpenProject(project)} />
                    )}
                </div>
            </div>

            {openProject?.screens &&
                <ScreensCarouselModal
                    open
                    onClose={() => setOpenProject(null)}
                    title={openProject.title}
                    accent={openProject.locked ? 'accent' : 'primary'}
                    slides={openProject.screens} />
            }
        </section>);

}

function ProjectCard({ project, index, onOpenScreens }: { project: Project; index: number; onOpenScreens: () => void; }) {
    const delayClass = ['', 'delay-100', 'delay-200', 'delay-300'][index % 4] || '';

    return (
        <div
            className={`animate-on-scroll ${delayClass} ${project.colSpan || ''} group relative rounded-2xl overflow-hidden border ${project.locked ? 'border-accent/25' : 'border-white/8'} bg-card card-shimmer`}
            style={{ background: 'rgba(255,255,255,0.02)' }}>

            <BrowserChrome domain={project.domain} locked={project.locked || project.private} />
            <ThumbPreview image={project.image} locked={project.locked} title={project.title} />

            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    {project.locked &&
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border border-accent/30 text-accent bg-accent/10">
                            Case study
                        </span>
                    }
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) =>
                        <span key={tag} className="tech-tag px-2.5 py-1 rounded-md text-xs font-medium border border-white/8 text-muted-foreground bg-white/3">
                            {tag}
                        </span>
                    )}
                </div>

                {project.screens &&
                    <button
                        onClick={onOpenScreens}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-3 mr-4 ${project.locked ? 'text-accent hover:text-accent/80' : 'text-primary hover:text-primary/80'} transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4a3 3 0 014 0l4 4m-2-2l1-1a3 3 0 014 0l2 2M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
                        </svg>
                        Ver telas do sistema ({project.screens.length})
                    </button>
                }
                {(project.locked || project.private) ?
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <LockIcon /> Acesso sob demonstração
                    </p>
                    :
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Ver site
                    </a>
                }
            </div>

            <div className={`absolute inset-0 rounded-2xl border ${project.locked ? 'border-accent/0 group-hover:border-accent/25' : 'border-primary/0 group-hover:border-primary/20'} transition-colors duration-500 pointer-events-none`} />
        </div>);

}

function BrowserChrome({ domain, locked }: { domain?: string; locked?: boolean }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#050c1a] border-b border-white/6">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="ml-2 flex-1 px-3 py-1 rounded-md bg-white/4 text-[11px] text-muted-foreground truncate flex items-center gap-1.5">
                {locked && <LockIcon />}
                {locked ? 'acesso restrito' : domain}
            </div>
        </div>
    );
}

function LockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
}

function ThumbPreview({ image, locked, title }: { image?: string; locked?: boolean; title: string }) {
    if (!image) {
        return <div className="relative h-48 bg-[#0a1020]" />;
    }

    return (
        <div className="relative h-48 bg-[#0a1020] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]" />

            {/* Blue duotone blend so the screenshot sits inside the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/25 to-[#050c1a]/10" />
            <div className="absolute inset-0 bg-primary/15 mix-blend-color" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />

            {locked &&
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#020817]/85 backdrop-blur-sm border border-accent/30 text-accent text-[10px] font-medium">
                    <LockIcon /> Restrito
                </div>
            }
        </div>
    );
}
