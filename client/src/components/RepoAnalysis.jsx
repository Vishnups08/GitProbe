import { motion } from 'framer-motion';

export default function RepoAnalysis({ repos }) {
    const getLabel = (score) => {
        if (score >= 80) return { text: 'EXCELLENT', color: 'text-github-green', bg: 'bg-github-green/15 border-github-green/20' };
        if (score >= 60) return { text: 'GOOD', color: 'text-green-400', bg: 'bg-green-400/15 border-green-400/20' };
        if (score >= 40) return { text: 'FAIR', color: 'text-github-yellow', bg: 'bg-github-yellow/15 border-github-yellow/20' };
        if (score >= 20) return { text: 'NEEDS WORK', color: 'text-github-orange', bg: 'bg-github-orange/15 border-github-orange/20' };
        return { text: 'POOR', color: 'text-github-red', bg: 'bg-github-red/15 border-github-red/20' };
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-github-border/30 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-github-accent/10 rounded-lg flex items-center justify-center text-sm">📦</span>
                <div>
                    <h3 className="text-base font-bold text-white">Repository Analysis</h3>
                    <p className="text-github-muted text-xs">Individual assessment of your top repositories</p>
                </div>
            </div>
            <div className="divide-y divide-github-border/20">
                {repos.map((repo) => {
                    const label = getLabel(repo.score);
                    return (
                        <div key={repo.name} className="p-5 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-github-accent hover:underline font-bold text-sm">
                                        📁 {repo.name}
                                    </a>
                                    {repo.description && <p className="text-github-muted text-xs mt-1">{repo.description}</p>}
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-github-muted/70">
                                        {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-github-accent rounded-full" />{repo.language}</span>}
                                        <span>⭐ {repo.stars}</span>
                                        <span>{repo.hasReadme ? <span className="text-github-green">✓ README</span> : <span className="text-github-red">✗ README</span>}</span>
                                        <span>{repo.hasLicense ? <span className="text-github-green">✓ License</span> : <span className="text-github-red">✗ License</span>}</span>
                                        <span>{repo.hasLiveDemo ? <span className="text-github-green">✓ Demo</span> : <span className="text-github-muted/40">— Demo</span>}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={`score-badge px-2 py-0.5 ${label.color}`}>{label.text}</span>
                                    <span className={`text-lg font-black font-mono rounded-full w-10 h-10 flex items-center justify-center border ${label.bg} ${label.color}`}>{repo.score}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
