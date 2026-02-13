import { motion } from 'framer-motion';

export default function BenchmarkComparison({ dimensions = {} }) {

    // Benchmark Averages
    const BENCHMARKS = {
        documentation: 48,
        codeStructure: 45,
        activityConsistency: 40,
        repoOrganization: 42,
        projectImpact: 35,
        technicalDepth: 38
    };

    // Helper to calculate percentile
    const getPercentile = (userScore, avgScore) => {
        const diff = userScore - avgScore;
        // Simple heuristic: +/- 40 points roughly equals +/- 48 percentile points (1.2 multiplier)
        // Clamped between 5th and 95th percentile
        const percentile = Math.min(95, Math.max(5, 50 + diff * 1.2));
        return Math.round(percentile);
    };

    const dimensionConfig = [
        { key: 'documentation', label: 'Documentation', icon: '📝' },
        { key: 'codeStructure', label: 'Code Quality', icon: '🧹' },
        { key: 'activityConsistency', label: 'Consistency', icon: '📊' },
        { key: 'repoOrganization', label: 'Organization', icon: '🗂️' },
        { key: 'projectImpact', label: 'Impact', icon: '🚀' },
        { key: 'technicalDepth', label: 'Technical Depth', icon: '⚡' }
    ];

    if (!dimensions || Object.keys(dimensions).length === 0) {
        return null;
    }

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 animate-fade-in shadow-lg">
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-1">
                📊 How You Compare
            </h3>
            <p className="text-[#8b949e] text-sm mb-8">
                Your scores vs. average developer profiles
            </p>

            <div className="space-y-6">
                {dimensionConfig.map((config, index) => {
                    // Extract user score from dimensions prop
                    // Handle case where dimension key might match prop key directly or loosely
                    const dimData = dimensions[config.key] || { score: 0 };
                    const userScore = dimData.score || 0;
                    const avgScore = BENCHMARKS[config.key] || 40;

                    const percentile = getPercentile(userScore, avgScore);

                    let statusText = '';
                    let statusColor = '';

                    if (percentile >= 60) {
                        statusText = `Better than ${percentile}% of developers`;
                        statusColor = 'text-[#3fb950]';
                    } else if (percentile >= 40) {
                        statusText = `Average (${percentile}th percentile)`;
                        statusColor = 'text-[#d29922]';
                    } else {
                        statusText = `Lower than ${100 - percentile}% of developers`;
                        statusColor = 'text-[#f85149]';
                    }

                    const barColor = userScore >= 70 ? 'bg-[#3fb950]' : userScore >= 40 ? 'bg-[#d29922]' : 'bg-[#f85149]';

                    return (
                        <div key={config.key} className="flex flex-col md:flex-row md:items-center gap-4 group">
                            {/* Left Side: Label & Percentile */}
                            <div className="md:w-[40%] flex-shrink-0">
                                <div className="flex items-center gap-2 text-[#c9d1d9] font-semibold text-sm">
                                    <span>{config.icon}</span>
                                    <span>{config.label}</span>
                                </div>
                                <div className={`text-xs mt-1 font-medium ${statusColor}`}>
                                    {statusText}
                                </div>
                            </div>

                            {/* Right Side: Progress Bar */}
                            <div className="flex-1 relative pt-4 md:pt-0">
                                {/* Average Marker Label */}
                                <div
                                    className="absolute -top-4 text-[10px] text-[#8b949e] transform -translate-x-1/2"
                                    style={{ left: `${avgScore}%` }}
                                >
                                    avg
                                </div>

                                <div className="relative h-2 w-full bg-[#30363d] rounded-full overflow-visible">
                                    {/* Average Line */}
                                    <div
                                        className="absolute top-[-2px] bottom-[-2px] w-0.5 bg-white/50 z-10"
                                        style={{ left: `${avgScore}%` }}
                                    ></div>

                                    {/* User Score Bar */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${userScore}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`absolute top-0 left-0 h-full rounded-full ${barColor}`}
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Score Number */}
                            <div className="w-12 text-right text-sm font-bold text-white tabular-nums">
                                {userScore}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-4 border-t border-[#30363d] text-center">
                <p className="text-[#8b949e] text-xs italic">
                    Based on analysis of developer profiles at similar experience levels
                </p>
            </div>
        </div>
    );
}
