
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure the API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

export const geminiService = {
  async sendMessage(message: string): Promise<GenerateContentResponse> {
    if (!API_KEY) {
      throw new Error("API_KEY is not defined. Please ensure it's set in your environment.");
    }

    // Create a new GoogleGenAI instance for each call to ensure the latest API key is used
    // and to handle potential API key selection changes if `window.aistudio.openSelectKey()` was used.
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const modelName = 'gemini-2.5-flash'; // Using gemini-2.5-flash for basic text tasks

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: [{ parts: [{ text: message }] }],
        config: {
          temperature: 0.7, // Adjust creativity
          topP: 0.95,
          topK: 64,
          systemInstruction: `You are a helpful and friendly AI assistant for BEA-TEK Music & Events. 
          Provide information about DJ services, sound system rentals, event planning assistance, and booking inquiries. 
          Keep responses concise and professional. If asked about pricing or booking, direct the user to the contact form or ask for their email to send more details.
          Always maintain a professional and enthusiastic tone.`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Check for specific error messages to prompt API key re-selection if needed for Veo models.
      // Although this app uses 'gemini-2.5-flash', it's a good practice to include this check for future scalability.
      if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
        // In a full app, you might want to call window.aistudio.openSelectKey() here.
        // For this app, we'll just throw a more user-friendly error.
        throw new Error("Gemini API key might be invalid or unauthorized. Please ensure it's correctly configured.");
      }
      throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
    