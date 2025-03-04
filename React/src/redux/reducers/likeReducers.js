import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   listlikes: [],
}

export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        getLikes: (state, action) => {
            state.listlikes = action.payload;
        },
        addLike: (state, action) => {
            state.listlikes.push(action.payload);
        },
        // addComment: (state, action) => {
        //     state.listlikes.push(action.payload);
        // },
        // setCommentByQuestion: (state, action) => {
        //     const { questionId, comments } = action.payload;
        //     state.listcomment[questionId] = comments;
        //   },
    },
})

export const { getLikes,addLike } = likeSlice.actions;
export default likeSlice.reducer;
