import IUsers from '../../models/IUsers'
import IClubs from '../../models/IClubs';
import {getToken} from '../../Configure'
import {loadingStarted,loadingEnded} from '../../App/AppActions/AppActions'
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
         //("fetch call");
          
        dispatch(loadingStarted())
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch(url+'api/users/getuserbytoken',{headers:headers})
            .then(data => data.json())
            .then(data => {
                  
                if (data.message === "Not Found") {
                    throw new Error("User Not Found!");
                } else {
                     //(data);
                    dispatch(FetchProfileDetailsSuccess(data));
                    dispatch(loadingEnded())
                }
            })
            .catch(error =>{ dispatch(FetchDetailsFailed(error.message));dispatch(loadingEnded())})

    }
}


export function UpdateUserDetails(user: IUsers, sender: string) {
      
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    switch (sender) {
        case "contactdetails":
            return (dispatch) => {
                  
                dispatch(loadingStarted())
                 //("fetch call");
                 //(JSON.stringify(user));
                return fetch(url+'api/users/changecontactdetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                          
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                            dispatch(loadingEnded())
                        }
                    })
                    .catch(error => {dispatch(ChnageDetailsFailed(error));dispatch(loadingEnded())})
            }
        case "personaldetails":
            return (dispatch) => {
                  
                dispatch(loadingStarted())
                 //("fetch call");
                 //(JSON.stringify(user));
                return fetch(url+'api/users/ChangePersonalDetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken()} })
                    .then(response => {
                          
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                            dispatch(loadingEnded())
                        }
                    })
                    .catch(error =>{ dispatch(ChnageDetailsFailed(error));dispatch(loadingEnded())})
            }
        case "professionaldetails":
            return (dispatch) => {
                  
                dispatch(loadingStarted())
                 //("fetch call");
                 //(JSON.stringify(user));
                return fetch(url+'api/users/ChangeProfessionalSummary', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json",'Authorization': 'Bearer ' + getToken() } })
                    .then(response => {
                          
                        if (!response.ok) {
                            throw new Error("Fetch Failed");
                        } else {
                            dispatch(ChangeDetailsSuccess(user));
                            dispatch(loadingEnded())
                        }
                    })
                    .catch(error => {dispatch(ChnageDetailsFailed(error));dispatch(loadingEnded())})
            }
    }
}



export function FetchFavouriteClubDetails() {
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return (dispatch) => {
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/getallfavclubsofuser',{headers:headers})
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("Fetch Failed!");
                } else {
                     //(data);
                    dispatch(FetchFavouriteClubsSuccess(data));
                    dispatch(loadingEnded())
                }
            })
            .catch(error => {dispatch(FetchDetailsFailed(error));dispatch(loadingEnded())})

    }
}


export const FetchUsers =()=>{
      
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
          
        dispatch(loadingStarted())
         //("fetch call");
        return fetch(url+'api/Users/GetAllUsers',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("Fetch Failed!");
            }else{
                 //(data);
                dispatch(DetailsOfUser(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchDetailsFailed(error));dispatch(loadingEnded())})

    }
}

export function FetchAllClubDetails() {
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return (dispatch) => {
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/getallclubs',{headers:headers})
            .then(data => data.json())
            .then(data => {
                if (data.message === "Not Found") {
                    throw new Error("Fetch Failed");
                } else {
                     //(data);
                    dispatch(FetchDetailsOfAllClubs(data));
                    dispatch(loadingEnded())
                }
            })
            .catch(error => {dispatch(FetchDetailsFailed(error));dispatch(loadingEnded())})

    }
}
