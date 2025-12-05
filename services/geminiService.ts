import { GoogleGenAI, Chat } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getComparisonVerdict = async (universities: string[]): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "API Key is missing. Unable to generate verdict.";

  const prompt = `
    Compare the following universities in Kazakhstan based on general public knowledge: ${universities.join(", ")}. 
    Provide a concise summary verdict (max 100 words) on which one is best for Engineering vs Humanities, and mention their key strengths. 
    Write in Russian language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Не удалось получить ответ от ИИ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка при генерации вердикта. Пожалуйста, попробуйте позже.";
  }
};

export const getGrantAdvice = async (score: number, specialty: string, subjects: string[]): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "API Key is missing.";

  const prompt = `
    I am a student in Kazakhstan. I have an ENT (UNT) score of ${score} out of 140.
    My chosen specialty is "${specialty}".
    My profile subjects are: ${subjects.join(", ")}.
    
    Give me a short, friendly piece of advice (max 2 sentences) about my chances of getting a state grant and what I should focus on.
    Write in Russian language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Нет совета.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Не удалось получить совет.";
  }
};

// --- Chat Capabilities ---

export const createChatSession = async (): Promise<Chat | null> => {
    const ai = getAIClient();
    if (!ai) return null;
    
    try {
        return ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "Ты — дружелюбный помощник BILIMGER для абитуриентов Казахстана. Отвечай на вопросы про вузы, ЕНТ, гранты и поступление. Будь краток и полезен. Используй эмодзи.",
            }
        });
    } catch (e) {
        console.error("Error creating chat session", e);
        return null;
    }
}

export const sendChatMessage = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response = await chat.sendMessage({ message });
        return response.text || "Нет ответа.";
    } catch (e) {
        console.error("Error sending chat message", e);
        return "Ошибка соединения с ИИ.";
    }
}

export const analyzeImageWithText = async (base64Image: string, prompt: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return "API Key is missing.";

    try {
         // clean base64 string if it has prefix
         const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { 
                        inlineData: { 
                            mimeType: 'image/jpeg', 
                            data: cleanBase64 
                        } 
                    },
                    { text: prompt || "Что изображено на этом фото?" }
                ]
            }
        });
        return response.text || "Не удалось проанализировать изображение.";
    } catch (e) {
        console.error("Error analyzing image", e);
        return "Ошибка при анализе изображения.";
    }
}
