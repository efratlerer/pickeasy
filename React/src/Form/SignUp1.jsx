import React, { useState } from "react";
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';

function SignUpForm1(props) {
  const [state, setState] = useState({
    phone: "",
  });

  const [nexted, setNexted] = useState(false);
  const [valid, setValid] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Handle data entry
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    props.handleUserProperties(evt)
  };
  // Checking the correctness of the phoneNumber
  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
  // At the end of complition the step 2 of signup and go next to the step 3 in signup
  const handleNext = (evt) => {
    evt.preventDefault();
    const { phone } = state;

    if (phone && validatePhoneNumber(phone)) {
      setValid(true);
      props.handleStatus(1);
    } else {
      if (!phone) {
        setPhoneNumberError("Please enter a phoneNumber");
      } else if (phone.length !== 10) {
        setPhoneNumberError("phoneNumber must be 10 digits");
      } else {
        setPhoneNumberError("Please enter a valid phoneNumber");
      }
    }
    setNexted(true);
  };

  // go back in steps of signup
  const handleBack = () => {
    props.handleStatus(-1);
  };

  return (
    <div className="form-container form-sign-up-container">
      <form className="form-form">
        <h1 className="form-h1">Create Account</h1>
        {!valid && (
          <div className="form-social-container">
            <a href="#" className="form-social form-a">
              <i className="form-fab fa-facebook-f form-i" />
            </a>
            <a href="#" className="form-social form-a">
              <i className="form-fab fa-linkedin-in form-i" />
            </a>
          </div>
        )}

        {!valid && (
          <input
            type="tel"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            placeholder="phone"
            className="form-input"
          />
        )}

        {nexted && !valid && (
          <div className="form-message-error">{phoneNumberError}</div>
        )}

        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={1}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button size="small" onClick={handleNext} className="form-button">
              Next
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

export default SignUpForm1;

