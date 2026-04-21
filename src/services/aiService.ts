import { GoogleGenAI } from "@google/genai";
import knowledgeBase from "../data/knowledgeBase.json";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getAIResponse = async (userMessage: string, history: { role: 'user' | 'model', content: string }[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the CirqleLabs AI Assistant. 
        Your personality: Professional, visionary, helpful, and very human-like. 
        Speak at a normal human pace.
        
        KNOWLEDGE BASE:
        ${JSON.stringify(knowledgeBase, null, 2)}
        
        INSTRUCTIONS:
        - Use the knowledge base to answer questions about CirqleLabs.
        - If asked about services, mention The Foundry, Venture Capital (The Vault), The Cirqle, and The Collective.
        - Keep answers concise and engaging.
        - Do not mention that you are reading from a JSON file.
        - If you don't know something not in the knowledge base, politely say you'll check with the human team.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a little trouble connecting right now. Can you try again?";
  }
};
