import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InputForm({ onSubmit, error }) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url.trim());
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-2xl mx-auto px-4 pb-8"
        >
            <form onSubmit={handleSubmit}>
                <div className="gradient-border p-1 rounded-2xl">
                    <div className="flex flex-col sm:flex-row gap-2 bg-github-card/80 backdrop-blur-md rounded-xl p-2">
                        <div className="flex-1 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-github-muted">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="github-url-input"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://github.com/username"
                                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-github-muted/60 focus:outline-none text-base sm:text-lg input-glow rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            id="analyze-button"
                            className="px-8 py-4 bg-gradient-to-r from-github-accent to-blue-500 hover:from-blue-500 hover:to-github-accent text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/25 active:scale-[0.98] text-base whitespace-nowrap"
                        >
                            Analyze Profile →
                        </button>
                    </div>
                </div>
            </form>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-github-red/10 border border-github-red/20 rounded-xl text-github-red text-sm backdrop-blur-sm"
                >
                    {error}
                </motion.div>
            )}

            <p className="text-center text-github-muted/60 text-xs mt-5 flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Works with any public GitHub profile • No login required
            </p>

            {/* Trust indicators */}
            <div className="text-center mt-10 space-y-3">
                <div className="flex justify-center -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-github-border to-github-card border-2 border-black flex items-center justify-center text-[10px] text-github-muted">
                            {['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🔧'][i - 1]}
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-github-accent/20 border-2 border-black flex items-center justify-center text-[10px] text-github-accent font-bold">
                        +5k
                    </div>
                </div>
                <p className="text-github-muted/60 text-xs">
                    Trusted by developers from <span className="text-white font-medium">Google</span>, <span className="text-white font-medium">Meta</span>, and <span className="text-white font-medium">Vercel</span>.
                </p>
            </div>

            {/* Feature Cards */}
            <div id="how-it-works" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
                {[
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        ),
                        title: 'Portfolio Score',
                        desc: 'Get a quantitative score (0-100) based on repository quality, contribution consistency, and documentation standards.',
                        color: 'text-github-green',
                        bgColor: 'bg-github-green/10',
                    },
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                        ),
                        title: 'AI Insights',
                        desc: 'Our LLM analyzes your READMEs and code structure to find what recruiters actually care about, not just lines of code.',
                        color: 'text-github-purple',
                        bgColor: 'bg-github-purple/10',
                    },
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                            </svg>
                        ),
                        title: 'Action Plan',
                        desc: 'Receive a prioritized checklist of fixes. Add descriptions, pin repositories, and fix broken demos instantly.',
                        color: 'text-github-accent',
                        bgColor: 'bg-github-accent/10',
                    },
                ].map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                        className="feature-card p-6 cursor-default"
                    >
                        <div className={`w-10 h-10 ${card.bgColor} rounded-xl flex items-center justify-center ${card.color} mb-4`}>
                            {card.icon}
                        </div>
                        <h3 className="text-white font-bold text-base mb-2">{card.title}</h3>
                        <p className="text-github-muted text-sm leading-relaxed">{card.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
