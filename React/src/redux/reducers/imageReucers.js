// import { createSlice } from '@reduxjs/toolkit';
// const initialState={
//    imagelist:[] ,
// }

// export const imageSlice = createSlice({
//     name:'image',
//     initialState,
//     reducers: {
       
//     },
// })

// export const { } = userSlice.actions

// export default userSlice.reducer


// src/redux/reducers/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imagesByQuestion: {},
//   {
//    " image_id":" ",
//    "image_url":" ",
//   "  like_count":" ",
//  " questions":" "
  

//   },
  imagelist:[] // נשתמש במבנה זה כדי למפות תמונות לפי מזהה השאלה
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImagesByQuestion: (state, action) => {
      const { questionId, images } = action.payload;
      state.imagesByQuestion[questionId] = images;
    },
    getImages: (state, action) => {
        state.imagelist = action.payload;
    },
    updateImageLikeCount: (state, action) => {
      const { questionId, imageId, newLikeCount } = action.payload;
      if (state.imagesByQuestion[questionId]) {
          state.imagesByQuestion[questionId] = state.imagesByQuestion[questionId].map((img) =>
              img.image_id === imageId ? { ...img, like_count: newLikeCount } : img
          );
      }
  }
  
  },
});

export const { setImagesByQuestion,getImages ,updateImageLikeCount} = imageSlice.actions;

export default imageSlice.reducer;
