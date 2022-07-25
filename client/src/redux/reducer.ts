import { AxiosResponse } from "axios";
import { log } from "console";
import { IUser } from "../models/IUser";
import { IVacation } from "../models/IVacation";
import { UserType } from "../models/UserType";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";
import jwt_decode from "jwt-decode";

const appStateInitialValue = new AppState();

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState = appStateInitialValue, action: Action): AppState {
    // Cloning the oldState (creating a copy)

    const newAppState = { ...oldAppState };

    let vacationId: number;
    let currentUser: IUser;
    let tempVacationsMap: Map<number, IVacation>;
    let vacation: IVacation;
    switch (action.type) {
        case ActionType.DeleteVacation:
            vacationId = action.payload;
            tempVacationsMap = new Map(newAppState.vacationsMap);
            tempVacationsMap.delete(vacationId);
            newAppState.vacationsMap = tempVacationsMap;

            if(newAppState.currentUser.followedVacations.has(vacationId)){
                newAppState.currentUser.followedVacations.delete(vacationId)
            }
            break;
        case ActionType.AddFollow:
            vacationId = action.payload;
            currentUser = { ...newAppState.currentUser };
            currentUser.followedVacations.add(vacationId);
            vacation = newAppState.vacationsMap.get(vacationId) as IVacation;
            vacation.numOfFollowers++;
            newAppState.vacationsMap.set(vacationId, vacation);
            currentUser.followedVacations.add(vacationId);
            newAppState.currentUser = currentUser;
            break;
        case ActionType.RemoveFollow:
            vacationId = action.payload;
            currentUser = { ...newAppState.currentUser };
            currentUser.followedVacations.delete(vacationId);
            vacation = newAppState.vacationsMap.get(vacationId) as IVacation;
            vacation.numOfFollowers--;
            newAppState.vacationsMap.set(vacationId, vacation);
            currentUser.followedVacations.delete(vacationId);
            newAppState.currentUser = currentUser;
            break;
        case ActionType.LogOut:
            newAppState.currentUser = newAppState.guest;
            break;
        case ActionType.GetAllVacations:
            let vacations = action.payload;
            newAppState.vacationsMap = new Map();
            for (let vacation of vacations) {
                newAppState.vacationsMap.set(vacation.id, vacation);
            }
            break;
        case ActionType.HandleShowSucessfulRegister:
            newAppState.isSuccessfulRegistrationModalOpen = action.payload;
            break;
        case ActionType.OpenAddOrEditModal:
            newAppState.isAddOrEditVacationModalOpen = true;
            newAppState.vacationIdToEdit = action.payload;
            break;
        case ActionType.CloseAddOrEditModal:
            newAppState.isAddOrEditVacationModalOpen = false;
            newAppState.vacationIdToEdit = 0;
            break;
        case ActionType.AddOrEditVacation:
            vacation = action.payload;
            tempVacationsMap = new Map(newAppState.vacationsMap);    
            tempVacationsMap.set(vacation.id, vacation);
            newAppState.vacationsMap = tempVacationsMap;
            break;
        case ActionType.UpdateLoggedInUser:
            let loggedInUser = action.payload;
            newAppState.currentUser = loggedInUser;
            break;
    }



// After returning the new state, it's being published to all subscribers
// Each component will render itself based on the new state
return newAppState;
}



