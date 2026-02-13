import { motion } from 'framer-motion';

export default function Recommendations({ recommendations = [] }) {
    // Sort by Priority: high -> medium -> low
    const sortedRecommendations = [...recommendations].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
    });

    const highCount = recommendations.filter(r => r.priority === 'high').length;
    const medCount = recommendations.filter(r => r.priority === 'medium').length;
    const lowCount = recommendations.filter(r => r.priority === 'low').length;

    // Helper for bold parsing (**text**)
    const parseText = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high':
                return {
                    border: 'border-[#f85149]',
                    bg: 'bg-[#f85149]/5',
                    badge: 'bg-[#f85149]',
                    text: 'text-[#f85149]',
                    label: 'Critial / High Priority',
                    hover: 'group-hover:bg-[#f85149]/10'
                };
            case 'medium':
                return {
                    border: 'border-[#d29922]',
                    bg: 'bg-[#d29922]/5',
                    badge: 'bg-[#d29922]',
                    text: 'text-[#d29922]',
                    label: 'Important / Medium',
                    hover: 'group-hover:bg-[#d29922]/10'
                };
            case 'low':
                return {
                    border: 'border-[#58a6ff]',
                    bg: 'bg-[#58a6ff]/5',
                    badge: 'bg-[#58a6ff]',
                    text: 'text-[#58a6ff]',
                    label: 'Quick Win',
                    hover: 'group-hover:bg-[#58a6ff]/10'
                };
            default:
                return {
                    border: 'border-[#8b949e]',
                    bg: 'bg-[#8b949e]/5',
                    badge: 'bg-[#8b949e]',
                    text: 'text-[#8b949e]',
                    label: 'General',
                    hover: 'group-hover:bg-[#8b949e]/10'
                };
        }
    };

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 animate-fade-in shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        🎯 Actionable Recommendations
                    </h2>
                    <p className="text-[#8b949e] text-sm mt-1">
                        Prioritized steps to make your GitHub profile recruiter-ready
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium bg-[#0d1117] px-4 py-2 rounded-lg border border-[#30363d]">
                    <span className="text-white">📋 {recommendations.length} total</span>
                    <span className="w-px h-3 bg-[#30363d]"></span>
                    <span className="text-[#f85149]">🔴 {highCount} critical</span>
                    <span className="text-[#d29922]">🟡 {medCount} important</span>
                    <span className="text-[#58a6ff]">🔵 {lowCount} quick wins</span>
                </div>
            </div>

            <div className="space-y-4">
                {sortedRecommendations.map((rec, index) => {
                    const styles = getPriorityStyles(rec.priority);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 4 }}
                            className={`relative rounded-r-lg border-l-4 ${styles.border} ${styles.bg} border-y border-r border-white/5 p-5 transition-all duration-300 group`}
                        >
                            {/* Top Row: Badge & Category */}
                            <div className="flex justify-between items-start mb-3">
                                <span className={`${styles.badge} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                                    {rec.priority === 'high' ? 'High Priority' : rec.priority === 'medium' ? 'Medium' : 'Quick Win'}
                                </span>
                                <span className="text-[#8b949e] text-[10px] uppercase tracking-widest font-mono font-medium opacity-70">
                                    {rec.category || 'General'}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-semibold text-[15px] group-hover:text-white transition-colors">
                                {rec.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[#c9d1d9] text-sm mt-2 leading-relaxed opacity-90">
                                {parseText(rec.description)}
                            </p>

                            {/* Example Code Block */}
                            {rec.example && (
                                <div className="mt-3 bg-[#0d1117]/80 border border-[#30363d] rounded-md p-3 font-mono text-xs text-[#c9d1d9] overflow-x-auto whitespace-pre-wrap">
                                    {rec.example}
                                </div>
                            )}

                            {/* Footer: Time & Impact */}
                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-[#8b949e] font-medium">
                                <span className="flex items-center gap-1.5" title="Estimated Time">
                                    ⏱️ {rec.timeEstimate}
                                </span>
                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${rec.impact === 'high' ? 'text-[#3fb950] bg-[#3fb950]/10' :
                                        rec.impact === 'medium' ? 'text-[#d29922] bg-[#d29922]/10' :
                                            'text-[#58a6ff] bg-[#58a6ff]/10'
                                    }`}>
                                    📈 {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
