import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. REMPLACEZ ICI : Mettez votre clé API entre les guillemets
const API_KEY = "AIzaSyA7GnFFDe7c323FlOM9UPIpP2XNKRStG10";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getSpiritualExplanation(theme: string, item: string, context: string) {
  try {
    // Utilisation du modèle 1.5-flash (car le 3 n'existe pas encore)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Tu es l'IA spirituelle de l'application NUN. 
    L'utilisateur explore le thème "${theme}" et l'élément "${item}".
    Voici les éléments correspondants : ${context}.
    Fournis une explication fluide et cohérente, liant tous ces thèmes ensemble. 
    Inclus des versets bibliques pertinents. 
    Le ton doit être inspirant, profond et prophétique.
    IMPORTANT : N'utilise JAMAIS d'astérisques (*) dans ton texte.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la génération de la méditation.";
  }
}

export async function analyzeUserPerception(theme: string, item: string, perception: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `L'utilisateur partage sa perception sur "${item}" (Thème: ${theme}):
    "${perception}"
    En tant qu'IA spirituelle NUN, analyse sa réflexion.
    Corrige si nécessaire avec douceur, encourage et enrichis sa réflexion.
    IMPORTANT : N'utilise JAMAIS d'astérisques (*) dans ton texte.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de l'analyse de votre réflexion.";
  }
}
