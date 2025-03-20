import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    notes: [],         // Stores extracted PDF text
    aiNotes: [],       // Stores AI-generated study notes
    extracted: '',     // Stores raw extracted text for reference
    questions: []      // Stores all types of questions
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = [...state.notes, ...action.payload];
    },
    setExtractedText: (state, action) => {
      state.extracted = action.payload;  // Raw extracted text
    },
    addAINotes: (state, action) => {
      const { topic, summary, importantTerms } = action.payload;
      state.aiNotes.push({ topic, summary, importantTerms }); // Structured AI notes
    },
    addQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addMultipleChoiceQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    clearNotes: (state) => {
      state.notes = [];
      state.aiNotes = [];
      state.extracted = '';  // Clear extracted text as well
    }
  }
});

export const {
  addNotes,
  setExtractedText,
  addAINotes,
  addQuestions,
  addMultipleChoiceQuestion,
  clearNotes
} = dataSlice.actions;

export default dataSlice.reducer;
