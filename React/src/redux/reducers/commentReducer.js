import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentbyquestion: {},
   listcomment: []
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getComment: (state, action) => {
            state.listcomment = action.payload;
        },
        addComment: (state, action) => {
            state.listcomment.push(action.payload);
        },
        setCommentByQuestion: (state, action) => {
            const { questionId, comments } = action.payload;
            state. commentbyquestion[questionId] = comments;
          },
    },
})

export const { getComment,addComment,setCommentByQuestion } = commentSlice.actions;
export default commentSlice.reducer;
