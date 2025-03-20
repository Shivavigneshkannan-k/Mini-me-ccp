import { createSlice } from "@reduxjs/toolkit";
import { generateQuestionsFromAI } from "../Components/generateQuestions";
import { useDispatch } from "react-redux";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    notes: [],         // Stores extracted PDF text
    aiNotes: [],       // Stores AI-generated study notes
    extracted: "",     // Stores raw extracted text for reference
    questions: []      // Stores all types of questions
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = [...state.notes, ...action.payload];
    },
    setExtractedText: (state, action) => {
      state.extracted = action.payload; // Raw extracted text
      
    },
    addAINotes: (state, action) => {
      state.aiNotes.push(action.payload[0]?.generatedText); // Structured AI notes
    },
    addQuestions: (state, action) => {
      state.questions = [...state.questions, ...action.payload];
    },
    addMultipleChoiceQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    generateQuestionsInBulk: (state, action) => {
      const { studyNotes, generateQuestionsFromAI } = action.payload;

      // Generate all questions at once from AI and store in Redux
      const combinedText = studyNotes
        .map(note => `${note.Topic || ''}. ${note.Summary || ''}`.trim())
        .filter(text => text) // Remove empty text
        .join("\n\n");       // Combine all notes into one string for bulk generation

      const generatedQuestions = generateQuestionsFromAI(combinedText);
      state.questions = [...state.questions, ...generatedQuestions];
    },
    
    // ✅ New Function: Sets Generated Questions Directly
    setGeneratedQuestions: (state, action) => {
      state.questions = action.payload;
    },

    clearNotes: (state) => {
      state.notes = [];
      state.aiNotes = [];
      state.extracted = '';  
      state.questions = [];  // Clear questions as well
    }
  }
});

export const {
  addNotes,
  setExtractedText,
  addAINotes,
  addQuestions,
  addMultipleChoiceQuestion,
  generateQuestionsInBulk,
  setGeneratedQuestions,     // ✅ Added here for dispatching
  clearNotes
} = dataSlice.actions;

export default dataSlice.reducer;
