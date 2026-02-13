# 🔍 GitProbe — GitHub Portfolio Analyzer & Enhancer

> **Turn your GitHub profile from invisible to recruiter-ready in under 2 minutes.**

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-gitprobe08.netlify.app-58a6ff?style=for-the-badge)](https://gitprobe08.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Vishnups08/GitProbe)
[![Built With](https://img.shields.io/badge/Built_With-React_+_Node.js-3fb950?style=for-the-badge)]()
[![AI Powered](https://img.shields.io/badge/AI_Powered-ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)]()

---

## 📹 Demo Video

> **🎬 Watch GitProbe in action:**

https://github.com/user-attachments/assets/17bf2b19-253b-4198-8484-f4ee0d23b0c4

## 🎯 The Problem

For many students and early-career developers, **GitHub is their primary portfolio**. Yet most profiles silently fail to impress recruiters:

- **87% of student repos** lack proper READMEs or documentation
- **Inconsistent commit history** raises reliability concerns
- **No project storytelling** — recruiters can't understand the impact of your work
- **Poor repository hygiene** — empty repos, missing descriptions, no live demos

> *A strong GitHub profile opens doors. A weak one silently closes them.*

**The result?** Talented developers get overlooked because their GitHub doesn't communicate their true ability.

---

## ✨ What GitProbe Does

GitProbe analyzes any public GitHub profile **exactly like a tech recruiter would** and provides:

### 📊 Objective Portfolio Score
A weighted score across **6 recruiter-focused dimensions**, giving you a clear picture of where you stand.

### 🤖 AI-Powered Recruiter Perspective
Powered by Google Gemini / OpenRouter, GitProbe generates a **"Recruiter's First Impression"** — what a hiring manager would think within 30 seconds of viewing your profile.

### 🎯 Prioritized Action Plan
Not generic advice — **specific recommendations** referencing your actual repositories, with priority levels and time estimates.

### 📦 Per-Repository Analysis
Individual scores for each repo showing exactly what's missing — README, license, description, tests, live demo link.

### 📈 Visual Analytics
Commit activity charts and language distribution to visualize your coding patterns and tech diversity.

### 🏷️ Repository Triage
Categorizes your repos into:
- 🌟 **Showcase** — Pin these, they're your best work
- 🔧 **Improve** — Good projects that need polish
- �️ **Archive** — These are hurting your profile

---

## 🖥️ Screenshots

### Landing Page & Dashboard
*(Add your screenshots here)*

---

## 📊 Scoring Methodology

GitProbe evaluates profiles across **6 dimensions** with weighted scoring:

| Dimension | Weight | What It Measures |
|---|---|---|
| � **Documentation Quality** | 20% | README presence, depth, structure, screenshots, setup instructions, licenses |
| 🏗️ **Code Structure & Best Practices** | 18% | .gitignore, directory organization, dependency management, tests, CI/CD configs |
| � **Activity Consistency** | 18% | Active days ratio, commit streaks, total volume, activity diversity (issues, PRs) |
| 📁 **Repository Organization** | 15% | Descriptions, topics/tags, live demo links, meaningful vs empty repo ratio |
| 🚀 **Project Impact & Relevance** | 15% | Stars, forks, real-world project indicators, deployed projects, community engagement |
| ⚡ **Technical Depth** | 14% | Language diversity, project complexity, commit message quality, advanced tooling |

### Score Ranges
| Score | Label | Color | Meaning |
|---|---|---|---|
| 80-100 | 🟢 Excellent | Green | Recruiter-ready, impressive profile |
| 60-79 | 🟢 Good | Light Green | Strong foundation, minor improvements needed |
| 40-59 | 🟡 Average | Yellow | Noticeable gaps, needs focused improvement |
| 20-39 | 🟠 Needs Work | Orange | Significant issues, recruiters may pass |
| 0-19 | 🔴 Critical | Red | Major overhaul needed |

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│   React         │────▶│  Node.js/Express │────▶│  GitHub REST    │
│   Frontend      │     │  Backend API     │     │  API v3         │
│   (Netlify)     │◀────│  (Render)        │◀────│                 │
│                 │     │                  │     └─────────────────┘
└─────────────────┘     │                  │
                        │                  │     ┌─────────────────┐
                        │                  │────▶│  Google Gemini  │
                        │                  │◀────│  AI API         │
                        └──────────────────┘     └─────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | Fast, component-based UI |
| **Styling** | Tailwind CSS | GitHub-themed dark mode design |
| **Charts** | Recharts | Commit activity & language visualizations |
| **Backend** | Node.js + Express | API orchestration & scoring logic |
| **AI Engine** | Google Gemini API | README analysis, recruiter insights |
| **Data Source** | GitHub REST API v3 | Profile, repos, commits, languages |
| **Frontend Hosting** | Netlify | Free, fast CDN deployment |
| **Backend Hosting** | Render | Free tier API hosting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- GitHub Personal Access Token ([create one here](https://github.com/settings/tokens))
- OpenRouter / Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Vishnups08/GitProbe.git
cd GitProbe
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
GITHUB_TOKEN=ghp_your_github_personal_access_token
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=3001
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (if using deployed backend):
```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:
```bash
npm run dev
```

---

## 🔮 Features in Detail

### 1. Smart Profile Analysis
- Fetches up to 100 public repositories
- Analyzes top 15 repos in depth
- Separates original work from forks

### 2. AI-Powered Insights
- **Recruiter's First Impression** — What a hiring manager notices in 30 seconds
- **#1 Priority Fix** — The single most impactful improvement
- **Project Storytelling Tips** — How to reframe projects
- **Hidden Strengths** — Positives you might not realize

### 3. Actionable Recommendations
- **Priority level** (High / Medium / Quick Win)
- **Specific repo names** referenced
- **Time estimate** for implementation

---

## � Author

**Vishnu PS**

[![GitHub](https://img.shields.io/badge/GitHub-Vishnups08-181717?style=flat-square&logo=github)](https://github.com/Vishnups08)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

