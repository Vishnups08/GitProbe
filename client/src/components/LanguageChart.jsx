import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function LanguageChart({ data = {} }) {
    const COLORS = ['#58a6ff', '#3fb950', '#d29922', '#f85149', '#bc8cff', '#f778ba', '#79c0ff', '#56d364'];

    // Check for empty data
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 h-[250px] flex items-center justify-center">
                <p className="text-[#8b949e]">No language data available.</p>
            </div>
        );
    }

    // Preprocessing
    const entries = Object.entries(data);
    const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

    // Sort descending
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

    // Take top 7 and group others
    let chartData = [];
    if (sortedEntries.length > 7) {
        const top7 = sortedEntries.slice(0, 7);
        const others = sortedEntries.slice(7);
        const otherBytes = others.reduce((sum, [, bytes]) => sum + bytes, 0);

        chartData = [
            ...top7.map(([name, value]) => ({ name, value })),
            { name: 'Other', value: otherBytes }
        ];
    } else {
        chartData = sortedEntries.map(([name, value]) => ({ name, value }));
    }

    // Calculate percentages
    chartData = chartData.map(item => ({
        ...item,
        percentage: ((item.value / totalBytes) * 100).toFixed(1)
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 shadow-xl z-50">
                    <p className="text-white font-semibold text-sm mb-0.5">{data.name}</p>
                    <p style={{ color: payload[0].fill }} className="text-xs font-mono">
                        {data.percentage}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 animate-fade-in group hover:border-[#3fb950]/30 transition-colors duration-500 h-full">
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-6">
                💻 Language Distribution
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Donut Chart Section */}
                <div className="relative w-[180px] h-[180px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={3}
                                dataKey="value"
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-white leading-none">
                            {sortedEntries.length}
                        </span>
                        <span className="text-[10px] text-[#8b949e] uppercase mt-1 tracking-wide">
                            Languages
                        </span>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="flex-1 w-full grid grid-cols-1 gap-2.5">
                    {chartData.map((lang, i) => (
                        <div key={lang.name} className="flex items-center justify-between group/row">
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-sm text-[#c9d1d9] font-medium truncate max-w-[120px]">
                                    {lang.name}
                                </span>
                            </div>
                            <span className="text-sm text-[#8b949e] font-mono group-hover/row:text-white transition-colors">
                                {lang.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
