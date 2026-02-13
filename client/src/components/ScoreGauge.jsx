import { useState, useEffect } from 'react';

export default function ScoreGauge({ score }) {
    const [animatedScore, setAnimatedScore] = useState(0);

    // SVG Dimensions
    const size = 160;
    const strokeWidth = 8;
    const center = size / 2;
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        // Animate from 0 to score
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 100);
        return () => clearTimeout(timer);
    }, [score]);

    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    // Determine colors and label based on score
    const getAttributes = (s) => {
        if (s >= 80) return { color: '#3fb950', label: 'Excellent', glow: 'rgba(63, 185, 80, 0.15)' };
        if (s >= 60) return { color: '#58a6ff', label: 'Good', glow: 'rgba(88, 166, 255, 0.15)' };
        if (s >= 40) return { color: '#d29922', label: 'Average', glow: 'rgba(210, 153, 34, 0.15)' };
        if (s >= 20) return { color: '#d18616', label: 'Needs Work', glow: 'rgba(209, 134, 22, 0.15)' };
        return { color: '#f85149', label: 'Critical', glow: 'rgba(248, 81, 73, 0.15)' };
    };

    const { color, label, glow } = getAttributes(score);

    return (
        <div
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#161b22] border border-[#30363d] transition-all duration-500"
            style={{ boxShadow: `0 0 40px ${glow}` }}
        >
            <div className="relative flex items-center justify-center mb-4" style={{ width: size, height: size }}>
                {/* Background Ring */}
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="#30363d"
                        strokeWidth={strokeWidth}
                    />
                    {/* Animated Foreground Ring */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white leading-none">
                        {animatedScore}
                    </span>
                    <span className="text-xs text-[#8b949e] mt-1 font-medium">/ 100</span>
                </div>
            </div>

            {/* Labels */}
            <div className="text-center">
                <div
                    className="text-lg font-bold mb-1"
                    style={{ color: color }}
                >
                    {label}
                </div>
                <div className="text-xs text-[#8b949e] font-medium tracking-wide uppercase">
                    Portfolio Score
                </div>
            </div>
        </div>
    );
}
