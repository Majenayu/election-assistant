# Free AI API Keys Guide 🆓

## Overview

The workflow now supports **4 different free AI providers** with automatic fallback:

1. **OpenRouter** (Priority 1) - 3 attempts with different models
2. **Together AI** (Priority 2) - Fast and reliable
3. **Hugging Face** (Priority 3) - Open source models
4. **Gemini** (Priority 4) - Google's AI

## 🔑 How to Get Free API Keys

### 1. OpenRouter (Recommended) ⭐

**Website**: https://openrouter.ai/

**Steps**:
1. Go to https://openrouter.ai/
2. Click "Sign In" (top right)
3. Sign in with Google/GitHub
4. Go to https://openrouter.ai/keys
5. Click "Create Key"
6. Copy your API key (starts with `sk-or-v1-...`)

**Free Models**:
- `meta-llama/llama-3.2-3b-instruct:free`
- `google/gemini-2.0-flash-exp:free`
- `mistralai/mistral-7b-instruct:free`

**Limits**: Generous free tier, rate limited

---

### 2. Together AI

**Website**: https://www.together.ai/

**Steps**:
1. Go to https://www.together.ai/
2. Click "Get Started" or "Sign Up"
3. Sign up with email/Google
4. Go to https://api.together.xyz/settings/api-keys
5. Click "Create new API key"
6. Copy your API key

**Free Credits**: $25 free credits on signup

**Model Used**: `meta-llama/Llama-3.2-3B-Instruct-Turbo`

---

### 3. Hugging Face

**Website**: https://huggingface.co/

**Steps**:
1. Go to https://huggingface.co/
2. Click "Sign Up" (top right)
3. Create account with email
4. Go to https://huggingface.co/settings/tokens
5. Click "New token"
6. Name it "Election Assistant"
7. Select "Read" access
8. Click "Generate"
9. Copy your token

**Free Tier**: Completely free with rate limits

**Model Used**: `meta-llama/Llama-3.2-3B-Instruct`

---

### 4. Google Gemini

**Website**: https://makersuite.google.com/

**Steps**:
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Select or create a Google Cloud project
5. Copy your API key

**Free Tier**: 60 requests per minute

**Model Used**: `gemini-1.5-flash`

---

## 🚀 Setup Instructions

### Add API Keys to GitHub

1. Go to your repository: https://github.com/Majenayu/election-assistant

2. Click **Settings** → **Secrets and variables** → **Actions**

3. Add secrets (click "New repository secret" for each):

#### Option 1: OpenRouter Only (Recommended)
```
Name: OPENROUTER_API_KEY
Value: sk-or-v1-your-key-here
```

#### Option 2: All APIs (Maximum Reliability)
```
Name: OPENROUTER_API_KEY
Value: sk-or-v1-your-key-here

Name: TOGETHER_API_KEY
Value: your-together-key-here

Name: HUGGINGFACE_API_KEY
Value: hf_your-key-here

Name: GEMINI_API_KEY
Value: your-gemini-key-here
```

---

## 🔄 How the Fallback Works

The script tries APIs in this order:

```
1. OpenRouter (3 attempts with different models)
   ├─ Attempt 1: meta-llama/llama-3.2-3b-instruct:free
   ├─ Attempt 2: google/gemini-2.0-flash-exp:free
   └─ Attempt 3: mistralai/mistral-7b-instruct:free
   
2. Together AI (if OpenRouter fails)
   └─ meta-llama/Llama-3.2-3B-Instruct-Turbo
   
3. Hugging Face (if Together AI fails)
   └─ meta-llama/Llama-3.2-3B-Instruct
   
4. Gemini (if all above fail)
   └─ gemini-1.5-flash
```

---

## ✅ Expected Output

### Success:
```
🤖 AI Improvement Agent Starting...
🔍 Analyzing current state...
📡 Trying OpenRouter API (attempt 1/3) with model: meta-llama/llama-3.2-3b-instruct:free...
✅ OpenRouter succeeded!
📝 AI Response received
✅ README updated with new features
✅ Improvements logged successfully!
📊 New version: 0.1.4
```

### With Fallback:
```
🤖 AI Improvement Agent Starting...
🔍 Analyzing current state...
📡 Trying OpenRouter API (attempt 1/3)...
⚠️  OpenRouter attempt 1 failed: 401 Unauthorized
📡 Trying OpenRouter API (attempt 2/3)...
⚠️  OpenRouter attempt 2 failed: 401 Unauthorized
📡 Trying OpenRouter API (attempt 3/3)...
⚠️  OpenRouter attempt 3 failed: 401 Unauthorized
❌ All OpenRouter attempts failed
📡 Trying Together AI...
✅ Together AI succeeded!
📝 AI Response received
✅ Improvements logged successfully!
```

---

## 🎯 Recommended Setup

### For Maximum Reliability:
Get **all 4 API keys** and add them to GitHub Secrets. The workflow will automatically use the best available option.

### For Quick Setup:
Just get **OpenRouter** key - it's the easiest and most reliable.

### For Free Forever:
Use **Hugging Face** - completely free with no credit card required.

---

## 🔧 Troubleshooting

### OpenRouter "User not found" Error:
- Your API key might be invalid
- Verify at: https://openrouter.ai/keys
- Create a new key if needed

### Rate Limit Errors:
- Wait a few minutes
- The script will automatically try other providers

### All APIs Failing:
- Check that at least one API key is added to GitHub Secrets
- Verify keys are valid on their respective websites
- Check the Actions logs for specific error messages

---

## 📊 Comparison

| Provider | Free Tier | Speed | Reliability | Setup Difficulty |
|----------|-----------|-------|-------------|------------------|
| **OpenRouter** | ✅ Yes | ⚡ Fast | ⭐⭐⭐⭐⭐ | Easy |
| **Together AI** | 💰 $25 credits | ⚡⚡ Very Fast | ⭐⭐⭐⭐ | Easy |
| **Hugging Face** | ✅ Yes | 🐌 Slower | ⭐⭐⭐ | Easy |
| **Gemini** | ✅ Yes | ⚡ Fast | ⭐⭐⭐⭐ | Medium |

---

## 🎉 Next Steps

1. **Choose your provider(s)** from the list above
2. **Get API key(s)** following the steps
3. **Add to GitHub Secrets** as shown above
4. **Run the workflow** and watch it work!

Your AI improvement workflow will now be super reliable with multiple fallback options! 🚀
