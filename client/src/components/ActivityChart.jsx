import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data = [] }) {
    // Check for empty data
    if (!data || data.length === 0) {
        return (
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 h-[300px] flex items-center justify-center">
                <p className="text-[#8b949e]">No commit activity recorded.</p>
            </div>
        );
    }

    // Process data into weekly buckets
    const weeklyData = [];
    let weekCommits = 0;
    let weekStartDate = '';

    // Sort data by date just in case
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedData.forEach((day, index) => {
        if (index % 7 === 0) {
            // New week starts
            if (index > 0) {
                weeklyData.push({
                    week: weekStartDate,
                    commits: weekCommits
                });
            }
            weekStartDate = new Date(day.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
            weekCommits = 0;
        }
        weekCommits += day.commits;

        // Push last week
        if (index === sortedData.length - 1) {
            weeklyData.push({
                week: weekStartDate,
                commits: weekCommits
            });
        }
    });

    // Calculate Stats
    const totalCommits = sortedData.reduce((sum, d) => sum + d.commits, 0);
    const activeDays = sortedData.filter(d => d.commits > 0).length;

    // Calculate max streak
    let maxStreak = 0;
    let currentStreak = 0;
    sortedData.forEach(d => {
        if (d.commits > 0) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    });

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 shadow-xl">
                    <p className="text-[#8b949e] text-xs mb-1">Week of {label}</p>
                    <p className="text-[#58a6ff] text-sm font-semibold">{payload[0].value} commits</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 animate-fade-in group hover:border-[#58a6ff]/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                        📊 Commit Activity
                    </h3>
                    <p className="text-[#8b949e] text-sm mt-1">Last 90 days</p>
                </div>
            </div>

            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#58a6ff" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="week"
                            tick={{ fill: '#8b949e', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fill: '#8b949e', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#58a6ff', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Area
                            type="monotone"
                            dataKey="commits"
                            stroke="#58a6ff"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#commitGradient)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-[#30363d]/50">
                <div className="bg-[#0d1117]/50 rounded-lg px-3 py-1.5 text-[13px] text-white font-medium border border-[#30363d]/30">
                    Total: <span className="text-[#c9d1d9]">{totalCommits}</span>
                </div>

                <div className="bg-[#0d1117]/50 rounded-lg px-3 py-1.5 text-[13px] font-medium border border-[#30363d]/30">
                    <span className={activeDays > 30 ? 'text-[#3fb950]' : activeDays > 15 ? 'text-[#d29922]' : 'text-[#f85149]'}>
                        {activeDays}/90 Active Days
                    </span>
                </div>

                <div className="bg-[#0d1117]/50 rounded-lg px-3 py-1.5 text-[13px] text-[#58a6ff] font-medium border border-[#30363d]/30">
                    🔥 {maxStreak} day streak
                </div>
            </div>
        </div>
    );
}
