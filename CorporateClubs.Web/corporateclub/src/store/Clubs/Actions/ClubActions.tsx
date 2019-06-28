import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import Club from '../Club';
export enum Actions
{
    ADD_CLUB='ADD_CLUB',
    SORT_BY_CLUB_TYPE='SORT_BY_CLUB_TYPE',
    SORT_BY_STATUS='SORT_BY_STATUS',
    SORT_BY_DATE='SORT_BY_DATE',
    SEARCH_CLUBS='SEARCH_CLUBS',
    RESET_CLUBS='RESET_CLUBS',
    DISPLAY_CLUBS='DISPLAY_CLUBS',
    REPORT_CLUB='REPORT_CLUB',
    DEACTIVATE_CLUB='DEACTIVATE_CLUB',
    REACTIVATE_CLUB='REACTIVATE_CLUB',
    REQUEST_JOIN='REQUEST_JOIN',
    CANCEL_REQUEST='CANCEL_REQUEST',
    JOIN='JOIN',
    FETCH_FAILED='FETCH_FAILED',
    FETCH_STARTED='FETCH_STARTED',
    DETAILS_OF_USER='DETAILS_OF_USER',
    DETAILS_OF_MEMBERS='DETAILS_OF_MEMBERS',
    REQUESTS_OF_CLUB='REQUESTS_OF_CLUB'
}
export interface PayLoad
{
    clubs?:IClubs[],
    members?:IClubMembers[],
    requests?:IClubMembers[],
    allRequests?:{}
    users?:IUsers[],
    isLoading?:Boolean

}
export interface AddClubPayLoad
{
    clubs?:IClubs[],
    isLoading?:Boolean

}
export interface ActionReturnType
{
    type:Actions,
    payload:PayLoad,
}
function AddClub(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.ADD_CLUB,
        payload:payload,
    }
}
function SortByClubType(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_CLUB_TYPE,
        payload:payload,
    }
}
function SortByStatus(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_STATUS,
        payload:payload,
    }
}
function SortByDate(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_DATE,
        payload:payload,
    }
}
function SearchClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SEARCH_CLUBS,
        payload:payload,
    }
}
function ResetClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.RESET_CLUBS,
        payload:payload,
    }
}
function DisplayClubs(payload:IClubs[]):ActionReturnType{
    return{
        type:Actions.DISPLAY_CLUBS,
        payload:{clubs:payload},
    }
}
function ReportClub(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.REPORT_CLUB,
        payload:payload,
    }
}
function DeactivateClub(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.DEACTIVATE_CLUB,
        payload:payload,
    }
}
function ReactivateClub(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.REACTIVATE_CLUB,
        payload:payload,
    }
}
function RequestJoin(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.REQUEST_JOIN,
        payload:payload,
    }
}
function CancelRequest(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.CANCEL_REQUEST,
        payload:payload,
    }
}
function Join(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.JOIN,
        payload:payload,
    }
}
function FetchFailed(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.FETCH_FAILED,
        payload:payload,
    }
}
function FetchStarted(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.FETCH_STARTED,
        payload:payload,
    }
}
function DetailsOfUser(payload:IUsers[]):ActionReturnType{
    return{
        type:Actions.DETAILS_OF_USER,
        payload:{users:payload},
    }
}
function DetailsOfMembers(payload:IClubMembers[]):ActionReturnType{
    return{
        type:Actions.DETAILS_OF_MEMBERS,
        payload:{members:payload},
    }
}
function RequestsOfClub(payload:IClubMembers[]):ActionReturnType{
    return{
        type:Actions.REQUESTS_OF_CLUB,
        payload:{requests:payload},
    }
}
export const FetchClubs = UserID=>{
    debugger;
    return function(dispatch){
        console.log("fetch call");
        return fetch('http://localhost:3333/api/clubs/getallclubs/'+UserID)
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(DisplayClubs(data));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))

    }
}
export const FetchUsers =()=>{
    debugger;
    return function(dispatch){
        debugger;
        console.log("fetch call");
        return fetch('http://localhost:3333/api/Users/GetAllUsers/2')
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(DetailsOfUser(data));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))

    }
}
export const FetchMembers =()=>{
    debugger;
    return function(dispatch){
        debugger;
        console.log("fetch call");
        return fetch('http://localhost:3333/api/clubs/getallclubsofusers/2/2')
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(DetailsOfMembers(data));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))

    }
}
export const FetchRequests =ClubID=>{
    debugger;
    return function(dispatch){
        debugger;
        console.log("fetch call");
        return fetch('http://localhost:3333/api/clubs/getallrequestedmembers/2/'+ClubID)
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("Request Not Found!");
            }else{
                console.log(data);
            
                dispatch(RequestsOfClub(data));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))

    }
}