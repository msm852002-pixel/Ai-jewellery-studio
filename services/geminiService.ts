
import { GoogleGenAI, Modality } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generatePhotoshootImage = async (
  jewelryFile: File,
  modelFile: File
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const jewelryBase64 = await fileToBase64(jewelryFile);
    const modelBase64 = await fileToBase64(modelFile);

    const prompt = `Taking the jewelry from the first image and the model from the second, generate an ultra-realistic, cinematic 8K photoshoot image. The model should be wearing the jewelry naturally. The lighting should be soft and ambient, creating a luxury feel. The background should be beautifully blurred (bokeh), ensuring the jewelry is in sharp focus. The final image should have a premium, high-end aesthetic.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: jewelryBase64, mimeType: jewelryFile.type } },
                { inlineData: { data: modelBase64, mimeType: modelFile.type } },
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("No image was generated. The model may have refused the request due to safety policies. Please try a different image.");
};
