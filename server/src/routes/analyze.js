import express from 'express';
import { fetchGitHubData } from '../services/githubService.js';
import { calculateScores } from '../services/scoringEngine.js';
import { generateAIInsights } from '../services/aiService.js';
import { generateRecommendations } from '../services/recommendationEngine.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { githubUrl } = req.body;

        if (!githubUrl) {
            return res.status(400).json({ error: 'GitHub profile URL is required' });
        }

        const username = extractUsername(githubUrl);
        if (!username) {
            return res.status(400).json({ error: 'Invalid GitHub URL. Please provide a valid GitHub profile URL.' });
        }

        console.log(`Analyzing profile: ${username}`);

        // Step 1: Fetch all GitHub data
        const githubData = await fetchGitHubData(username);

        // Step 2: Calculate scores
        const scores = calculateScores(githubData);

        // Step 3: Generate AI-powered insights
        const aiInsights = await generateAIInsights(githubData, scores);

        // Step 4: Generate recommendations
        const recommendations = generateRecommendations(githubData, scores);

        const result = {
            username: githubData.user.login,
            avatarUrl: githubData.user.avatar_url,
            profileUrl: githubData.user.html_url,
            name: githubData.user.name,
            bio: githubData.user.bio,
            company: githubData.user.company,
            location: githubData.user.location,
            blog: githubData.user.blog,
            publicRepos: githubData.user.public_repos,
            followers: githubData.user.followers,
            following: githubData.user.following,
            createdAt: githubData.user.created_at,
            overallScore: scores.overall,
            dimensions: scores.dimensions,
            strengths: scores.strengths,
            redFlags: scores.redFlags,
            recommendations: recommendations,
            aiInsights: aiInsights,
            repoAnalysis: scores.repoAnalysis,
            languageStats: githubData.languageStats,
            commitActivity: githubData.commitActivity,
            topRepos: scores.topRepos,
            profileCompleteness: scores.profileCompleteness,
            analyzedAt: new Date().toISOString()
        };

        res.json(result);
    } catch (error) {
        console.error('Analysis error:', error.message);

        if (error.message.includes('Not Found') || error.response?.status === 404) {
            return res.status(404).json({ error: 'GitHub user not found. Please check the URL.' });
        }
        if (error.response?.status === 403) {
            return res.status(429).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
        }

        res.status(500).json({ error: 'Failed to analyze profile. Please try again.' });
    }
});

function extractUsername(url) {
    const cleaned = url.trim().replace(/\/+$/, '');
    if (/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(cleaned)) {
        return cleaned;
    }
    const match = cleaned.match(/github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})\/?$/);
    return match ? match[1] : null;
}

export default router;
