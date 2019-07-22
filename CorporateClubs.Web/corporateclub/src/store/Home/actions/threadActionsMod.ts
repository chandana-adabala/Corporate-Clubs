import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import { type } from 'os';
import {getToken} from '../../../Configure'
import {loadingStarted,loadingEnded} from '../../../App/AppActions/AppActions'
import INewClub from '../../../models/INewClub'
import axios from 'axios';


export enum ActionTypes{
    ACCEPT_CONNNECTION_REQUEST_SUCCESS = 'ACCEPT_CONNNECTION_REQUEST_SUCCESS',
    DECLINE_CONNNECTION_REQUEST_SUCCESS = 'DECLINE_CONNNECTION_REQUEST_SUCCESS',
    ACCEPT_CONNNECTION_REQUEST_FAILED = 'ACCEPT_CONNNECTION_REQUEST_FAILED',
    DECLINE_CONNNECTION_REQUEST_FAILED = 'DECLINE_CONNNECTION_REQUEST_FAILED',
   
}


function acceptConnectionRequestSuccess()
{
    return{
        type:ActionTypes.ACCEPT_CONNNECTION_REQUEST_SUCCESS,
        payload:{message:ActionTypes.ACCEPT_CONNNECTION_REQUEST_SUCCESS}
    }
}

function acceptConnectionRequestFailed()
{
    return{
        type:ActionTypes.ACCEPT_CONNNECTION_REQUEST_FAILED,
        payload:{message:ActionTypes.ACCEPT_CONNNECTION_REQUEST_FAILED}
    }
}

function declineConnectionRequestSuccess()
{
    return{
        type:ActionTypes.DECLINE_CONNNECTION_REQUEST_SUCCESS,
        payload:{message:ActionTypes.DECLINE_CONNNECTION_REQUEST_SUCCESS}
    }
}
function declineConnectionRequestFailed()
{
    return{
        type:ActionTypes.DECLINE_CONNNECTION_REQUEST_FAILED,
        payload:{message:ActionTypes.DECLINE_CONNNECTION_REQUEST_FAILED}
    }
}
export const acceptConnectionRequest = (userID,connectedUserID)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/connections/acceptRequest/'+userID+'/'+connectedUserID,{method:'put',headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(response => {
           //    
            if (!response.ok) {
                throw new Error("Fetch Failed");
            } else {
                dispatch(acceptConnectionRequestSuccess());
            }
        })
        .catch(error => dispatch(acceptConnectionRequestFailed()))
    }
}

export const declineConnectionRequest = (userID,connectedUserID)=>{
    return function(dispatch){
        const headers = { 'Authorization': 'Bearer ' + getToken() };
        return fetch('http://localhost:3333/api/connections/declineRequest/'+userID+'/'+connectedUserID,{method:'put',headers: {'Authorization': 'Bearer ' + getToken()}})
        .then(response => {
           //    
            if (!response.ok) {
                throw new Error("Fetch Failed");
            } else {
                dispatch(declineConnectionRequestSuccess());
            }
        })
        .catch(error => dispatch(declineConnectionRequestFailed()))
    }
}