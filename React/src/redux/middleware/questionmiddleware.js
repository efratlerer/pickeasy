
import axios from "axios";
import { getQuestions ,addQuestion,deleteQuestion} from "../reducers/questionReducers";
const axiosInstance = axios.create({
  withCredentials: true,
});

export const getQuestionMidd = ({ dispatch }) => next => action => {
    if (action.type === 'GET_QUESTION') {
      axiosInstance.get("http://localhost:8080/api/Questions/Questions")
            .then((response) => {
           
                dispatch(getQuestions(response.data));
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    }
    return next(action);
};


export const addQuestionMidd = ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === 'ADD_QUESTION') {
      const { questionObject, images } = action.payload;
      
      try {
        const questionResponse = await axiosInstance.post("http://localhost:8080/api/Questions/AddQuestions", questionObject);
        const questionId = questionResponse.data.id;
  
        if (questionId && images.length > 0) {
          const promises = Array.from(images).map((image) => {
            const newImageDetails = {
              image_id: null,
              like_count: 0,
              questions: { id: questionId }
            };
  
            const formData = new FormData();
            formData.append("image", image);
            formData.append("details", new Blob([JSON.stringify(newImageDetails)], { type: "application/json" }));
  
            return axiosInstance.post("http://localhost:8080/api/Images/AddImage", formData);
          });
  
          await Promise.all(promises);
        }
  
        dispatch(addQuestion(questionResponse.data));
      } catch (error) {
        console.error("Error adding question or images:", error);
        alert("Failed to add question.");
      }
    }
  
    return next(action);
  };
  

  export const deleteQuestionMidd = ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === 'DELETE_QUESTION') {
      const { questionId } = action.payload;
      
      try {
      await axiosInstance.delete(`http://localhost:8080/api/Questions/DeleteQuestions/${questionId}`);
       
  
        dispatch(deleteQuestion(questionId));
      } catch (error) {
        console.error("Error deleting question or images:", error);
      
      }
    }
  
    return next(action);
  };