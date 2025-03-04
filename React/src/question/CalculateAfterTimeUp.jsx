import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { updateUser } from "../redux/reducers/userReducers";
import { updateQuestion } from '../redux/reducers/questionReducers';
const axiosInstance = axios.create({
  withCredentials: true,
});

const CalculateWinnerAndUpdatePoints = ({ question }) => {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.user.myUser);
  const likes = useSelector((state) => state.like.listlikes); // Assuming likes are stored in redux
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.question.listQuestion); // Assuming questions are in redux
  const imagesByQuestion = useSelector((state) => state.image.imagesByQuestion);
  //המשתמש מתעדכן בכל שינוי
  useEffect(() => {

    dispatch(updateUser(myUser));
  }, [myUser, dispatch,]);


  useEffect(() => {

    dispatch({ type: 'FETCH_IMAGES_BY_QUESTION', payload: question.id });
    if (likes.length === 0)
      dispatch({ type: 'GET_LIKE' });


    // 2. מציאת התמונה המנצחת (עם הכי הרבה לייקים)
    let winnerImage = null;
    let maxLikeCount = 0;

    imagesByQuestion[question.id].forEach(image => {
      if (image.like_count > maxLikeCount) {
        maxLikeCount = image.likeCount;
        winnerImage = image;
      }
    });

    if (winnerImage) {

      // 3. עבר על כל הלייקים ובדוק אם הם שייכים לתמונה המנצחת
      const winningLikes = likes.filter(like => like.images.image_id === winnerImage.image_id);

      //לעדכן לכל המשתמשים של הלייקים האלה נקודה יותר
      winningLikes.forEach(like => {
        if (like.users.id && question.winner_image_id == 0) {
          const updateduser = {
            ...like.users,
            points: like.users.points + 1,
            win_count: like.users.win_count + 1,
          };


          try {

            dispatch(updateUser(updateduser))
            axiosInstance.put(`http://localhost:8080/api/Users/UpdateUsers/${updateduser.id}`, updateduser);


            const updateQuestions = { ...question, winner_image_id: winnerImage.image_id };

            axiosInstance.put(`http://localhost:8080/api/Questions/UpdateQuestions/${updateQuestions.id}`, updateQuestions);
            dispatch(updateQuestion(updateQuestion))

          } catch (error) {
            console.error("Error update userpoints :", error);

          }

          // 5. שליחת מייל למשתמש שהעניק לייק לתמונה המנצחת
          const mail = {
            recipient: like.users.email,
            msgBody: 'Congratulations! You earned a point You have earned a point for liking the winning image',
            subject: 'haapy massege'

          }
          const response = axiosInstance.post(' http://localhost:8080/sendMail', mail);

        }
      });

      //   6. שליחת מייל למשתמש שהעלה את השאלה על התוצאות
      const newmail = {
        recipient: question.users.email,
        msgBody: `The selected image is from user ${`data:image/jpg;base64,${winnerImage.url}`} with ${winnerImage.like_count} like`,
        subject: 'Question Results'

      }

      if (question.users.email) {
        const response = axiosInstance.post(' http://localhost:8080/sendMail', newmail);

      }
    }
  }, [questions, likes, users, question.id, dispatch]);
  //
};

export default CalculateWinnerAndUpdatePoints;
