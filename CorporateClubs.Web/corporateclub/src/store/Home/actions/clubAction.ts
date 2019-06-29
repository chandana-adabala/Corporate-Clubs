import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import { type } from 'os';


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
    AllUSERS_FETCH_SUCCESS='AllUSERS_FETCH_SUCCESS',
    ALLUSERS_FETCH_ERROR='ALLUSERS_FETCH_ERROR'

}

// export interface ReceiveFavClubsAction {type:ActionTypes.FAVCLUBS_FETCH_SUCCESS,payload:{club:IClubs}}
// export interface MyClubsFetchAction {type:ActionTypes.MYCLUBS_FETCH,payload:{club:IClubs}}
//todo: create remaining

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
export const fetchClubInfoSuccess =(clubs:IClubs)=>{
    console.log("fetchsuccessAC",clubs);
    return{
        type:ActionTypes.CLUBINFO_FETCH_SUCCESS,
        payload:clubs
    }
}

export const fetchClubInfoError =(error:string)=>({
    type: ActionTypes.CLUBINFO_FETCH_ERROR,
    payload:{error}
})

export const fetchClubMemberSuccess =(users:IUsers)=>{
    debugger;
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
    debugger;
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
export const fetchAllUsersSuccess =(users:IUsers)=>{
    debugger;
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



// export type Actions = ReceiveFavClubsAction;

export const fetchFavClubs = UserID=>{
    return function(dispatch){
        console.log("fetch call");
        return fetch('http://localhost:57548/api/clubs/getallfavclubsofuser/2/4')
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
        return fetch('http://localhost:57548/api/clubs/getallclubsofusers/2/2')
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
        return fetch('http://localhost:57548/api/clubs/getclubbyid/2/'+clubID)
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchClubInfoSuccess(data));
                dispatch(fetchClubMembers(clubID));
                dispatch(fetchAllUsers());
            }
        })
        .catch(error=>dispatch(fetchClubInfoError(error)))

    }
}
export const fetchClubMembers = clubID=>{
    return function(dispatch){
        console.log("fetch call");
        return fetch('http://localhost:57548/api/users/getallusersbyclub/2/'+clubID)
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(fetchClubMemberSuccess(data));
                dispatch(fetchClubRequestedMembers(clubID));
            }
        })
        .catch(error=>dispatch(fetchClubMembersError(error)))

    }
}
export const fetchAllUsers = ()=>{
    return function(dispatch){
        console.log("fetch call");
        return fetch('http://localhost:57548/api/users/getallusers/2')
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
        return fetch('http://localhost:57548/api/clubs/getallrequestedmembers/2/'+clubID)
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