export function generateRecommendations(githubData, scores) {
    const recommendations = [];
    const { dimensions } = scores;
    const { user, repoDetails, repos } = githubData;

    if (!user.bio) {
        recommendations.push({
            priority: 'high', category: 'Profile', title: 'Add a professional bio',
            description: 'Your GitHub bio is the first thing recruiters see. Add a concise bio mentioning your role, skills, and interests.',
            example: `Example: "Full-stack developer passionate about building scalable web apps. Experienced in ${getTopLanguages(githubData, 3).join(', ')}."`,
            timeEstimate: '2 minutes', impact: 'high'
        });
    }

    if (!user.blog) {
        recommendations.push({
            priority: 'medium', category: 'Profile', title: 'Add a portfolio/website link',
            description: 'Link to your portfolio, LinkedIn, or personal website.',
            timeEstimate: '1 minute', impact: 'medium'
        });
    }

    const reposWithoutReadme = repoDetails.filter(r => !r.hasReadme);
    if (reposWithoutReadme.length > 0) {
        recommendations.push({
            priority: 'high', category: 'Documentation',
            title: `Add READMEs to ${reposWithoutReadme.length} repositories`,
            description: `These repos need READMEs: ${reposWithoutReadme.slice(0, 3).map(r => r.name).join(', ')}${reposWithoutReadme.length > 3 ? '...' : ''}`,
            example: 'A good README includes: Project title, description, screenshots, tech stack, installation steps, usage, and what you learned.',
            timeEstimate: '15-30 minutes per repo', impact: 'high'
        });
    }

    const shortReadmes = repoDetails.filter(r => r.hasReadme && (r.readmeContent?.length || 0) < 500);
    if (shortReadmes.length > 0) {
        recommendations.push({
            priority: 'high', category: 'Documentation',
            title: `Expand READMEs for ${shortReadmes.length} repositories`,
            description: `These repos have minimal READMEs: ${shortReadmes.slice(0, 3).map(r => r.name).join(', ')}.`,
            timeEstimate: '15 minutes per repo', impact: 'high'
        });
    }

    const noDescription = repos.filter(r => !r.description || r.description.length < 10);
    if (noDescription.length > 0) {
        recommendations.push({
            priority: 'medium', category: 'Organization',
            title: `Add descriptions to ${noDescription.length} repositories`,
            description: 'Repository descriptions appear in search results and your profile.',
            example: 'Bad: "my project"\nGood: "Real-time chat app built with Socket.io, React, MongoDB"',
            timeEstimate: '5 minutes total', impact: 'medium'
        });
    }

    const noTopics = repos.filter(r => !r.topics || r.topics.length === 0);
    if (noTopics.length > repos.length * 0.5) {
        recommendations.push({
            priority: 'medium', category: 'Discoverability', title: 'Add topics to your repositories',
            description: 'Topics help recruiters discover your projects.',
            example: 'Example topics: react, nodejs, machine-learning, rest-api, fullstack',
            timeEstimate: '5 minutes total', impact: 'medium'
        });
    }

    const noHomepage = repoDetails.filter(r => !r.homepage || r.homepage === '');
    if (noHomepage.length > repoDetails.length * 0.7) {
        recommendations.push({
            priority: 'medium', category: 'Impact', title: 'Deploy projects and add live demo links',
            description: 'Deployed projects are 3x more impressive to recruiters.',
            timeEstimate: '15-30 minutes per project', impact: 'high'
        });
    }

    if (dimensions.activityConsistency.score < 40) {
        recommendations.push({
            priority: 'high', category: 'Consistency', title: 'Build a daily commit habit',
            description: 'Recruiters check the contribution graph. Aim for 4-5 days per week.',
            example: 'Tip: Work on a side project 30 mins daily.',
            timeEstimate: 'Ongoing — 30 mins/day', impact: 'high'
        });
    }

    if (dimensions.codeStructure.score < 50) {
        const noGitignore = repoDetails.filter(r => !r.rootContents?.some(f => f.name === '.gitignore')).length;
        recommendations.push({
            priority: 'medium', category: 'Code Quality', title: 'Improve project structure',
            description: `Add .gitignore (${noGitignore} repos missing it), organize code into directories (src/, tests/, docs/).`,
            timeEstimate: '10 minutes per repo', impact: 'medium'
        });
    }

    recommendations.push({
        priority: 'low', category: 'Profile', title: 'Pin your 6 best repositories',
        description: 'Pinned repos are the first thing visitors see. Choose your most impressive projects.',
        timeEstimate: '2 minutes', impact: 'medium'
    });

    const weakRepos = repos.filter(r => r.size < 10 || (!r.description && r.stargazers_count === 0));
    if (weakRepos.length > 3) {
        recommendations.push({
            priority: 'low', category: 'Organization',
            title: `Archive ${weakRepos.length} weak repositories`,
            description: 'Empty or trivial repos dilute your profile.',
            timeEstimate: '5 minutes', impact: 'medium'
        });
    }

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    return recommendations;
}

function getTopLanguages(githubData, count) {
    return Object.entries(githubData.languageStats)
        .sort((a, b) => b[1] - a[1]).slice(0, count).map(([lang]) => lang);
}
