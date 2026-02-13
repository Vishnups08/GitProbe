import { motion } from 'framer-motion';

export default function RepoAnalysis({ repos = [] }) {
    // Sort by score descending and take top 10
    const sortedRepos = [...repos]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 10);

    const getScoreStyle = (score) => {
        if (score >= 70) return 'bg-[#3fb950]/10 border-[#3fb950]/20 text-[#3fb950]';
        if (score >= 40) return 'bg-[#d29922]/10 border-[#d29922]/20 text-[#d29922]';
        return 'bg-[#f85149]/10 border-[#f85149]/20 text-[#f85149]';
    };

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 animate-fade-in shadow-xl">
            <div className="mb-6">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    📦 Repository Analysis
                </h3>
                <p className="text-[#8b949e] text-sm mt-1">
                    Individual assessment of your top repositories
                </p>
            </div>

            <div className="space-y-3">
                {sortedRepos.length === 0 ? (
                    <div className="text-center py-8 text-[#8b949e] italic">
                        No repositories found to analyze.
                    </div>
                ) : (
                    sortedRepos.map((repo, index) => {
                        const score = repo.score || 0;
                        const scoreStyle = getScoreStyle(score);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -2, borderColor: 'rgba(88, 166, 255, 0.3)' }}
                                className="bg-[#0d1117]/50 border border-[#30363d] rounded-lg p-5 transition-all duration-300 group"
                            >
                                {/* Header Row: Name & Score */}
                                <div className="flex justify-between items-start mb-2">
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#58a6ff] hover:underline font-semibold text-[15px] truncate max-w-[70%]"
                                    >
                                        {repo.name}
                                    </a>
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${scoreStyle}`}>
                                        {score}/100
                                    </div>
                                </div>

                                {/* Description */}
                                <p className={`text-sm mb-4 line-clamp-2 ${!repo.description ? 'italic text-[#f85149]/70' : 'text-[#8b949e]'}`}>
                                    {repo.description || "No description provided"}
                                </p>

                                {/* Metadata Tags */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8b949e]">
                                    {/* Language */}
                                    {repo.language && (
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#58a6ff]"></span>
                                            <span>{repo.language}</span>
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="flex items-center gap-1">
                                        <span>⭐ {repo.stars}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>🍴 {repo.forks}</span>
                                    </div>

                                    {/* Flags */}
                                    <span className={repo.hasReadme ? 'text-[#3fb950]' : 'text-[#f85149]'}>
                                        {repo.hasReadme ? '📝 README' : '❌ No README'}
                                    </span>

                                    {repo.hasLicense && (
                                        <span className="text-[#3fb950]/80">📜 License</span>
                                    )}

                                    {repo.hasGitignore && (
                                        <span className="text-[#8b949e]">🔒 .gitignore</span>
                                    )}

                                    {repo.hasTests && (
                                        <span className="text-[#3fb950]/80">🧪 Tests</span>
                                    )}

                                    {repo.hasDemo && (
                                        <span className="flex items-center gap-1 text-[#3fb950] font-medium bg-[#3fb950]/10 px-1.5 py-0.5 rounded border border-[#3fb950]/20">
                                            🔗 Live Demo
                                        </span>
                                    )}

                                    {/* Update Date */}
                                    <span className="text-[#8b949e]/60 ml-auto">
                                        Updated {new Date(repo.lastUpdated).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {repos.length > 10 && (
                <div className="mt-4 text-center">
                    <p className="text-xs text-[#8b949e]">
                        Showing top 10 of {repos.length} repositories
                    </p>
                </div>
            )}
        </div>
    );
}
