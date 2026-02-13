import React from 'react';

export default function LoadingState({ step: currentStep, stepIndex = 0 }) {

    // Define the specific visual steps requested
    const visualSteps = [
        "Fetching GitHub profile",
        "Loading repositories",
        "Analyzing code structure",
        "Checking commit patterns",
        "Generating insights"
    ];

    // Determine specific status per step based on stepIndex
    const getStepStatus = (index) => {
        if (index < stepIndex) return 'completed';
        if (index === stepIndex) return 'current';
        return 'pending';
    };

    return (
        <div className="flex flex-col items-center justify-center py-32 w-full relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* 1. Animated Spinner */}
            <div className="relative w-20 h-20 mb-6">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-[#30363d] rounded-full"></div>
                {/* Spinning Top Segment */}
                <div className="absolute inset-0 border-4 border-transparent border-t-[#58a6ff] rounded-full animate-spin"></div>
                {/* Octocat Icon (Center) */}
                <div className="absolute inset-0 flex items-center justify-center text-[#58a6ff]">
                    <svg height="32" viewBox="0 0 16 16" width="32" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </div>
            </div>

            {/* 2. Main Text */}
            <h2 className="text-white text-2xl font-semibold mb-2">Analyzing Profile</h2>

            {/* 3. Current Step Text */}
            <p className="text-[#58a6ff] text-sm font-mono animate-pulse mb-6">
                {currentStep || "Processing..."}
            </p>

            {/* 4. Bouncing Dots */}
            <div className="flex gap-2 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-[#58a6ff] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
                    ></div>
                ))}
            </div>

            {/* 5. Progress Steps List */}
            <div className="flex flex-col gap-3 w-64">
                {visualSteps.map((stepLabel, index) => {
                    const status = getStepStatus(index);

                    return (
                        <div key={index} className="flex items-center gap-3 transition-opacity duration-300">
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                {status === 'completed' && (
                                    <span className="text-[#3fb950] text-sm">✅</span>
                                )}
                                {status === 'current' && (
                                    <div className="w-4 h-4 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin"></div>
                                )}
                                {status === 'pending' && (
                                    <span className="text-[#8b949e] text-xs">⏳</span>
                                )}
                            </div>

                            <span className={`text-sm font-medium ${status === 'completed' ? 'text-[#3fb950]' :
                                    status === 'current' ? 'text-[#58a6ff]' :
                                        'text-[#8b949e]'
                                }`}>
                                {stepLabel}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* CSS styles that might not be in Tailwind default config */}
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
