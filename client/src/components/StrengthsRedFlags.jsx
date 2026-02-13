import { motion } from 'framer-motion';

export default function StrengthsRedFlags({ strengths = [], redFlags = [] }) {

    // Icons
    const CheckIcon = () => (
        <svg className="w-4 h-4 text-[#3fb950] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    );

    const ErrorIcon = () => (
        <svg className="w-4 h-4 text-[#f85149] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const WarningIcon = () => (
        <svg className="w-4 h-4 text-[#d29922] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            {/* Strengths Column */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#161b22] border border-[#3fb950]/20 rounded-xl p-6 hover:border-[#3fb950]/40 transition-all duration-300 group h-full flex flex-col"
            >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#30363d]">
                    <span className="text-2xl">💪</span>
                    <h3 className="text-[#3fb950] text-lg font-semibold tracking-tight">Strengths</h3>
                    <div className="ml-auto bg-[#3fb950]/10 text-[#3fb950] text-xs font-bold px-2.5 py-1 rounded-full border border-[#3fb950]/20">
                        {strengths.length} Found
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    {strengths.length === 0 ? (
                        <div className="text-[#8b949e] text-center py-12 italic text-sm bg-black/20 rounded-lg border border-[#30363d] border-dashed">
                            Keep building — strengths will emerge as your profile grows!
                        </div>
                    ) : (
                        strengths.map((item, index) => {
                            const message = typeof item === 'string' ? item : item.message;
                            const area = typeof item === 'string' ? 'General' : item.area;

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    className="flex gap-3 items-start p-2 rounded-lg hover:bg-[#3fb950]/5 transition-colors"
                                >
                                    <div className="bg-[#3fb950]/10 p-1.5 rounded-full mt-0.5 flex-shrink-0">
                                        <CheckIcon />
                                    </div>
                                    <div>
                                        <p className="text-[#c9d1d9] text-sm leading-relaxed font-medium">
                                            {message}
                                        </p>
                                        <p className="text-[#3fb950]/60 text-[10px] mt-1 uppercase tracking-widest font-bold">
                                            {area}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </motion.div>

            {/* Red Flags Column */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#161b22] border border-[#f85149]/20 rounded-xl p-6 hover:border-[#f85149]/40 transition-all duration-300 group h-full flex flex-col"
            >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#30363d]">
                    <span className="text-2xl">🚩</span>
                    <h3 className="text-[#f85149] text-lg font-semibold tracking-tight">Red Flags</h3>
                    <div className="ml-auto bg-[#f85149]/10 text-[#f85149] text-xs font-bold px-2.5 py-1 rounded-full border border-[#f85149]/20">
                        {redFlags.length} Issues
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    {redFlags.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center bg-[#3fb950]/5 rounded-lg border border-[#3fb950]/10">
                            <span className="text-4xl mb-3 animate-bounce">🎉</span>
                            <p className="text-[#3fb950] font-bold text-sm">
                                No major red flags detected!
                            </p>
                            <p className="text-[#3fb950]/70 text-xs mt-1">Great job maintaining your profile.</p>
                        </div>
                    ) : (
                        redFlags.map((item, index) => {
                            const message = typeof item === 'string' ? item : item.message;
                            const area = typeof item === 'string' ? 'General' : item.area;
                            const severity = typeof item === 'string' ? 'medium' : item.severity;

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    className="flex gap-3 items-start p-2 rounded-lg hover:bg-[#f85149]/5 transition-colors"
                                >
                                    <div className={`p-1.5 rounded-full flex-shrink-0 mt-0.5 ${severity === 'high' ? 'bg-[#f85149]/10' : 'bg-[#d29922]/10'}`}>
                                        {severity === 'high' ? <ErrorIcon /> : <WarningIcon />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[#c9d1d9] text-sm leading-relaxed font-medium">
                                            {message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                            <span className={`inline-flex items-center text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded ${severity === 'high'
                                                    ? 'bg-[#f85149]/20 text-[#f85149]'
                                                    : 'bg-[#d29922]/20 text-[#d29922]'
                                                }`}>
                                                {severity === 'high' ? 'CRITICAL' : 'WARNING'}
                                            </span>
                                            <span className="text-[#8b949e] text-[10px] uppercase tracking-wider font-bold opacity-60">
                                                {area}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </motion.div>
        </div>
    );
}
