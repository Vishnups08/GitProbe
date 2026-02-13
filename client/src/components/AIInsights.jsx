import { motion } from 'framer-motion';

export default function AIInsights({ insights }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-border rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-8 bg-github-purple/10 rounded-lg flex items-center justify-center text-sm">🤖</span>
                <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                        AI-Powered Insights
                        <span className="text-[10px] bg-github-purple/15 text-github-purple px-2 py-0.5 rounded-full font-medium">ChatGPT</span>
                    </h3>
                    <p className="text-github-muted text-xs">What a recruiter would actually think about your profile</p>
                </div>
            </div>

            <div className="space-y-4">
                {insights.recruiterPerspective && (
                    <div className="bg-github-dark/40 rounded-xl p-4 border border-github-accent/10">
                        <h4 className="text-xs font-bold text-github-accent mb-2 flex items-center gap-1.5">👔 Recruiter's First Impression</h4>
                        <p className="text-sm text-github-text leading-relaxed">{insights.recruiterPerspective}</p>
                    </div>
                )}

                {insights.topPriority && (
                    <div className="bg-github-dark/40 rounded-xl p-4 border border-github-green/10">
                        <h4 className="text-xs font-bold text-github-green mb-2 flex items-center gap-1.5">🎯 Top Priority</h4>
                        <p className="text-sm text-github-text leading-relaxed">{insights.topPriority}</p>
                    </div>
                )}

                {insights.projectStorytelling && (
                    <div className="bg-github-dark/40 rounded-xl p-4 border border-github-yellow/10">
                        <h4 className="text-xs font-bold text-github-yellow mb-2 flex items-center gap-1.5">📖 Project Storytelling</h4>
                        <p className="text-sm text-github-text leading-relaxed">{insights.projectStorytelling}</p>
                    </div>
                )}

                {insights.readmeAdvice && (
                    <div className="bg-github-dark/40 rounded-xl p-4 border border-github-purple/10">
                        <h4 className="text-xs font-bold text-github-purple mb-2 flex items-center gap-1.5">📝 README Improvement</h4>
                        <p className="text-sm text-github-text leading-relaxed">{insights.readmeAdvice}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {insights.quickWins && insights.quickWins.length > 0 && (
                        <div className="bg-github-dark/40 rounded-xl p-4 border border-github-accent/10">
                            <h4 className="text-xs font-bold text-github-accent mb-2">⚡ Quick Wins (Under 30 min)</h4>
                            <ul className="space-y-1.5">
                                {insights.quickWins.map((win, i) => (
                                    <li key={i} className="text-xs text-github-text flex items-start gap-2">
                                        <span className="text-github-accent mt-0.5">→</span>
                                        {win}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {insights.hiddenStrengths && insights.hiddenStrengths.length > 0 && (
                        <div className="bg-github-dark/40 rounded-xl p-4 border border-github-green/10">
                            <h4 className="text-xs font-bold text-github-green mb-2">💎 Hidden Strengths</h4>
                            <ul className="space-y-1.5">
                                {insights.hiddenStrengths.map((s, i) => (
                                    <li key={i} className="text-xs text-github-text flex items-start gap-2">
                                        <span className="text-github-green mt-0.5">✦</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
