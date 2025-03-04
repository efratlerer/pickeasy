import React, { useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

function SignUpForm2({ handleClose, handleStatus, handleSignUpSubmit, handleProfile }) {
  const [state, setState] = useState({
    profile: null,
  });
  const [nexted, setNexted] = useState(false);//משתנה להתקדמות שלב  בהרשמה
  const [valid, setValid] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Handle image upload
  const handleFileUpload = (e) => {
    const { name } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.files[0],
    }));
    console.log(e.target.files[0]);
    handleProfile(e.target.files[0]);
  };

  // Handle form submission
  const handleNext = (evt) => {
    evt.preventDefault();
    const { profile } = state;

    if (profile) {
      setValid(true);
      handleSignUpSubmit(evt);
    } else {
      setProfileError("Please upload a profile image.");
      setNexted(true);
    }
  };

  // Go back to the previous step
  const handleBack = () => {
    handleStatus(-1);
  };

  return (
    <div className="form-container form-sign-up-container">
      <form className="form-form">
        <h1 className="form-h1">Create Account</h1>

        <input
          type="file"
          id="profile-image"
          name="profile"
          onChange={handleFileUpload}
          className="form-input"
        />
        {nexted && !valid && (
          <div className="form-message-error">{profileError}</div>
        )}

        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={2}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button size="small" onClick={handleNext} className="form-button">
              Sign Up
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} className="form-button">
              Back
            </Button>
          }
        />
      </form>
    </div>
  );
}

export default SignUpForm2;
