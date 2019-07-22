import IUsers from '../../../models/IUsers'
import IClubs from '../../../models/IClubs'
import IClubMembers from '../../../models/IClubMembers'
import Club from '../Club';
import IClubMembersList from '../../../models/IClubMembersList'
import INewClub from '../../../models/INewClub'
import {getToken} from '../../../Configure'
import axios from 'axios'
import {loadingStarted,loadingEnded} from '../../../App/AppActions/AppActions'

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
    USER_ADDED='USER_ADDED',
    DEACTIVATE_CLUB_SUCCESS='DEACTIVATE_CLUB_SUCCESS',
    FILTRATION_SUCCESS='FILTRATION_SUCCESS'

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
    filteredClubMembersList?:IClubMembersList[]


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



function FetchFailed(payload:PayLoad):ActionReturnType{
    return{
        type:Actions.FETCH_FAILED,
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
function deactivateSuccess(payload:string):ActionReturnType{
    return{
        type:Actions.REQUESTS_OF_CLUB,
        payload:{message:payload},
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

function filtrationSuccess(payload:IClubMembersList[]):ActionReturnType
{
    return{
        type:Actions.FILTRATION_SUCCESS,
        payload:{filteredClubMembersList:payload}
    }
}


export const FetchUsers =()=>{
      
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
          
        dispatch(loadingStarted())
         //("fetch call");
        return fetch(url+'api/Users/GetAllUsers',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                 //(data);
                dispatch(DetailsOfUser(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}
export const FetchMembers =()=>{
      
    const headers = { 'Authorization': 'Bearer ' + getToken() };
    return function(dispatch){
          
        dispatch(loadingStarted())
         //("fetch call");
        return fetch(url+'api/clubs/getallclubsofusers',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                 //(data);
                dispatch(DetailsOfMembers(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})

    }
}


export const FetchClubMembersList =()=>{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        const headers = { 'Authorization': 'Bearer ' + getToken() };
         //("fetch call");
        return fetch(url+'api/clubs/getclubmemberslist',{headers:headers})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                 //(data);
                dispatch(clubMembersListFetch(data));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}

export const makeAndCancelRequest=(clubID,userID)=>
{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/MakeNCancelRequest/'+'/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                 //(response.status);
                dispatch(requestChanged(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}


export const removeUser=(clubID,userID)=>
{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/removeuser/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                 //(response.status);
                dispatch(userDeleted(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}

export const addUserToPublicClub=(clubID,userID)=>
{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/addUserToPublicClub/'+clubID+'/'+userID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("User Not Found!");
            }else{
                 //(response.status);
                dispatch(userAdded(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}

export function addClub(newClub:INewClub,formData:FormData)
{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/addclub',{method:"post",body:JSON.stringify(newClub),headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(data => data.json())
        .then(data =>{
            if(data.message === "Not Found"){
                throw new Error("User Not Found!");
            }else{
                axios.post('http://localhost:3333/api/clubs/UploadImage/'+data,
                formData, { headers: { 'Content-Type': "multipart/form-data",'Authorization': 'Bearer ' + getToken()}})
                .then(res => {
                    dispatch(clubAdded(res.statusText));
                    dispatch(loadingEnded())
                })
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
}
}

export function deactivateClub(clubID:number,reason:string)
{
      
    return function(dispatch){
          
        dispatch(loadingStarted())
        return fetch(url+'api/clubs/makeclubdeactive/'+clubID,{method:"put",headers:{'Content-Type': 'application/json','Authorization': 'Bearer ' + getToken()}})
        .then(response =>{
            if(!response.ok){
                throw new Error("FetchFailed!");
            }else{
                 //(response.status);
                dispatch(deactivateSuccess(response.statusText));
                dispatch(loadingEnded())
            }
        })
        .catch(error=>{dispatch(FetchFailed(error));dispatch(loadingEnded())})
    }
}


export function filterClub(clubType:string[],status:string[],date:Date|null,searchBar:string,clubs)
{
    return function(dispatch)
    {
   function  myFilter(clubRow)
    {
         var i=0,j=0;
         if(clubRow.clubs.clubDeactiveBy==null)
         clubRow.clubs.clubDeactiveBy="Inactive";
         else
         clubRow.clubs.clubDeactiveBy="Active";
         if(date==null)
         var date_check=new Date(clubRow.clubs.createdOn);
         else
         var date_check=date;



         for(i=0;i<clubType.length;i++)
         {
             for(j=0;j<status.length;j++)
             {
                if(clubRow.clubs.clubType==clubType[i]&&clubRow.clubs.clubDeactiveBy==status[j]&&clubRow.clubs.clubTitle.toLowerCase().includes(searchBar)&&new Date(clubRow.clubs.createdOn).toDateString()==date_check.toDateString())
                return true;
             }
         }
        //clubType is not selected in the filter
         if(clubType.length==0)
         for(i=0;i<status.length;i++)
         {
            if(clubRow.clubs.clubDeactiveBy==status[i]&&clubRow.clubs.clubTitle.toLowerCase().includes(searchBar)&&new Date(clubRow.clubs.createdOn).toDateString()==date_check.toDateString())
            return true;
         }
          
        //status is not selected in the filter
        if(status.length==0)
        for(i=0;i<clubType.length;i++)
        {
            if(clubRow.clubs.clubType==clubType[i]&&clubRow.clubs.clubTitle.toLowerCase().includes(searchBar)&&new Date(clubRow.clubs.createdOn).toDateString()==date_check.toDateString())
            return true;
        }
        //if both status and clubType are not selected in the filter
        if(clubType.length==0&&status.length==0)
        if(clubRow.clubs.clubTitle.toLowerCase().includes(searchBar)&&new Date(clubRow.clubs.createdOn).toDateString()==date_check.toDateString())
            return true;
        return false;


    }

    var filteredclubs=clubs.filter(myFilter);
    dispatch(filtrationSuccess(filteredclubs));
    
}
}


