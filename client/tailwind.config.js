/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                github: {
                    dark: '#0d1117',
                    darker: '#010409',
                    card: '#161b22',
                    border: '#30363d',
                    text: '#c9d1d9',
                    muted: '#8b949e',
                    accent: '#58a6ff',
                    green: '#3fb950',
                    yellow: '#d29922',
                    red: '#f85149',
                    orange: '#d18616',
                    purple: '#bc8cff'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace']
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out',
                'text-reveal': 'textReveal 0.8s ease-out forwards',
                'border-glow': 'borderGlow 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                textReveal: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                borderGlow: {
                    '0%, 100%': { borderColor: 'rgba(88, 166, 255, 0.2)' },
                    '50%': { borderColor: 'rgba(88, 166, 255, 0.6)' },
                },
            },
        },
    },
    plugins: [],
};
