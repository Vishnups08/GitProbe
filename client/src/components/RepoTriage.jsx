import { motion } from 'framer-motion';

export default function RepoTriage({ repos = [] }) {
    // Categorization Logic
    const showcase = [];
    const improve = [];
    const archive = [];

    repos.forEach(repo => {
        // Safe access to properties
        const score = repo.score || 0;
        const size = repo.size || 0;
        const hasReadme = repo.hasReadme || false;

        if (size < 10 || score < 25) {
            archive.push(repo);
        } else if (score >= 65 && hasReadme) {
            showcase.push(repo);
        } else {
            improve.push(repo);
        }
    });

    // Icons
    const CheckIcon = () => (
        <svg className="w-5 h-5 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );

    const WarningIcon = () => (
        <svg className="w-5 h-5 text-[#d29922]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );

    const ArchiveIcon = () => (
        <svg className="w-5 h-5 text-[#f85149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const StarIcon = () => (
        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    const Column = ({ title, subtitle, items, color, borderColor, icon, type }) => (
        <div className={`bg-[#161b22] rounded-xl border ${borderColor} p-5 flex flex-col h-full`}>
            <div className="mb-4 pb-4 border-b border-[#30363d]">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${color}`}>
                    {icon} {title}
                </h3>
                <p className="text-[#8b949e] text-xs mt-1 leading-relaxed">
                    {subtitle}
                </p>
                <div className={`text-xs font-mono font-bold mt-2 px-2 py-0.5 rounded-full w-fit ${color.replace('text-', 'bg-')}/10 border ${borderColor}`}>
                    {items.length} Repositories
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar space-y-3">
                {items.length === 0 ? (
                    <div className="text-center py-8 text-[#8b949e] text-sm italic">
                        No repositories in this category.
                    </div>
                ) : (
                    items.map((repo, idx) => (
                        <div key={idx} className="pb-3 border-b border-[#30363d] last:border-0 last:pb-0 group">
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex gap-2">
                                    <div className="mt-0.5 flex-shrink-0">
                                        {type === 'showcase' && <CheckIcon />}
                                        {type === 'improve' && <WarningIcon />}
                                        {type === 'archive' && <ArchiveIcon />}
                                    </div>
                                    <div>
                                        {type === 'archive' ? (
                                            <span className="text-[#8b949e] font-medium text-sm line-through decoration-github-border">
                                                {repo.name}
                                            </span>
                                        ) : (
                                            <a
                                                href={repo.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#58a6ff] hover:underline font-medium text-sm break-all"
                                            >
                                                {repo.name}
                                            </a>
                                        )}

                                        {type === 'showcase' && repo.language && (
                                            <div className="text-[#8b949e] text-xs mt-0.5 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
                                                {repo.language}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end flex-shrink-0">
                                    {type === 'showcase' && repo.stars > 0 && (
                                        <div className="flex items-center gap-1 text-[#e3b341] text-xs font-bold bg-[#e3b341]/10 px-1.5 py-0.5 rounded">
                                            <StarIcon /> {repo.stars}
                                        </div>
                                    )}

                                    {type === 'improve' && (
                                        <span className="text-[#d29922] text-[10px] font-bold bg-[#d29922]/10 px-1.5 py-0.5 rounded border border-[#d29922]/20 whitespace-nowrap">
                                            {!repo.hasReadme ? 'No README' : !repo.hasDescription ? 'No Desc' : 'No Demo'}
                                        </span>
                                    )}

                                    {type === 'archive' && (
                                        <span className="text-[#f85149] text-[10px] font-bold bg-[#f85149]/10 px-1.5 py-0.5 rounded border border-[#f85149]/20 whitespace-nowrap">
                                            {repo.size < 10 ? 'Empty' : 'Low Score'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Column
                    title="Showcase"
                    subtitle="These repos impress recruiters. Pin them to your profile."
                    items={showcase}
                    color="text-[#3fb950]"
                    borderColor="border-[#3fb950]/20"
                    icon="🌟"
                    type="showcase"
                />

                <Column
                    title="Improve"
                    subtitle="Good foundation but missing documentation or demos."
                    items={improve}
                    color="text-[#d29922]"
                    borderColor="border-[#d29922]/20"
                    icon="🔧"
                    type="improve"
                />

                <Column
                    title="Archive"
                    subtitle="Empty or trivial repos that dilute your profile quality."
                    items={archive}
                    color="text-[#f85149]"
                    borderColor="border-[#f85149]/20"
                    icon="🗑️"
                    type="archive"
                />
            </div>

            {/* Summary Bar */}
            <div className="bg-[#0d1117]/50 border-t border-[#30363d] rounded-b-xl p-4 flex flex-wrap justify-center gap-6 text-sm font-medium">
                <span className="text-[#3fb950] flex items-center gap-2">
                    🌟 <strong>{showcase.length}</strong> ready to showcase
                </span>
                <span className="text-[#d29922] flex items-center gap-2">
                    🔧 <strong>{improve.length}</strong> need improvement
                </span>
                <span className="text-[#f85149] flex items-center gap-2">
                    🗑️ <strong>{archive.length}</strong> consider archiving
                </span>
            </div>
        </motion.div>
    );
}
