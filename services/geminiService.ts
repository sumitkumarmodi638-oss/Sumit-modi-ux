
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, SKILLS, PROJECTS, ABOUT_TEXT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI portfolio assistant for ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role}.
Your goal is to answer questions about Sumit's background, skills, and work in a professional, creative, and concise manner.

Here is the context about Sumit:
BIO: ${ABOUT_TEXT}
SKILLS: ${SKILLS.map(s => s.name).join(', ')}
PROJECTS: ${PROJECTS.map(p => `${p.title} (${p.description})`).join('; ')}

Tone: Professional, slightly witty, helpful, and concise (under 50 words usually).
If asked about contact, provide: ${PERSONAL_INFO.email}.
If asked something irrelevant to the portfolio, politely steer back to design topics.
`;

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm contemplating the architectural implications of that query. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a momentary glitch in the neural link. Alex is likely pushing a new system update. Try again shortly.";
  }
};
