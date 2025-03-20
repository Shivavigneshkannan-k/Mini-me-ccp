import { GoogleGenerativeAI } from "@google/generative-ai";
import { setExtractedText, addAINotes } from "../utils/dataSlice";

const API_KEY = "AIzaSyBHzi6D89MaubaMz22W13MNn72LFtlMqaQ"; // Replace this with your actual API key

// Generate structured study notes from extracted text
export const generateStudyNotes = async (text, dispatch) => {
  dispatch(setExtractedText(text));

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Simplify the following content into clear, concise study notes in this format:
       - Topic: [Main Heading]
        - Summary: [Key details simplified, 50 - 100 words]
        - Important Terms: [List of key concepts or important points and their definition].

         atleast generate for top 15 topics from text in above format.
    ${text}`;

    const result = await model.generateContent(prompt);
    const generatedText = await JSON.parse(result.response.text());
    dispatch(addAINotes(generatedText));
    
    console.log(generatedText);
    // const topic = generatedText.match(/Topic:\s*(.*)/)?.[1] || "Unknown Topic";
    // const summary = generatedText.match(/Summary:\s*([\s\S]*?)\n- Important Terms:/)?.[1]?.trim() || "No summary provided.";
    // const importantTerms = generatedText.match(/Important Terms:\s*([\s\S]*)/)?.[1]?.split("\n").map(term => term.trim()).filter(Boolean) || [];

    
    return { generatedText };
  } catch (error) {
    console.error("❌ Error generating notes:", error);
    return {
      topic: "Error",
      summary: "⚠️ Error generating notes. Please try again.",
      importantTerms: []
    };
  }
};
