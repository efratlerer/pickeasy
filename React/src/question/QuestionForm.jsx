
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './stylesQuestion.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../redux/reducers/userReducers";
import Loader from "../Loader";
import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: true,
});

export default function QuestionForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");//שמירת הטקסט
  const [answerTime, setAnswerTime] = useState("");//שמיתר הדדלין
  const [images, setImages] = useState([]);//שמירת התמונות
  const [category, setCategory] = useState("");//שמיתר הקטגוריה
  const myUser = useSelector((state) => state.user.myUser);
  const [error, setError] = useState("");
  //מערך הקטגוריות
  const categories = ["Foods", "Clothing", "Apartments", "Codes", "Electrical appliances", "Other"];

  const handleClickOpen = () => {
    // if (myUser.id === -1) {
    //   alert("You need to login or sign up");
    // } else if (myUser.points < 2) {
    //   alert("You don't have enough points");
    // } else {
      setOpen(true);
    //}
  };

  const handleClose = () => {
    setOpen(false);
    //לאפס את כל השדות
    setQuestionText("");
    setAnswerTime("");
    setImages([]);
    setCategory("");
    setError("");
  };

  //aploud images
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    // בדיקה אם כל השדות מולאו
    if (!questionText || !answerTime || images.length === 0 || !category) {
      setError("Please fill all fields, select a category, and upload at least one image.");
      return;
    }

    setLoading(true);
    
    try {
      const questionObject = {
        text: questionText,
        deadline: answerTime,
        category: category, // שמירת הקטגוריה
        winner_image_id: null,
        users: myUser,
      };

      // שליחת השאלה
      const action = { type: 'ADD_QUESTION', payload: { questionObject, images } };
      dispatch(action);
      
      const newUser = { ...myUser, points: myUser.points - 2 };
      dispatch(updateUser(newUser));
      await axiosInstance.put(`http://localhost:8080/api/Users/UpdateUsers/${newUser.id}`, newUser);
      
      handleClose();
      setLoading(false);
      alert("Question added successfully!");
    } catch (error) {
      console.error("Error adding question or images:", error);
      alert("Failed to add question.");
    }
  };
  return (
    <div>
      <button
        style={{
          background: "none",
          color: "#0D98A0",
          boxShadow: "none",
          marginLeft: "0%",
          marginRight: "0%",
          border: "none",
          cursor: "pointer",
        }}
        className="form-nav1"
        onClick={handleClickOpen}
      >
        <div style={{ fontFamily: "Segoe Print", textDecoration: "underline" }}>Add question</div>
      </button>

      <Dialog maxWidth="lg" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add a New Question</DialogTitle>
        <DialogContent>
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={3}>
              {/* צד שמאל: טופס */}
              <Grid item xs={8}>
                <Box>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Question Text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                    sx={{ width: "100%" }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Time to Answer"
                    type="datetime-local"
                    value={answerTime}
                    onChange={(e) => setAnswerTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    sx={{ width: "100%" }}
                  />
                  <FormControl fullWidth margin="normal" required sx={{ width: "100%" }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginTop: "20px", display: "block", marginLeft: "45%" }}
                    required
                  />
                  {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
                  )}
                  <button
                    className="form-button"
                    onClick={handleSubmit}
                    style={{ marginTop: "20px", marginLeft: "42%" }}
                  >
                    Submit Question
                  </button>
                </Box>
              </Grid>

              {/* צד ימין: תמונה */}
              <Grid item xs={4}>
                <Box
                  sx={{

                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div style={{ width: "100%", textAlign: "center", marginRight: "10px" }}>

                    <img
                      src="images/3 Points to Consider in Small Business Marketing.jpeg"
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                      }}
                    />

                  </div>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
