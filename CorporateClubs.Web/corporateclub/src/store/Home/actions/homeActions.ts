import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import { type } from 'os';
import {getToken} from '../../../Configure'
import IConversation from '../../../models/IConversation';

//Action Types
export enum ActionTypes{
    FAVCLUBS_FETCH_SUCCESS = 'FAVCLUBS_FETCH_SUCCESS',
    FAVCLUBS_FETCH_BEGIN = 'FAVCLUBS_FETCH_BEGIN',
    FAVCLUBS_FETCH_ERROR = 'FAVCLUBS_FETCH_ERROR',
    MYCLUBS_FETCH_SUCCESS = 'MYCLUBS_FETCH_SUCCESS',
    MYCLUBS_FETCH_ERROR = 'MYCLUBS_FETCH_ERROR',
    CLUBINFO_FETCH_SUCCESS = 'CLUBINFO_FETCH_SUCCESS',
    CLUBINFO_FETCH_ERROR = 'MYCLUBS_FETCH_ERROR',
    CLUBMEMBERS_FETCH_SUCCESS='CLUBMEMBERS_FETCH_SUCCESS',
    CLUBMEMBERS_FETCH_ERROR='CLUBMEMBERS_FETCH_ERROR',
    REQCLUBMEM_FETCH_SUCCESS='REQCLUBMEM_FETCH_SUCCESS',
    REQCLUBMEM_FETCH_ERROR='REQCLUBMEM_FETCH_ERROR',
    NONCLUBMEM_FETCH_SUCCESS='NONCLUBMEM_FETCH_SUCCESS',
    NONCLUBMEM_FETCH_ERROR='NONCLUBMEM_FETCH_ERROR',
    AllUSERS_FETCH_SUCCESS='AllUSERS_FETCH_SUCCESS',
    ALLUSERS_FETCH_ERROR='ALLUSERS_FETCH_ERROR',
    ACCEPT_REQUEST_SUCCESS='ACCEPT_REQUEST_SUCCESS',
    ACCEPT_REQUEST_ERROR='ACCEPT_REQUEST_ERROR',
    REJECT_REQUEST_SUCCESS='REJECT_REQUEST_SUCCESS',
    REJECT_REQUEST_ERROR='REJECT_REQUEST_ERROR',
    CHANGE_CLUB_TYPE_SUCCESS='CHANGE_CLUB_TYPE_SUCCESS',
    CHANGE_CLUB_TYPE_ERROR='CHANGE_CLUB_TYPE_ERROR',
    MUTE_N_UNMUTE_CLUB='MUTE_N_UNMUTE_CLUB',
    ADD_MEMBER_SUCCESS='ADD_MEMBER_SUCCESS',
    ADD_MEMBER_ERROR='ADD_MEMBER_ERROR',
    FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS',
    FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR',

}



//Action creators
export const fetchFavClubsSuccess =(clubs:IClubs)=>{
    console.log("fetchsuccessAC",clubs);
    return{
        type:ActionTypes.FAVCLUBS_FETCH_SUCCESS,
        payload:clubs
    }
}

export const fetchFavClubsError =(error:string)=>({
    type: ActionTypes.FAVCLUBS_FETCH_ERROR,
    payload:{error}
})

export const fetchMyClubsSuccess =(clubs:IClubs)=>{
    console.log("fetchsuccessAC",clubs);
    return{
        type:ActionTypes.MYCLUBS_FETCH_SUCCESS,
        payload:clubs
    }
}

export const fetchMyClubsError =(error:string)=>({
    type: ActionTypes.MYCLUBS_FETCH_ERROR,
    payload:{error}
})
export const fetchClubInfoSuccess =(clubs:IClubs,hide=true)=>{
    console.log("fetchsuccessAC",clubs);
    return{
        type:ActionTypes.CLUBINFO_FETCH_SUCCESS,
        payload:clubs,
        hide:hide,
        
    }
}

export const fetchClubInfoError =(error:string)=>({
    type: ActionTypes.CLUBINFO_FETCH_ERROR,
    payload:{error}
})

export const fetchClubMemberSuccess =(users:IUsers)=>{
    console.log("fetchsuccessAC",users);
    return{
        type:ActionTypes.CLUBMEMBERS_FETCH_SUCCESS,
        payload:users
    }
}

export const fetchClubMembersError =(error:string)=>({
    type: ActionTypes.CLUBMEMBERS_FETCH_ERROR,
    payload:{error}
})
export const fetchClubRequestedMembersSuccess =(rUsers:IUsers)=>{
    console.log("fetchsuccessAC",rUsers);
    return{
        type:ActionTypes.REQCLUBMEM_FETCH_SUCCESS,
        payload:rUsers
    }
}

export const fetchClubRequestedMembersError =(error:string)=>({
    type: ActionTypes.REQCLUBMEM_FETCH_ERROR,
    payload:{error}
})
export const fetchNonClubMembersSuccess =(nUsers:IUsers)=>{
     console.log("fetchsuccessnonusers",nUsers);
     return{
         type:ActionTypes.NONCLUBMEM_FETCH_SUCCESS,
         payload:nUsers
     }
 }
 
 export const fetchNonClubMembersError =(error:string)=>({
     type: ActionTypes.NONCLUBMEM_FETCH_ERROR,
     payload:{error}
 })
export const fetchAllUsersSuccess =(users:IUsers)=>{
    console.log("fetchsuccessAC",users);
    return{
        type:ActionTypes.AllUSERS_FETCH_SUCCESS,
        payload:users
    }
}

export const fetchAllUsersError =(error:string)=>({
    type: ActionTypes.ALLUSERS_FETCH_ERROR,
    payload:{error}
})

export const acceptRequestSuccess=()=>{
return{
    type:ActionTypes.ACCEPT_REQUEST_SUCCESS
}
}
export const acceptRequestError=(error:string)=>{
    return{
        type:ActionTypes.ACCEPT_REQUEST_ERROR,
        payload:{error}
    }
}
export const rejectRequestSuccess=()=>{
    return{
        type:ActionTypes.REJECT_REQUEST_SUCCESS,
       
    }
}
export const rejectRequestError=(error:string)=>{
    return{
        type:ActionTypes.REJECT_REQUEST_SUCCESS,
        payload:{error}
    }
}
export const changeClubTypeSuccess=()=>{
    return{
        type:ActionTypes.CHANGE_CLUB_TYPE_SUCCESS
    }
}
export const changeClubTypeError=(error:string)=>{
    return{
        type:ActionTypes.CHANGE_CLUB_TYPE_ERROR,
        payload:{error}
    }
}
export const muteNunmuteClubSuccess=()=>{
    return{
        type:ActionTypes.CHANGE_CLUB_TYPE_SUCCESS
    }
}
export const muteNunmuteClubError=(error:string)=>{
    return{
        type:ActionTypes.CHANGE_CLUB_TYPE_ERROR,
        payload:{error}
    }
}
export const addNewMembersSuccess=()=>{
    return{
        type:ActionTypes.ADD_MEMBER_SUCCESS,
        
    }
}
export const addNewMembersError=(error:string)=>{
    return{
        type:ActionTypes.ADD_MEMBER_ERROR,
        payload:{error}
    }
}


export const fetchMessageSuccess = (message:IConversation)=>{
    return{
        type:ActionTypes.FETCH_MESSAGES_SUCCESS,
        payload:message
    }
}
export const fetchMessageError = (error:string)=>{
    return{
        type:ActionTypes.FETCH_MESSAGES_ERROR,
        payload:{error}
    }
}



// Thunk Action Creators
export const fetchFavClubs = UserID=>{
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/getallfavclubsofuser/',{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchFavClubsSuccess(data));
            }
        })
        .catch(error=>dispatch(fetchFavClubsError(error)))

    }
    
}

export const fetchMyClubs = UserID=>{
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/getallclubsofusers/',{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchMyClubsSuccess(data));
            }
        })
        .catch(error=>dispatch(fetchMyClubsError(error)))

    }
}

export const fetchMyClubInfo = clubID=>{
     
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/getclubbyid/'+clubID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchClubInfoSuccess(data));
                dispatch(fetchClubMembers(clubID));
                dispatch(fetchClubRequestedMembers(clubID));
                dispatch(fetchNonClubMembers(clubID));
                dispatch(fetchAllUsers());
            }
        })
        .catch(error=>dispatch(fetchClubInfoError(error)))

    }
}
export const fetchClubMembers = clubID=>{
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/users/getallusersbyclub/'+clubID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchClubMemberSuccess(data));
                
            }
        })
        .catch(error=>dispatch(fetchClubMembersError(error)))

    }
}
export const fetchAllUsers = ()=>{
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/users/getallusers/',{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchAllUsersSuccess(data));
               
            }
        })
        .catch(error=>dispatch(fetchAllUsersError(error)))

    }
}
export const fetchClubRequestedMembers = clubID=>{
    return function(dispatch){
        console.log("fetch call");
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/getallrequestedmembers/'+clubID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchClubRequestedMembersSuccess(data));
               
            }
        })
        .catch(error=>dispatch(fetchClubRequestedMembersError(error)))

    }
}
export const fetchNonClubMembers = clubID=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/getnonclubmembers/'+clubID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                dispatch(fetchNonClubMembersSuccess(data));
               
            }
        })
        .catch(error=>dispatch(fetchNonClubMembersError(error)))

    }
}

export const acceptRequest = (clubID,userID,currentUserID=4)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/acceptrequest/'+clubID+'/'+userID,{method:'post',headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(response => {
           //  
            if (!response.ok) {
                throw new Error("Fetch Failed");
            } else {
                dispatch(acceptRequestSuccess());
            }
        })
        .catch(error => dispatch(acceptRequestError(error)))
    }
}

export const rejectRequest = (clubID,userID,currentUserID=4)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/rejectrequest/'+clubID+'/'+userID,{method:'post',headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(response => {
            // 
            if (!response.ok) {
                throw new Error("Fetch Failed");
            } else {
                dispatch(rejectRequestSuccess());
            }
        })
        .catch(error => dispatch(rejectRequestError(error)))
    }
}

export const changeClubType=(clubType,clubID,currentUserID=4)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/changeclubtype/'+clubID+'/'+clubType,{method:'put',headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response => {
            if(!response.ok){
                throw new Error("change failed");
            } else{
                dispatch(changeClubTypeSuccess());
            }
        })
        .catch(error=>dispatch(changeClubTypeError(error)))
    }
}

export const muteNunmuteClub=(clubID)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/clubs/makeclubmuteUnmute/'+clubID,{method:'put',headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response=>{
            if(!response.ok){
                throw new Error("change failed");
            }else{
                dispatch(muteNunmuteClubSuccess());
            }
        })
        .catch(error=>dispatch(muteNunmuteClubError(error)))
    }
}

export const addNewMembers=(clubID,userList,requestID)=>{
    var addUser={
        ClubID:clubID,
        Members:userList
    }
        return function(dispatch){
            const headers = { 'Authorization': 'Bearer ' + getToken() };
            return fetch('http://localhost:3333/api/clubs/addmembers/',{method:'post',body:JSON.stringify(addUser),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
            .then(reponse=>{
                if(!reponse.ok){
                    throw new Error("Add Failed");
                }else{
                    dispatch(addNewMembersSuccess());
                }
            })
            .catch(error=>dispatch(addNewMembersError(error)))
        }
}

export const fetchMessagesOfClub=(clubID)=>{
     debugger;
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/conversations/getallmessagesofclub/'+clubID,{ headers: {'Authorization': 'Bearer ' + getToken()}})
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