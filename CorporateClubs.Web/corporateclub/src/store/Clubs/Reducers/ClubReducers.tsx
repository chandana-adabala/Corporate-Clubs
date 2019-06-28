
import IClubs from '../../../models/IClubs';
import { PayLoad,Actions,ActionReturnType } from '../Actions/ClubActions'
const IntialState:PayLoad=
{
    clubs:[],
    users:[],
    members:[],
    requests:[],
    isLoading:false

}
export function ClubReducer(State=IntialState,Action:ActionReturnType):PayLoad
{
    //debugger;
    switch(Action.type)
    {
        case Actions.DISPLAY_CLUBS:
            State.clubs=Action.payload.clubs
            State.isLoading=false
            return{...State}  
        case Actions.DETAILS_OF_USER:
                State.users=Action.payload.users
                State.isLoading=false
                return{...State}
        case Actions.DETAILS_OF_MEMBERS:
                State.members=Action.payload.members
                State.isLoading=false
                return{...State}
        case Actions.REQUESTS_OF_CLUB:
                    State.requests=Action.payload.requests
                    State.isLoading=false
                    return{...State}            
        default:
            return{...State}
    }
}