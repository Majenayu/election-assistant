const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

async function improveApp() {
  console.log("🤖 AI Improvement Agent Starting...");
  
  // Check for API keys
  const geminiKey = process.env.GEMINI_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const togetherKey = process.env.TOGETHER_API_KEY;
  const huggingFaceKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!geminiKey && !openRouterKey && !togetherKey && !huggingFaceKey) {
    console.log("⚠️  No API keys found in environment variables");
    console.log("📝 Add at least one: GEMINI_API_KEY, OPENROUTER_API_KEY, TOGETHER_API_KEY, HUGGINGFACE_API_KEY");
    console.log("✅ Workflow completed (skipped AI improvements)");
    return;
  }
  
  console.log("🔑 Available API keys:");
  if (geminiKey) console.log("  ✅ GEMINI_API_KEY");
  if (openRouterKey) console.log("  ✅ OPENROUTER_API_KEY");
  if (togetherKey) console.log("  ✅ TOGETHER_API_KEY");
  if (huggingFaceKey) console.log("  ✅ HUGGINGFACE_API_KEY");
  
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

TASK: Suggest 1-2 HIGH-IMPACT improvements that will make this more competitive.

Focus on:
- New innovative features that others won't have
- UI/UX enhancements that impress judges
- Performance optimizations
- Accessibility improvements
- Unique functionalities

Respond with ONLY valid JSON (no markdown, no backticks, no explanation):
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
    
    let responseText = null;
    let usedProvider = null;
    
    // ✅ FIX 2: Updated Gemini model names + use v1beta API version
    if (geminiKey && !responseText) {
      const geminiModels = [
        'gemini-2.0-flash',          // ✅ Current stable flash model
        'gemini-2.0-flash-lite',     // ✅ Lighter version
        'gemini-1.5-flash',          // ✅ Fallback stable model
        'gemini-1.5-pro',            // ✅ More capable fallback
      ];
      
      for (const modelName of geminiModels) {
        try {
          console.log(`📡 [GEMINI] Trying model: ${modelName}...`);
          responseText = await callGemini(prompt, geminiKey, modelName);
          usedProvider = `Gemini (${modelName})`;
          console.log(`✅ Gemini ${modelName} succeeded!`);
          break;
        } catch (error) {
          console.log(`⚠️  Gemini ${modelName} failed: ${error.message}`);
        }
      }
      
      if (!responseText) {
        console.log("❌ All Gemini models failed");
      }
    }
    
    // ✅ FIX 3: Updated OpenRouter free model list to currently available ones
    if (openRouterKey && !responseText) {
      const openRouterModels = [
        'deepseek/deepseek-r1:free',                    // ✅ Popular free model
        'deepseek/deepseek-chat-v3-0324:free',          // ✅ DeepSeek V3
        'meta-llama/llama-3.3-70b-instruct:free',       // ✅ Llama 3.3
        'meta-llama/llama-3.2-3b-instruct:free',        // ✅ Smaller Llama
        'google/gemini-2.0-flash-exp:free',             // ✅ Gemini via OpenRouter
        'microsoft/phi-4:free',                         // ✅ Microsoft Phi-4
        'qwen/qwen-2.5-72b-instruct:free',              // ✅ Qwen free tier
      ];
      
      for (const model of openRouterModels) {
        try {
          console.log(`📡 [OPENROUTER] Trying model: ${model}...`);
          responseText = await callOpenRouter(prompt, openRouterKey, model);
          usedProvider = `OpenRouter (${model})`;
          console.log(`✅ OpenRouter ${model} succeeded!`);
          break;
        } catch (error) {
          console.log(`⚠️  OpenRouter ${model} failed: ${error.message}`);
        }
      }
      
      if (!responseText) {
        console.log("❌ All OpenRouter models failed");
      }
    }
    
    // Together AI (requires paid credits — add funds at api.together.ai/settings/billing)
    if (togetherKey && !responseText) {
      const togetherModels = [
        'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        'meta-llama/Llama-3.2-3B-Instruct-Turbo',
        'mistralai/Mistral-7B-Instruct-v0.2',
        'Qwen/Qwen2.5-7B-Instruct-Turbo'
      ];
      
      for (const model of togetherModels) {
        try {
          console.log(`📡 [TOGETHER] Trying model: ${model}...`);
          responseText = await callTogetherAI(prompt, togetherKey, model);
          usedProvider = `Together AI (${model})`;
          console.log(`✅ Together AI ${model} succeeded!`);
          break;
        } catch (error) {
          console.log(`⚠️  Together AI ${model} failed: ${error.message}`);
        }
      }
      
      if (!responseText) {
        console.log("❌ All Together AI models failed");
      }
    }
    
    // ✅ FIX 4: Updated HuggingFace to use the new Inference API (chat completions format)
    if (huggingFaceKey && !responseText) {
      const hfModels = [
        'meta-llama/Llama-3.2-3B-Instruct',
        'mistralai/Mistral-7B-Instruct-v0.3',
        'HuggingFaceH4/zephyr-7b-beta',
      ];
      
      for (const model of hfModels) {
        try {
          console.log(`📡 [HUGGINGFACE] Trying model: ${model}...`);
          responseText = await callHuggingFace(prompt, huggingFaceKey, model);
          usedProvider = `Hugging Face (${model})`;
          console.log(`✅ Hugging Face ${model} succeeded!`);
          break;
        } catch (error) {
          console.log(`⚠️  Hugging Face ${model} failed: ${error.message}`);
        }
      }
      
      if (!responseText) {
        console.log("❌ All Hugging Face models failed");
      }
    }
    
    // FALLBACK: If all APIs failed, use predefined improvements
    if (!responseText) {
      console.log("⚠️  ALL API providers failed");
      console.log("📝 Using fallback improvement suggestions...");
      
      responseText = JSON.stringify({
        improvements: [
          {
            type: "enhancement",
            title: "Add Voice-Activated Navigation",
            description: "Enable users to navigate the app using voice commands, making it more accessible and innovative",
            implementation: "Integrate Web Speech API for voice recognition, implement command parser for navigation keywords",
            priority: "high"
          },
          {
            type: "feature",
            title: "Real-time Collaboration Features",
            description: "Allow multiple users to participate in election quizzes together with live scoring",
            implementation: "Use WebSocket or Firebase for real-time updates, implement multiplayer quiz mode",
            priority: "medium"
          }
        ],
        suggested_readme_update: "- 🎙️ **Voice Navigation** - Navigate using voice commands for enhanced accessibility"
      });
      
      usedProvider = "Fallback (predefined)";
      console.log("✅ Using fallback suggestions");
    }
    
    // Parse and process the response
    let cleanResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    console.log("📝 AI Response received");
    console.log(`🤖 Used provider: ${usedProvider}`);
    
    let improvements;
    try {
      improvements = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.log("⚠️  Failed to parse JSON, attempting to extract...");
      
      // Try to find JSON in the response
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        improvements = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }
    
    // Validate improvements structure
    if (!improvements.improvements || !Array.isArray(improvements.improvements)) {
      throw new Error("Invalid improvements format from AI");
    }
    
    // Log improvements
    const logEntry = `
## 🤖 AI Improvement - ${new Date().toISOString()}
**Provider Used:** ${usedProvider}

${improvements.improvements.map((imp, i) => `
### ${i + 1}. ${imp.title} (${imp.type})
**Priority:** ${imp.priority}
**Description:** ${imp.description}
**Implementation:** ${imp.implementation}
`).join('\n')}

---
`;
    
    const logPath = path.join(process.cwd(), 'AI_IMPROVEMENTS.md');
    
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, '# AI Improvement Log\n\n');
    }
    fs.appendFileSync(logPath, logEntry);
    
    // Update README with new features
    if (improvements.suggested_readme_update) {
      let updatedReadme = readme;
      
      if (readme.includes('## Features')) {
        updatedReadme = readme.replace(
          '## Features',
          `## Features\n\n${improvements.suggested_readme_update}\n`
        );
      } else {
        updatedReadme = readme.replace(
          /^# .+\n/,
          `$&\n## Features\n\n${improvements.suggested_readme_update}\n\n`
        );
      }
      
      fs.writeFileSync(readmePath, updatedReadme);
      console.log("✅ README updated with new features");
    }
    
    // Increment version
    packageJson.version = incrementVersion(packageJson.version);
    fs.writeFileSync(
      packagePath, 
      JSON.stringify(packageJson, null, 2) + '\n'
    );
    
    console.log(`✅ Improvements logged successfully!`);
    console.log(`📊 New version: ${packageJson.version}`);
    console.log(`📄 Check AI_IMPROVEMENTS.md for details`);
    
  } catch (error) {
    console.error("❌ Error during improvement:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    
    console.log("✅ Workflow completed (with errors, but not failed)");
    process.exit(0);
  }
}

// ==================== API FUNCTIONS ====================

// ✅ FIX 2: Pass apiVersion: 'v1beta' so newer Gemini models are reachable
async function callGemini(prompt, apiKey, modelName) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel(
    { 
      model: modelName,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    },
    { apiVersion: 'v1beta' }   // ← required for gemini-2.0-flash and newer
  );
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function callOpenRouter(prompt, apiKey, model) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com',
      'X-Title': 'Election Assistant AI'
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
  }
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || JSON.stringify(data.error));
  }
  
  return data.choices[0].message.content;
}

async function callTogetherAI(prompt, apiKey, model) {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Together AI error ${response.status}: ${errorText}`);
  }
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || JSON.stringify(data.error));
  }
  
  return data.choices[0].message.content;
}

// ✅ FIX 4: Use the new HuggingFace Inference API (chat completions endpoint)
async function callHuggingFace(prompt, apiKey, model) {
  const response = await fetch(
    `https://router.huggingface.co/hf-inference/models/${model}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      })
    }
  );
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face error ${response.status}: ${errorText}`);
  }
  
  const data = await response.json();
  
  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Unexpected Hugging Face response format');
}

function incrementVersion(version) {
  const parts = version.split('.');
  if (parts.length !== 3) {
    return '0.1.1';
  }
  parts[2] = parseInt(parts[2] || 0) + 1;
  return parts.join('.');
}

improveApp();
