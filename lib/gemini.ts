import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function getChatResponse(message: string, language: string = "English") {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `You are "VoteIQ", an expert assistant on the Indian Election Process. 
  Respond in ${language}. Keep answers concise, educational, and non-partisan. 
  User says: ${message}`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function analyzeVoterProfile(answers: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Based on these user priorities regarding elections: ${JSON.stringify(answers)}, 
  generate a personalized 3-step voting guide and identify their "Voter Persona". 
  Format as JSON with keys: persona, guide (array of strings), and focusArea.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}