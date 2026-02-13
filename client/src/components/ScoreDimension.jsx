import { motion } from 'framer-motion';

export default function ScoreDimension({ dimension }) {
    const getColor = (score) => {
        if (score >= 70) return { bar: 'bg-github-green', text: 'text-github-green' };
        if (score >= 50) return { bar: 'bg-green-400', text: 'text-green-400' };
        if (score >= 30) return { bar: 'bg-github-yellow', text: 'text-github-yellow' };
        return { bar: 'bg-github-red', text: 'text-github-red' };
    };

    const colors = getColor(dimension.score);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card glass-card-hover rounded-xl p-5 transition-all duration-300 cursor-default"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="text-xl">{dimension.icon}</span>
                    <h3 className="text-sm font-bold text-white">{dimension.label}</h3>
                </div>
                <span className={`text-xl font-black font-mono ${colors.text}`}>
                    {dimension.score}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-github-border/30 rounded-full h-1.5 mb-4">
                <div
                    className={`h-1.5 rounded-full progress-bar-fill ${colors.bar}`}
                    style={{ width: `${dimension.score}%` }}
                />
            </div>

            {/* Details */}
            <div className="space-y-1.5">
                {dimension.details?.slice(0, 2).map((detail, i) => (
                    <p key={i} className="text-xs text-github-muted leading-relaxed">
                        {detail}
                    </p>
                ))}
            </div>
        </motion.div>
    );
}
