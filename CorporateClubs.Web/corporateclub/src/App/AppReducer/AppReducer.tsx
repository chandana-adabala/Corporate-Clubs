import {ActionReturnType,ActionTypes,PayloadType} from '../AppActions/AppActions'
import {DefaultUser} from '../../models/IUsers'
const IntialState:PayloadType=
{
    LoggedUser:DefaultUser,
    message:"",
    error:"not mounted",
    IsLoading:false,
}

export default function AppPageReducer(State=IntialState,Action:ActionReturnType):PayloadType
{
    switch(Action.type)
    {
        case ActionTypes.USER_EXIST:
            State.LoggedUser=Action.Payload.LoggedUser;
            State.error='';
            return {...State}
        case ActionTypes.USER_NOT_EXIST:
            State.error=Action.Payload.error;
            return {...State}
        default:
            return State
    }

}
