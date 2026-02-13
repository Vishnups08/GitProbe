import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#58a6ff', '#3fb950', '#d29922', '#f85149', '#bc8cff', '#f778ba', '#79c0ff', '#56d364', '#e3b341', '#ff7b72'];

export default function LanguageChart({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                <p className="text-github-muted mt-2">No language data available.</p>
            </div>
        );
    }

    const totalBytes = Object.values(data).reduce((a, b) => a + b, 0);
    const chartData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, value]) => ({
            name,
            value,
            percentage: ((value / totalBytes) * 100).toFixed(1)
        }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-github-card border border-github-border rounded-lg p-3 shadow-xl z-50">
                    <p className="text-white font-bold text-sm mb-1">{payload[0].name}</p>
                    <p className="text-github-accent text-sm font-mono">{payload[0].payload.percentage}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-github-green/30 transition-colors duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24 text-github-green" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </div>

            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2.5 z-10 relative">
                <span className="w-8 h-8 bg-github-green/10 rounded-lg flex items-center justify-center text-github-green text-sm">💻</span>
                <div>
                    Language Distribution
                    <p className="text-xs text-github-muted font-normal mt-0.5">Top technologies used</p>
                </div>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                <div className="h-48 w-48 flex-shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                                animationDuration={1000}
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-lg font-bold text-white">{Object.keys(data).length}</span>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                    {chartData.map((lang, i) => (
                        <div key={lang.name} className="flex items-center justify-between group cursor-default">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-sm text-github-text group-hover:text-white truncate transition-colors">{lang.name}</span>
                            </div>
                            <span className="text-xs font-mono text-github-muted group-hover:text-github-accent transition-colors">
                                {lang.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
