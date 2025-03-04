
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./styleCategory.css";

const Category = () => {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.user.myUser);
  const questions = useSelector((state) => state.question.listQuestion);
  const navigate = useNavigate();

  // יצירת מערך של קטגוריות
  const categories = ["Foods", "Clothing", "Apartments", "Codes", "Electrical appliances", "Other"];
  //מעדכן רשימת שלאות בכל שינוי
  useEffect(() => {
    if (questions.length === 0)
      dispatch({ type: 'GET_QUESTION' });
  }, [questions, dispatch,]);

  // פונקציה לניהול הניווט לדף השאלות של קטגוריה
  const handleCategoryClick = (category) => {

    // סינון השאלות לפי קטגוריה
    const filteredQuestions = questions.filter((q) => q.category === category)
    navigate('/QuestionsList', { state: filteredQuestions });

  };

  return (
    <div className="category-container" >
      <Grid container spacing={0.5}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className="category-card" id={`category-card-${index}`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="card-content" >
                <Typography variant="h6" className="category-title">
                  {category}
                </Typography>
                <Typography variant="body2" className="category-questions">
                  {questions.filter((q) => q.category === category).length} questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Category;