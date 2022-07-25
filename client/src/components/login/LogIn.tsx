import './LogIn.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import validator from 'validator';
import { ActionType } from '../../redux/action-type';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import jwt_decode from "jwt-decode";
import { UserType } from '../../models/UserType';
import { IUser } from '../../models/IUser';
import { Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface ILogInDetails{
  userName: string,
  password: string
}

const theme = createTheme();

export default function LogIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userDetails: ILogInDetails = {
      userName: data.get('email') as string,
      password: data.get('password') as string
    };
    try {
      validateProperLogInInput(userDetails);
      let response = await axios.post("http://localhost:3001/users/login", userDetails);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

      const socket = io('http://localhost:3002/', { query: {"token" : response.data.token }}).connect();

      let loggedInUser = convertDataToUser(response, socket);
      let sessionStorageDetails ={token: loggedInUser.token, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName}
      sessionStorage.setItem("userDetails", JSON.stringify(sessionStorageDetails) );
      dispatch({ type: ActionType.UpdateLoggedInUser, payload: loggedInUser });
      navigate("/");
    }
    catch (e: any) {
      if(e.message == "Request failed with status code 600"){
        setIsEmailError(true);
        setIsPasswordError(true);
        setPasswordError("Email or Password are invalid");
      }
      else if (e.message !== "clientError") {
        alert("Login failed.")
      }
      console.log(e);
    }
  }

  const convertDataToUser = (response: AxiosResponse<any, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    let token = response.data.token;
    let decodedToken: any = jwt_decode(token);
    let firstName = response.data.firstName;
    let lastName = response.data.lastName;
    let followedVacations = new Set<number>();
    for(let vacationId of response.data.followedVacationsArray){
      followedVacations.add(vacationId);
    }

    let userType = decodedToken.userType;
    if (userType == "user") {
      userType = UserType.User;
    }
    else {
      userType = UserType.Admin;
    }

    let loggedInUser: IUser ={firstName, lastName, userType, followedVacations, token, socket};
    return loggedInUser;
  }

  const validateProperLogInInput = (userDetails: ILogInDetails) => {
    let isErrorDetected = false;
    if (!validator.isEmail(userDetails.userName)) {
      setIsEmailError(true);
      setEmailError("Please enter valid email adress");
      isErrorDetected = true;
    }

    if (userDetails.password == "") {
      setIsPasswordError(true);
      setPasswordError("Please enter password");
      isErrorDetected = true;
    }
    if (isErrorDetected) {
      throw new Error("clientError");
    }
  }
  
  return (
    <div className="login-div">
      <ThemeProvider theme={theme}>
        <div className="login">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <br/>
             <p>
                <strong>admin:</strong> admin@admin.com <br/>
                <strong>password:</strong> 123456 <br/>
                <strong>user:</strong> barak@gmail.com <br/>
                <strong>password:</strong> 123456
              </p>
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
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={() => { setIsPasswordError(false); setPasswordError(""); }}
                        error={isPasswordError}
                        helperText={passwordError}
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
                  Log in
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link className="link" onClick={() => navigate("/register")} variant="body2">
                      Don't have an account yet? Register
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
