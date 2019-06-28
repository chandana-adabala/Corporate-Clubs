import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigate from './store/HeadNav/Navigate';
import Admin from './store/Admin/Admin';
import Clubs from './store/Clubs/Clubs'
import User from './store/Admin/AdminUser';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './store/Home/HomeComponent';
import { runWithAdal } from 'react-adal';
import { authContext } from './Configure';
import Head from './store/HeadNav/Head';
import Profile_Head from './store/Profile/ProfilePage'
import Connections from './store/Connections/Connections'
import Nav from './store/HeadNav/Navigate';
import {getToken} from './Configure';
import { fetchFavClubs } from './store/Home/actions/clubAction';
import { connect } from 'react-redux';
import MyThreads from './store/Home/MyThreads';

export default class App extends React.Component<any,any> {
  // componentWillMount(){
  //   console.log(' will mount');
  // }

 

  render(){
const{error,loading}=this.props;
if(error){
  return(<h1>404 not found</h1>);
}
else{
console.log(this.props.clubDisplayName);
  return (
    <div className="app">
      <Router>
          <div className="commonNav">
        <Navigate/>
        <Head/>
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






