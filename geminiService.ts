import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. COLLE TA CLÉ ICI (Garde bien les guillemets)
const TA_CLE = "AIzaSyA7GnFFDe7c323FlOM9UPIpP2XNKRStG10"; 

// On initialise l'IA directement avec la clé
const genAI = new GoogleGenerativeAI(TA_CLE);

export async function getSpiritualExplanation(theme: string, item: string, context: string) {
  try {
    // Utilisation du modèle 1.5-flash (le 3 n'est pas encore dispo)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Tu es l'IA spirituelle de l'application NUN. 
    L'utilisateur explore le thème "${theme}" et l'élément "${item}".
    Voici les éléments correspondants : ${context}.
    Fournis une explication fluide et cohérente. Inclus des versets bibliques.
    IMPORTANT : Pas d'astérisques (*).`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Une erreur est survenue lors de la méditation.";
  }
}

export async function analyzeUserPerception(theme: string, item: string, perception: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `L'utilisateur partage sa perception sur "${item}" : "${perception}"
    Analyse sa réflexion avec douceur et enrichis-la.
    IMPORTANT : Pas d'astérisques (*).`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Une erreur est survenue lors de l'analyse.";
  }
}
    IMPORTANT : N'utilise JAMAIS d'astérisques (*) dans ton texte.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de l'analyse de votre réflexion.";
  }
}
