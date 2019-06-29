import {ActionTypes} from '../actions/clubAction';
import IClubs from '../../../models/IClubs';
import IUsers from '../../../models/IUsers';

export interface Istate {
    myclubs:IClubs[],
    favclubs:IClubs[],
    club:IClubs
    cUsers:IUsers[],
    rUsers:IUsers[],
    users:IUsers[]
}

const initialState:Istate ={
    
    favclubs:[],
    myclubs:[],
    club:{ clubID:1,
         clubTitle:'',
        profilePic:'',
        clubCreatedBy:'',
        clubType:'',
        clubDeactiveBy:1,
         reason:'',
         createdOn:new Date(),
         description:'',
         rowCreatedOn:new Date(),
         rowCreatedBy:1,
         rowDeletedBy:1, },
    cUsers:[],
    rUsers:[],
    users:[]

    
}


export default function homeReducer(state=initialState,action:any){
    switch(action.type){
        case ActionTypes.FAVCLUBS_FETCH_SUCCESS: 
            console.log("fetch favclubs success",action);
            return{
                ...state,
                favclubs:action.payload
            }
        case ActionTypes.MYCLUBS_FETCH_SUCCESS:
                console.log("fetch my clubs success",action);
                return{
                  ...state,
                    myclubs:action.payload
                }
        case ActionTypes.CLUBINFO_FETCH_SUCCESS:
                console.log("fetch club info success",action);
                return{
                   ...state,
                    club:action.payload
                }
        case ActionTypes.CLUBMEMBERS_FETCH_SUCCESS:
                        console.log("fetch club mem success",action);
                        return{
                           ...state,
                            cUsers:action.payload
                }
        case ActionTypes.REQCLUBMEM_FETCH_SUCCESS:
                        console.log("fetch club req mem success",action);
                        return{
                           ...state,
                            rUsers:action.payload
                }
        case ActionTypes.AllUSERS_FETCH_SUCCESS:
                        console.log("fetch all users success",action);
                        return{
                           ...state,
                            users:action.payload
                }
        default:
            return state;
    }
}
