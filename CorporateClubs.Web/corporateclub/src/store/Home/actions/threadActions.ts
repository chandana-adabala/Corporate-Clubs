import IThreads from "../../../models/IThreads"
import {getToken} from '../../../Configure'
import IConversation, { IPrivateConversation } from "../../../models/IConversation";

//Action Types
export enum ActionTypes{
    MYCONTACTS_FETCH_SUCCESS = "MYCONNECTIONS_FETCH_SUCCESS",
    FAVCONTACTS_FETCH_SUCCESS = "FAVCONTACTS_FETCH_SUCCESS",
    MYCONTACTS_FETCH_ERROR = "MYCONNECTIONS_FETCH_ERROR",
    FAVCONTACTS_FETCH_ERROR = "FAVCONTACTS_FETCH_ERROR",
    FETCH_USERMESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS',
    FETCH_USERMESSAGES_ERROR = 'FETCH_MESSAGES_ERROR',
}

//Action creators
export const fetchMyContactsSuccess = (myContacts:IThreads) =>{
      
    return{
        type:ActionTypes.MYCONTACTS_FETCH_SUCCESS,
        payload:myContacts
    }
}

export const fetchFavContactsSuccess = (myContacts:IThreads) =>{
    return{
        type:ActionTypes.FAVCONTACTS_FETCH_SUCCESS,
        payload:myContacts
    }
}

export const fetchMyContactsError = (error:string) =>{
    return{
        type:ActionTypes.MYCONTACTS_FETCH_ERROR,
        payload:{error}
    }
}

export const fetchFavContactsError = (error:string) =>{
    return{
        type:ActionTypes.FAVCONTACTS_FETCH_ERROR,
        payload:{error}
    }
}
export const fetchMessageSuccess = (message:IPrivateConversation)=>{
    return{
        type:ActionTypes.FETCH_USERMESSAGES_SUCCESS,
        payload:message
    }
}
export const fetchMessageError = (error:string)=>{
    return{
        type:ActionTypes.FETCH_USERMESSAGES_ERROR,
        payload:{error}
    }
}
//Thunk Action Creator

export const fetchFavContacts =()=>{
      
    return function(dispatch){
        //dispatch(loadingStarted())
        // //("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/connection/getFavConnnectionsOfUser/',{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                 //(data);
                dispatch(fetchFavContactsSuccess(data));
                //dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(fetchFavContactsError(error))})

    }
    
}

export const fetchMyContacts =()=>{
      debugger;
    return function(dispatch){
        //dispatch(loadingStarted())
         //("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/connection/getAllConnnectionsOfUser/',{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                 //(data);
                dispatch(fetchMyContactsSuccess(data));
                //dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(fetchMyContactsError(error))})

    }
}
export const fetchMessagesOfUser=(connectedUserID)=>{
     debugger;
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/conversations/getallmessagesofuser/'+connectedUserID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                dispatch(fetchMessageSuccess(data));
               
            }
        })
        .catch(error=>dispatch(fetchMessageError(error)))
 
    }
 }