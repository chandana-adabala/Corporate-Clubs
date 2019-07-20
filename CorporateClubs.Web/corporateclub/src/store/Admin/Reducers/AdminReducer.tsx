
import IClubs from '../../../models/IClubs';
import { PayLoad,Actions,ActionReturnType } from '../Actions/Actions'
const IntialState:PayLoad=
{
    users:[],
    clubs:[],
    isLoading:false,
    selectedUsers:[],
    allClubs:[],
    isEmailExists:false

}
export function AdminPageReducer(State=IntialState,Action:ActionReturnType):PayLoad
{
    debugger;
    switch(Action.type)
    {
        case Actions.DETAILS_OF_CLUB:
            State.clubs=Action.payload.clubs
            State.isLoading=false
            return{...State}
        case Actions.DETAILS_OF_USER:
            State.users=Action.payload.users;
            State.selectedUsers=Action.payload.users;
            return{...State}
        case Actions.DELETE_CLUB:
            return{...State} 
        case Actions.APPLY_FILTER:
            State.selectedUsers=Action.payload.selectedUsers
            return {...State}
        case Actions.REACTIVATE_CLUB:
            return {...State}
        case Actions.ACTIVATE_USER:
            console.log("userActivated");
            return {...State};
        case Actions.DEACTIVATE_USER:
            console.log("user Deactivated");
            return {...State}
        case Actions.FETCH_ALL_CLUBS:
            State.allClubs=Action.payload.allClubs;
            return {...State}
        case Actions.ADD_USER:
            return {...State}
        case Actions.DELETE_USER:
            console.log("delete user");
            return {...State}
        case Actions.EMAILID_ALREADY_EXISTS:
            State.isEmailExists=true
            return {...State}
        case Actions.EMAILID_NOT_EXISTS:
            State.isEmailExists=false
            return {...State}
        default:
            return{...State}
    }
}