
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImagesByQuestion } from "../redux/reducers/imageReucers";
import { addLike } from "../redux/reducers/likeReducers"
import {
    IconButton,
} from '@mui/material';
import {
    ThumbUp as LikeIcon,
} from '@mui/icons-material';
import { useEffect } from "react";
import { updateUser } from "../redux/reducers/userReducers";
const axiosInstance = axios.create({
    withCredentials: true,
  });

export default function AddLike({ image, question }) {
    const dispatch = useDispatch();
    let myUser = useSelector((state) => state.user.myUser);
    const [numoflikes, setnumoflikes] = useState(image.like_count + 1);//שמירת לייקים לכל תמונה
    const [numoflikes1, setnumoflikes1] = useState(myUser.like_count + 1);//שמירת לייקים לכל משתמש


    const likes = useSelector((state) => state.like.listlikes); // Assuming likes are stored in redux
    const imagesByQuestions = useSelector((state) => state.image.imagesByQuestion);
    const imagesByQuestion = Object.values(imagesByQuestions[question.id]);

    //לעדכן את המשתמש בכל שינוי
    useEffect(() => {
        dispatch(updateUser(myUser));
    }, [myUser, dispatch]);

    //לעדכן את הלייקים בל שינוי
    // useEffect(() => {
    //     if (likes.length == 0) {
    //         dispatch({ type: 'GET_LIKE' })
    //     }
    // }, [likes, dispatch]);

    const handleLike = async () => {

        if (question.users.id === myUser.id) {//ךמשתמש אים אפרשרות לדרג שאלה של עצמו
            alert("this your question")
            return;
        }

        //אם המערך בהרידקס ריק שילך להביא מהמסד
        if (imagesByQuestion.length == 0) {
            dispatch({ type: 'FETCH_IMAGES_BY_QUESTION', payload: question.id });
        }
        dispatch({ type: 'GET_LIKE' })
        //משתמש לא יכול לענות על שאלה יותר מפעם אחת       
        if (imagesByQuestion) {
            console.log("arrlikes ", likes)
            for (let i = 0; i < Object.values(imagesByQuestion).length; i++) {
                console.log("nowimage ", imagesByQuestion[i])
                for (let index = 0; index < likes.length; index++) {
                    console.log("nowlike ", likes[index])
                    if (imagesByQuestion[i].image_id == likes[index].images.image_id
                        && likes[index].users.id == myUser.id) {
                        alert("You have already liked one of the images in this question!");
                        return;
                    }
                }
            }
        }

        try {
            //בשביל לדרג הוא צריך להתחבר לאתר
            if (!image || !myUser || myUser.id === -1) {
                alert("You need to login or sign up");
                return;
            }

            const newLike = {
                images: image,
                users: myUser,
            };
            setnumoflikes(numoflikes + 1);
            // שליחת הבקשה לשרת להוספת לייק
            const response1 = await axiosInstance.post("http://localhost:8080/api/Likes/AddLikes", newLike, {
                headers: { 'Content-Type': 'application/json' },
            });
            dispatch(addLike(response1.data))

            dispatch(setImagesByQuestion(
                imagesByQuestion.map(i => i &&
                    i.id === image.id  // בדיקה אם ה-ID תואם
                    ? { ...i, like_count: numoflikes } // עדכון מספר הלייקים
                    : image // החזרת התמונה כפי שהיא אם לא תואמת
                )
            ));

            // עדכון מספר הלייקים לתמונה
            const updatedImage = {
                ...image,
                like_count: numoflikes, // אם like_count אינו מוגדר, התחל מ-0
            };

            await axiosInstance.put(`http://localhost:8080/api/Images/UpdateImage/${image.image_id}`, updatedImage, {
                headers: { 'Content-Type': 'application/json' },
            });
            //עדכון מספר הלייקים של המשתמש
            setnumoflikes1(numoflikes1 + 1)

            const newuser = { ...myUser, like_count: myUser.like_count + 1 }
            dispatch(updateUser(newuser))


            await axiosInstance.put(` http://localhost:8080/api/Users/UpdateUsers/${myUser.id}`, newuser, {
                headers: { 'Content-Type': 'application/json' },

            });

            alert("Liked successfully!");
            dispatch({ type: 'FETCH_IMAGES_BY_QUESTION', payload: question.id });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to like the image.");
        }
    };


    return (

        <IconButton onClick={handleLike}>

            <LikeIcon />

        </IconButton>
    );
}
