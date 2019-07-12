import IUsers from '../../models/IUsers'
import IClubs from '../../models/IClubs';
import {getToken} from '../../Configure'
const url="http://localhost:3333/"
export enum ActionsTypes {
    FetchDetailsStarted = "FetchDetailsStarted",
    FetchProfileDetails = "FetchProfileDetails",
    FetchDetailsFalied = "FetchProfileDetailsFailed",
    ChangeUserDetails = "changeUserDetails",
    FetchClubDetails = "FetchInProgress",
    FetchFavouriteClubs = "FetchFavouriteClubs",
    ChangeSuccessful = "ChangesSuccessful",
    ChangesFailed = "ChangesFailed",
    RemoveMessages = "RemoveMessages",
    FetchAllUsers="FetchAllUsers"
    
}

export interface PayloadType {
    User?: IUsers,
    Clubs?: IClubs[]
    FavClubs?: IClubs[]
    message?: string
    error?:string
    IsLoading?: boolean
    Status?: string
    Users?:IUsers[]

}

export interface ActionReturnType {
    type: ActionsTypes
    Payload: PayloadType
}


function FetchDetailsStarted(Payload: PayloadType): ActionReturnType {

    return {
        type: ActionsTypes.FetchDetailsStarted,
        Payload: Payload
    }
}



function FetchProfileDetailsSuccess(Payload: IUsers): ActionReturnType {
    return {
        type: ActionsTypes.FetchProfileDetails,
        Payload: { User: Payload }
    }
}



function FetchDetailsFailed(Payload: PayloadType): ActionReturnType {
    return {
        type: ActionsTypes.FetchDetailsFalied,
        Payload: Payload
    }
}

function FetchClubDetailsSuccess(Payload: PayloadType): ActionReturnType {
    return {
        type: ActionsTypes.FetchClubDetails,
        Payload: Payload
    }
}

function FetchFavouriteClubsSuccess(Payload: IClubs[]): ActionReturnType {
    return {
        type: ActionsTypes.FetchFavouriteClubs,
        Payload: {FavClubs:Payload}
    }
}

function ChangeDetailsSuccess(Payload: IUsers): ActionReturnType {
    debugger;
    return {
        type: ActionsTypes.ChangeSuccessful,
        Payload: { User: Payload }
    }
}


function ChnageDetailsFailed(Payload: string): ActionReturnType {
    return {
        type: ActionsTypes.ChangesFailed,
        Payload: { Status: Payload }
    }
}

function RemoveMessageandError():ActionReturnType
{
    return {
        type: ActionsTypes.RemoveMessages,
        Payload: { message:'',error:''}
    }
}

function DetailsOfUser(Payload:IUsers[]):ActionReturnType
{
    return{
        type:ActionsTypes.FetchAllUsers,
        Payload:{Users:Payload}

    }
}

function FetchDetailsOfAllClubs(Payload:IClubs[]):ActionReturnType
{
    return{
        type:ActionsTypes.FetchClubDetails,
        Payload:{Clubs:Payload}

    }
}

export function FetchProfileDetails() {
    return (dispatch) => {
        console.log("fetch call");
        debugger;
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch(url+'api/users/getuserbytoken',{headers:headers})
            .then(data => data.json())
            .then(data => {
                debugger;
                if (data.message === "Not Found") {
                    throw new Error("User Not Found!");
                } else {
                    console.log(data);
                    dispatch(FetchProfileDetailsSuccess(data));
                }
            })
            .catch(error => dispatch(FetchDetailsFailed(error.message)))

    }
}


export function UpdateUserDetails(user: IUsers, sender: string) {
    debugger;
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    switch (sender) {
        case "contactdetails":
            return (dispatch) => {
                debugger;
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/changecontactdetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                        debugger;
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                        }
                    })
                    .catch(error => dispatch(ChnageDetailsFailed(error)))
            }
        case "personaldetails":
            return (dispatch) => {
                debugger;
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/ChangePersonalDetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                        debugger;
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                        }
                    })
                    .catch(error => dispatch(ChnageDetailsFailed(error)))
            }
        case "professionaldetails":
            return (dispatch) => {
                debugger;
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/ChangeProfessionalSummary', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken() } })
                    .then(response => {
                        debugger;
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                        }
                    })
                    .catch(error => dispatch(ChnageDetailsFailed(error)))
            }
    }
}



export function FetchFavouriteClubDetails() {
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return (dispatch) => {
        console.log("fetch call");
        return fetch(url+'api/clubs/getallfavclubsofuser',{headers:headers})
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("Fetch Failed!");
                } else {
                    console.log(data);
                    dispatch(FetchFavouriteClubsSuccess(data));
                }
            })
            .catch(error => dispatch(FetchDetailsFailed(error)))

    }
}


export const FetchUsers =()=>{
    debugger;
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
        debugger;
        console.log("fetch call");
        return fetch(url+'api/Users/GetAllUsers',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("Fetch Failed!");
            }else{
                console.log(data);
                dispatch(DetailsOfUser(data));
            }
        })
        .catch(error=>dispatch(FetchDetailsFailed(error)))

    }
}

export function FetchAllClubDetails() {
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return (dispatch) => {
        console.log("fetch call");
        return fetch(url+'api/clubs/getallclubs',{headers:headers})
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("Fetch Failed");
                } else {
                    console.log(data);
                    dispatch(FetchDetailsOfAllClubs(data));
                }
            })
            .catch(error => dispatch(FetchDetailsFailed(error)))

    }
}
