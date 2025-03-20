import { GoogleGenerativeAI } from '@google/generative-ai';
import { setGeneratedQuestions } from '../utils/dataSlice'; // Import the new action
const API_KEY = "AIzaSyBHzi6D89MaubaMz22W13MNn72LFtlMqaQ"; // Replace with your Gemini API Key

export const generateQuestionsFromAI = async (text,dispatch)  =>{
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
        Generate 4 types of questions (MCQ, Multiple Answer, Fill in the Blanks, Q&A) each type should have atleast 5 on differnt difficulity level(easy,medium,hard) based on the following text:
        Text: "${text}"

        **Format:**
        [
            { "type": "MCQ", "question": "MCQ Question?", "options": ["A", "B", "C", "D"], "answer": "A" },
            { "type": "Multiple Answer", "question": "Multiple Answer Question?", "options": ["A", "B", "C", "D"], "answer": ["A", "C"] },
            { "type": "Fill in the Blanks", "question": "Complete the sentence: _____ is the capital of France.", "answer": "Paris" },
            { "type": "Q&A", "question": "What is recursion?", "answer": "Recursion is a method where a function calls itself directly or indirectly." }
        ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        const cleanResponse = response.replace(/```json|```/g, '').trim();
        const jsonResponse = JSON.parse(cleanResponse);

        dispatch(setGeneratedQuestions(jsonResponse)); // ✅ Store in Redux
    } catch (error) {
        console.error('Error generating questions:', error);
        dispatch(setGeneratedQuestions([])); // Store empty array if error occurs
    }
};
