import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import HomeNav from './HomeBar/HomeNav';

export default class MyThreads extends React.Component<any,any>{
    
    render(){
        return(<div>
            <HomeNav/>
                <h1>My threads page</h1>
        </div>);
      
    }
}