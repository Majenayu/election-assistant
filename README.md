# Election Assistant

An interactive election information platform built with Next.js, featuring AI-powered chatbot, quizzes, timeline visualization, and election simulation tools.

## Features

- 💻 **AI-Driven Voter Profile** - Get a personalized voter profile with tailored election insights and recommendations


- 💡 **Personalized Voting Recommendations** - Get tailored voting suggestions based on your values and preferences


- 💻 **Election Impact Simulator** - Explore the real-world consequences of election outcomes and discover how your vote can shape the future


- 💡 **Emotional Intelligence Analysis** - Unlock the emotional intelligence of election candidates and discover how their personalities shape their policies


- 🔮 **Virtual Election Experience** - Step into a virtual voting booth and engage with immersive election simulations


- 📈 **Election Influencer Analysis** - Uncover the social media influence of election candidates and gain a deeper understanding of the election landscape


- 🗺️ **Interactive Election Map** - Explore election data and trends geographically


- 🔍 **Augmented Reality Candidate Comparison** - Compare candidate information in an immersive AR environment


- 📊 **Election Forecasting** - Predict election outcomes based on user interactions and sentiment analysis


- 🗳️ **Personalized Election Recommendation Engine** - Receive tailored candidate and voting recommendations based on your interests and values


- 🗣️ **AI-Driven Election Debate Simulator** - Engage in simulated debates with AI-powered candidates to enhance critical thinking and decision-making skills


- 📊 **Election Sentiment Analysis** - Analyze user opinions and emotions towards candidates and election issues, providing personalized insights


- 🌐 **Virtual Reality Election Experience** - Explore election data and scenarios in an immersive 3D environment


- 📊 **Virtual Election Scenario Planner** - Create and simulate custom election scenarios to explore different voting strategies and their potential outcomes


- 🗺️ **Interactive Election Map** - Explore election data and trends in an immersive and interactive map


- 📊 **Election Outcome Impact Simulator** - Simulate the impact of your vote on election outcomes and explore the electoral process in an interactive and immersive way


- ⚖️ **Election Predictive Modeling** - Forecast election outcomes with AI-driven predictive analytics and interactive visualizations


- 🤖 **Personalized Election Recommendations** - Receive tailored election information and candidate suggestions based on your interests and values


- 🤖 **AI-Driven Election Debates** - Engage in virtual debates with AI-powered candidates for enhanced civic engagement and education


- 📈 **Augmented Reality Election Visualization** - Visualize election data in 3D with interactive AR technology


- 📊 **Election Issue Tracker** - Track and receive updates on election issues that matter to you


- 🗺️ **Election Influencer Map** - Explore key influencers and their impact on elections with interactive visualizations


- 🌐 **Virtual Election Simulator** - Immersive and interactive election simulations for enhanced civic engagement


- 💡 **Election Emotion Analysis** - Analyze public sentiment and emotional trends in election-related news and social media posts


- 🎙️ **Voice Navigation** - Navigate using voice commands for enhanced accessibility


- 🔮 **Election Forecasting** - Predict election outcomes with machine learning models


- 🗳️ **Personalized Election Recommendations** - Get tailored candidate suggestions and election insights based on your interests


- 🎙️ **Voice Navigation** - Navigate using voice commands for enhanced accessibility


- ⚡ **Performance Optimized** - Fast loading with code splitting and lazy loading


- ⚡ **Performance Optimized** - Fast loading with code splitting and lazy loading


- ⚡ **Performance Optimized** - Fast loading with code splitting and lazy loading


- 🤖 **AI Voice Chatbot** - Powered by Google Gemini AI
- 📝 **Interactive Quiz** - Test your election knowledge
- 📅 **Timeline View** - Visualize election milestones
- 📊 **Data Visualization** - Election statistics and insights
- 🎮 **Election Simulator** - Simulate election scenarios
- 🌐 **Multi-language Support** - Accessible to diverse audiences
- 🌓 **Dark Mode** - Eye-friendly interface
- 📱 **PWA Support** - Install as a mobile app

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Gemini API key to `.env`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
election-assistant/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility functions and constants
├── public/             # Static assets
└── .github/            # GitHub workflows
```

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React

## AI Auto-Improvement Workflow

This project includes an automated AI improvement workflow that runs every 8 hours to suggest enhancements.

### Setup GitHub Actions Workflow

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secret name: `GEMINI_API_KEY`
4. Add your Gemini API key as the value
5. Save the secret

The workflow will now:
- Analyze your codebase automatically
- Suggest improvements using AI
- Log suggestions in `AI_IMPROVEMENTS.md`
- Update version numbers
- Commit changes automatically

You can also trigger it manually from the **Actions** tab.

## Deployment

### Vercel (Recommended)

1. Import your GitHub repository to Vercel
2. Add environment variable: `GEMINI_API_KEY`
3. Deploy!

The app will automatically redeploy on every push to main.

## License

MIT
