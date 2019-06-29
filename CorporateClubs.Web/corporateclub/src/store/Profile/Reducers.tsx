import {ActionReturnType,ActionsTypes} from './Actions'
import {PayloadType} from './Actions'
import {DefaultUser} from '../../models/IUsers'
import {DefaultClub} from '../../models/IClubs'
import { ActionTypes } from '../Home/actions/clubAction';
const IntialState:PayloadType=
{
    User:DefaultUser,
    Clubs:[],
    FavClubs:[],
    message:"",
    error:"",
    IsLoading:false,



}


export default function ProfilePageReducer(State=IntialState,Action:ActionReturnType):PayloadType
{
    debugger;
    switch(Action.type)
    {
        case ActionsTypes.FetchProfileDetails:
            State.User=Action.Payload.User
            State.IsLoading=false
            return {...State}

        case  ActionsTypes.FetchClubDetails:
            State.Clubs=Action.Payload.Clubs
            State.IsLoading=false
            return {...State}

        case ActionsTypes.FetchClubDetails:
                State.FavClubs=Action.Payload.FavClubs
                State.IsLoading=false
                return {...State}

        case ActionsTypes.FetchDetailsStarted:
            State.IsLoading=true
            return {...State}

        case ActionsTypes.ChangeSuccessful:
                State.message="successfully updated"
                State.User=Action.Payload.User
                return {...State}

        case ActionsTypes.ChangesFailed:
            State.error="updation failed"
            return {...State}
       // case ActionTypes.RemoveMessages:

            
        default:
            return State
    }
}