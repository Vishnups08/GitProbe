import { motion } from 'framer-motion';

const STEPS = [
    { text: 'Connecting to GitHub API...', icon: '🔗' },
    { text: 'Fetching profile data...', icon: '👤' },
    { text: 'Analyzing 30+ repositories...', icon: '📦' },
    { text: 'Scanning commit history...', icon: '📊' },
    { text: 'Generating AI insights...', icon: '🧠' },
    { text: 'Calculating final score...', icon: '✨' }
];

export default function LoadingState({ step, stepIndex }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
            {/* Main Scanner Animation */}
            <div className="relative mb-12">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-t-2 border-r-2 border-github-accent/50 border-b-2 border-l-2 border-transparent"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 m-auto w-24 h-24 rounded-full border-t-2 border-l-2 border-github-purple/50 border-b-2 border-r-2 border-transparent"
                />
                <div className="absolute inset-0 m-auto w-16 h-16 bg-github-card rounded-full flex items-center justify-center border border-github-border/30 shadow-lg shadow-github-accent/20">
                    <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </div>
            </div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-2 tracking-tight"
            >
                Analyzing Profile...
            </motion.h2>

            <p className="text-github-muted text-sm mb-10 h-6">
                This usually takes about 10-15 seconds
            </p>

            {/* Steps */}
            <div className="w-full max-w-sm space-y-3">
                {STEPS.map((s, i) => {
                    const isComplete = i < stepIndex;
                    const isCurrent = i === stepIndex;

                    return (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="relative flex items-center justify-center w-6 h-6">
                                {isComplete ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-github-green">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </motion.div>
                                ) : isCurrent ? (
                                    <div className="w-4 h-4 rounded-full border-2 border-github-accent border-t-transparent animate-spin" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-github-border/30" />
                                )}
                            </div>

                            <span className={`text-sm transition-colors duration-300 ${isComplete ? 'text-github-text/60 line-through decoration-github-border/50' :
                                    isCurrent ? 'text-white font-medium scale-105 origin-left' :
                                        'text-github-muted/40'
                                }`}>
                                {s.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
