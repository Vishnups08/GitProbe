import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ScoreCard({ data }) {
    const getScoreAttributes = (score) => {
        if (score >= 80) return { color: '#3fb950', trail: 'rgba(63, 185, 80, 0.2)', text: 'text-github-green', label: 'EXCELLENT', glow: 'shadow-[0_0_30px_rgba(63,185,80,0.3)]' };
        if (score >= 60) return { color: '#2ea043', trail: 'rgba(46, 160, 67, 0.2)', text: 'text-green-400', label: 'GOOD', glow: 'shadow-[0_0_30px_rgba(46,160,67,0.3)]' };
        if (score >= 40) return { color: '#d29922', trail: 'rgba(210, 153, 34, 0.2)', text: 'text-github-yellow', label: 'FAIR', glow: 'shadow-[0_0_30px_rgba(210,153,34,0.3)]' };
        return { color: '#f85149', trail: 'rgba(248, 81, 73, 0.2)', text: 'text-github-red', label: 'NEEDS WORK', glow: 'shadow-[0_0_30px_rgba(248,81,73,0.3)]' };
    };

    const styles = getScoreAttributes(data.overallScore);
    const joinDate = new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card rounded-2xl p-6 sm:p-8 border border-github-border/50 relative overflow-hidden group ${styles.glow}`}
        >
            {/* Background gradient splash */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-${styles.text.split('-')[1]}/10 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 opacity-50`} />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1 text-center sm:text-left">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className={`w-24 h-24 rounded-full border-4 border-github-dark shadow-2xl ring-2 ring-${styles.text.split('-')[1] || 'gray-500'}/30`}
                        />
                        <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-github-dark flex items-center justify-center bg-github-dark text-xs`} title="GitHub User">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </div>
                    </motion.div>

                    <div className="space-y-3">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                                {data.name || data.username}
                                <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="text-github-muted hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </h2>
                            <p className={`text-sm ${styles.text} font-mono font-medium`}>@{data.username}</p>
                        </div>

                        {data.bio && <p className="text-github-muted text-sm max-w-md leading-relaxed">{data.bio}</p>}

                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-medium text-github-text/80 bg-github-dark/30 py-2 px-3 rounded-lg border border-github-border/30 inline-flex">
                            <span className="flex items-center gap-1.5" title="Public Repositories">
                                <svg className="w-4 h-4 text-github-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                {data.publicRepos}
                            </span>
                            <span className="w-px h-4 bg-github-border/50"></span>
                            <span className="flex items-center gap-1.5" title="Followers">
                                <svg className="w-4 h-4 text-github-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                {data.followers}
                            </span>
                            <span className="w-px h-4 bg-github-border/50"></span>
                            <span className="flex items-center gap-1.5">📅 {joinDate}</span>
                        </div>
                    </div>
                </div>

                {/* Score Gauge */}
                <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                    <CircularProgressbarWithChildren
                        value={data.overallScore}
                        maxValue={100}
                        strokeWidth={8}
                        styles={buildStyles({
                            pathColor: styles.color,
                            trailColor: styles.trail,
                            strokeLinecap: 'round',
                            pathTransitionDuration: 1.5,
                        })}
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className={`text-5xl font-black ${styles.text} filter drop-shadow-lg`}>
                                {data.overallScore}
                            </span>
                            <span className="text-[10px] text-github-muted uppercase tracking-widest font-semibold mt-1">Overall</span>
                            <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${styles.text} bg-white/5 border border-white/10 uppercase tracking-widest`}>
                                {styles.label}
                            </div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </motion.div>
    );
}
