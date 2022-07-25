import { IUser } from "../models/IUser";
import { IVacation } from "../models/IVacation";
import { UserType } from "../models/UserType";


export class AppState {

    public isAddOrEditVacationModalOpen: boolean = false;

    public isSuccessfulRegistrationModalOpen: boolean = false;

    //public followsMap: Map<number,Set<number>> = new Map();

    public vacationIdToEdit: number = 0;

    public guest: IUser = {firstName: "Guest", lastName: null, userType: UserType.Guest, followedVacations: new Set<number>(), token: null};
    public currentUser: IUser = this.guest;

    public vacationsMap: Map<number, IVacation> = new Map();

}


