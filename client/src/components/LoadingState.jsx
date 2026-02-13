import { motion } from 'framer-motion';

const STEPS = [
    'Fetching GitHub profile...',
    'Loading repositories...',
    'Analyzing code structure...',
    'Evaluating commit patterns...',
    'Generating AI insights...',
    'Calculating portfolio score...'
];

export default function LoadingState({ step, stepIndex }) {
    return (
        <div className="flex flex-col items-center justify-center py-32 px-4 min-h-[70vh]">
            {/* Animated GitHub logo with spinning ring */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="relative mb-10"
            >
                <div className="w-24 h-24 border-[3px] border-github-border/30 rounded-full animate-spin border-t-github-accent" style={{ animationDuration: '1.5s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-github-card/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-github-border/30">
                        <svg className="w-8 h-8 text-github-accent" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </div>
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white mb-2"
            >
                Analyzing Profile
            </motion.h2>

            <motion.p
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-github-green text-sm mb-8"
            >
                {step || 'Initializing...'}
            </motion.p>

            {/* Progress dots */}
            <div className="flex gap-2 mb-10">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-github-accent rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>

            {/* Step-by-step progress */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-2xl p-6 w-full max-w-md"
            >
                <div className="space-y-3">
                    {STEPS.map((s, i) => {
                        const isComplete = i < stepIndex;
                        const isCurrent = i === stepIndex;
                        const isPending = i > stepIndex;

                        return (
                            <div key={i} className="flex items-center gap-3">
                                {isComplete ? (
                                    <div className="w-5 h-5 rounded-full bg-github-green/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-github-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : isCurrent ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-github-accent flex items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-3.5 border-l-2 border-github-accent animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-full border border-github-border/50 flex-shrink-0" />
                                )}
                                <span className={`text-sm transition-all duration-300 ${isComplete ? 'text-github-green' :
                                        isCurrent ? 'text-github-accent font-medium' :
                                            'text-github-muted/40'
                                    }`}>
                                    {s.replace('...', '')}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            <p className="text-github-muted/40 text-xs mt-6 flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Securely processing via GitProbe
            </p>
        </div>
    );
}
