import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import {getToken} from '../../../Configure'
import { type } from 'os';
import {loadingStarted,loadingEnded} from '../../../App/AppActions/AppActions'



const url="http://localhost:3333/";
export enum Actions
{
    SORT_BY_CLUB_TYPE='SORT_BY_CLUB_TYPE',
    SORT_BY_CREATED_BY='SORT_BY_CREATED_BY',
    RESET_INACTIVE_CLUBS='RESET_INACTIVE_CLUBS',
    SEARCH_INACTIVE_CLUBS='SEARCH_INACTIVE_CLUBS',
    DETAILS_OF_CLUB='DETAILS_OF_CLUB',
    REACTIVATE_CLUB='REACTIVATE_CLUB',
    DELETE_CLUB='DELETE_CLUB',
    ADD_CONSTRAINT_FILTER_INACTIVECLUBS='ADD_CONSTRAINT_FILTER_INACTIVECLUBS',
    REMOVE_CONSTRAINT_FILTER_INACTIVECLUBS='REMOVE_CONSTRAINT_FILTER_INACTIVECLUBS',
    FETCH_FAILED='FETCH_FAILED',
    FETCH_STARTED='FETCH_STARTED',
    SORT_BY_USER_ROLE='SORT_BY_USER_ROLE',
    SORT_BY_USER_STATUS='SORT_BY_USER_STATUS',
    SEARCH_USER='SEARCH_USER',
    RESET_USER='RESET_USER',
    DETAILS_OF_USER='DETAILS_OF_USER',
    ADD_FILTER_USER='ADD_FILTER_USER',
    REMOVE_FILTER_USER='REMOVE_FILTER_USER',
    DISPLAY_USER_DETAILS='DISPLAY_USER_DETAILS',
    ACTIVATE_USER="ACTIVATE_USER",
    DEACTIVATE_USER='DEACTIVATE_USER',
    DELETE_USER='DELETE_USER',
    APPLY_FILTER="APPLY_FILTER",
    ADD_USER="ADD_USER",
    FETCH_ALL_CLUBS="FETCH_ALL_CLUBS",
    EMAILID_ALREADY_EXISTS="EMAILID_ALREADY_EXISTS",
    EMAILID_NOT_EXISTS="EMAILID_NOT_EXISTS"
}
export interface PayLoad
{
    clubs?:IClubs[],
    users?:IUsers[],
    allClubs?:IClubs[],
    members?:IClubMembers[],
    isLoading?:Boolean
    message?:string
    search?:[];
    status?:[];
    role?:[];
    selectedUsers?:IUsers[];
    isEmailExists?:boolean

}
export interface ActionReturnType
{
    type:Actions,
    payload:PayLoad,
}
function SortByClubType(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_CLUB_TYPE,
        payload:payload,
    }
}


function filtrationSuccess(payload:IUsers[]):ActionReturnType
{
return{
    type:Actions.APPLY_FILTER,
    payload:{selectedUsers:payload}
      
}

}
function SortByCreatedBy(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_CREATED_BY,
        payload:payload,
    }
}
function ResetInactiveClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.RESET_INACTIVE_CLUBS,
        payload:payload,
    }
}
function SearchInactiveClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SEARCH_INACTIVE_CLUBS,
        payload:payload,
    }
}
export function DetailsOfClub(payload:IClubs[]):ActionReturnType{
    debugger;
    return{
        type:Actions.DETAILS_OF_CLUB,
        payload:{clubs:payload},
    }
}
function ReactivateClub(payload:string):ActionReturnType{
    return{
        type:Actions.REACTIVATE_CLUB,
        payload:{message:payload},
    }
}
function DeleteClub(payload:string):ActionReturnType{
    return{
        type:Actions.DELETE_CLUB,
        payload:{message:payload},
    }
}
function AddConstraintFilterInactiveClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.ADD_CONSTRAINT_FILTER_INACTIVECLUBS,
        payload:payload,
    }
}
function RemoveConstraintFilterInactiveClubs(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.REMOVE_CONSTRAINT_FILTER_INACTIVECLUBS,
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
function SortByUserRole(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_USER_ROLE,
        payload:payload,
    }
}
function SortByUserStatus(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SORT_BY_USER_STATUS,
        payload:payload,
    }
}
function ResetUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.RESET_USER,
        payload:payload,
    }
}
function SearchUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.SEARCH_USER,
        payload:payload,
    }
}
export function DetailsOfUser(payload:IUsers[]):ActionReturnType{
    debugger;
    return{
        type:Actions.DETAILS_OF_USER,
        payload:{users:payload},
    }
}
function DeactivateUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.DEACTIVATE_USER,
        payload:payload,
    }
}
function DeleteUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.DELETE_USER,
        payload:payload,
    }
}
function AddFilterUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.ADD_FILTER_USER,
        payload:payload,
    }
}
function RemoveFilterUser(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.REMOVE_FILTER_USER,
        payload:payload,
    }
}

function userActivated(payload:string):ActionReturnType
{
    return{
        type:Actions.ACTIVATE_USER,
        payload:{message:payload}
    }
}

function userDeactivated(payload:string):ActionReturnType
{
    return{
        type:Actions.DEACTIVATE_USER,
        payload:{message:payload}
    }
}

function userDeleted(payload:string):ActionReturnType
{
    return{
        type:Actions.DELETE_USER,
        payload:{message:payload}
    }
}

function userAdded(payload:string):ActionReturnType
{
    return{
        type:Actions.ADD_USER,
        payload:{message:payload}
    }
}

function detailsOfAllClub(payload:IClubs[])
{
    return{
        type:Actions.FETCH_ALL_CLUBS,
        payload:{allClubs:payload}
    }
}


function emailIDExists()
{
    return{
        type:Actions.EMAILID_ALREADY_EXISTS,
        payload:{isEmailExists:true}
    }
}

function emailIDNotExists()
{
    return{
        type:Actions.EMAILID_NOT_EXISTS,
        payload:{isEmailExists:false}
    }
}


export const FetchClubs =()=>{
    debugger;
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
        dispatch(loadingStarted())
        console.log("fetch call");
        return fetch(url+'api/clubs/getInactiveClubs/',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(DetailsOfClub(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}

export const fetchAllClubs = UserID=>{
    debugger;
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
        dispatch(loadingStarted())
        console.log("fetch call");
        return fetch(url+'api/clubs/getallclubs/',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(detailsOfAllClub(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}

export const FetchUsers =()=>{
    debugger;
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
        dispatch(loadingStarted())
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
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}



export const deleteClub =(clubID,reason)=>{
    debugger;
    return function(dispatch){
        dispatch(loadingStarted())
           var jsonObj={clubID:clubID,reason:reason}
           console.log(JSON.stringify(jsonObj));
        return fetch(url+'api/clubs/deleteclub/2',{method:"put",body:JSON.stringify(jsonObj),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(DeleteClub(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}


export const reactiveClub =(clubID,reason)=>{
    debugger;
    return function(dispatch){
        dispatch(loadingStarted())
           var jsonObj={clubID:clubID,reason:reason}
           console.log(JSON.stringify(jsonObj));
        return fetch(url+'api/clubs/makeclubactive',{method:"put",body:JSON.stringify(jsonObj),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.status !=200){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(ReactivateClub(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}


export const activateUser=(userID,reason)=>
{
    debugger;
    return function(dispatch){
        debugger;
        dispatch(loadingStarted())
           var jsonObj={userID:userID,reason:reason}
           console.log(JSON.stringify(jsonObj));
        return fetch(url+'api/users/reactivateuser',{method:"put",body:JSON.stringify(jsonObj),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(userActivated(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}



export const deactivateUser=(userID,reason)=>
{
    debugger;
    return function(dispatch){
        debugger;
        dispatch(loadingStarted())
           var jsonObj={userID:userID,reason:reason}
           console.log(JSON.stringify(jsonObj));
        return fetch(url+'api/users/deactivateuser',{method:"put",body:JSON.stringify(jsonObj),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(userDeactivated(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}
 
export const deleteUser=(userID,reason)=>
{
    debugger;
    return function(dispatch){
        debugger;
        dispatch(loadingStarted())
           var jsonObj={userID:userID,reason:reason}
           console.log(JSON.stringify(jsonObj));
        return fetch(url+'api/users/deleteuser',{method:"put",body:JSON.stringify(jsonObj),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                console.log(response.status);
                dispatch(userDeleted(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}


export function addUser(user,clubs,invitation)
{
    debugger;
    var user_details={user:user,clubs:clubs,invitaion:invitation}
    return function(dispatch){
        debugger;
        dispatch(loadingStarted())
         console.log(JSON.stringify(user));
        return fetch(url+'api/users/adduser',{method:"post",body:JSON.stringify(user_details),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("user added failed");
            }else{
                console.log(response.status);
                dispatch(userAdded(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}


export function checkAvailabilityOfEmail(email:string)
{
    debugger;
    return function(dispatch){
        // dispatch(loadingStarted())
        return fetch(url+'api/users/checkWheatherEmailAvailable/'+email,{method:"get",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
           
                if(data)
                dispatch(emailIDExists())
                 else
                 dispatch(emailIDNotExists())
                dispatch(loadingEnded())
            
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}

export function filtration(users,role,status,search)
{
    return function(dispatch)
    {var statusNames=["Inactive","Active"]
   function  myFilter(userRow)
    { var i=0,j=0
        if(userRow.isActive)
         userRow.isActive="Active";
         else
         userRow.isActive="Inactive";
       for(i=0;i<status.length;i++)
       {
           j=0;
           for(j=0;j<role.length;j++)
             if(userRow.role==role[j]&&userRow.isActive==status[i]&&userRow.displayName.toLowerCase().includes(search))
             return true
       }

       if(status.length==0)
       for(i=0;i<role.length;i++)
         if(userRow.role==role[i]&&userRow.displayName.toLowerCase().includes(search))
         return true;

        if(role.length==0)
        for(i=0;i<status.length;i++)
        {
        if(userRow.isActive==status[i]&&userRow.displayName.toLowerCase().includes(search))
        {
        return true;
        }
        }
        
        if(role.length==0&&status.length==0)
          if(userRow.displayName.toLowerCase().includes(search))
           return true;
           console.log(userRow.displayName.toLowerCase().includes(search),"search result");
        return false;
         
    }

    var selectedUsers:IUsers[]=users.filter(myFilter);
    dispatch(filtrationSuccess(selectedUsers))
}
}