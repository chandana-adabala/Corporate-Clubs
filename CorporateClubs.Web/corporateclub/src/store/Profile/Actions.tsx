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
    RemoveMessages = "RemoveMessages"
    
}

export interface PayloadType {
    User?: IUsers,
    Clubs?: IClubs[]
    FavClubs?: IClubs[]
    message?: string
    error?:string
    IsLoading?: boolean
    Status?: string

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

function FetchFavouriteClubsSuccess(Payload: PayloadType): ActionReturnType {
    return {
        type: ActionsTypes.FetchFavouriteClubs,
        Payload: Payload
    }
}

function ChangeDetailsSuccess(Payload: IUsers): ActionReturnType {
     
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
export function FetchProfileDetails() {
    return (dispatch) => {
        console.log("fetch call");
         
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch(url+'api/users/getuserbytoken',{headers:headers})
            .then(data => data.json())
            .then(data => {
                 
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
     
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    switch (sender) {
        case "contactdetails":
            return (dispatch) => {
                 
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/changecontactdetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                         
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
                 
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/ChangePersonalDetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                         
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
                 
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch(url+'api/users/ChangeProfessionalSummary', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken() } })
                    .then(response => {
                         
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



export function FetchFavouriteClubDetails(dispatch) {
    return (dispatch) => {
        console.log("fetch call");
        return fetch(url+'api/getallclubsofusers/2/2')
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("User Not Found!");
                } else {
                    console.log(data);
                    dispatch(FetchFavouriteClubsSuccess(data));
                }
            })
            .catch(error => dispatch(FetchDetailsFailed(error)))

    }
}
