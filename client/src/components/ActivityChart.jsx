import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data }) {
    const weeklyData = [];
    for (let i = 0; i < data.length; i += 7) {
        const week = data.slice(i, i + 7);
        const totalCommits = week.reduce((sum, d) => sum + d.commits, 0);
        weeklyData.push({
            week: week[0]?.date?.substring(5) || '',
            commits: totalCommits
        });
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card rounded-lg p-3 shadow-xl">
                    <p className="text-github-muted text-xs">Week of {label}</p>
                    <p className="text-github-accent font-bold">{payload[0].value} commits</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-github-accent/10 rounded-lg flex items-center justify-center text-github-accent text-sm">📊</span>
                Commit Activity
                <span className="text-github-muted text-xs font-normal ml-auto">Last 90 Days</span>
            </h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                        <defs>
                            <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="week"
                            tick={{ fill: '#8b949e', fontSize: 10 }}
                            axisLine={{ stroke: 'rgba(48,54,61,0.3)' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#8b949e', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="commits"
                            stroke="#58a6ff"
                            fill="url(#commitGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
