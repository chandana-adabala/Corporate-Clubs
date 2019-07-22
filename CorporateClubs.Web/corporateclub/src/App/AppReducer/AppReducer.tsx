import {ActionReturnType,ActionTypes,PayloadType} from '../AppActions/AppActions'
import {DefaultUser} from '../../models/IUsers'
const IntialState:PayloadType=
{
    LoggedUser:DefaultUser,
    message:"",
    error:"not mounted",
    isLoading:true,
    connection:null
}

export default function AppPageReducer(State=IntialState,Action:ActionReturnType):PayloadType
{
    debugger;
    switch(Action.type)
    {
        case ActionTypes.USER_EXIST:
            State.LoggedUser=Action.Payload.LoggedUser;
            State.error='';
            return {...State}


        case ActionTypes.USER_NOT_EXIST:
            State.error=Action.Payload.error;
            return {...State}


        case ActionTypes.LOADING_STARTED:
            State.isLoading=true
            return {...State}


        case ActionTypes.LOADING_ENDED:
            State.isLoading=false
            return {...State}

          case ActionTypes.STORE_CONNECTION_ID:
            debugger;
            return{
                 ...State,
                   connection:Action.Payload
                 }

        default:
            return State
    }

}
