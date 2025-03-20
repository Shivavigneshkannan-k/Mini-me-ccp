import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    notes: [],
    questions: []  // Will store all types of questions (multiple-choice, fill-in-the-blank, short-essay)
  },
  reducers: {
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    addQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addMultipleChoiceQuestion: (state, action) => {
      // This action is used to specifically add multiple-choice questions with options.
      state.questions.push(action.payload);
    }
  }
});

export const { addNotes, addQuestions, addMultipleChoiceQuestion } = dataSlice.actions;
export default dataSlice.reducer;
