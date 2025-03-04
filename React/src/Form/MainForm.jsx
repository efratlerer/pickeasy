import React, { useEffect, useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SignUpForm1 from "./SignUp1";
import SignUpForm2 from "./SignUp2";
import Profile from './Profile'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../redux/reducers/userReducers";
const axiosInstance = axios.create({
  withCredentials: true,
});
localStorage.setItem("isFirstVisit", "false")

export default function MainForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0)//משתנה לצורך בבדיקת מצב
  const [isLoggedIn, setIsLoggedIn] = useState(false);//האם המשתמש מחובר
  const [profile, setProfile] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);//האם המשתמש בתהליך הרשמה
  const [num, setNum] = useState(-1)//מתשנה לצורך בדיקת מצב
  const myUser = useSelector((state) => state.user.myUser);


 // console.log("redaxxx ", myUser)
  const [user, setUser] = useState({
    "id": -1,
    "username": "",
    "password": "",
    "email": "",
    "phone": "",
    "points": 0,
    "profile": "",
    "status": 1,
    "admin": false,
    "like_count": 0,
    "win_count": 0
  })
  //open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  //save user details on local storage and redux
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(updateUser(parsedUser)); // עדכן ב-Redux
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [dispatch]);


  const handleLogInSubmit = async (state) => {
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/Users/login', {
        username: state.username,
        password: state.password,
      });

      console.log('User signed in:', response.data);
      console.log("Status:", response.status);

      // בדיקת הסטטוס של התגובה
      switch (response.status) {
        case 206: { setNum(1) }
        case 200: { // התחברות מוצלחת
          setNum(2);

          setIsLoggedIn(true);
          const user = { ...response.data, password: null }
          localStorage.setItem("user", JSON.stringify(user)); // שמירת נתונים כ-JSON
          dispatch(updateUser(user));

          break;
        }

      }
    } catch (error) {
      setStatus(1); //מעדכן מצב של המשתמש
      alert(`You don't have any user or incorrect login information`);
      setNum(0);//אם לא הצליח להתחבר =0
      return response;
    }
  }

  // Completing the user's data
  const handleUserProperties = (e) => {
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value,
    }
    setUser(updatedUser);//עדכון state
    console.log("userProp", user);
  }




  const handleSignUpSubmit = async (e) => {
    e.preventDefault(); // מניעת רענון הדף בעת שליחת הטופס

    const newUser = {
      ...user,
      points: 5
    };

    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("user", new Blob([JSON.stringify(newUser)], {
      type: "application/json"
    }))

    try {
    
      const response = await axiosInstance.post('http://localhost:8080/api/Users/signup', formData);

      // בדיקה אם ההרשמה הצליחה
      if (response!=undefined) {
        alert("You have successfully registered");

        const user = { ...response.data, password: null }

        localStorage.setItem("user", JSON.stringify(user)); // שמירת נתונים כ-JSON
        dispatch(updateUser(user));// עדכון המשתמש בסטור

        handleClose(); // סגירת החלון

        setIsSignUp(true); // עדכון מצב ההרשמה

        console.log("singup : " + response.data.id)
        return;
      }
    } catch (error) {
      alert("There was an error registering, or you are already logged in");
      console.error('Error during sign up:', error);
      setStatus(0); // מעדכן מצב של משתמש
    }
  };

  //עדכון מצב משתמש בהרשה או התחברות
  const handleStatus = (num) => {
    setStatus(status + num)
  };

  //יוצר משתנה לפי מצב המשתמש וכך מראה אפשריות שונות על המסך תלוי במצב המשתמש
  const containerClass =
    "form-container " + (status > 0 ? "form-right-panel-active" : "");

  return (

    <React.Fragment>
      {myUser.id === -1 ? (
        <button
          style={{ background: "none", color: "#FAAE3E", marginTop: "20px", boxShadow: 'none', marginLeft: "0%" }}
          className="form-nav"
          variant="contained"
          onClick={handleClickOpen}
          color="info"
        >
          sign in | sign up
        </button>
      ) : (//אם מחובר או נרשם יכול להראות את הפרופיל
        (isLoggedIn && <Profile isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} />) ||
        (isSignUp && <Profile isConnected={isSignUp} setIsConnected={setIsSignUp} />)
      )}

      <Dialog

        maxWidth="sm"
        fullWidth
        className="form-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-alert-dialog-title">
          {"Sign in/up Form"}
        </DialogTitle>
        <DialogContent>
          <div className="form-App">
            <div className={containerClass} id="form-container">
              {status == 1 && (
                <SignUpForm handleStatus={handleStatus} handleUserProperties={handleUserProperties} handleSignUpSubmit={handleSignUpSubmit} />
              )}
              {status == 2 && (
                <SignUpForm1 handleStatus={handleStatus} handleUserProperties={handleUserProperties} />
              )}
              {status == 3 && (
                <SignUpForm2 handleClose={handleClose} handleStatus={handleStatus} handleSignUpSubmit={handleSignUpSubmit} handleProfile={(p) => (setProfile(p))} handleUserProperties={handleUserProperties} />
              )}
              {status == 0 && <SignInForm num={num} handleNum={() => setNum(-1)} handleStatus={handleStatus} handleSignUpSubmit={handleSignUpSubmit} handleClose={handleClose} handleLogInSubmit={handleLogInSubmit} />}
              <div className="form-overlay-container">
                <div className="form-overlay">
                  {status > 0 && <div className="form-overlay-panel form-overlay-left">
                    <h1 className="form-h1">Welcome Back!</h1>
                    <p className="form-p">
                      To keep connected with us please login with your personal info
                    </p>
                    <button
                      className="form-button form-ghost"
                      id="form-signIn"
                      onClick={() => { setStatus(0) }}
                    >
                      Sign In
                    </button>
                  </div>}
                  {status == 0 && <div className="form-overlay-panel form-overlay-right">
                    <h1 className="form-h1">Hello, Friend!</h1>
                    <p className="form-p">Enter your personal details and start journey with us</p>
                    <button
                      className="form-button form-ghost "

                      onClick={() => { setStatus(1) }}
                    >
                      Sign Up
                    </button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

      </Dialog>

    </React.Fragment>


  );
}










