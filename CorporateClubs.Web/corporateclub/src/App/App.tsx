import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigate from '../store/HeadNav/Navigate';
import Admin from '../store/Admin/Admin';
import Clubs from '../store/Clubs/Clubs'
import User from '../store/Admin/AdminUser';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from '../store/Home/HomeComponent';
import { runWithAdal } from 'react-adal';
import { authContext } from '../Configure';
import Head from '../store/HeadNav/Head';
import Profile_Head from '../store/Profile/ProfilePage'
import Connections from '../store/Connections/Connections'
import Nav from '../store/HeadNav/Navigate';
import {getToken} from '../Configure';
import { fetchFavClubs } from '../store/Home/actions/clubAction';
import { connect } from 'react-redux';
import MyThreads from '../store/Home/MyThreads';
import Forbidden from '../store/ForbiddenPage/Forbidden'
import {GetLoggedUserDetails} from './AppActions/AppActions'
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

 class App extends React.Component<any,any> {
  

   componentWillMount(){
   this.props.dispatch(GetLoggedUserDetails());
  }

 

  render(){
    debugger;
if(this.props.error!=''){
  return(<Forbidden/>);
}
else{
  return (
    <div className="app">
      <Router>
          <div className="commonNav">
        <Navigate/>
        <Head  UserDisplayName={this.props.LoggedUser.displayName} profilePic={this.props.LoggedUser.profilePic}/>
        </div>
      
      <div className="body">
        
          <Switch>
            
            <Route  path="/profile" component={Profile_Head}/>
            <Route  path="/Clubs" component={Clubs}/>
            <Route  path="/Admin" component={Admin}/>
            <Route path="/Connections" component={Connections}/>
            <Route  path='/Home/MyThreads' component={MyThreads}/>
            <Route  path="/" component={Home}/>
          </Switch>
      </div>
      </Router>
    </div>
  );
  }
}
}

function mapStatetoProps(state)
{
  return {
       LoggedUser:state.AppReducer.LoggedUser,
       error:state.AppReducer.error
  }
}

export default connect(mapStatetoProps)(App);


