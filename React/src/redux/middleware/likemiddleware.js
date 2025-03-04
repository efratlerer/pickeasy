import axios from "axios";
import { getLikes } from "../reducers/likeReducers";
const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getLikeMidd = ({ dispatch }) => next => action => {
    if (action.type === 'GET_LIKE') {
        axiosInstance.get(" http://localhost:8080/api/Likes/Likes")
            .then((response) => {

                dispatch(getLikes(response.data));
            })
            .catch((error) => {
                console.error('Error fetching likes:', error);
            });
    }
    return next(action);
};
