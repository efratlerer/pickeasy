
import axios from 'axios';
import { setImagesByQuestion } from '../reducers/imageReucers';
const axiosInstance = axios.create({
  withCredentials: true,
});

export const imageMiddleware = ({ dispatch }) => next => action => {


  if (action.type === 'FETCH_IMAGES_BY_QUESTION') {
    const questionId = action.payload;

    axiosInstance.get(`http://localhost:8080/api/Images/ImageByQuetionId/${questionId}`)
      .then(response => {
        dispatch(setImagesByQuestion({ questionId, images: response.data }));
    
      })
      .catch(error => {
        console.error(`Error fetching images for question ${questionId}:`, error);
      });
  }

  return next(action);
};
