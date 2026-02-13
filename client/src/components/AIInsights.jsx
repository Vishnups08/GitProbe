import { motion } from 'framer-motion';

export default function AIInsights({ insights }) {
    if (!insights) return null;

    // Fallback for array props if they happen to be missing
    const quickWins = insights.quickWins || [];
    const hiddenStrengths = insights.hiddenStrengths || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-gradient-to-br from-[#161b22] to-[#58a6ff]/5 border border-[#58a6ff]/20 rounded-xl p-7 animate-fade-in relative overflow-hidden group">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#58a6ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                <span className="text-2xl">🤖</span>
                <h2 className="text-white text-lg font-semibold tracking-tight">AI-Powered Insights</h2>
                <div className="bg-[#58a6ff]/15 text-[#58a6ff] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#58a6ff]/20 uppercase tracking-wide">
                    Powered by Gemini
                </div>
            </div>

            <motion.div
                className="space-y-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Recruiter's Perspective */}
                {insights.recruiterPerspective && (
                    <motion.div variants={itemVariants} className="bg-[#0d1117]/50 border border-[#30363d] rounded-lg p-4 hover:border-[#58a6ff]/40 transition-colors duration-300">
                        <h3 className="text-[#58a6ff] text-sm font-semibold flex items-center gap-2 mb-2">
                            👔 Recruiter's First Impression
                        </h3>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed">
                            {insights.recruiterPerspective}
                        </p>
                    </motion.div>
                )}

                {/* 2. Top Priority */}
                {insights.topPriority && (
                    <motion.div variants={itemVariants} className="bg-[#f85149]/5 border border-[#f85149]/20 rounded-lg p-4 hover:border-[#f85149]/40 transition-colors duration-300">
                        <h3 className="text-[#f85149] text-sm font-semibold flex items-center gap-2 mb-2">
                            🎯 #1 Priority
                        </h3>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed">
                            {insights.topPriority}
                        </p>
                    </motion.div>
                )}

                {/* 3. Project Storytelling */}
                {insights.projectStorytelling && (
                    <motion.div variants={itemVariants} className="bg-[#0d1117]/50 border border-[#30363d] rounded-lg p-4 hover:border-[#bc8cff]/40 transition-colors duration-300">
                        <h3 className="text-[#bc8cff] text-sm font-semibold flex items-center gap-2 mb-2">
                            📖 Project Storytelling
                        </h3>
                        <p className="text-[#c9d1d9] text-sm leading-relaxed">
                            {insights.projectStorytelling}
                        </p>
                    </motion.div>
                )}

                {/* 4. Quick Wins */}
                {quickWins.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-[#0d1117]/50 border border-[#30363d] rounded-lg p-4 hover:border-[#d29922]/40 transition-colors duration-300">
                        <h3 className="text-[#d29922] text-sm font-semibold flex items-center gap-2 mb-3">
                            ⚡ Quick Wins (Under 30 mins each)
                        </h3>
                        <div className="space-y-2">
                            {quickWins.map((win, idx) => (
                                <div key={idx} className="flex gap-2.5 items-start">
                                    <span className="text-[#d29922] mt-0.5 font-bold">→</span>
                                    <p className="text-[#c9d1d9] text-sm leading-relaxed">{win}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 5. Hidden Strengths */}
                {hiddenStrengths.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-[#3fb950]/5 border border-[#3fb950]/20 rounded-lg p-4 hover:border-[#3fb950]/40 transition-colors duration-300">
                        <h3 className="text-[#3fb950] text-sm font-semibold flex items-center gap-2 mb-3">
                            💎 Hidden Strengths You Might Not Realize
                        </h3>
                        <div className="space-y-2">
                            {hiddenStrengths.map((strength, idx) => (
                                <div key={idx} className="flex gap-2.5 items-start">
                                    <span className="text-[#3fb950] mt-0.5 text-[10px]">✦</span>
                                    <p className="text-[#c9d1d9] text-sm leading-relaxed">{strength}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
