import { motion } from 'framer-motion';

export default function RepoAnalysis({ repos }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-github-border/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-github-accent/10 rounded-lg flex items-center justify-center text-sm">📦</span>
                    <div>
                        <h3 className="text-base font-bold text-white">Repository Health Check</h3>
                        <p className="text-github-muted text-xs">Individual assessment of your repositories</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-github-muted uppercase tracking-wider border-b border-github-border/20">
                            <th className="px-6 py-3 font-semibold w-1/3">Repository</th>
                            <th className="px-6 py-3 font-semibold">Checks</th>
                            <th className="px-6 py-3 font-semibold text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-github-border/10 text-sm">
                        {repos.map((repo) => {
                            const scoreColor = repo.score >= 80 ? 'text-github-green' : repo.score >= 60 ? 'text-green-400' : repo.score >= 40 ? 'text-github-yellow' : 'text-github-red';

                            return (
                                <tr key={repo.name} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                <svg className="w-4 h-4 text-github-muted group-hover:text-github-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                            </div>
                                            <div>
                                                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-bold text-github-text hover:text-github-accent hover:underline transition-colors block">
                                                    {repo.name}
                                                </a>
                                                {repo.description && <p className="text-xs text-github-muted mt-1 max-w-xs truncate" title={repo.description}>{repo.description}</p>}
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    {repo.language && (
                                                        <span className="flex items-center gap-1 text-[10px] text-github-muted/80 bg-github-border/20 px-1.5 py-0.5 rounded">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-github-accent"></span>
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1 text-[10px] text-github-muted/80">
                                                        ⭐ {repo.stars}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2 text-[10px] font-medium tracking-wide">
                                            <span className={`px-2 py-0.5 rounded border ${repo.hasReadme ? 'bg-github-green/10 text-github-green border-github-green/20' : 'bg-github-red/10 text-github-red border-github-red/20 opacity-60'}`}>
                                                {repo.hasReadme ? '✓ README' : '✗ README'}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded border ${repo.hasLicense ? 'bg-github-green/10 text-github-green border-github-green/20' : 'bg-github-muted/10 text-github-muted border-github-border/20 opacity-60'}`}>
                                                {repo.hasLicense ? '✓ License' : '✗ License'}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded border ${repo.hasLiveDemo ? 'bg-github-accent/10 text-github-accent border-github-accent/20' : 'bg-github-muted/10 text-github-muted border-github-border/20 opacity-40'}`}>
                                                {repo.hasLiveDemo ? '✓ Demo' : '— Demo'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`text-xl font-black font-mono ${scoreColor}`}>
                                            {repo.score}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
