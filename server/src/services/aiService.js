import { OpenRouter } from '@openrouter/sdk';

export async function generateAIInsights(githubData, scores) {
    if (!process.env.OPENROUTER_API_KEY) {
        return generateFallbackInsights(githubData, scores);
    }

    try {
        const openrouter = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const profileSummary = {
            username: githubData.user.login,
            name: githubData.user.name,
            bio: githubData.user.bio,
            publicRepos: githubData.user.public_repos,
            followers: githubData.user.followers,
            totalStars: githubData.totalStars,
            topLanguages: Object.entries(githubData.languageStats)
                .sort((a, b) => b[1] - a[1]).slice(0, 5).map(([lang]) => lang),
            overallScore: scores.overall,
            dimensionScores: Object.entries(scores.dimensions).map(([key, dim]) => ({
                area: dim.label, score: dim.score
            })),
            topRepos: githubData.repoDetails.slice(0, 5).map(r => ({
                name: r.name, description: r.description, language: r.language,
                stars: r.stargazers_count, hasReadme: r.hasReadme,
                readmePreview: r.readmeContent?.substring(0, 300) || 'No README'
            })),
            redFlags: scores.redFlags.map(r => r.message),
            strengths: scores.strengths.map(s => s.message)
        };

        const prompt = `You are a senior tech recruiter and GitHub profile reviewer. Analyze this GitHub profile data and provide actionable insights.

Profile Data:
${JSON.stringify(profileSummary, null, 2)}

Provide a JSON response with exactly this structure (no markdown, just pure JSON):
{
  "recruiterPerspective": "A 2-3 sentence summary of how a recruiter would view this profile",
  "topPriority": "The single most impactful thing this developer should do right now",
  "readmeAdvice": "Specific advice about their README quality",
  "commitAdvice": "Advice about their commit patterns and messages",
  "projectStorytelling": "How they can better tell the story of their projects to impress recruiters",
  "hiddenStrengths": ["List", "of", "strengths", "they", "might", "not", "realize"],
  "quickWins": ["3-5 things they can fix in under 30 minutes each"]
}`;

        // Use streaming to collect the full response
        const stream = await openrouter.chat.send({
            model: 'openai/gpt-oss-120b:free',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            stream: true,
        });

        let response = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                response += content;
            }
        }

        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return generateFallbackInsights(githubData, scores);
    } catch (error) {
        console.error('AI insights error:', error.message);
        return generateFallbackInsights(githubData, scores);
    }
}

function generateFallbackInsights(githubData, scores) {
    const topLanguages = Object.entries(githubData.languageStats)
        .sort((a, b) => b[1] - a[1]).slice(0, 3).map(([lang]) => lang);

    return {
        recruiterPerspective: `This profile shows a developer with experience in ${topLanguages.join(', ') || 'various technologies'}. With an overall score of ${scores.overall}/100, there's ${scores.overall >= 60 ? 'a solid foundation to build upon' : 'significant room for improvement'}.`,
        topPriority: scores.overall < 50
            ? 'Focus on adding comprehensive READMEs to your top 3 projects with screenshots, setup instructions, and tech stack descriptions.'
            : 'Increase your commit consistency and add live deployment links to your best projects.',
        readmeAdvice: 'Every project README should include: 1) A compelling one-line description, 2) Screenshot/demo GIF, 3) Tech stack used, 4) How to install and run, 5) Key features, 6) What you learned.',
        commitAdvice: 'Use conventional commit messages (feat:, fix:, docs:) and aim for daily commits.',
        projectStorytelling: 'Frame projects as solutions to problems. Instead of "Todo App", say "Full-stack task management app with real-time sync."',
        hiddenStrengths: topLanguages.length > 0
            ? [`Proficiency in ${topLanguages[0]}`, 'Willingness to build and share publicly']
            : ['Building projects publicly shows initiative'],
        quickWins: [
            'Add a professional bio and profile picture',
            'Pin your 6 best repositories',
            'Add topics/tags to all repositories',
            'Write a README for your top project',
            'Add a live demo link to at least one project'
        ]
    };
}
