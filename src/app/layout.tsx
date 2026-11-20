import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: 'Anderson Brandão — Desenvolvedor Front-End',
    description: 'Portfólio de Anderson Brandão, desenvolvedor Front-End especializado em HTML, CSS e JavaScript. Landingpages, sistemas web e sites responsivos.',
    openGraph: {
        title: 'Anderson Brandão — Desenvolvedor Front-End',
        description: 'Landingpages, sistemas web e sites responsivos com HTML, CSS, JavaScript, React e Supabase.',
        locale: 'pt_BR',
        type: 'website',
        siteName: 'Anderson.dev',
    },
    authors: [{ name: 'Anderson Brandão' }],
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' }
        ],
        apple: [
            { url: '/apple-touch-icon.png' }
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}