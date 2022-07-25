import './Register.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChangeEvent, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import validator from 'validator';
import { ActionType } from '../../redux/action-type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

interface IRegistrationDetails{
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
}

const theme = createTheme();

export default function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");

  const [isLastNameError, setIsLastNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState("");

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isPasswordStrengthBarShown, setIsPasswordStrengthBarShown] = useState(false);

  const [password, setPassword] = useState("");

  const onPassowrdChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newPassword = event.target.value
    setPassword(newPassword);
    if (newPassword != "") {
      setIsPasswordStrengthBarShown(true);
    }
    else {
      setIsPasswordStrengthBarShown(false);
    }
    setIsPasswordError(false);
    setPasswordError("");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let registrationDetails: IRegistrationDetails = {
      userName: data.get('email') as string,
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      password: data.get('password') as string,
      confirmPassword: data.get('confirmPassword') as string
    };
    setIsPasswordStrengthBarShown(false);
    try{
      validateRegistration(registrationDetails);
      let userDetails = 
      {
        userName: registrationDetails.userName,
        firstName: registrationDetails.firstName,
        lastName: registrationDetails.lastName,
        password: registrationDetails.password
      };
      await axios.post("http://localhost:3001/users/", userDetails);
      dispatch({type: ActionType.HandleShowSucessfulRegister, payload: true});

    }
    catch (e: any) {
      if(e.message == "Request failed with status code 600"){
        setIsEmailError(true);
        setEmailError("user-name is already exists");
      }
     else if (e.message !== "clientError") {
        alert("Registration failed.")
      }
      console.log(e);
    }
  };


  const validateRegistration = (userDetails: IRegistrationDetails) => {
    let isErrorDetected: boolean = false;
    if (!validator.isEmail(userDetails.userName)) {
      setIsEmailError(true);
      setEmailError("Please enter valid email adress");
      isErrorDetected = true;
    }
    if (userDetails.firstName == "") {
      setIsFirstNameError(true);
      setFirstNameError("Please enter first name");
      isErrorDetected = true;
    }
    if (userDetails.password == "") {
      setIsPasswordError(true);
      setPasswordError("Please enter password");
      isErrorDetected = true;
    }
    else if(userDetails.password.length < 6){
      setIsPasswordError(true);
      setPasswordError("The password can't be shorter than 6 digits");
      isErrorDetected = true;
    }
    else {
      if (userDetails.confirmPassword == ""){//if the user has submitted password but not confirmed
        setIsConfirmPasswordError(true);
        setConfirmPasswordError("Please confirm password");
        isErrorDetected = true;
      }
      else if(userDetails.password!=userDetails.confirmPassword){//if the user has submitted both password and confirm password
        setIsConfirmPasswordError(true);
        setConfirmPasswordError("The confirmed password doesn't match");
        isErrorDetected = true;
      }
    }
    if(isErrorDetected){
      throw new Error("clientError");
    }
  }

  return (
    <div className="signup-div">
      <ThemeProvider theme={theme}>
        <div className="signup">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
               <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <div className="input-div">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        autoFocus
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={isEmailError}
                        helperText={emailError}
                        onChange={() => { setIsEmailError(false); setEmailError(""); }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        inputProps={{ maxLength: 12 }}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        error={isFirstNameError}
                        helperText={firstNameError}
                        onChange={() => { setIsFirstNameError(false); setFirstNameError(""); }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        inputProps={{ maxLength: 12 }}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        error={isLastNameError}
                        helperText={lastNameError}
                        onChange={() => { setIsLastNameError(false); setLastNameError(""); }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={onPassowrdChange}
                        error={isPasswordError}
                        helperText={passwordError}
                      />
                      {isPasswordStrengthBarShown && <PasswordStrengthBar password={password} />}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        error={isConfirmPasswordError}
                        helperText={confirmPasswordError}
                        onChange={() => { setIsConfirmPasswordError(false); setConfirmPasswordError(""); }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link className="link" onClick={()=>navigate("/login")} variant="body2">
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
}