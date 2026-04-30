# OpenRouter API Setup Guide 🚀

## Why OpenRouter?

After multiple failures with Gemini API models, we've integrated **OpenRouter** as the primary AI provider because:

- ✅ **More Reliable** - Better uptime and stability
- ✅ **Multiple Models** - Access to Gemini, GPT, Claude, and more
- ✅ **Free Tier** - Includes free models like `google/gemini-2.0-flash-exp:free`
- ✅ **Fallback Support** - Can still use Gemini API as backup

## Your OpenRouter API Key

```
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
```

## Setup Instructions

### Step 1: Add API Key to GitHub Secrets

1. **Go to your repository**: https://github.com/Majenayu/election-assistant

2. **Navigate to Settings**:
   - Click **Settings** (top right)
   - Click **Secrets and variables** → **Actions** (left sidebar)

3. **Add OpenRouter Secret**:
   - Click **New repository secret**
   - Name: `OPENROUTER_API_KEY`
   - Value: `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`
   - Click **Add secret**

### Step 2: Test the Workflow

1. Go to **Actions** tab: https://github.com/Majenayu/election-assistant/actions
2. Click **"AI Auto-Improvement"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Watch it work! 🎉

## How It Works

The updated script now:

1. **Checks for OpenRouter API key first** (primary)
2. **Falls back to Gemini API** if OpenRouter is not available
3. **Uses free Gemini model** via OpenRouter: `google/gemini-2.0-flash-exp:free`

### Code Flow:

```javascript
if (OPENROUTER_API_KEY) {
  // Use OpenRouter (more reliable)
  callOpenRouter()
} else if (GEMINI_API_KEY) {
  // Fallback to direct Gemini API
  callGemini()
} else {
  // Skip AI improvements
  console.log("No API keys found")
}
```

## Expected Output

When the workflow runs successfully:

```
🤖 AI Improvement Agent Starting...
📡 Using OpenRouter API...
🔍 Analyzing current state...
📝 AI Response received
✅ README updated with new features
✅ Improvements logged successfully!
📊 New version: 0.1.2
📄 Check AI_IMPROVEMENTS.md for details
```

## Models Available via OpenRouter

### Free Models:
- `google/gemini-2.0-flash-exp:free` ✅ (Currently using)
- `meta-llama/llama-3.2-3b-instruct:free`
- `mistralai/mistral-7b-instruct:free`

### Paid Models (if you upgrade):
- `anthropic/claude-3.5-sonnet`
- `openai/gpt-4-turbo`
- `google/gemini-pro-1.5`

## Troubleshooting

### If workflow still fails:

1. **Check API key is added correctly**:
   - Go to Settings → Secrets → Actions
   - Verify `OPENROUTER_API_KEY` exists

2. **Check API key is valid**:
   - Visit https://openrouter.ai/keys
   - Verify your key is active

3. **Check rate limits**:
   - Free tier has rate limits
   - Wait a few minutes and try again

### If you want to use a different model:

Edit `.github/scripts/improve.js` line 95:
```javascript
model: 'google/gemini-2.0-flash-exp:free',  // Change this
```

Available models: https://openrouter.ai/models

## Benefits of This Setup

1. ✅ **No more 404 errors** - OpenRouter handles model availability
2. ✅ **Better reliability** - Multiple providers in one API
3. ✅ **Cost effective** - Free tier available
4. ✅ **Easy switching** - Change models without code changes
5. ✅ **Fallback support** - Still works with Gemini API if needed

## Next Steps

1. **Add the secret** to GitHub (see Step 1 above)
2. **Run the workflow** to test it
3. **Check AI_IMPROVEMENTS.md** for generated suggestions
4. **Enjoy automated improvements!** 🎊

---

**Status**: Ready to use! ✅  
**API Key**: Provided above  
**Action Required**: Add `OPENROUTER_API_KEY` to GitHub Secrets
