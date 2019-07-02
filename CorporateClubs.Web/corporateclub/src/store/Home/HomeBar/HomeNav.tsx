import React from 'react';
import './HomeNav.scss';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import HomeComponent from '../HomeComponent';
import MyThreads from '../MyThreads';

const HomeNav: React.FC = () => {
    let displayPage:Number=1;
    return(
        <div>
            <nav className="home-nav">
                <Link to="/">
                <a className="home-nav-options">My Clubs</a>
                </Link>
                <Link to="/Home/MyThreads">
                <a className="home-nav-options">My Threads</a>
                </Link>
                
            </nav>
          
        </div>
    );

    
}

export default HomeNav;