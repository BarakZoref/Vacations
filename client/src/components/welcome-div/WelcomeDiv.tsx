import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import './WelcomeDiv.css';

export default function WelcomeDiv(){
    const currentUser = useSelector((state: AppState) => state.currentUser);
    return (
        <div className="welcome-div">
            <h1>Welcome {currentUser.firstName} {currentUser.lastName}</h1>
        </div>
    );
}