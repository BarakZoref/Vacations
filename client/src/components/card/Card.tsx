import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
// import { ICardProps } from "../../models/ICardProps";
import './Card.css'
import { AppState } from "../../redux/app-state";
import { UserType } from "../../models/UserType";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import axios from "axios";
import { IVacation } from "../../models/IVacation";

interface ICardProps{
    vacation: IVacation;
}

export default function Card(props: ICardProps) {

    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state: AppState) => state.currentUser);
    let vacationId = props.vacation.id;

    const isFollowing = currentUser.followedVacations.has(vacationId)
    const onFollowClicked = async () => {
        if (!isFollowing) {
            await axios.post("http://localhost:3001/follows/", {vacationId});
            dispatch({ type: ActionType.AddFollow, payload: vacationId });
        }
        else {
            await axios.delete(`http://localhost:3001/follows/${vacationId}`);
            dispatch({ type: ActionType.RemoveFollow, payload: vacationId });
        }
    }

    const isUser = currentUser.userType == UserType.User;
    const isAdmin = currentUser.userType == UserType.Admin;


    const deleteVacation = async () => {
        try {
            await axios.delete("http://localhost:3001/vacations/" + vacationId);
        }
        catch (error) {
            alert("somthing went wrong, please try again later..");
        }
    }
    const editVacation = () => {
        dispatch({ type: ActionType.OpenAddOrEditModal, payload: vacationId })
    }
    const makeDatePretty = (date: string) => {
        let dateParts: string[] = date.split("-");
        return dateParts[2] + "." + dateParts[1] + "." + dateParts[0];
    }
    return (
        <div className="vacation-card">
            <div className="vacation-card-header">
                <br />
                <br />
                <h3>{props.vacation.destination} </h3>
                <div className="num-of-followers">{props.vacation.numOfFollowers}</div>
                {isUser && <button className="follow-card-button btn" onClick={onFollowClicked}>{isFollowing ? "❤️" : "🖤"}</button>}
                {isAdmin && <button type="button" className="remove-card-button" onClick={deleteVacation}>❌ </button>}
                {isAdmin && <button type="button" className="edit-card-button" onClick={editVacation}>✏️ </button>}
            </div>
            <img className="destination-image" src={props.vacation.image} /> <br /> <br />
            <h4>{props.vacation.price}$</h4>
            {makeDatePretty(props.vacation.beginningDate)} <br />
            {makeDatePretty(props.vacation.endingDate)} <br /><br />
            <button type="button" className="btn btn-primary" onClick={() => setShowDescriptionModal(true)}>Description</button>
            <Modal className="description-modal" show={showDescriptionModal}>
                <ModalHeader >
                    <ModalTitle>Description</ModalTitle>
                </ModalHeader>
                <ModalBody> {props.vacation.description} </ModalBody>
                <ModalFooter><button className="btn btn-primary" onClick={() => setShowDescriptionModal(false)}>Close</button></ModalFooter>
            </Modal>
        </div>
    );
}
