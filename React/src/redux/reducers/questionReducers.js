import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listQuestion: [],
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        getQuestions: (state, action) => {
            state.listQuestion = action.payload;
        },
        addQuestion: (state, action) => {
            state.listQuestion.push(action.payload);
        },
        deleteQuestion: (state, action) => {
            state.listQuestion = state.listQuestion.filter((q) => q.id !== action.payload);
        },
        updateQuestion: (state, action) => {
            const index =state.listQuestion.findIndex(question => question.id === action.payload.id);
            if (index !== -1) {
              // עדכון השאלה הספציפית במערך
             state.listQuestion[index] = { ...state.listQuestion[index], ...action.payload };
          }
          }
        }
});

export const { getQuestions, addQuestion, deleteQuestion,updateQuestion } = questionSlice.actions;
export default questionSlice.reducer;
