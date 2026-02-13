export function calculateScores(githubData) {
    const { user, repos, repoDetails, languageStats, commitActivity, events } = githubData;

    const documentation = scoreDocumentation(repoDetails);
    const codeStructure = scoreCodeStructure(repoDetails);
    const activityConsistency = scoreActivityConsistency(commitActivity, events, user);
    const repoOrganization = scoreRepoOrganization(repos, repoDetails);
    const projectImpact = scoreProjectImpact(repos, githubData);
    const technicalDepth = scoreTechnicalDepth(repoDetails, languageStats);
    const profileCompleteness = scoreProfileCompleteness(user);

    const dimensions = {
        documentation: {
            score: documentation.score, maxScore: 100,
            label: 'Documentation', details: documentation.details, icon: '📝'
        },
        codeStructure: {
            score: codeStructure.score, maxScore: 100,
            label: 'Code Structure', details: codeStructure.details, icon: '🏗️'
        },
        activityConsistency: {
            score: activityConsistency.score, maxScore: 100,
            label: 'Activity', details: activityConsistency.details, icon: '📊'
        },
        repoOrganization: {
            score: repoOrganization.score, maxScore: 100,
            label: 'Repo Org', details: repoOrganization.details, icon: '📁'
        },
        projectImpact: {
            score: projectImpact.score, maxScore: 100,
            label: 'Project Impact', details: projectImpact.details, icon: '🚀'
        },
        technicalDepth: {
            score: technicalDepth.score, maxScore: 100,
            label: 'Technical Depth', details: technicalDepth.details, icon: '⚡'
        }
    };

    const overall = Math.round(
        dimensions.documentation.score * 0.20 +
        dimensions.codeStructure.score * 0.18 +
        dimensions.activityConsistency.score * 0.18 +
        dimensions.repoOrganization.score * 0.15 +
        dimensions.projectImpact.score * 0.15 +
        dimensions.technicalDepth.score * 0.14
    );

    const strengths = identifyStrengths(dimensions, githubData);
    const redFlags = identifyRedFlags(dimensions, githubData);

    const repoAnalysis = repoDetails.slice(0, 10).map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        hasReadme: repo.hasReadme,
        readmeLength: repo.readmeContent?.length || 0,
        hasLicense: repo.rootContents?.some(f => f.name.toLowerCase().includes('license')),
        hasGitignore: repo.rootContents?.some(f => f.name === '.gitignore'),
        hasLiveDemo: !!(repo.homepage && repo.homepage.length > 0),
        lastUpdated: repo.updated_at,
        isPublic: !repo.private,
        score: calculateRepoScore(repo)
    }));

    const topRepos = repoAnalysis.sort((a, b) => b.score - a.score).slice(0, 5);

    return { overall, dimensions, strengths, redFlags, repoAnalysis, topRepos, profileCompleteness };
}

function scoreDocumentation(repoDetails) {
    let score = 0;
    const details = [];
    if (repoDetails.length === 0) return { score: 0, details: ['No repositories to analyze'] };

    const readmeCount = repoDetails.filter(r => r.hasReadme).length;
    const readmeRatio = readmeCount / repoDetails.length;
    score += readmeRatio * 30;

    if (readmeRatio >= 0.8) details.push(`✅ ${readmeCount}/${repoDetails.length} repos have READMEs`);
    else if (readmeRatio >= 0.5) details.push(`⚠️ Only ${readmeCount}/${repoDetails.length} repos have READMEs`);
    else details.push(`❌ Only ${readmeCount}/${repoDetails.length} repos have READMEs`);

    const readmeQualities = repoDetails.filter(r => r.hasReadme).map(r => {
        const content = r.readmeContent || '';
        let quality = 0;
        if (content.length > 2000) quality += 3;
        else if (content.length > 500) quality += 2;
        else if (content.length > 100) quality += 1;
        if ((content.match(/^#{1,3}\s/gm) || []).length >= 3) quality += 2;
        if (content.includes('```')) quality += 2;
        if (content.includes('![') || content.includes('<img')) quality += 2;
        if (/install|setup|getting started|how to run|usage/i.test(content)) quality += 2;
        if (content.includes('[![') || content.includes('shields.io')) quality += 1;
        if ((content.match(/\[.*\]\(.*\)/g) || []).length >= 2) quality += 1;
        if (/tech|stack|built with|technologies|framework/i.test(content)) quality += 1;
        if (/features|what it does|capabilities/i.test(content)) quality += 1;
        return quality;
    });

    if (readmeQualities.length > 0) {
        const avgQuality = readmeQualities.reduce((a, b) => a + b, 0) / readmeQualities.length;
        score += Math.min(avgQuality / 15 * 40, 40);
        if (avgQuality >= 10) details.push('✅ READMEs are well-structured with sections, code, and visuals');
        else if (avgQuality >= 6) details.push('⚠️ READMEs could use more structure and screenshots');
        else details.push('❌ READMEs need significant improvement');
    }

    const descCount = repoDetails.filter(r => r.description && r.description.length > 10).length;
    score += (descCount / repoDetails.length) * 15;
    if (descCount / repoDetails.length >= 0.8) details.push('✅ Repos have meaningful descriptions');
    else details.push(`⚠️ ${repoDetails.length - descCount} repos missing descriptions`);

    const licenseCount = repoDetails.filter(r => r.rootContents?.some(f => f.name.toLowerCase().includes('license'))).length;
    score += (licenseCount / repoDetails.length) * 15;
    if (licenseCount > repoDetails.length * 0.5) details.push('✅ Most repos include licenses');
    else details.push('⚠️ Consider adding licenses to your repositories');

    return { score: Math.round(Math.min(score, 100)), details };
}

function scoreCodeStructure(repoDetails) {
    let score = 0;
    const details = [];
    if (repoDetails.length === 0) return { score: 0, details: ['No repositories to analyze'] };

    const structureScores = repoDetails.map(repo => {
        let repoScore = 0;
        const contents = repo.rootContents || [];
        const fileNames = contents.map(f => f.name.toLowerCase());

        if (fileNames.includes('.gitignore')) repoScore += 15;
        const depFiles = ['package.json', 'requirements.txt', 'pipfile', 'cargo.toml', 'pom.xml', 'build.gradle', 'gemfile', 'go.mod'];
        if (depFiles.some(f => fileNames.includes(f))) repoScore += 15;
        const goodDirs = ['src', 'lib', 'app', 'tests', 'test', 'docs', 'public', 'components', 'utils', 'config', 'assets'];
        const dirCount = contents.filter(f => f.type === 'dir' && goodDirs.includes(f.name.toLowerCase())).length;
        repoScore += Math.min(dirCount * 10, 30);
        const configFiles = ['.eslintrc', '.prettierrc', 'tsconfig.json', '.editorconfig', 'dockerfile', 'docker-compose.yml', '.github'];
        const configCount = configFiles.filter(f => fileNames.some(fn => fn.includes(f.replace('.', '')))).length;
        repoScore += Math.min(configCount * 10, 20);
        const rootFiles = contents.filter(f => f.type === 'file').length;
        if (rootFiles <= 8) repoScore += 10;
        else if (rootFiles <= 15) repoScore += 5;
        if (contents.some(f => f.name.toLowerCase().includes('test'))) repoScore += 10;
        return repoScore;
    });

    const avgStructure = structureScores.reduce((a, b) => a + b, 0) / structureScores.length;
    score = Math.min(avgStructure, 100);

    const gitignoreCount = repoDetails.filter(r => r.rootContents?.some(f => f.name === '.gitignore')).length;
    if (gitignoreCount >= repoDetails.length * 0.8) details.push('✅ Good use of .gitignore across repos');
    else details.push(`⚠️ ${repoDetails.length - gitignoreCount} repos missing .gitignore`);

    const testCount = repoDetails.filter(r => r.rootContents?.some(f => f.name.toLowerCase().includes('test'))).length;
    if (testCount >= repoDetails.length * 0.3) details.push('✅ Some repos include test directories');
    else details.push('❌ Very few repos have tests');

    const configFileRepos = repoDetails.filter(r =>
        r.rootContents?.some(f =>
            ['dockerfile', '.eslintrc', 'tsconfig', '.prettierrc'].some(c =>
                f.name.toLowerCase().includes(c)
            )
        )
    ).length;
    if (configFileRepos > 0) details.push('✅ Some repos use linting/config tools');
    else details.push('💡 Consider adding linting, CI/CD, or Docker configurations');

    return { score: Math.round(score), details };
}

function scoreActivityConsistency(commitActivity, events, user) {
    let score = 0;
    const details = [];

    const activeDays = commitActivity.filter(d => d.commits > 0).length;
    const totalDays = commitActivity.length || 90;
    const activeRatio = activeDays / totalDays;

    if (activeRatio >= 0.4) { score += 40; details.push(`✅ Active on ${activeDays}/${totalDays} days — excellent consistency`); }
    else if (activeRatio >= 0.2) { score += 25; details.push(`⚠️ Active on ${activeDays}/${totalDays} days — moderate consistency`); }
    else if (activeRatio >= 0.05) { score += 12; details.push(`❌ Active on only ${activeDays}/${totalDays} days`); }
    else { score += 3; details.push('❌ Very low recent activity'); }

    let maxStreak = 0, currentStreak = 0;
    commitActivity.forEach(d => {
        if (d.commits > 0) { currentStreak++; maxStreak = Math.max(maxStreak, currentStreak); }
        else { currentStreak = 0; }
    });

    if (maxStreak >= 14) { score += 25; details.push(`✅ Best streak: ${maxStreak} consecutive days`); }
    else if (maxStreak >= 7) { score += 15; details.push(`⚠️ Best streak: ${maxStreak} days`); }
    else { score += 5; details.push(`❌ Best streak: ${maxStreak} days`); }

    const totalCommits = commitActivity.reduce((sum, d) => sum + d.commits, 0);
    if (totalCommits >= 100) { score += 20; details.push(`✅ ${totalCommits} commits in last 90 days`); }
    else if (totalCommits >= 30) { score += 12; details.push(`⚠️ ${totalCommits} commits in last 90 days`); }
    else { score += 3; details.push(`❌ Only ${totalCommits} commits in last 90 days`); }

    const eventTypes = new Set(events.map(e => e.type));
    if (eventTypes.size >= 4) { score += 15; details.push('✅ Diverse activity: commits, issues, PRs, reviews'); }
    else if (eventTypes.size >= 2) { score += 8; details.push('⚠️ Activity is mostly commits'); }
    else { score += 2; }

    return { score: Math.round(Math.min(score, 100)), details };
}

function scoreRepoOrganization(repos, repoDetails) {
    let score = 0;
    const details = [];
    const repoCount = repos.length;

    if (repoCount >= 10) score += 15;
    else if (repoCount >= 5) score += 10;
    else { score += 5; details.push('⚠️ Few public repositories'); }

    const withDesc = repos.filter(r => r.description && r.description.length > 10).length;
    score += (repoCount > 0 ? withDesc / repoCount : 0) * 20;

    const withTopics = repos.filter(r => r.topics && r.topics.length > 0).length;
    const topicRatio = repoCount > 0 ? withTopics / repoCount : 0;
    score += topicRatio * 20;
    if (topicRatio >= 0.3) details.push('✅ Good use of repository topics/tags');
    else details.push('💡 Add topics to repos for discoverability');

    const withHomepage = repos.filter(r => r.homepage && r.homepage.length > 0).length;
    if (withHomepage > 0) { score += 15; details.push(`✅ ${withHomepage} repos have live demo links`); }
    else details.push('💡 Add live demo links to showcase projects');

    const substantialRepos = repos.filter(r => r.size > 50).length;
    score += (repoCount > 0 ? substantialRepos / repoCount : 0) * 15;
    if (substantialRepos / repoCount < 0.5) details.push('⚠️ Several repos appear empty or trivial');

    const pinnedCandidates = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
    const pinnedQuality = pinnedCandidates.filter(r => r.description && r.readmeContent).length;
    score += (pinnedQuality / 6) * 15;

    return { score: Math.round(Math.min(score, 100)), details };
}

function scoreProjectImpact(repos, githubData) {
    let score = 0;
    const details = [];
    const totalStars = githubData.totalStars;
    const totalForks = githubData.totalForks;

    if (totalStars >= 50) { score += 25; details.push(`✅ ${totalStars} total stars`); }
    else if (totalStars >= 10) { score += 15; details.push(`⚠️ ${totalStars} total stars`); }
    else if (totalStars >= 1) { score += 8; details.push(`💡 ${totalStars} total stars`); }
    else { score += 2; details.push('❌ No stars yet'); }

    if (totalForks >= 10) { score += 15; details.push(`✅ ${totalForks} forks`); }
    else if (totalForks >= 2) { score += 8; }

    const realWorldIndicators = repos.filter(r => {
        const desc = (r.description || '').toLowerCase();
        const hasDeployment = r.homepage && r.homepage.length > 0;
        const realWorldKeywords = ['api', 'app', 'dashboard', 'platform', 'tool', 'bot', 'cli', 'extension', 'plugin', 'service', 'system'];
        return hasDeployment || realWorldKeywords.some(k => desc.includes(k) || r.name.toLowerCase().includes(k));
    }).length;

    score += Math.min(realWorldIndicators * 8, 30);
    if (realWorldIndicators >= 3) details.push('✅ Multiple real-world projects');
    else details.push('💡 Build projects that solve real problems');

    const languages = new Set(repos.map(r => r.language).filter(Boolean));
    if (languages.size >= 4) { score += 15; details.push(`✅ Projects across ${languages.size} languages`); }
    else if (languages.size >= 2) { score += 8; }

    if (githubData.user.followers >= 50) score += 15;
    else if (githubData.user.followers >= 10) score += 8;
    else score += 2;

    return { score: Math.round(Math.min(score, 100)), details };
}

function scoreTechnicalDepth(repoDetails, languageStats) {
    let score = 0;
    const details = [];
    const languages = Object.keys(languageStats);

    if (languages.length >= 5) { score += 20; details.push(`✅ Proficiency across ${languages.length} languages`); }
    else if (languages.length >= 3) { score += 12; details.push(`⚠️ ${languages.length} languages`); }
    else { score += 5; details.push('❌ Limited language diversity'); }

    const complexityIndicators = repoDetails.map(repo => {
        let complexity = 0;
        const contents = repo.rootContents || [];
        const fileNames = contents.map(f => f.name.toLowerCase());
        complexity += Math.min(contents.filter(f => f.type === 'dir').length * 2, 10);
        if (fileNames.some(f => f.includes('test'))) complexity += 5;
        if (fileNames.includes('.github') || fileNames.some(f => f.includes('ci'))) complexity += 5;
        if (fileNames.some(f => f.includes('docker'))) complexity += 5;
        if (fileNames.some(f => f.includes('.env') || f.includes('config'))) complexity += 3;
        if (Object.keys(repo.languages || {}).length >= 3) complexity += 5;
        if (repo.size > 1000) complexity += 5;
        else if (repo.size > 200) complexity += 3;
        return complexity;
    });

    if (complexityIndicators.length > 0) {
        const avgComplexity = complexityIndicators.reduce((a, b) => a + b, 0) / complexityIndicators.length;
        score += Math.min(avgComplexity * 2, 40);
        if (avgComplexity >= 15) details.push('✅ Projects show good technical depth');
        else if (avgComplexity >= 8) details.push('⚠️ Moderate complexity');
        else details.push('❌ Projects appear simple');
    }

    const allCommits = repoDetails.flatMap(r => r.recentCommits || []);
    const sampleCommits = allCommits.slice(0, 30);
    if (sampleCommits.length > 0) {
        const goodCommits = sampleCommits.filter(c => {
            const msg = c.commit?.message || '';
            return msg.length > 10 && !/^(update|fix|test|wip|asdf|commit|changes|\.)\s*$/i.test(msg);
        }).length;
        score += (goodCommits / sampleCommits.length) * 20;
        if (goodCommits / sampleCommits.length >= 0.7) details.push('✅ Descriptive commit messages');
        else if (goodCommits / sampleCommits.length >= 0.4) details.push('⚠️ Some commit messages need improvement');
        else details.push('❌ Commit messages are vague');
    }

    const advancedTech = ['TypeScript', 'Rust', 'Go', 'Kotlin', 'Swift'];
    if (languages.some(l => advancedTech.includes(l))) {
        score += 10;
        details.push('✅ Uses modern/advanced languages');
    }

    return { score: Math.round(Math.min(score, 100)), details };
}

function scoreProfileCompleteness(user) {
    const fields = {
        name: !!user.name, bio: !!user.bio, company: !!user.company,
        location: !!user.location, blog: !!user.blog,
        avatar: !!user.avatar_url && !user.avatar_url.includes('identicon'),
        hireable: user.hireable === true, twitter: !!user.twitter_username
    };
    const completed = Object.values(fields).filter(Boolean).length;
    return { score: Math.round((completed / Object.keys(fields).length) * 100), fields, completed, total: Object.keys(fields).length };
}

function identifyStrengths(dimensions, githubData) {
    const strengths = [];
    Object.entries(dimensions).forEach(([key, dim]) => {
        if (dim.score >= 70) strengths.push({ area: dim.label, score: dim.score, message: `Strong ${dim.label.toLowerCase()} (${dim.score}/100)` });
    });
    if (githubData.totalStars >= 10) strengths.push({ area: 'Community', message: `${githubData.totalStars} stars shows community interest` });
    if (githubData.user.followers >= 10) strengths.push({ area: 'Network', message: `${githubData.user.followers} followers` });
    const languages = Object.keys(githubData.languageStats);
    if (languages.length >= 4) strengths.push({ area: 'Versatility', message: `Proficiency across ${languages.length} languages` });
    return strengths;
}

function identifyRedFlags(dimensions, githubData) {
    const redFlags = [];
    Object.entries(dimensions).forEach(([key, dim]) => {
        if (dim.score < 30) redFlags.push({ area: dim.label, score: dim.score, severity: 'high', message: `${dim.label} needs significant improvement (${dim.score}/100)` });
        else if (dim.score < 50) redFlags.push({ area: dim.label, score: dim.score, severity: 'medium', message: `${dim.label} is below average (${dim.score}/100)` });
    });
    const reposWithoutReadme = githubData.repoDetails.filter(r => !r.hasReadme).length;
    if (reposWithoutReadme > githubData.repoDetails.length * 0.5) {
        redFlags.push({ area: 'Missing READMEs', severity: 'high', message: `${reposWithoutReadme} of ${githubData.repoDetails.length} repos lack READMEs` });
    }
    if (githubData.repos.length < 3) {
        redFlags.push({ area: 'Low Repos', severity: 'medium', message: 'Very few public repositories' });
    }
    const emptyRepos = githubData.repos.filter(r => r.size < 10).length;
    if (emptyRepos > 3) {
        redFlags.push({ area: 'Empty Repos', severity: 'medium', message: `${emptyRepos} repos appear empty` });
    }
    return redFlags;
}

function calculateRepoScore(repo) {
    let score = 0;
    if (repo.hasReadme) score += 20;
    if (repo.readmeContent?.length > 500) score += 10;
    if (repo.readmeContent?.length > 2000) score += 10;
    if (repo.description) score += 10;
    if (repo.rootContents?.some(f => f.name === '.gitignore')) score += 5;
    if (repo.rootContents?.some(f => f.name.toLowerCase().includes('license'))) score += 5;
    if (repo.stargazers_count > 0) score += 10;
    if (repo.forks_count > 0) score += 5;
    if (repo.homepage) score += 10;
    if (repo.topics?.length > 0) score += 5;
    if (repo.commitCount >= 10) score += 10;
    return Math.min(score, 100);
}
