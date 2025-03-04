import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

function SignInForm(props) {

  const [state, setState] = useState({
    username: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [passwordError, setPasswordError] = useState("enter password");

  // Handle data entry
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };


  // Checking the correctness of the password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return regex.test(password);
  };

  const myUser = useSelector((state) => state.user.myUser)


  // Handling situations in the login process: 
  //0-user does not exist, 
  //1-password does not match, 
  //2-login was successful
  useEffect(() => {
    if (props.num > -1) {
      switch (props.num) {
        case 0:
          alert(`You don't have any user`);
          props.handleStatus(1);
          props.handleNum()
          break;
        case 1:
          alert(`The password not connect`);
          setValid(false);
          setPasswordError("The password doesn't fit");
          props.handleNum()
          break;
        case 2:
          alert("you login successfully")
          props.handleNum()
          props.handleClose();
          break;
        default:
          break;
      }
    }
  }, [props.num])



  // Sending the data after the user has finished filling in the details
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const {username, password } = state;

    if (username && password && validatePassword(password)) {
      setValid(true);
      props.handleLogInSubmit(state)


    } else {
      if (!password) {
        setPasswordError("Please enter a password");
      } else if (password.length < 7) {
        setPasswordError("Password must be at least 7 characters long");
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must include at least one uppercase letter");
      } else if (!/[@$!%*?&]/.test(password)) {
        setPasswordError("Password must include at least one special character (@$!%*?&)");
      } else {
        setPasswordError("Please enter a valid password");
      }
    }

    setSubmitted(true);
  };

  return (
    <div className="form-container form-sign-in-container ">
      <form className="form-form form-body">
        {submitted && valid && (
          <div className="form-success-message">
            <h3 className="form-h3">Welcome {state.username}</h3>
            <div>Your login was successful!</div>
          </div>
        )}
        <h1 className="form-h1">Sign in</h1>
        <div className="form-social-container">
          <a href="#" className="form-social form-a">
            <i className="form-fab fa-facebook form-i"></i>
          </a>
          <a href="#" className="form-social form-a">
            <i className="form-fab fa-google form-i"></i>
          </a>
          <a href="#" className="social form-a">
            <i className="form-fab fa-linkedin form-i"></i>
          </a>
        </div>
        {!valid && (<input
          type="username"
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={handleChange}
          className="form-input"
        />)}
        {submitted && state.username.length == 0 && (
          <div className="form-message-error">please enter username</div>
        )}
        {!valid && (<input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="form-input"
        />)}
        {submitted && !valid && (
          <div className="form-message-error">{passwordError}</div>
        )}
        {!valid && (
          <button className="form-button" onClick={handleOnSubmit}>
            Sign In
          </button>
        )}

      </form>
    </div>
  );
}

export default SignInForm;

