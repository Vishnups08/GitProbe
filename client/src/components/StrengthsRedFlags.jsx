import { motion } from 'framer-motion';

export default function StrengthsRedFlags({ strengths, redFlags }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl p-6 border-l-2 border-l-github-green/50"
            >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-github-green/10 rounded-lg flex items-center justify-center text-github-green">
                        💎
                    </span>
                    Hidden Strengths
                </h3>
                {strengths.length > 0 ? (
                    <ul className="space-y-3">
                        {strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm group">
                                <span className="text-github-green mt-0.5 flex-shrink-0">✦</span>
                                <span className="text-github-text group-hover:text-white transition-colors">{s.message}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-github-muted text-sm italic">Keep building — strengths will emerge as your profile grows!</p>
                )}
            </motion.div>

            {/* Red Flags */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl p-6 border-l-2 border-l-github-red/50"
            >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-github-red/10 rounded-lg flex items-center justify-center text-github-red">
                        🚩
                    </span>
                    Red Flags
                </h3>
                {redFlags.length > 0 ? (
                    <ul className="space-y-3">
                        {redFlags.map((r, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm group">
                                <span className={`mt-0.5 flex-shrink-0 ${r.severity === 'high' ? 'text-github-red' : 'text-github-yellow'}`}>
                                    {r.severity === 'high' ? '⚠' : '△'}
                                </span>
                                <span className="text-github-text group-hover:text-white transition-colors">{r.message}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-github-green text-sm">No major red flags detected — great job! 🎉</p>
                )}
            </motion.div>
        </div>
    );
}
