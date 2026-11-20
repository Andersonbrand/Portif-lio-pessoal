import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import TechMarquee from './components/TechMarquee';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import PageLoader from '@/components/PageLoader';
import ScrollProgress from '@/components/ScrollProgress';

export default function HomePage() {
    return (
        <main className="bg-background text-foreground overflow-x-hidden">
            <PageLoader />
            <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-[#020817]">Ir para o conteúdo</a>
            <ScrollProgress />
            <Header />
            <HeroSection />
            <TechMarquee />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
        </main>
    );
}