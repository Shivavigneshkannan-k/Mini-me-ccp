import { GoogleGenerativeAI } from "@google/generative-ai";
import { setExtractedText, addAINotes } from "../utils/dataSlice";

const API_KEY = "AIzaSyBHzi6D89MaubaMz22W13MNn72LFtlMqaQ"; // Exposed for testing

// Generate structured study notes from extracted text
export const generateStudyNotes = async (text, dispatch) => {
  // Store extracted text in Redux
  dispatch(setExtractedText(text));

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Simplify the following content into clear, concise study notes in this format:
        - Topic: [Main Heading]
        - Summary: [Key details simplified]
        - Important Terms: [List of key concepts or important points]

        Content to simplify:
        ${text}`;

    const result = await model.generateContent(prompt);
    const generatedText =
      result.candidates?.[0]?.content || "⚠️ Failed to generate notes.";

    // Extract structured data using regex or text split logic
    const topic = generatedText.match(/Topic:\s*(.*)/)?.[1] || "Unknown Topic";
    const summary =
      generatedText
        .match(/Summary:\s*([\s\S]*?)\n- Important Terms:/)?.[1]
        ?.trim() || "No summary provided.";
    const importantTerms =
      generatedText
        .match(/Important Terms:\s*([\s\S]*)/)?.[1]
        ?.split("\n")
        .map((term) => term.trim())
        .filter(Boolean) || [];
    console.log(result);
    // Dispatch structured notes to Redux store
    dispatch(addAINotes({ topic, summary, importantTerms }));

    return { topic, summary, importantTerms };
  } catch (error) {
    console.error("❌ Error generating notes:", error);
    return {
      topic: "Error",
      summary: "⚠️ Error generating notes. Please try again.",
      importantTerms: []
    };
  }
};
