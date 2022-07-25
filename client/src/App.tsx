import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddOrEditVacation from './components/add-or-edit-vacation/AddOrEditVacation';
import CardsContainer from './components/cards-container/CardsContainer';
import Graph from './components/graph/Graph';
import LogIn from './components/login/LogIn';
import MenuBar from './components/menu-bar/MenuBar';
import Register from './components/register/Register';
import SuccessfulRegistration from './components/successful-registration/SuccessfulRegistration';
import WelcomeDiv from './components/welcome-div/WelcomeDiv';
import { UserType } from './models/UserType';
import { ActionType } from './redux/action-type';
import { AppState } from './redux/app-state';
import jwt_decode from "jwt-decode";
import { IUser } from './models/IUser';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

function App() {

  const currentUser = useSelector((state: AppState) => state.currentUser);
  const isAdmin = currentUser.userType == UserType.Admin;

  const dispatch = useDispatch();
  useEffect(() => {
    initVacations();
    let userDetailsAsString = sessionStorage.getItem("userDetails");
    if(userDetailsAsString){    
      initUser(userDetailsAsString);
    }
  }, [])

  async function initVacations() {
    try {
      const response = await axios.get("http://localhost:3001/vacations");
      let vacations = response.data;
      dispatch({ type: ActionType.GetAllVacations, payload: vacations });
    }
    catch (error) {
      alert("somthing went wrong, please try again later..");
     }
  }

  async function initUser(userDetailsAsString: string) {
    try {
      let userDetails = JSON.parse(userDetailsAsString);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userDetails.token;
     const followedArrayResponse = await axios.get("http://localhost:3001/follows/");
     let followedArray = followedArrayResponse.data;

     const socket = io('http://localhost:3002/', { query: {"token" : userDetails.token }}).connect();

     let loggedInUser = convertDataToUser(followedArray, userDetails, socket);
     dispatch({ type: ActionType.UpdateLoggedInUser, payload: loggedInUser });
    }
    catch (error) { 
      alert("somthing went wrong, please try again later..");
    }
  }

  const convertDataToUser = (followedArray: number[], userDetails: any, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    let token = userDetails.token;
    let decodedToken: any = jwt_decode(token);
    let firstName = userDetails.firstName;
    let lastName = userDetails.lastName;
    let followedVacations = new Set<number>();
    for(let vacationId of followedArray){
      followedVacations.add(vacationId);
    }

    let userType = decodedToken.userType;
    if (userType == "user") {
      userType = UserType.User;
    }
    else {
      userType = UserType.Admin;
    }

    let loggedInUser: IUser ={ firstName, lastName, userType, followedVacations, token, socket}
    return loggedInUser;
  }


  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={
          <div>
            <WelcomeDiv />
            <CardsContainer />
          </div>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        {isAdmin && <Route path="/graph" element={<Graph />} />}
      </Routes>
      <SuccessfulRegistration />
      <AddOrEditVacation />
    </div>
  );
}

export default App;