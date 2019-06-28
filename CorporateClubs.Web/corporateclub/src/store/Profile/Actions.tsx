import IUsers from '../../models/IUsers'
import IClubs from '../../models/IClubs';
export enum ActionsTypes {
    FetchDetailsStarted = "FetchDetailsStarted",
    FetchProfileDetails = "FetchProfileDetails",
    FetchDetailsFalied = "FetchProfileDetailsFailed",
    ChangeUserDetails = "changeUserDetails",
    FetchClubDetails = "FetchInProgress",
    FetchFavouriteClubs = "FetchFavouriteClubs",
    ChangeSuccessful = "ChangesSuccessful",
    ChangesFailed = "ChangesFailed"
}

export interface PayloadType {
    User?: IUsers,
    Clubs?: IClubs[]
    FavClubs?: IClubs[]
    error?: string
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
export function FetchProfileDetails(dispatch) {
    return (dispatch) => {
        console.log("fetch call");
        debugger;
    
        return fetch('http://localhost:3333/api/users/getuserbyid/2')
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
    switch (sender) {
        case "contactdetails":
            return (dispatch) => {
                debugger;
                console.log("fetch call");
                console.log(JSON.stringify(user));
                return fetch('http://localhost:3333/api/users/changecontactdetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json" } })
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
                return fetch('http://localhost:3333/api/users/ChangePersonalDetails', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json" } })
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
                return fetch('http://localhost:3333/api/users/ChangeProfessionalSummary', { method: "put", body: JSON.stringify(user), headers: { "content-type": "application/json" } })
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



export function FetchFavouriteClubDetails(dispatch) {
    return (dispatch) => {
        console.log("fetch call");
        return fetch('https://localhost:44377/api/getallclubsofusers/2/2')
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
