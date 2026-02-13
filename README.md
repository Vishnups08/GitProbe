# 🔍 GitProbe — GitHub Portfolio Analyzer & Enhancer

> **Turn your GitHub profile from invisible to recruiter-ready in under 2 minutes.**


## 📸 Demo


---

## 🎯 The Problem

**87% of student GitHub profiles fail to communicate their skills to recruiters.** Developers spend hundreds of hours coding, but their GitHub profiles — often the first thing a hiring manager checks — are full of missing READMEs, empty descriptions, and inconsistent activity. They have no idea how recruiters actually perceive their work.

**GitProbe fixes that in 30 seconds.**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Portfolio Score** | Overall score (0-100) across 6 weighted dimensions |
| 🤖 **AI Recruiter Simulation** | See your profile through a recruiter's eyes using AI |
| 🎯 **Actionable Recommendations** | Prioritized fixes with time estimates and impact ratings |
| 📦 **Per-Repository Scoring** | Individual repo grades with specific improvement suggestions |
| 📈 **Activity Visualization** | Commit pattern charts with streak detection |
| 💻 **Language Distribution** | Visual breakdown of your tech stack |
| 🔄 **Before & After Preview** | See what your profile looks like NOW vs. what it COULD look like |
| 📄 **Portfolio Resume Generator** | Auto-generate a shareable portfolio summary from your GitHub data |
| 📊 **Benchmark Comparison** | Compare your scores against developer averages |
| 📤 **Export & Share** | Download results as PDF or share via link |
| 💎 **Hidden Strengths** | Discover what you're doing right that you don't even realize |
| ⚡ **Quick Wins** | Things you can fix in under 30 minutes for maximum impact |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│              React + Vite + Tailwind                 │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │   Hero   │ │ Loading  │ │   Results Dashboard  │ │
│  │  Section │ │  State   │ │  ┌────┐ ┌────┐ ┌──┐  │ │
│  │  + Input │ │ (6 steps)│ │  │Score│ │AI  │ │📊│  │ │
│  └──────────┘ └──────────┘ │  │Card │ │View│ │  │  │ │
│                             │  └────┘ └────┘ └──┘  │ │
│                             └──────────────────────┘ │
└────────────────────┬─────────────────────────────────┘
                     │ POST /api/analyze
                     ▼
┌──────────────────────────────────────────────────────┐
│                    BACKEND                           │
│               Node.js + Express                      │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   GitHub     │  │   Scoring    │  │    AI       │  │
│  │   Service    │──│   Engine     │──│   Service   │  │
│  │  (REST API)  │  │ (6 Dimensions│  │ (OpenRouter)│  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
│                    ┌──────────────┐                   │
│                    │Recommendation│                   │
│                    │   Engine     │                   │
│                    └──────────────┘                   │
└──────────────────────────────────────────────────────┘
```

---

## 📊 Scoring Methodology

GitProbe evaluates profiles across **6 weighted dimensions**:

| Dimension | Weight | What We Check |
|---|---|---|
| 📝 **Documentation** | 20% | README quality, descriptions, licenses, badges |
| 🏗️ **Code Structure** | 18% | .gitignore, directory org, tests, config files |
| 📊 **Activity** | 18% | Consistency, streaks, commit volume, diversity |
| 📁 **Repo Organization** | 15% | Descriptions, topics, live demos, meaningful repos |
| 🚀 **Project Impact** | 15% | Stars, forks, real-world projects, deployments |
| ⚡ **Technical Depth** | 14% | Language diversity, complexity, commit messages |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + Vite 7 | Fast SPA with hot reload |
| **Styling** | Tailwind CSS 3 | Utility-first, rapid UI development |
| **Animations** | Framer Motion | Smooth entrance animations |
| **Charts** | Recharts | Activity & language visualizations |
| **Backend** | Node.js + Express | API server with rate limiting |
| **AI** | OpenRouter (GPT) | Recruiter perspective analysis |
| **Data Source** | GitHub REST API v3 | Profile, repos, commits, languages |
| **Hosting** | Vercel + Render | Free-tier deployment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- GitHub Personal Access Token ([get one here](https://github.com/settings/tokens))
- OpenRouter API Key ([free — get one here](https://openrouter.ai/keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/github-portfolio-analyzer.git
cd github-portfolio-analyzer

# Setup backend
cd server
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev

# Setup frontend (new terminal)
cd ../client
npm install
npm run dev
```

### Environment Variables

Create a `server/.env` file:

```env
GITHUB_TOKEN=ghp_your_personal_access_token
OPENROUTER_API_KEY=sk-or-your_openrouter_api_key
PORT=3001
```

The app will be available at `http://localhost:5173`.

---

## 🎬 Demo Video Script

1. **0:00-0:30** — "87% of developer profiles fail to impress recruiters..."
2. **0:30-1:00** — Enter a GitHub URL, hit Analyze
3. **1:00-3:30** — Walk through the results dashboard
4. **3:30-4:15** — Show AI insights + Before/After preview
5. **4:15-5:00** — Export resume, share results

---

## 👥 Team

Built with ❤️ for the hackathon.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
