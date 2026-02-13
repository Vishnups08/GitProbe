import { motion } from 'framer-motion';

export default function ScoreDimension({ dimension }) {
    const getAttributes = (score) => {
        if (score >= 80) return { bg: 'bg-github-green', text: 'text-github-green', border: 'border-github-green/30', glow: 'shadow-[0_0_15px_rgba(63,185,80,0.2)]' };
        if (score >= 60) return { bg: 'bg-green-400', text: 'text-green-400', border: 'border-green-400/30', glow: 'shadow-[0_0_15px_rgba(74,222,128,0.2)]' };
        if (score >= 40) return { bg: 'bg-github-yellow', text: 'text-github-yellow', border: 'border-github-yellow/30', glow: 'shadow-[0_0_15px_rgba(210,153,34,0.2)]' };
        return { bg: 'bg-github-red', text: 'text-github-red', border: 'border-github-red/30', glow: 'shadow-[0_0_15px_rgba(248,81,73,0.2)]' };
    };

    const style = getAttributes(dimension.score);

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden rounded-xl p-5 border ${style.border} bg-github-dark/40 backdrop-blur-sm transition-all duration-300 group`}
        >
            <div className={`absolute top-0 left-0 w-1 h-full ${style.bg}`} />

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${style.bg}/10 text-xl`}>
                        {dimension.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-github-accent transition-colors">
                            {dimension.label}
                        </h3>
                        <p className={`text-[10px] font-bold tracking-wider uppercase ${style.text} opacity-80`}>
                            {dimension.score >= 80 ? 'Excellent' : dimension.score >= 60 ? 'Good' : dimension.score >= 40 ? 'Average' : 'Critical'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`text-2xl font-black font-mono ${style.text} block leading-none`}>
                        {dimension.score}
                    </span>
                    <span className="text-[10px] text-github-muted uppercase">/ 100</span>
                </div>
            </div>

            {/* Thick Progress Bar */}
            <div className="w-full bg-github-dark/50 rounded-full h-3 mb-4 overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dimension.score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${style.bg} ${style.glow} relative`}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                </motion.div>
            </div>

            {/* Details List */}
            <ul className="space-y-2">
                {dimension.details?.slice(0, 3).map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-github-muted group-hover:text-github-text transition-colors">
                        <span className={`mt-1 w-1 h-1 rounded-full ${style.bg}`} />
                        <span className="leading-snug">{detail}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
