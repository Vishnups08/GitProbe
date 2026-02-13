import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <div className="text-center pt-20 pb-12 px-4 relative overflow-hidden">
            {/* Background orb glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-github-accent/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2.5 bg-github-accent/8 border border-github-accent/20 rounded-full px-5 py-2 mb-8"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-github-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-github-green"></span>
                    </span>
                    <span className="text-github-accent text-xs font-semibold tracking-widest uppercase">
                        AI-Powered Analysis
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight"
                >
                    Turn Your GitHub Into
                    <br />
                    <span className="bg-gradient-to-r from-github-accent via-github-purple to-pink-400 bg-clip-text text-transparent">
                        Recruiter-Ready Proof
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg sm:text-xl text-github-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Stop guessing what hiring managers are looking for. Get an instant, AI-driven
                    audit of your public profile and land your dream job.
                </motion.p>

                {/* Feature Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-github-muted"
                >
                    {['Portfolio Score', 'Recruiter Insights', 'Actionable Tips', 'AI Analysis'].map((tag) => (
                        <div key={tag} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-github-green" />
                            <span>{tag}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
