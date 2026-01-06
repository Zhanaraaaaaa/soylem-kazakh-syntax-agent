
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SentenceRole } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fullSentence: { type: Type.STRING },
    analysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          role: { 
            type: Type.STRING, 
            description: "Role type: 'Subject', 'Predicate', 'Attribute', 'Object', 'Adverbial', or 'Particle'" 
          },
          question: { type: Type.STRING },
          kazakhRoleName: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["word", "role", "question", "kazakhRoleName", "explanation"]
      }
    },
    summary: { type: Type.STRING }
  },
  required: ["fullSentence", "analysis", "summary"]
};

export const analyzeSentence = async (sentence: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following Kazakh sentence for sentence members (сөйлем мүшелеріне талдау).
    Sentence: "${sentence}"
    
    Rules:
    1. Identify Subject (Бастауыш), Predicate (Баяндауыш), Attribute (Анықтауыш), Object (Толықтауыш), Adverbial (Пысықтауыш).
    2. IMPORTANT: Particles/Conjunctions (Шылау) DO NOT answer questions and ARE NOT sentence members. Mark them as 'Particle'.
    3. Provide the question each member answers.
    4. Provide a brief explanation for why it's that member.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    },
  });

  return JSON.parse(response.text);
};

export const generateExercise = async (): Promise<AnalysisResult> => {
  const prompt = `
    Generate a random educational Kazakh sentence for a student to analyze. 
    It should contain at least 4 words and include different sentence members.
    Analyze it and provide the result in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    },
  });

  return JSON.parse(response.text);
};
