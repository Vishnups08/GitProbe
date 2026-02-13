import { motion } from 'framer-motion';

export default function Recommendations({ recommendations }) {
    const getStyle = (priority) => {
        switch (priority) {
            case 'high': return {
                bg: 'bg-github-red/5',
                border: 'border-l-4 border-l-github-red border-y border-r border-github-red/20',
                badge: 'bg-github-red/20 text-github-red',
                text: '🔴 High Priority',
                icon: '🔥'
            };
            case 'medium': return {
                bg: 'bg-github-yellow/5',
                border: 'border-l-4 border-l-github-yellow border-y border-r border-github-yellow/20',
                badge: 'bg-github-yellow/20 text-github-yellow',
                text: '🟡 Medium Priority',
                icon: '⚠️'
            };
            case 'low': return {
                bg: 'bg-github-accent/5',
                border: 'border-l-4 border-l-github-accent border-y border-r border-github-accent/20',
                badge: 'bg-github-accent/20 text-github-accent',
                text: '🔵 Quick Win',
                icon: '⚡'
            };
            default: return {
                bg: 'bg-github-dark/40',
                border: 'border-l-4 border-l-github-muted border-y border-r border-github-border/30',
                badge: 'bg-github-muted/20 text-github-muted',
                text: 'Info',
                icon: 'ℹ️'
            };
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-8 bg-github-green/10 rounded-lg flex items-center justify-center text-sm">🎯</span>
                <div>
                    <h3 className="text-base font-bold text-white">Actionable Recommendations</h3>
                    <p className="text-github-muted text-xs">Prioritized steps to make your profile recruiter-ready</p>
                </div>
            </div>
            <div className="space-y-4">
                {recommendations.map((rec, i) => {
                    const style = getStyle(rec.priority);
                    return (
                        <div key={i} className={`rounded-r-xl p-4 ${style.bg} ${style.border} hover:translate-x-1 transition-all group`}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <h4 className="text-sm font-bold text-white group-hover:text-github-accent transition-colors flex items-center gap-2">
                                    <span>{style.icon}</span> {rec.title}
                                </h4>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${style.badge} whitespace-nowrap uppercase tracking-wider`}>
                                    {style.text}
                                </span>
                            </div>
                            <p className="text-github-muted text-xs leading-relaxed mb-3 pl-6">{rec.description}</p>

                            {rec.example && (
                                <div className="ml-6 mb-3">
                                    <p className="text-[10px] text-github-muted/70 uppercase tracking-widest font-bold mb-1">How to fix:</p>
                                    <code className="text-github-accent/90 text-xs font-mono bg-black/30 rounded-lg p-2.5 block border border-github-accent/10">
                                        {rec.example}
                                    </code>
                                </div>
                            )}

                            <div className="flex items-center gap-4 text-[10px] text-github-muted/60 pl-6 border-t border-github-border/10 pt-2 mt-2">
                                {rec.timeEstimate && <span className="flex items-center gap-1">⏱️ {rec.timeEstimate}</span>}
                                {rec.impact && <span className="flex items-center gap-1">💥 {rec.impact} Impact</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
