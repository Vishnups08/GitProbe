import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#58a6ff', '#3fb950', '#d29922', '#f85149', '#bc8cff', '#f778ba', '#79c0ff', '#56d364', '#e3b341', '#ff7b72'];

export default function LanguageChart({ data }) {
    const totalBytes = Object.values(data).reduce((a, b) => a + b, 0);
    if (totalBytes === 0) return null;

    const chartData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value]) => ({
            name,
            value,
            percentage: ((value / totalBytes) * 100).toFixed(1)
        }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card rounded-lg p-3 shadow-xl">
                    <p className="text-white font-bold text-sm">{payload[0].name}</p>
                    <p className="text-github-accent text-sm">{payload[0].payload.percentage}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-github-purple/10 rounded-lg flex items-center justify-center text-github-purple text-sm">💻</span>
                Language Distribution
            </h3>
            <div className="flex items-center gap-6">
                <div className="h-44 w-44 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={65}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2.5">
                    {chartData.map((lang, i) => (
                        <div key={lang.name} className="flex items-center justify-between text-sm group">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-github-text group-hover:text-white transition-colors text-xs">{lang.name}</span>
                            </div>
                            <span className="text-github-muted text-xs font-mono">{lang.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
