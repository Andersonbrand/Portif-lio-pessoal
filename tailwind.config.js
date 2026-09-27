/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#020817',
                foreground: '#F8FAFC',
                primary: {
                    DEFAULT: '#06B6D4',
                    foreground: '#020817',
                },
                accent: {
                    DEFAULT: '#A78BFA',
                    foreground: '#020817',
                },
                muted: {
                    DEFAULT: '#1E293B',
                    foreground: '#94A3B8',
                },
                card: {
                    DEFAULT: 'rgba(255,255,255,0.03)',
                    border: 'rgba(255,255,255,0.08)',
                },
                slate: {
                    850: '#0F172A',
                    900: '#0F172A',
                    950: '#020817',
                },
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                display: ['Fraunces', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            fontSize: {
                '10xl': ['10rem', { lineHeight: '0.9' }],
                '9xl': ['8rem', { lineHeight: '0.9' }],
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 3s infinite linear',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};