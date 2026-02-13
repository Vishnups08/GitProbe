import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExportShare({ data }) {
    const [copied, setCopied] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleExportPDF = () => {
        setExporting(true);
        setTimeout(() => {
            window.print();
            setExporting(false);
        }, 300);
    };

    const handleCopyLink = () => {
        const url = `${window.location.origin}?u=${data.username}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const handleShareTwitter = () => {
        const text = `I just scored ${data.overallScore}/100 on my GitHub Portfolio analysis with GitProbe! 🚀\n\nCheck your profile too:`;
        const url = window.location.origin;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleShareLinkedIn = () => {
        const url = window.location.origin;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleDownloadJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gitprobe-${data.username}-report.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
        >
            <div className="flex items-center gap-2.5 mb-5">
                <span className="w-8 h-8 bg-github-accent/10 rounded-lg flex items-center justify-center text-sm">📤</span>
                <div>
                    <h3 className="text-base font-bold text-white">Export & Share</h3>
                    <p className="text-github-muted text-xs">Save or share your analysis results</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* Export PDF */}
                <button
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-github-border/30 hover:border-github-accent/30 bg-github-dark/30 hover:bg-github-accent/5 transition-all group"
                >
                    <svg className="w-6 h-6 text-github-red group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-xs text-github-muted group-hover:text-white transition-colors">
                        {exporting ? 'Opening...' : 'Save PDF'}
                    </span>
                </button>

                {/* Copy Link */}
                <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-github-border/30 hover:border-github-accent/30 bg-github-dark/30 hover:bg-github-accent/5 transition-all group"
                >
                    <svg className="w-6 h-6 text-github-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
                    </svg>
                    <span className="text-xs text-github-muted group-hover:text-white transition-colors">
                        {copied ? '✓ Copied!' : 'Copy Link'}
                    </span>
                </button>

                {/* Share Twitter */}
                <button
                    onClick={handleShareTwitter}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-github-border/30 hover:border-github-accent/30 bg-github-dark/30 hover:bg-github-accent/5 transition-all group"
                >
                    <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-xs text-github-muted group-hover:text-white transition-colors">Twitter/X</span>
                </button>

                {/* Share LinkedIn */}
                <button
                    onClick={handleShareLinkedIn}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-github-border/30 hover:border-github-accent/30 bg-github-dark/30 hover:bg-github-accent/5 transition-all group"
                >
                    <svg className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-xs text-github-muted group-hover:text-white transition-colors">LinkedIn</span>
                </button>

                {/* Download JSON */}
                <button
                    onClick={handleDownloadJSON}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-github-border/30 hover:border-github-accent/30 bg-github-dark/30 hover:bg-github-accent/5 transition-all group"
                >
                    <svg className="w-6 h-6 text-github-green group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="text-xs text-github-muted group-hover:text-white transition-colors">JSON Data</span>
                </button>
            </div>
        </motion.div>
    );
}
