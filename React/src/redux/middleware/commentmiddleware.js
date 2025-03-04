
import axios from "axios";
import { getComment, addComment, setCommentByQuestion } from "../reducers/commentReducer";
const axiosInstance = axios.create({
    withCredentials: true,
  });
  
export const getCommentMidd = ({ dispatch }) => next => action => {
    if (action.type === 'GET_COMMENT') {
        axiosInstance.get("http://localhost:8080/api/Comments/Comments")
            .then((response) => {
                console.log('Comments fetched:', response.data);
                dispatch(getComment(response.data));
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }
    return next(action);
};

export const addCommentMidd = ({ dispatch, getState }) => next => async (action) => {
    if (action.type === 'ADD_COMMENT') {
        const { comment, myUser, question } = action.payload;
        const newComment = {
            id: null,
            comment: comment,
            users: myUser,
            questions: question
        };
        try {
            // שליחה של התגובה החדשה לשרת
            const response = await axiosInstance.post("http://localhost:8080/api/Comments/AddComments", newComment);
            console.log('Comment added:', response.data);


            dispatch(addComment(response.data));

        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment.");
        }
    }
    return next(action);
};
