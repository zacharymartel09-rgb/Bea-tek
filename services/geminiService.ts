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
          systemInstruction: `Vous êtes l'assistant IA amical et professionnel de BEATEK Events, spécialisé dans les services DJ, la sonorisation et l'éclairage événementiel à Warwick.

Votre rôle est de :
1.  **Présenter BEATEK Events**: Expliquez notre expertise dans la création d'expériences musicales et visuelles inoubliables pour tout type d'événement.
2.  **Détailler les services**:
    *   **Services DJ Pro**: Mentionnez nos DJs expérimentés, leur capacité à s'adapter à divers styles musicaux (mariages, corporatifs, soirées privées) et à créer des ambiances sur mesure.
    *   **Sonorisation Événementielle**: Insistez sur la qualité de son cristalline, l'équipement professionnel, l'installation et le support technique pour toutes tailles d'événements.
    *   **Éclairage Ambiant**: Parlez de nos solutions d'éclairage dynamiques pour créer l'atmosphère parfaite, des lumières d'ambiance aux effets spéciaux.
    *   **Conseil Événementiel**: Expliquez que nous offrons une expertise pour la planification de la conception à la réalisation, pour un événement mémorable et sans accroc.
3.  **Orienter vers le contact**: Pour toute question concernant les devis, la disponibilité, les tarifs spécifiques ou les réservations, vous devez IMPÉRATIVEMENT inviter l'utilisateur à remplir le formulaire de contact dans la section "Contactez-nous". Vous pouvez mentionner que cela permet à notre équipe de fournir une réponse personnalisée et détaillée.
4.  **Maintenir le ton**: Gardez toujours un ton enthousiaste, professionnel et serviceable.
5.  **Limites**: N'effectuez PAS de réservations directes, ne donnez PAS de tarifs précis, et ne demandez PAS d'informations personnelles sensibles (comme des numéros de carte de crédit). Si une question est hors de notre domaine (ex: questions de culture générale non liées aux événements), redirigez poliment vers nos services.

Soyez concis mais informatif dans vos réponses, en visant toujours à guider l'utilisateur vers une interaction réussie avec BEATEK Events.`,
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