import IConnections from '../../../models/IConnections'
import {getToken} from '../../../Configure'
import {loadingStarted,loadingEnded} from '../../../App/AppActions/AppActions'
const url="http://localhost:3333/"

export enum ActionTypes
{
    FETCH_USER_CONTACTS="FETCH_USER_CONTACTS",
    FETCH_USER_SUGGESTIONS="FETCH_USER_SUGGESTIONS",
    ADD_NEW_CONNECTION="ADD_NEW_CONNECTION",
    FETCH_FAILED="FETCH_FAILED",
    ADD_NEW_CONNECTION_FAILED="ADD_NEW_CONNECTION_FAILED",
    APPLY_FILTER="APPLY_FILTER"
}


export interface PayloadType {
    userContacts?:IConnections[],
    userSuggestions?:IConnections[]
    error?:string;
    message?:string;
    isLoading?:boolean;
    filtereduserContacts?:IConnections[]
  
}

export interface ActionReturnType {
    type: ActionTypes
    payload: PayloadType
}
export const fetchUserContacts =(payload:IConnections[])=>{
    return{
        type:ActionTypes.FETCH_USER_CONTACTS,
        payload:{userContacts:payload}
    }
}


export const fetchUserSuggestions =(payload:IConnections[])=>{
    return{
        type:ActionTypes.FETCH_USER_SUGGESTIONS,
        payload:{userSuggestions:payload}
    }
}

export const fetchFailed =(payload:string)=>{
    return{
        type:ActionTypes.FETCH_FAILED,
        payload:{error:payload}
    }
}

export const addNewConnectionfailed =(payload:string)=>{
    return{
        type:ActionTypes.ADD_NEW_CONNECTION_FAILED,
        payload:{error:payload}
    }
}

function filtrationSuccess(payload:IConnections[]):ActionReturnType
{
return{
    type:ActionTypes.APPLY_FILTER,
    payload:{filtereduserContacts:payload}
}
      
}

export const fetchContacts = ()=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        console.log("fetch call");
        dispatch(loadingStarted())
        return fetch(url+'api/connection/getmycontacts',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message == "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchUserContacts(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(fetchFailed(error));dispatch(loadingEnded())})

    }
    
}

export const fetchSuggestions = ()=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        console.log("fetch call");
        dispatch(loadingStarted())
        return fetch(url+'api/connection/getmysuggestions',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message == "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchUserSuggestions(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(fetchFailed(error));dispatch(loadingEnded())})

    }
    
}

export const addNewConnection = (requestID)=>{
    return function(dispatch){
        console.log("fetch call");
        dispatch(loadingStarted())
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch(url+'api/connection/addcontact/'+requestID, {method: "post",headers:{'Authorization': 'Bearer ' + getToken()}})
        .then(response => {
            debugger;
            if (!response.ok) {
                throw new Error("Fetch Failed");
            } else {
                //fetch new suggestions
                fetch(url+'api/connection/getmysuggestions',{headers:headers})
                .then(data => data.json())
                .then(data =>{
                    if(data.message == "Not Found"){
                        throw new Error("User Not Found!");
                    }else{
                        console.log(data);
                        dispatch(fetchUserSuggestions(data));
                        dispatch(loadingEnded())
                    }
                }).catch(error=>dispatch(fetchFailed(error)))
            }
        })
        .catch(error=>{dispatch(fetchFailed(error));dispatch(loadingEnded())})

    }
    
}

export function filtration(userContacts:IConnections[],role,status,search)
{
    return function(dispatch)
    {
   function  myFilter(userRow)
    { var i=0,j=0
        if(userRow.isActive)
         userRow.isActive="Active";//change true to active
         else
         userRow.isActive="Inactive"; //change false to unactive
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
        return false;
         
    }

    var filteredUsers:IConnections[]=userContacts.filter(myFilter);
    dispatch(filtrationSuccess(filteredUsers))
}
}