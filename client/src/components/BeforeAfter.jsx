import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfter({ data }) {
    const [showAfter, setShowAfter] = useState(false);

    const currentScore = data.overallScore;
    const projectedScore = Math.min(currentScore + Math.round((100 - currentScore) * 0.55), 98);

    const improvements = [];

    const docScore = data.dimensions?.documentation?.score || 0;
    const repoOrg = data.dimensions?.repoOrganization?.score || 0;
    const activity = data.dimensions?.activityConsistency?.score || 0;

    if (docScore < 70) {
        improvements.push({
            area: 'Documentation',
            before: `${docScore}/100 — Missing READMEs, short descriptions`,
            after: `${Math.min(docScore + 35, 95)}/100 — Rich READMEs with screenshots, setup guides, badges`,
            icon: '📝', time: '~2 hours',
        });
    }
    if (repoOrg < 70) {
        improvements.push({
            area: 'Repo Organization',
            before: `${repoOrg}/100 — Missing topics, no live demos`,
            after: `${Math.min(repoOrg + 30, 90)}/100 — Topics added, live demos linked, weak repos archived`,
            icon: '📁', time: '~30 min',
        });
    }
    if (!data.bio) {
        improvements.push({
            area: 'Profile Bio',
            before: 'Empty — recruiter sees nothing',
            after: `"Full-stack dev passionate about ${Object.keys(data.languageStats || {}).slice(0, 2).join(' & ') || 'web development'}. Open to opportunities."`,
            icon: '👤', time: '~2 min',
        });
    }
    if (activity < 60) {
        improvements.push({
            area: 'Activity',
            before: `${activity}/100 — Patchy commits, long gaps`,
            after: `${Math.min(activity + 25, 85)}/100 — Consistent 4-5 days/week with meaningful commits`,
            icon: '📊', time: '~2 weeks habit',
        });
    }

    improvements.push({
        area: 'Pinned Repos',
        before: 'Default/unpinned — random repos showing',
        after: '6 best projects pinned with descriptions, live demos & polished READMEs',
        icon: '📌', time: '~5 min',
    });

    const getColor = (score) => {
        if (score >= 80) return 'text-github-green';
        if (score >= 60) return 'text-green-400';
        if (score >= 40) return 'text-github-yellow';
        return 'text-github-red';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl overflow-hidden"
        >
            <div className="p-6 border-b border-github-border/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 bg-github-purple/10 rounded-lg flex items-center justify-center text-sm">🔄</span>
                        <div>
                            <h3 className="text-base font-bold text-white">Before & After Preview</h3>
                            <p className="text-github-muted text-xs">See what your profile could look like after our recommendations</p>
                        </div>
                    </div>

                    {/* Toggle */}
                    <button
                        onClick={() => setShowAfter(!showAfter)}
                        className={`relative w-48 h-10 rounded-full p-1 transition-all duration-500 ${showAfter ? 'bg-github-green/20 border border-github-green/30' : 'bg-github-red/20 border border-github-red/30'
                            }`}
                    >
                        <div
                            className={`absolute top-1 h-8 w-[5.5rem] rounded-full transition-all duration-500 flex items-center justify-center text-xs font-bold ${showAfter
                                    ? 'left-[5.5rem] bg-github-green text-black'
                                    : 'left-1 bg-github-red text-white'
                                }`}
                        >
                            {showAfter ? '✨ AFTER' : '📉 BEFORE'}
                        </div>
                        <span className={`absolute top-2.5 text-[10px] font-semibold transition-all ${showAfter ? 'left-4 text-github-muted' : 'right-4 text-github-muted'
                            }`}>
                            {showAfter ? 'Before' : 'After'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Score Comparison */}
            <div className="p-6 border-b border-github-border/20">
                <div className="flex items-center justify-center gap-8">
                    <div className={`text-center transition-all duration-500 ${!showAfter ? 'scale-110' : 'opacity-50 scale-90'}`}>
                        <div className={`text-5xl font-black font-mono ${getColor(currentScore)}`}>{currentScore}</div>
                        <div className="text-xs text-github-muted mt-1">Current Score</div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <svg className="w-8 h-8 text-github-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-[10px] text-github-green font-bold">+{projectedScore - currentScore} pts</span>
                    </div>

                    <div className={`text-center transition-all duration-500 ${showAfter ? 'scale-110' : 'opacity-50 scale-90'}`}>
                        <div className={`text-5xl font-black font-mono ${getColor(projectedScore)}`}>{projectedScore}</div>
                        <div className="text-xs text-github-muted mt-1">Projected Score</div>
                    </div>
                </div>
            </div>

            {/* Improvement Breakdown */}
            <div className="p-6 space-y-3">
                {improvements.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={false}
                        animate={{ x: 0, opacity: 1 }}
                        className={`rounded-xl p-4 border transition-all duration-500 ${showAfter
                                ? 'bg-github-green/5 border-github-green/15'
                                : 'bg-github-red/5 border-github-red/15'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                                <span className="text-lg mt-0.5">{item.icon}</span>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">{item.area}</h4>
                                    <p className={`text-xs leading-relaxed transition-all duration-500 ${showAfter ? 'text-github-green' : 'text-github-red'
                                        }`}>
                                        {showAfter ? item.after : item.before}
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] text-github-muted whitespace-nowrap bg-github-dark/40 px-2 py-1 rounded-md">
                                ⏱ {item.time}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-4 border-t border-github-border/20 text-center">
                <p className="text-xs text-github-muted">
                    💡 Implementing all recommendations could raise your score by an estimated <span className="text-github-green font-bold">+{projectedScore - currentScore} points</span> — achievable in a weekend!
                </p>
            </div>
        </motion.div>
    );
}
