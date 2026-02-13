import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumeGenerator({ data }) {
    const [generating, setGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const topLanguages = Object.entries(data.languageStats || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([lang]) => lang);

    const topRepos = (data.repoAnalysis || [])
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Developing';
    };

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setShowPreview(true);
            setGenerating(false);
        }, 1200);
    };

    const handleDownload = () => {
        const resumeHTML = buildResumeHTML();
        const newWindow = window.open('', '_blank');
        newWindow.document.write(resumeHTML);
        newWindow.document.close();
        setTimeout(() => newWindow.print(), 500);
    };

    const handleCopyMarkdown = () => {
        const md = buildResumeMarkdown();
        navigator.clipboard.writeText(md);
    };

    const buildResumeMarkdown = () => {
        let md = `# ${data.name || data.username} — Developer Portfolio\n\n`;
        if (data.bio) md += `> ${data.bio}\n\n`;
        md += `🔗 [github.com/${data.username}](${data.profileUrl})\n`;
        if (data.location) md += `📍 ${data.location}\n`;
        if (data.blog) md += `🌐 ${data.blog}\n`;
        md += `\n---\n\n`;
        md += `## 📊 Portfolio Score: ${data.overallScore}/100 (${getScoreLabel(data.overallScore)})\n\n`;
        md += `## 💻 Tech Stack\n${topLanguages.map(l => `- ${l}`).join('\n')}\n\n`;
        md += `## 🏆 Featured Projects\n\n`;
        topRepos.forEach(r => {
            md += `### ${r.name}\n`;
            if (r.description) md += `${r.description}\n`;
            md += `- **Language:** ${r.language || 'N/A'} | **Stars:** ${r.stars} | **Score:** ${r.score}/100\n\n`;
        });
        md += `## 📈 Stats\n`;
        md += `- **Public Repos:** ${data.publicRepos}\n`;
        md += `- **Followers:** ${data.followers}\n`;
        md += `- **Joined:** ${new Date(data.createdAt).getFullYear()}\n`;
        return md;
    };

    const buildResumeHTML = () => {
        return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${data.name || data.username} — Portfolio</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',system-ui,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#1a1a2e;line-height:1.6}
h1{font-size:28px;margin-bottom:4px}h2{font-size:18px;color:#58a6ff;margin:24px 0 12px;border-bottom:2px solid #e8e8e8;padding-bottom:6px}h3{font-size:15px;margin:12px 0 4px}
.header{display:flex;align-items:center;gap:20px;margin-bottom:24px;border-bottom:3px solid #58a6ff;padding-bottom:20px}
.avatar{width:80px;height:80px;border-radius:50%;border:3px solid #58a6ff}
.bio{color:#555;font-size:14px;margin-top:4px}.meta{color:#666;font-size:13px;margin-top:6px;display:flex;gap:16px;flex-wrap:wrap}
.score-badge{display:inline-block;background:#58a6ff;color:white;padding:4px 16px;border-radius:20px;font-weight:bold;font-size:20px;margin:8px 0}
.skills{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.skill{background:#e8f4f8;color:#0369a1;padding:4px 12px;border-radius:12px;font-size:13px;font-weight:500}
.project{padding:12px 0;border-bottom:1px solid #f0f0f0}.project-meta{color:#666;font-size:12px;margin-top:4px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:12px 0}.stat{text-align:center;padding:12px;background:#f8f9fa;border-radius:8px}
.stat-num{font-size:24px;font-weight:bold;color:#58a6ff}.stat-label{font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px}
.footer{margin-top:32px;padding-top:16px;border-top:2px solid #e8e8e8;text-align:center;color:#999;font-size:11px}
@media print{body{padding:20px}}</style></head><body>
<div class="header"><img src="${data.avatarUrl}" class="avatar" alt="${data.username}">
<div><h1>${data.name || data.username}</h1>${data.bio ? `<p class="bio">${data.bio}</p>` : ''}
<div class="meta">${data.location ? `<span>📍 ${data.location}</span>` : ''}<span>🔗 github.com/${data.username}</span>${data.blog ? `<span>🌐 ${data.blog}</span>` : ''}</div></div></div>
<h2>📊 Portfolio Score</h2><div class="score-badge">${data.overallScore} / 100 — ${getScoreLabel(data.overallScore)}</div>
<h2>💻 Technical Skills</h2><div class="skills">${topLanguages.map(l => `<span class="skill">${l}</span>`).join('')}</div>
<h2>🏆 Featured Projects</h2>${topRepos.map(r => `<div class="project"><h3>${r.name}</h3>${r.description ? `<p style="font-size:14px;color:#444">${r.description}</p>` : ''}
<p class="project-meta">🔤 ${r.language || 'N/A'} · ⭐ ${r.stars} stars · Score: ${r.score}/100</p></div>`).join('')}
<h2>📈 Statistics</h2><div class="stats"><div class="stat"><div class="stat-num">${data.publicRepos}</div><div class="stat-label">Repositories</div></div>
<div class="stat"><div class="stat-num">${data.followers}</div><div class="stat-label">Followers</div></div>
<div class="stat"><div class="stat-num">${new Date(data.createdAt).getFullYear()}</div><div class="stat-label">Since</div></div></div>
<div class="footer">Generated by GitProbe — GitHub Portfolio Analyzer · ${new Date().toLocaleDateString()}</div></body></html>`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl overflow-hidden"
        >
            <div className="p-6 border-b border-github-border/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-github-green/10 rounded-lg flex items-center justify-center text-sm">📄</span>
                    <div>
                        <h3 className="text-base font-bold text-white">Portfolio Resume Generator</h3>
                        <p className="text-github-muted text-xs">Auto-generate a shareable resume from your GitHub data</p>
                    </div>
                </div>
                {!showPreview ? (
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="px-5 py-2 bg-gradient-to-r from-github-green to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-github-green/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {generating ? (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Generating...
                            </span>
                        ) : '✨ Generate Resume'}
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={handleDownload} className="px-4 py-2 bg-github-accent/10 border border-github-accent/20 text-github-accent text-xs font-semibold rounded-lg hover:bg-github-accent/20 transition-all">
                            📥 Print / PDF
                        </button>
                        <button onClick={handleCopyMarkdown} className="px-4 py-2 bg-github-purple/10 border border-github-purple/20 text-github-purple text-xs font-semibold rounded-lg hover:bg-github-purple/20 transition-all">
                            📋 Copy Markdown
                        </button>
                    </div>
                )}
            </div>

            {showPreview && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-6"
                >
                    {/* Resume Preview Card */}
                    <div className="bg-white rounded-xl p-6 text-gray-900 max-w-2xl mx-auto shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center gap-5 pb-5 border-b-2 border-blue-500 mb-5">
                            <img src={data.avatarUrl} alt={data.username} className="w-16 h-16 rounded-full border-2 border-blue-500" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{data.name || data.username}</h2>
                                {data.bio && <p className="text-gray-600 text-sm">{data.bio}</p>}
                                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                    {data.location && <span>📍 {data.location}</span>}
                                    <span>🔗 github.com/{data.username}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-blue-600 mb-2">📊 Portfolio Score</h3>
                            <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-lg">
                                {data.overallScore}/100 — {getScoreLabel(data.overallScore)}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-blue-600 mb-2">💻 Technical Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {topLanguages.map(lang => (
                                    <span key={lang} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-blue-600 mb-2">🏆 Featured Projects</h3>
                            <div className="space-y-3">
                                {topRepos.map(repo => (
                                    <div key={repo.name} className="border-b border-gray-100 pb-2">
                                        <h4 className="text-sm font-bold">{repo.name}</h4>
                                        {repo.description && <p className="text-xs text-gray-600">{repo.description}</p>}
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            {repo.language || 'N/A'} · ⭐ {repo.stars} · Score: {repo.score}/100
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { num: data.publicRepos, label: 'Repositories' },
                                { num: data.followers, label: 'Followers' },
                                { num: new Date(data.createdAt).getFullYear(), label: 'Since' },
                            ].map(s => (
                                <div key={s.label} className="text-center rounded-lg bg-gray-50 p-2">
                                    <div className="text-xl font-bold text-blue-500">{s.num}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-[10px] text-gray-300 mt-4">
                            Generated by GitProbe · {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
