import {combineReducers} from 'redux';
import homeReducer from './Home/reducers/homeReducer'
import ProfilePageReducer from './Profile/Reducers'
import {AdminPageReducer} from './Admin/Reducers/AdminReducer'
import  {ClubReducer} from './Clubs/Reducers/ClubReducers'
import  AppReducer from '../App/AppReducer/AppReducer'
export default combineReducers(
    {
        AppReducer,homeReducer,ProfilePageReducer,AdminPageReducer,ClubReducer
    }
)