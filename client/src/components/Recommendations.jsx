import { motion } from 'framer-motion';

export default function Recommendations({ recommendations }) {
    const getStyle = (priority) => {
        switch (priority) {
            case 'high': return { bg: 'bg-github-red/5', border: 'border-github-red/20', badge: 'bg-github-red/20 text-github-red', text: '🔴 High Priority' };
            case 'medium': return { bg: 'bg-github-yellow/5', border: 'border-github-yellow/20', badge: 'bg-github-yellow/20 text-github-yellow', text: '🟡 Medium' };
            case 'low': return { bg: 'bg-github-accent/5', border: 'border-github-accent/20', badge: 'bg-github-accent/20 text-github-accent', text: '🔵 Quick Win' };
            default: return { bg: '', border: 'border-github-border/30', badge: 'bg-github-muted/20 text-github-muted', text: 'Info' };
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
            <div className="space-y-3">
                {recommendations.map((rec, i) => {
                    const style = getStyle(rec.priority);
                    return (
                        <div key={i} className={`border ${style.border} rounded-xl p-4 ${style.bg} hover:translate-x-1 transition-all`}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${style.badge} whitespace-nowrap`}>{style.text}</span>
                            </div>
                            <p className="text-github-muted text-xs leading-relaxed mb-2">{rec.description}</p>
                            {rec.example && <p className="text-github-accent/70 text-xs font-mono bg-github-dark/30 rounded-lg p-2 mb-2">{rec.example}</p>}
                            <div className="flex items-center gap-4 text-[10px] text-github-muted/60">
                                {rec.timeEstimate && <span>⏱ {rec.timeEstimate}</span>}
                                {rec.impact && <span>💥 {rec.impact} impact</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
