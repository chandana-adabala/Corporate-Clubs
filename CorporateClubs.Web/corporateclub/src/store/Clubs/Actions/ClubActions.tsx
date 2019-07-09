import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import Club from '../Club';
import IClubMembersList from '../../../models/IClubMembersList'
import INewClub from '../../../models/INewClub'
import {getToken} from '../../../Configure'
const url="http://localhost:3333/"
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
    REQUESTS_OF_CLUB='REQUESTS_OF_CLUB',
    FETCH_CLUB_MEMBERS_LIST='FETCH_CLUB_MEMBERS_LIST',
    REQUEST_CHANGED='REQUEST_CHANGED',
    USER_DELETED='USER_DELETED',
    USER_ADDED='USER_ADDED'

}
export interface PayLoad
{
    clubs?:IClubs[],
    members?:IClubMembers[],
    requests?:IClubMembers[],
    allRequests?:{}
    users?:IUsers[],
    isLoading?:Boolean
    clubMembersList?:IClubMembersList[],
    message?:string


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

function clubMembersListFetch(payload:IClubMembersList[]):ActionReturnType
{
    return{
        type:Actions.FETCH_CLUB_MEMBERS_LIST,
        payload:{clubMembersList:payload},
    } 
}

function requestChanged(payload:string):ActionReturnType
{
    return{
        type:Actions.REQUEST_CHANGED,
        payload:{message:payload},
    } 
}

function userDeleted(payload:string):ActionReturnType
{
    return{
        type:Actions.USER_DELETED,
        payload:{message:payload},
    } 
}

function userAdded(payload:string):ActionReturnType
{
    return{
        type:Actions.USER_ADDED,
        payload:{message:payload},
    } 
}

function clubAdded(payload:string):ActionReturnType
{
    return{
        type:Actions.ADD_CLUB,
        payload:{message:payload}
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
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
        debugger;
        console.log("fetch call");
        return fetch(url+'api/clubs/getallclubsofusers',{headers:headers})
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


export const FetchClubMembersList =()=>{
    debugger;
    return function(dispatch){
        debugger;
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        console.log("fetch call");
        return fetch(url+'api/clubs/getclubmemberslist',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(clubMembersListFetch(data));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))

    }
}

export const makeAndCancelRequest=(clubID,userID)=>
{
    debugger;
    return function(dispatch){
        debugger;
        return fetch(url+'api/clubs/MakeNCancelRequest/'+'/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(requestChanged(response.statusText));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))
    }
}


export const removeUser=(clubID,userID)=>
{
    debugger;
    return function(dispatch){
        debugger;
        return fetch(url+'api/clubs/removeuser/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(userDeleted(response.statusText));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))
    }
}

export const addUserToPublicClub=(clubID,userID)=>
{
    debugger;
    return function(dispatch){
        debugger;
        return fetch(url+'api/clubs/addUserToPublicClub/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(userAdded(response.statusText));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))
    }
}

export function addClub(user,newClub:INewClub)
{
    debugger;
    return function(dispatch){
        debugger;
         console.log(JSON.stringify(user));
        return fetch(url+'api/clubs/addclub/'+user,{method:"post",body:JSON.stringify(newClub),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("user added failed");
            }else{
                console.log(response.status);
                dispatch(clubAdded(response.statusText));
            }
        })
        .catch(error=>dispatch(FetchFailed(error)))
    }
}