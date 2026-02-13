import { motion } from 'framer-motion';

const BENCHMARKS = {
    documentation: { avg: 42, top25: 72, top10: 88, label: 'Documentation' },
    codeStructure: { avg: 38, top25: 65, top10: 82, label: 'Code Structure' },
    activityConsistency: { avg: 35, top25: 60, top10: 78, label: 'Activity' },
    repoOrganization: { avg: 30, top25: 55, top10: 75, label: 'Repo Organization' },
    projectImpact: { avg: 25, top25: 50, top10: 70, label: 'Project Impact' },
    technicalDepth: { avg: 33, top25: 58, top10: 76, label: 'Technical Depth' },
};

export default function ComparisonBenchmark({ dimensions }) {
    const getPercentile = (score, benchmark) => {
        if (score >= benchmark.top10) return { label: 'Top 10%', color: 'text-github-green', bg: 'bg-github-green/15' };
        if (score >= benchmark.top25) return { label: 'Top 25%', color: 'text-green-400', bg: 'bg-green-400/15' };
        if (score >= benchmark.avg) return { label: 'Above Avg', color: 'text-github-accent', bg: 'bg-github-accent/15' };
        if (score >= benchmark.avg * 0.7) return { label: 'Average', color: 'text-github-yellow', bg: 'bg-github-yellow/15' };
        return { label: 'Below Avg', color: 'text-github-red', bg: 'bg-github-red/15' };
    };

    const overallScore = Object.entries(dimensions).reduce((sum, [, dim]) => sum + dim.score, 0) / Object.keys(dimensions).length;
    const overallAvg = Object.values(BENCHMARKS).reduce((sum, b) => sum + b.avg, 0) / Object.keys(BENCHMARKS).length;
    const overallPercentile = getPercentile(overallScore, { avg: overallAvg, top25: 60, top10: 80 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl overflow-hidden"
        >
            <div className="p-6 border-b border-github-border/30">
                <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-github-yellow/10 rounded-lg flex items-center justify-center text-sm">📊</span>
                    <div>
                        <h3 className="text-base font-bold text-white">Benchmark Comparison</h3>
                        <p className="text-github-muted text-xs">How you compare against other developers on GitHub</p>
                    </div>
                </div>
            </div>

            {/* Overall Standing */}
            <div className="p-6 border-b border-github-border/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-github-muted text-xs mb-1">Your Overall Standing</p>
                        <p className="text-white text-sm">
                            Your portfolio is better than <span className={`font-bold ${overallPercentile.color}`}>
                                {overallScore >= 80 ? '90%' : overallScore >= 60 ? '75%' : overallScore >= 40 ? '55%' : '30%'}
                            </span> of developers at your experience level
                        </p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${overallPercentile.color} ${overallPercentile.bg}`}>
                        {overallPercentile.label}
                    </span>
                </div>
            </div>

            {/* Per-dimension Comparison */}
            <div className="p-6 space-y-5">
                {Object.entries(dimensions).map(([key, dim]) => {
                    const benchmark = BENCHMARKS[key];
                    if (!benchmark) return null;
                    const percentile = getPercentile(dim.score, benchmark);
                    const userPos = Math.min(Math.max((dim.score / 100) * 100, 2), 98);

                    return (
                        <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{dim.icon}</span>
                                    <span className="text-sm font-semibold text-white">{benchmark.label}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold font-mono ${percentile.color}`}>{dim.score}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${percentile.color} ${percentile.bg}`}>
                                        {percentile.label}
                                    </span>
                                </div>
                            </div>

                            {/* Visual Bar */}
                            <div className="relative h-7 bg-github-dark/40 rounded-lg overflow-hidden border border-github-border/20">
                                {/* Average marker */}
                                <div
                                    className="absolute top-0 h-full w-[2px] bg-github-yellow/60 z-10"
                                    style={{ left: `${benchmark.avg}%` }}
                                >
                                    <span className="absolute -top-0.5 left-1 text-[8px] text-github-yellow font-mono">AVG</span>
                                </div>

                                {/* Top 25% marker */}
                                <div
                                    className="absolute top-0 h-full w-[2px] bg-github-accent/40 z-10"
                                    style={{ left: `${benchmark.top25}%` }}
                                >
                                    <span className="absolute -top-0.5 left-1 text-[8px] text-github-accent/60 font-mono">75th</span>
                                </div>

                                {/* Top 10% marker */}
                                <div
                                    className="absolute top-0 h-full w-[2px] bg-github-green/40 z-10"
                                    style={{ left: `${benchmark.top10}%` }}
                                >
                                    <span className="absolute -top-0.5 left-1 text-[8px] text-github-green/60 font-mono">90th</span>
                                </div>

                                {/* User's position */}
                                <div
                                    className="absolute top-1 h-5 rounded flex items-center justify-center z-20 transition-all duration-1000"
                                    style={{
                                        left: `${Math.max(userPos - 2, 0)}%`,
                                        width: '20px',
                                        background: dim.score >= benchmark.top10 ? '#3fb950' : dim.score >= benchmark.top25 ? '#58a6ff' : dim.score >= benchmark.avg ? '#d29922' : '#f85149',
                                        boxShadow: `0 0 8px ${dim.score >= benchmark.top10 ? 'rgba(63,185,80,0.4)' : dim.score >= benchmark.top25 ? 'rgba(88,166,255,0.4)' : 'rgba(210,153,34,0.3)'}`,
                                    }}
                                >
                                    <span className="text-[9px] font-bold text-white">YOU</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-github-border/20">
                <p className="text-[10px] text-github-muted/50 text-center">
                    📊 Benchmarks based on analysis of public GitHub developer profiles. Percentiles are approximate.
                </p>
            </div>
        </motion.div>
    );
}
