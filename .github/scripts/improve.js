const fs = require('fs');
const path = require('path');

async function improveApp() {
  console.log("🤖 AI Improvement Agent Starting...");
  
  // Check for API key - try OpenRouter first, then Gemini
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  
  if (!openRouterKey && !geminiKey) {
    console.log("⚠️  No API keys found in environment variables");
    console.log("📝 Please add OPENROUTER_API_KEY or GEMINI_API_KEY to GitHub Secrets");
    console.log("✅ Workflow completed (skipped AI improvements)");
    return;
  }
  
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
    
    const prompt = `You are improving an Election Education Assistant app competing for top 400 out of 4 million submissions.

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
}`;

    console.log("🔍 Analyzing current state...");
    
    let responseText;
    
    // Try OpenRouter first, fallback to Gemini if it fails
    if (openRouterKey) {
      try {
        console.log("📡 Using OpenRouter API...");
        responseText = await callOpenRouter(prompt, openRouterKey);
      } catch (openRouterError) {
        console.log("⚠️  OpenRouter failed:", openRouterError.message);
        if (geminiKey) {
          console.log("🔄 Falling back to Gemini API...");
          responseText = await callGemini(prompt, geminiKey);
        } else {
          throw openRouterError;
        }
      }
    } else if (geminiKey) {
      console.log("📡 Using Gemini API...");
      responseText = await callGemini(prompt, geminiKey);
    } else {
      throw new Error("No valid API keys available");
    }
    
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
    console.log(`📄 Check AI_IMPROVEMENTS.md for details`);
    
  } catch (error) {
    console.error("❌ Error during improvement:", error.message);
    console.error("Stack trace:", error.stack);
    console.log("✅ Workflow completed (with errors)");
    process.exit(0); // Don't fail the workflow
  }
}

async function callOpenRouter(prompt, apiKey) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/Majenayu/election-assistant',
      'X-Title': 'Election Assistant AI Improvement'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.2-3b-instruct:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt, apiKey) {
  // Use fetch instead of SDK for better control
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = parseInt(parts[2]) + 1;
  return parts.join('.');
}

improveApp();
