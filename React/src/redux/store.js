import { configureStore } from '@reduxjs/toolkit';
import usersReducers from './reducers/userReducers';
import questionsReducers from './reducers/questionReducers';
import { addQuestionMidd, getQuestionMidd } from './middleware/questionmiddleware';
import imageReducers from './reducers/imageReucers';
import { imageMiddleware } from './middleware/imagemiddleware';
import { addCommentMidd, getCommentMidd } from './middleware/commentmiddleware';
import commentReducer from './reducers/commentReducer';
import likeReducers from './reducers/likeReducers';
import { getLikeMidd } from './middleware/likemiddleware';
import { deleteQuestionMidd } from './middleware/questionmiddleware'
export const store = configureStore({
  reducer: {
    user: usersReducers,
    question: questionsReducers,
    image: imageReducers,
    comment: commentReducer,
    like: likeReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(imageMiddleware, getQuestionMidd,
      addQuestionMidd, addCommentMidd, getCommentMidd, getLikeMidd, deleteQuestionMidd),
});
