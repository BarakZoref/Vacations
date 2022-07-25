import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UserType } from "./UserType";

export interface IUser{
    firstName: string,
    lastName: string | null,
    userType: UserType,
    followedVacations: Set<number>,
    token: string | null,
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
}