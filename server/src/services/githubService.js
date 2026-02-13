import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN && {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
    })
};

export async function fetchGitHubData(username) {
    const userResponse = await axios.get(`${GITHUB_API}/users/${username}`, { headers });
    const user = userResponse.data;

    const reposResponse = await axios.get(
        `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&direction=desc`,
        { headers }
    );
    const repos = reposResponse.data.filter(r => !r.fork);
    const allRepos = reposResponse.data;

    const topRepos = repos
        .sort((a, b) => (b.stargazers_count + b.watchers_count) - (a.stargazers_count + a.watchers_count))
        .slice(0, 15);

    const repoDetails = await Promise.all(
        topRepos.map(async (repo) => {
            const details = { ...repo };

            try {
                const readmeResponse = await axios.get(
                    `${GITHUB_API}/repos/${username}/${repo.name}/readme`,
                    { headers: { ...headers, 'Accept': 'application/vnd.github.v3.raw' } }
                );
                details.readmeContent = readmeResponse.data;
                details.hasReadme = true;
            } catch {
                details.readmeContent = '';
                details.hasReadme = false;
            }

            try {
                const langResponse = await axios.get(
                    `${GITHUB_API}/repos/${username}/${repo.name}/languages`,
                    { headers }
                );
                details.languages = langResponse.data;
            } catch {
                details.languages = {};
            }

            try {
                const commitsResponse = await axios.get(
                    `${GITHUB_API}/repos/${username}/${repo.name}/commits?per_page=30`,
                    { headers }
                );
                details.recentCommits = commitsResponse.data;
                details.commitCount = commitsResponse.data.length;
            } catch {
                details.recentCommits = [];
                details.commitCount = 0;
            }

            try {
                const contentsResponse = await axios.get(
                    `${GITHUB_API}/repos/${username}/${repo.name}/contents`,
                    { headers }
                );
                details.rootContents = contentsResponse.data.map(f => ({
                    name: f.name,
                    type: f.type,
                    size: f.size
                }));
            } catch {
                details.rootContents = [];
            }

            return details;
        })
    );

    const languageStats = {};
    repoDetails.forEach(repo => {
        Object.entries(repo.languages || {}).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + bytes;
        });
    });

    let events = [];
    try {
        const eventsResponse = await axios.get(
            `${GITHUB_API}/users/${username}/events/public?per_page=100`,
            { headers }
        );
        events = eventsResponse.data;
    } catch {
        events = [];
    }

    const commitActivity = buildCommitTimeline(events);

    return {
        user,
        repos,
        allRepos,
        repoDetails,
        languageStats,
        commitActivity,
        events,
        totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
        totalForks: repos.reduce((sum, r) => sum + r.forks_count, 0)
    };
}

function buildCommitTimeline(events) {
    const timeline = {};
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    for (let d = new Date(ninetyDaysAgo); d <= now; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        timeline[key] = 0;
    }

    events
        .filter(e => e.type === 'PushEvent')
        .forEach(event => {
            const date = event.created_at.split('T')[0];
            if (timeline[date] !== undefined) {
                timeline[date] += event.payload.commits?.length || 1;
            }
        });

    return Object.entries(timeline).map(([date, count]) => ({
        date,
        commits: count
    }));
}
