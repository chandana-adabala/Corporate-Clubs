import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import Club from '../Club';
import IClubMembersList from '../../../models/IClubMembersList'
import INewClub from '../../../models/INewClub'
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


export const FetchClubs = UserID=>{
     
    return function(dispatch){
        console.log("fetch call");
        return fetch('http://localhost:64412/api/clubs/getallclubs/'+UserID)
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
     
    return function(dispatch){
         
        console.log("fetch call");
        return fetch('http://localhost:64412/api/Users/GetAllUsers/2')
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
     
    return function(dispatch){
         
        console.log("fetch call");
        return fetch('http://localhost:64412/api/clubs/getallclubsofusers/2/2')
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
     
    return function(dispatch){
         
        console.log("fetch call");
        return fetch('http://localhost:64412/api/clubs/getallrequestedmembers/2/'+ClubID)
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

export const FetchClubMembersList =()=>{
     
    return function(dispatch){
         
        console.log("fetch call");
        return fetch('http://localhost:64412/api/clubs/getclubmemberslist/2')
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

export const makeAndCancelRequest=(requestID,clubID,userID)=>
{
     
    return function(dispatch){
         
        return fetch('http://localhost:64412/api/clubs/MakeNCancelRequest/'+requestID+'/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json'}})
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


export const removeUser=(requestID,clubID,userID)=>
{
     
    return function(dispatch){
         
        return fetch('http://localhost:64412/api/clubs/removeuser/'+requestID+'/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json'}})
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

export const addUserToPublicClub=(requestID,clubID,userID)=>
{
     
    console.log('http://localhost:64412/api/clubs/addUserToPublicClub/'+requestID+'/'+clubID+'/'+userID, "HERo")
    return function(dispatch){
         
        return fetch('http://localhost:64412/api/clubs/addUserToPublicClub/'+requestID+'/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json'}})
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
     
    return function(dispatch){
         
         console.log(JSON.stringify(user));
        return fetch('http://localhost:64412/api/clubs/addclub/'+user,{method:"post",body:JSON.stringify(newClub),headers:{'Content-Type': 'application/json'}})
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