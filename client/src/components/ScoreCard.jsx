import { motion } from 'framer-motion';

export default function ScoreCard({ data }) {
    const getScoreColor = (score) => {
        if (score >= 80) return { text: 'text-github-green', stroke: '#3fb950', glow: 'glow-green', label: 'EXCELLENT' };
        if (score >= 60) return { text: 'text-green-400', stroke: '#4ade80', glow: 'glow-green', label: 'GOOD' };
        if (score >= 40) return { text: 'text-github-yellow', stroke: '#d29922', glow: 'glow-yellow', label: 'FAIR' };
        if (score >= 20) return { text: 'text-github-orange', stroke: '#d18616', glow: 'glow-yellow', label: 'NEEDS WORK' };
        return { text: 'text-github-red', stroke: '#f85149', glow: 'glow-red', label: 'POOR' };
    };

    const scoreStyle = getScoreColor(data.overallScore);
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (data.overallScore / 100) * circumference;

    const joinDate = new Date(data.createdAt);
    const joinStr = joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-2xl p-6 sm:p-8 ${scoreStyle.glow}`}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Info */}
                <div className="flex items-start gap-5 flex-1">
                    <img
                        src={data.avatarUrl}
                        alt={data.username}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-github-border/50 shadow-xl"
                    />
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">{data.name || data.username}</h2>
                        <a
                            href={data.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-github-accent hover:underline text-sm font-medium"
                        >
                            @{data.username}
                        </a>
                        {data.bio && <p className="text-github-muted text-sm max-w-lg leading-relaxed">{data.bio}</p>}

                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-github-muted pt-1">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                <strong className="text-white">{data.publicRepos}</strong> Repositories
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <strong className="text-white">{data.followers}</strong> Followers
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <strong className="text-white">{data.following}</strong> Following
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-github-muted/60 pt-1">
                            {data.location && (
                                <span className="flex items-center gap-1">📍 {data.location}</span>
                            )}
                            {data.blog && (
                                <span className="flex items-center gap-1">🔗 {data.blog}</span>
                            )}
                            <span className="flex items-center gap-1">📅 Joined {joinStr}</span>
                        </div>
                    </div>
                </div>

                {/* Score Circle */}
                <div className="flex flex-col items-center">
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(48,54,61,0.3)" strokeWidth="5" />
                            <circle
                                cx="50" cy="50" r="45" fill="none"
                                stroke={scoreStyle.stroke}
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="score-circle"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl sm:text-5xl font-black ${scoreStyle.text}`}>{data.overallScore}</span>
                            <span className="text-[10px] text-github-muted/50 mt-0.5">/100</span>
                        </div>
                    </div>
                    <span className={`mt-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider ${scoreStyle.text} bg-current/10 score-badge`}>
                        {scoreStyle.label}
                    </span>
                    <span className="text-xs text-github-muted mt-1">Portfolio Score</span>
                </div>
            </div>
        </motion.div>
    );
}
