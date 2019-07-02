import React from 'react';
import './navigate.scss';
import {Icon} from 'react-icons-kit';
import {ic_home} from 'react-icons-kit/md/ic_home';
import {addressBook} from 'react-icons-kit/icomoon/addressBook';
import {library} from 'react-icons-kit/icomoon/library';
import {user_circle} from 'react-icons-kit/ikons/user_circle'
import { Link } from 'react-router-dom';
class Navigate extends React.Component<any,any> {
    render()
    {
    return(
        <div className="nav">
            <nav >
            <Link to="/">
                <div className="options">
                    <div className="home"><Icon size={25} icon={ic_home} className="icon"/></div>
                    <div className="label">My Home</div> 
                </div>
                </Link>
                <div className="options">
                    <div className="home"><Icon size={20} icon={addressBook} className="icon"/></div>
                    <div className="label">Connection</div> 
                </div>
                <Link to="/Clubs">
                <div className="options">
                    <div className="home"><Icon size={20} icon={library} className="icon"/></div>
                    <div className="label">Clubs</div> 
                </div>
                </Link>
                <Link to="/Admin">
                <div className="options">
                    <div className="home"><Icon size={20} icon={user_circle} className="icon"/></div>
                    <div className="label">Admin</div> 
                </div>
                </Link>
            </nav>
        </div>
    );
    }
}


export default Navigate;


