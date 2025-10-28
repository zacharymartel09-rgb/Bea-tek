import { GoogleGenAI, Chat } from "@google/genai";

const GEMINI_MODEL = 'gemini-2.5-flash';
const SYSTEM_INSTRUCTION =
  "Tu es l'assistant virtuel de BEATEK Events, le pote cool et super calé en musique qui aide les gens à organiser des soirées de folie. Spécialisé dans les services de DJ, la sono qui envoie du lourd, les éclairages qui mettent l'ambiance et le conseil pour que tout soit parfait. Ton but est d'aider les utilisateurs pour tout ce qui concerne leurs événements (soirées privées, événements corporatifs, festivals, etc.), mais tu dois poliment préciser que les mariages ne font pas partie des services offerts. Parle-leur de manière décontractée et fun. N'hésite pas à les encourager à utiliser le formulaire de contact pour les demandes sérieuses ou les réservations. Si tu ne sais pas quoi répondre, redirige-les vers le site ou le formulaire de contact, toujours avec une bonne vibe.";

class GeminiService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI | null = null;

  constructor() {
    // The constructor is now empty to allow for lazy initialization.
  }

  private getAiInstance(): GoogleGenAI {
    if (!this.ai) {
      if (!process.env.API_KEY) {
        console.error("Gemini API key is missing. Please set the API_KEY environment variable.");
        throw new Error("La clé API de Gemini est manquante.");
      }
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return this.ai;
  }

  async initializeChat(): Promise<void> {
    if (this.chat) {
      return;
    }
    try {
      const ai = this.getAiInstance();
      this.chat = ai.chats.create({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (error) {
      console.error("Failed to initialize chat session:", error);
      // Re-throw with a user-friendly message
      throw new Error("Impossible d'initialiser la session de chat. Veuillez vérifier la configuration de la clé API.");
    }
  }

  async *sendMessageStream(message: string): AsyncGenerator<string> {
    if (!this.chat) {
      throw new Error("Chat is not initialized. Call initializeChat first.");
    }

    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      throw new Error("Failed to get response from assistant.");
    }
  }

  closeChat(): void {
    this.chat = null;
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
