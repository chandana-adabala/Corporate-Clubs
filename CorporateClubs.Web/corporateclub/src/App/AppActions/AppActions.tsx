import IUsers from '../../models/IUsers'
import {getToken} from '../../Configure'

export enum ActionTypes{
    USER_EXIST="USER_EXIST",
    USER_NOT_EXIST='USER_NOT_EXIST',
    FETCH_FAILED='FETCH_FAILED'
}

export interface PayloadType {
    LoggedUser?: IUsers,
    message?: string
    error?:string
    IsLoading?: boolean
    Status?: string

}

export interface ActionReturnType {
    type: ActionTypes
    Payload: PayloadType
}


function FetchLoggedUserDetails(Payload: IUsers):ActionReturnType
 {

    return {
        type: ActionTypes.USER_EXIST,
        Payload: {LoggedUser:Payload}
    }
}

function UserUnAuthorized():ActionReturnType
 {

    return {
        type: ActionTypes.USER_NOT_EXIST,
        Payload: {error:"User UnAuthorized"}
    }
}

function FetchDetailsFailed():ActionReturnType
 {

    return {
        type: ActionTypes.USER_NOT_EXIST,
        Payload: {error:"Fetch Failed"}
    }
}

export function GetLoggedUserDetails()
{
     
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
         
        return fetch('http://localhost:3333/api/users/getuserbytoken',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                console.log(data);
                dispatch(FetchLoggedUserDetails(data));
            }
        })
        .catch(error=>dispatch(UserUnAuthorized()))

    }
}
