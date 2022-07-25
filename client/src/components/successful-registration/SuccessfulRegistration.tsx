import './SuccessfulRegistration.css'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { ActionType } from '../../redux/action-type';
import { useNavigate } from 'react-router-dom';

export default function SuccessfulRegistration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isShown: boolean = useSelector((state: AppState) => state.isSuccessfulRegistrationModalOpen);
    const onHandleCloseClicked = ()=>{
        dispatch({type: ActionType.HandleShowSucessfulRegister, payload: false});
        navigate("/login");
    }
    return (
        <Modal show={isShown} >
            <Modal.Body className="successful-registration-body">
                <h3>You registered successfully! 😃</h3>
                <button onClick={onHandleCloseClicked} className="btn btn-primary">Close</button>
            </Modal.Body>
        </Modal>
    );
}


