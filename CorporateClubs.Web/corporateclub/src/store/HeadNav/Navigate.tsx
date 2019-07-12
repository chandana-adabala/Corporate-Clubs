import React from 'react';
import './navigate.scss';
import {Icon} from 'react-icons-kit';
import {ic_home} from 'react-icons-kit/md/ic_home';
import {addressBook} from 'react-icons-kit/icomoon/addressBook';
import {library} from 'react-icons-kit/icomoon/library';
import {user_circle} from 'react-icons-kit/ikons/user_circle'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
class Navigate extends React.Component<any,any> {

    constructor(props)
    {
        super(props)
        this.state=({activeButtons:{"home":true,"connection":false,"clubs":false,"admin":false}})
        
        
    }
 
   componentWillReceiveProps(nextprops)
   {
       debugger;
       let path=nextprops.location.pathname;
       var loc=path.split('/')[1].toLowerCase();
       var activeButtons={"home":false,"connections":false,"clubs":false,"admin":false}
       if(loc=='')
       loc="home";
       activeButtons[loc]=true;
       this.setState({activeButtons:activeButtons})
   }
    render()
    {
        
       
    return(
        <div className="nav">
            <nav >
            <Link to="/">
                <div className={this.state.activeButtons["home"]?"optionsActive":"options"} id="home" >
                    <div className="home"><Icon size={25} icon={ic_home} className="icon"/></div>
                    <div className="label">My Home</div> 
                </div>
                </Link>
                <Link to='/Connections'>
                <div className={this.state.activeButtons["connections"]?"optionsActive":"options"}  id="connections" >
                    <div className="home"><Icon size={20} icon={addressBook} className="icon"/></div>
                    <div className="label">Connection</div> 
                </div>
                </Link>
                <Link to="/Clubs">
                <div className={this.state.activeButtons["clubs"]?"optionsActive":"options"} id="clubs" >
                    <div className="home"><Icon size={20} icon={library} className="icon"/></div>
                    <div className="label">Clubs</div> 
                </div>
                </Link>
                {this.props.LoggedUserRole=='Admin'?
                (<Link to="/Admin">
                <div className={this.state.activeButtons["admin"]?"optionsActive":"options"}  id="admin" >
                    <div className="home"><Icon size={20} icon={user_circle} className="icon"/></div>
                    <div className="label">Admin</div> 
                </div>
                </Link>):<span></span>}
            </nav>
        </div>
    );
    }
}

function mapStateToProps(state)
{
    return{
    LoggedUserRole:state.AppReducer.LoggedUser.role
    }
}
export default connect(mapStateToProps)(Navigate);


