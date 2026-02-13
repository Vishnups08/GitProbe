import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card rounded-xl p-6 flex items-center justify-center h-64">
                <p className="text-github-muted">No commit activity available to visualize.</p>
            </div>
        );
    }

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
                <div className="bg-github-card border border-github-border rounded-lg p-3 shadow-xl">
                    <p className="text-github-muted text-xs mb-1">Week of {label}</p>
                    <p className="text-github-accent font-bold text-lg">{payload[0].value} commits</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-github-accent/30 transition-colors duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24 text-github-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </div>

            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2.5 z-10 relative">
                <span className="w-8 h-8 bg-github-accent/10 rounded-lg flex items-center justify-center text-github-accent text-sm">📊</span>
                Commit Activity
                <span className="text-github-muted text-xs font-normal ml-auto bg-github-dark/50 px-2 py-0.5 rounded-full border border-github-border/30">Last 90 Days</span>
            </h3>

            <div className="h-64 w-full z-10 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="week"
                            tick={{ fill: '#8b949e', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            tick={{ fill: '#8b949e', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(88, 166, 255, 0.2)', strokeWidth: 2 }} />
                        <Area
                            type="monotone"
                            dataKey="commits"
                            stroke="#58a6ff"
                            fillOpacity={1}
                            fill="url(#colorCommits)"
                            strokeWidth={3}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
