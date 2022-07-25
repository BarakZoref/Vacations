import axios from 'axios';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserType } from '../../models/UserType';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import './MenuBar.css';

export default function MenuBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state: AppState) => state.currentUser);

    const isUser = currentUser.userType == UserType.User;
    const isAdmin = currentUser.userType == UserType.Admin;
    const isGuest = currentUser.userType == UserType.Guest;

    useEffect(() => {
        if (currentUser.socket) {
            initSocketListeners(currentUser.socket)
        }
    }, [currentUser]);

    const onLogOutClicked = () => {
        dispatch({ type: ActionType.LogOut });
        axios.defaults.headers.common['Authorization'] = '';
        sessionStorage.removeItem("userDetails");
        if(currentUser.socket!=null){
            currentUser.socket.disconnect();
        }
        navigate('/');
    }

    const onAddVacationClicked = () => {
        dispatch({ type: ActionType.OpenAddOrEditModal, payload: 0 });
    }

    function initSocketListeners(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
        socket.on("delete-vacation", (vacationIdJson) => {
            let vacationId = JSON.parse(vacationIdJson);
            dispatch({ type: ActionType.DeleteVacation, payload: vacationId });
        });

        socket.on("add-or-edit-vacation", (vacationJson) => {
            let vacation = JSON.parse(vacationJson);
            dispatch({ type: ActionType.AddOrEditVacation, payload: vacation });
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container">
                <span className="navbar-brand">Vacations</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                    className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="nav navbar-nav">
                        {(isAdmin || isGuest) &&
                            <li className="nav-item">
                                <a onClick={() => navigate("/")} className="nav-link">Home</a>
                            </li>
                        }
                        {isGuest &&
                            <li className="nav-item">
                                <a onClick={() => navigate("login")} className="nav-link" >Log in</a>
                            </li>
                        }
                        {isGuest &&
                            <li className="nav-item">
                                <a onClick={() => navigate("/register")} className="nav-link">Register</a>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item">
                                <a className="nav-link" onClick={onAddVacationClicked}>Add Vacation</a>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item">
                                <a onClick={() => navigate("graph")} className="nav-link">Graph</a>
                            </li>
                        }
                        {(isUser || isAdmin) &&
                            <li className="nav-item">
                                <a className="nav-link" onClick={onLogOutClicked}>Log out</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}