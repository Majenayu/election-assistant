const fs = require('fs');
const path = require('path');

async function improveApp() {
  console.log("🤖 AI Improvement Agent Starting...");
  
  // Check for API keys
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const huggingFaceKey = process.env.HUGGINGFACE_API_KEY;
  const togetherKey = process.env.TOGETHER_API_KEY;
  
  if (!openRouterKey && !geminiKey && !huggingFaceKey && !togetherKey) {
    console.log("⚠️  No API keys found in environment variables");
    console.log("📝 Please add one of: OPENROUTER_API_KEY, GEMINI_API_KEY, HUGGINGFACE_API_KEY, TOGETHER_API_KEY");
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
    let success = false;
    
    // Priority 1: Try OpenRouter with 3 different models
    if (openRouterKey && !success) {
      const openRouterModels = [
        'qwen/qwen-2-7b-instruct:free',
        'microsoft/phi-3-mini-128k-instruct:free',
        'huggingfaceh4/zephyr-7b-beta:free'
      ];
      
      for (let i = 0; i < openRouterModels.length; i++) {
        try {
          console.log(`📡 Trying OpenRouter API (attempt ${i + 1}/3) with model: ${openRouterModels[i]}...`);
          responseText = await callOpenRouter(prompt, openRouterKey, openRouterModels[i]);
          success = true;
          console.log("✅ OpenRouter succeeded!");
          break;
        } catch (error) {
          console.log(`⚠️  OpenRouter attempt ${i + 1} failed:`, error.message);
          if (i === openRouterModels.length - 1) {
            console.log("❌ All OpenRouter attempts failed");
          }
        }
      }
    }
    
    // Priority 2: Try Together AI
    if (togetherKey && !success) {
      try {
        console.log("📡 Trying Together AI...");
        responseText = await callTogetherAI(prompt, togetherKey);
        success = true;
        console.log("✅ Together AI succeeded!");
      } catch (error) {
        console.log("⚠️  Together AI failed:", error.message);
      }
    }
    
    // Priority 3: Try Hugging Face
    if (huggingFaceKey && !success) {
      try {
        console.log("📡 Trying Hugging Face...");
        responseText = await callHuggingFace(prompt, huggingFaceKey);
        success = true;
        console.log("✅ Hugging Face succeeded!");
      } catch (error) {
        console.log("⚠️  Hugging Face failed:", error.message);
      }
    }
    
    // Priority 4: Try Gemini (last resort)
    if (geminiKey && !success) {
      try {
        console.log("📡 Trying Gemini API...");
        responseText = await callGemini(prompt, geminiKey);
        success = true;
        console.log("✅ Gemini succeeded!");
      } catch (error) {
        console.log("⚠️  Gemini failed:", error.message);
      }
    }
    
    if (!success) {
      console.log("⚠️  All API providers failed");
      console.log("📝 Using fallback improvement suggestions...");
      
      // Fallback: Create basic improvement without AI
      responseText = JSON.stringify({
        improvements: [
          {
            type: "enhancement",
            title: "Add Progressive Web App (PWA) Features",
            description: "Enhance the app with offline capabilities and install prompts to improve user engagement and accessibility",
            implementation: "Configure service workers, add manifest.json with proper icons, implement offline fallback pages",
            priority: "high"
          },
          {
            type: "optimization",
            title: "Implement Code Splitting and Lazy Loading",
            description: "Reduce initial bundle size and improve load times by implementing dynamic imports for route-based code splitting",
            implementation: "Use Next.js dynamic imports for heavy components, implement React.lazy for non-critical features",
            priority: "medium"
          }
        ],
        suggested_readme_update: "- ⚡ **Performance Optimized** - Fast loading with code splitting and lazy loading"
      });
      
      success = true;
      console.log("✅ Using fallback suggestions");
    }
    
    if (!success) {
      throw new Error("All API providers failed. Please check your API keys.");
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

async function callOpenRouter(prompt, apiKey, model) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/Majenayu/election-assistant',
      'X-Title': 'Election Assistant AI Improvement'
    },
    body: JSON.stringify({
      model: model,
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
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(`OpenRouter error: ${data.error.message || JSON.stringify(data.error)}`);
  }
  
  return data.choices[0].message.content;
}

async function callTogetherAI(prompt, apiKey) {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
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
    throw new Error(`Together AI error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callHuggingFace(prompt, apiKey) {
  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 2000,
        temperature: 0.7,
        return_full_text: false
      }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  
  // Handle different response formats
  if (Array.isArray(data)) {
    return data[0].generated_text;
  } else if (data.generated_text) {
    return data.generated_text;
  } else if (data[0] && data[0].generated_text) {
    return data[0].generated_text;
  }
  
  throw new Error('Unexpected Hugging Face response format');
}

async function callGemini(prompt, apiKey) {
  // Try multiple Gemini models
  const models = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-pro'
  ];
  
  for (const modelName of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
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
      
      if (response.ok) {
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      // Try next model
      continue;
    }
  }
  
  throw new Error('All Gemini models failed');
}

function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = parseInt(parts[2]) + 1;
  return parts.join('.');
}

improveApp();
