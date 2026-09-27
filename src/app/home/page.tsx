import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
    return (
        <main className="bg-background text-foreground overflow-x-hidden">
            <Header />
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <ContactSection />
            <Footer />
        </main>
    );
}