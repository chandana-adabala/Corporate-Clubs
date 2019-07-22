import {combineReducers} from 'redux';
import homeReducer from './Home/reducers/homeReducer'
import threadReducer from './Home/reducers/threadReducer'
import ProfilePageReducer from './Profile/Reducers'
import {AdminPageReducer} from './Admin/Reducers/AdminReducer'
import  {ClubReducer} from './Clubs/Reducers/ClubReducers'
import  AppReducer from '../App/AppReducer/AppReducer'
import ConnectionsReducer from '../store/Connections/Reducers/Reducers'
export default combineReducers(
    {
        threadReducer,AppReducer,homeReducer,ProfilePageReducer,AdminPageReducer,ClubReducer,ConnectionsReducer
    }
)