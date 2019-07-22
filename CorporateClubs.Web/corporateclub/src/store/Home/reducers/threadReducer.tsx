import {ActionTypes} from '../actions/threadActions';
import IThreads from '../../../models/IThreads';
import { IPrivateConversation } from '../../../models/IConversation';


export interface Istate {
    myContacts:IThreads[],
    favContacts:IThreads[],
    userMessages:IPrivateConversation[]
}

const initialState:Istate ={
    favContacts:[],
    myContacts:[],
    userMessages:[]
}


export default function threadReducer(state=initialState,action:any){
    switch(action.type){
        case ActionTypes.FAVCONTACTS_FETCH_SUCCESS: 
                 //("fetch favcontacts success",action);
                return{
                    ...state,
                    favContacts:action.payload
                }
        case ActionTypes.MYCONTACTS_FETCH_SUCCESS:
            debugger;
                 //("fetch my contacts success",action);
                  
                return{
                  ...state,
                    myContacts:action.payload
                }
        case ActionTypes.FETCH_USERMESSAGES_SUCCESS:
             
                         debugger;
                return{
                          ...state,
                           userMessages:action.payload
                }
        default:
                return state;
    }
}
