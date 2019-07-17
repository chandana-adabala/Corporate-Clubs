import {ActionReturnType,ActionTypes,PayloadType} from '../Actions/Actions'
import {DefaultConnections} from '../../../models/IConnections'
const IntialState:PayloadType=
{
    userContacts:[],
    userSuggestions:[],
    error:'',
    message:'',
    isLoading:false,
    filtereduserContacts:[]
}

export default function ConnectionsReducer(State=IntialState,Action:ActionReturnType):PayloadType
{
     
    switch(Action.type)
    {
        case ActionTypes.FETCH_USER_CONTACTS:
            State.userContacts=Action.payload.userContacts;
            State.filtereduserContacts=Action.payload.userContacts
            State.error='';
            return {...State}
        case ActionTypes.FETCH_USER_SUGGESTIONS:
            State.userSuggestions=Action.payload.userSuggestions;
            State.error='';
            return {...State}
        
        case ActionTypes.FETCH_USER_SUGGESTIONS:
            State.error=Action.payload.error;
            return {...State}
        case ActionTypes.APPLY_FILTER:
            State.filtereduserContacts=Action.payload.filtereduserContacts
            return {...State}
        default:
            return State
    }

}
