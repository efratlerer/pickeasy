
import React, { useEffect, useState } from "react";
import axios from "axios";
import MainComment from "../comment/MainComment";
import AddLike from "../like/AddLike"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Container,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ThumbUp as LikeIcon,
} from '@mui/icons-material';
import './stylesQuestion.css';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import "./stylesQuestion.css";
import CalculateWinnerAndUpdatePoints from './CalculateAfterTimeUp';
import { useNavigate } from "react-router-dom";
import { updateQuestion } from "../redux/reducers/questionReducers";
const axiosInstance = axios.create({
  withCredentials: true,
});

export default function QuestionsList() {
  const questionss = useSelector((state) => state.question.listQuestion);
  const location = useLocation();
  const navigate = useNavigate();
  let questions = location.state;
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.user.myUser);
  let sortedQuestions
  if (questions && Array.isArray(questions))
    sortedQuestions = [...questions].reverse();// להפוך את רשימת השאלות כך שהחדשה תהיה בראש
  const imagesByQuestion = useSelector((state) => state.image.imagesByQuestion);
  const [expiredQuestions, setExpiredQuestions] = useState(new Set());//שאלות שתם זמנם
  const [editQuestionId, setEditQuestionId] = useState(null); // מזהה השאלה שנערכה
  const [newDeadline, setNewDeadline] = useState(""); // תאריך חדש
  const [ifDeadline, setIfDeadline] = useState(false); // תאריך חדש
  const [likesCountByQuestion, setLikesCountByQuestion] = useState({});
  const [query, setQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // מצב פתיחה לדיאלוג התגובות


  //אפשרות חיפוש שאלה לפי שם משתמש
  function onSearch(event) {
    event.preventDefault();//מניעת רענון הדף
    const searchQuary = event.target.elements["search-quary"].value;
    setQuery(searchQuary);
  }
  //מסנן את השאלות לפי השם משתמש שהכניסו
  if (questions) {
    const filteredQuestion = questions.filter((q) => {
      return (q.users.username.toLowerCase().includes(query.toLowerCase())
      );
    })
    sortedQuestions = [...filteredQuestion].reverse();
  }

  // מחשב את סכום הלייקים עבור כל שאלה
  const calculateLikesCount = () => {
    const likesCount = {};
    questions.forEach((question) => {
      const images = imagesByQuestion[question.id] || [];
      likesCount[question.id] = images.reduce(
        (sum, image) => sum + (image.like_count || 0),
        0
      );
    });
    if (JSON.stringify(likesCount) !== JSON.stringify(likesCountByQuestion)) {
      setLikesCountByQuestion(likesCount);
    }
  };
  //קורא לפונקציה שיש שינוי באחת מהשאלות
  useEffect(() => {
    calculateLikesCount();
  }, [questions, imagesByQuestion, likesCountByQuestion]);

  //edit deadline
  const handleEditClick = (questionId, currentDeadline) => {
    setEditQuestionId(questionId); // מציין שהשאלה במצב עריכה
    setNewDeadline(currentDeadline);
    setIfDeadline(true)// מציב את התאריך הנוכחי כערך ברירת מחדל
  };

  //save deadline
  const handleSaveDeadline = async (question) => {
    try {
      const UpdateQuestion = { ...question, deadline: newDeadline }
      dispatch(updateQuestion(questions));
      const response = await axiosInstance.put(
        `http://localhost:8080/api/Questions/UpdateQuestions/${question.id}`, UpdateQuestion, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert("Deadline updated successfully!");

      // איפוס מצב העריכה
      setEditQuestionId(null);

    } catch (error) {
      console.error("Failed to update deadline:", error);
      alert("Failed to update the deadline.");
    }
  };


  useEffect(() => {
    if (questions.length === 0)
      dispatch({ type: 'GET_QUESTION' });
  }, [questions, dispatch, questionss, sortedQuestions]);

  useEffect(() => {
    questions.forEach((question) => {
      dispatch({ type: 'FETCH_IMAGES_BY_QUESTION', payload: question.id });
    });
  }, [dispatch, questions, questionss, sortedQuestions]);

  //בודק כל 1000 אם יש שאלה שכבר תם זמנה ומוסיך למערך
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const expired = new Set();
      questions.forEach((question) => {
        if (new Date(question.deadline) < now) {
          expired.add(question.id);
        }

      });
      setExpiredQuestions(expired);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [questions]);


  const handleDeleteQuestion = async (questionId) => {
    try {

      dispatch({
        type: "DELETE_QUESTION",
        payload: { questionId },
      });
      alert("Question deleted successfully!");
      navigate('/Category');
    } catch (error) {
      console.error("Error deleting the question:", error);
      alert("Failed to delete the question.");
    }
  };


  return (
    <Container>
      <div className="q">

        {sortedQuestions.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No questions available.
          </Typography>
        ) : (
          <>
            {/* Form for Search */}
            <form
              onSubmit={onSearch}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <input
                id="search-query"
                type="text"
                placeholder="Search question by username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '12px',
                  borderRadius: '5px',
                  width: '100%',
                  maxWidth: '450px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </form>
            <div>{sortedQuestions[0].category}</div>

            {/* Questions List */}
            <Grid container spacing={2}>
              {sortedQuestions.map((question) => (
                <Grid item xs={12} key={question.id}>
                  <Card style={{ width: '100%', position: 'relative', border: ' 1px solid black' }}>
                    <CardContent>
                      {/* Top Right Section */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div variant="body2" color="textSecondary">
                          {likesCountByQuestion[question.id] || 0}
                        </div>
                        <AccountCircleIcon color="action" />
                      </div>
                      <div variant="h6" color="primary">
                        {question.text}
                      </div>


                      {/* Edit Deadline Section */}
                      {editQuestionId === question.id ? (
                        <div>
                          <TextField
                            type="datetime-local"
                            value={newDeadline}
                            onChange={(e) => setNewDeadline(e.target.value)}
                          />
                          <IconButton
                            onClick={() => handleSaveDeadline(question)}
                            color="primary"
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setEditQuestionId(null)}
                            color="secondary"
                          >
                            <CancelIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Time to Answer:{" "}
                          {ifDeadline
                            ? new Date(newDeadline).toLocaleString()
                            : new Date(question.deadline).toLocaleString()}
                          {question.users.id === myUser.id && (
                            <IconButton
                              onClick={() =>
                                handleEditClick(
                                  question.id,
                                  new Date(question.deadline)
                                    .toISOString()
                                    .slice(0, 16)
                                )
                              }
                              color="primary"
                              style={{ marginLeft: '10px' }}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                        </Typography>
                      )}

                      {/* Images Section */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '10px',
                          marginTop: '10px',
                        }}
                      >
                        {imagesByQuestion[question.id] &&
                          imagesByQuestion[question.id].length > 0 ? (
                          imagesByQuestion[question.id].map((image) => (
                            <div
                              key={image.image_id}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <img
                                src={`data:image/jpeg;base64,${image.image_url}`}
                                alt="Question"
                                width="200"
                                height="200"
                                style={{ borderRadius: '8px' }}
                              />
                              <CardActions>
                                {expiredQuestions.has(question.id) ? (
                                  <>
                                    <div>
                                      <LikeIcon

                                      />
                                      : {image.like_count}
                                      <br />
                                      Time is up
                                    </div>
                                    <CalculateWinnerAndUpdatePoints
                                      question={question}
                                    />
                                  </>
                                ) : (
                                  <>
                                    {/* <div>{image.like_count}</div> */}
                                    <div>add like</div>

                                    <AddLike
                                      image={image}
                                      question={question}
                                    />
                                  </>
                                )}
                              </CardActions>
                            </div>
                          ))
                        ) : (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            No images available for this question.
                          </Typography>
                        )}
                      </div>
                    </CardContent>

                    {/* Actions Section */}
                    <CardActions>
                      {myUser.admin && (
                        <IconButton
                          onClick={() => handleDeleteQuestion(question.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </CardActions>
                    <button
                      className="form-button"
                      onClick={() => setIsDialogOpen(question.id)}
                      color="primary"
                    >
                      Comment
                    </button>
                    {isDialogOpen === question.id && myUser.id != -1 && (
                      <MainComment
                        question={question}
                        IsDialogOpen={true}
                        handleCloseDialog={() => setIsDialogOpen(false)}
                      />
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </Container>
  );
};




