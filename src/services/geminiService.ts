import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getSpiritualExplanation(theme: string, item: string, context: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu es l'IA spirituelle de l'application NUN. 
      L'utilisateur explore le thème "${theme}" et l'élément "${item}".
      Voici les éléments correspondants dans les autres colonnes pour ce niveau spirituel : ${context.join(", ")}.
      
      Fournis une explication fluide et cohérente, liant tous ces thèmes ensemble. 
      Inclus des versets bibliques pertinents.
      Le ton doit être inspirant, profond et prophétique.
      IMPORTANT : N'utilise JAMAIS d'astérisques (*) dans ton texte. Le texte doit être fluide et sans formatage Markdown de type gras ou italique utilisant des astérisques.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la génération de la méditation.";
  }
}

export async function analyzeUserPerception(theme: string, item: string, perception: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `L'utilisateur partage sa perception sur "${item}" (Thème: ${theme}) : "${perception}".
      
      En tant qu'IA spirituelle NUN, analyse sa réflexion. 
      Corrige si nécessaire avec douceur, encourage et enrichis sa réflexion avec une perspective biblique profonde.
      IMPORTANT : N'utilise JAMAIS d'astérisques (*) dans ton texte.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de l'analyse de votre réflexion.";
  }
}
