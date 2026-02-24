import { GoogleGenerativeAI } from "@google/generative-ai";

// Utilisation du nom correct que tu as mis sur Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyA7GnFFDe7c323FlOM9UPIpP2XNKRStG10";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getSpiritualExplanation(theme: string, item: string, context: string) {
  try {
    // Correction : gemini-1.5-flash est le modèle stable actuel
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Tu es l'IA spirituelle de l'application NUN. 
    L'utilisateur explore le thème "${theme}" et l'élément "${item}".
    Context: ${context}.
    Fournis une explication fluide et cohérente. Inclus des versets bibliques.
    IMPORTANT : Pas d'astérisques (*) dans ton texte.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la génération.";
  }
}

export async function analyzeUserPerception(theme: string, item: string, perception: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `L'utilisateur partage sa perception sur "${item}" (Thème: ${theme}):
    "${perception}"
    Analyse sa réflexion avec douceur et prophétie.
    IMPORTANT : Pas d'astérisques (*) dans ton texte.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de l'analyse.";
  }
}
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
