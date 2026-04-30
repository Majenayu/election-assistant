const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function improveApp() {
  console.log("🤖 AI Improvement Agent Starting...");
  
  try {
    // Read current state
    const readmePath = path.join(process.cwd(), 'README.md');
    const packagePath = path.join(process.cwd(), 'package.json');
    
    const readme = fs.readFileSync(readmePath, 'utf8');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Read main page component
    const mainPagePath = path.join(process.cwd(), 'app', 'page.tsx');
    const mainPage = fs.existsSync(mainPagePath) ? 
      fs.readFileSync(mainPagePath, 'utf8').substring(0, 3000) : '';
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });
    
    const prompt = `
You are improving an Election Education Assistant app competing for top 400 out of 4 million submissions.

CURRENT STATE:
Project: ${packageJson.name}
Version: ${packageJson.version}

README excerpt:
${readme.substring(0, 1000)}

Main Page Code (first 3000 chars):
${mainPage}

TASK: Suggest 1-2 HIGH-IMPACT improvements that will make this more competitive:

Focus on:
- New innovative features that others won't have
- UI/UX enhancements that impress judges
- Performance optimizations
- Accessibility improvements
- Unique functionalities

Respond with ONLY valid JSON (no markdown, no backticks):
{
  "improvements": [
    {
      "type": "feature|enhancement|optimization",
      "title": "Short title",
      "description": "What this improves and why it matters",
      "implementation": "Brief technical approach",
      "priority": "high|medium"
    }
  ],
  "suggested_readme_update": "New feature bullet point to add to README"
}
`;

    console.log("🔍 Analyzing current state...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean response
    let cleanResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    console.log("📝 AI Response received");
    
    const improvements = JSON.parse(cleanResponse);
    
    // Log improvements
    const logEntry = `
## 🤖 AI Improvement - ${new Date().toISOString()}

${improvements.improvements.map((imp, i) => `
### ${i + 1}. ${imp.title} (${imp.type})
**Priority:** ${imp.priority}
**Description:** ${imp.description}
**Implementation:** ${imp.implementation}
`).join('\n')}

---
`;
    
    const logPath = path.join(process.cwd(), 'AI_IMPROVEMENTS.md');
    fs.appendFileSync(logPath, logEntry);
    
    // Update README with new features
    if (improvements.suggested_readme_update) {
      const updatedReadme = readme.replace(
        '## Features',
        `## Features\n\n${improvements.suggested_readme_update}\n`
      );
      fs.writeFileSync(readmePath, updatedReadme);
      console.log("✅ README updated with new features");
    }
    
    // Increment version
    packageJson.version = incrementVersion(packageJson.version);
    fs.writeFileSync(
      packagePath, 
      JSON.stringify(packageJson, null, 2)
    );
    
    console.log(`✅ Improvements logged successfully!`);
    console.log(`📊 New version: ${packageJson.version}`);
    
  } catch (error) {
    console.error("❌ Error during improvement:", error.message);
    process.exit(0); // Don't fail the workflow
  }
}

function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = parseInt(parts[2]) + 1;
  return parts.join('.');
}

improveApp();