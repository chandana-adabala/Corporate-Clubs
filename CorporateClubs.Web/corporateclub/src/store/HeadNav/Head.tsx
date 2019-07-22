
import React from 'react';
import './Head.scss'
import { Icon } from 'react-icons-kit'
import {gear} from 'react-icons-kit/fa/gear'
import {chatbubbles} from 'react-icons-kit/ionicons/chatbubbles';
import {iosBell} from 'react-icons-kit/ionicons/iosBell' 
import { render } from 'react-dom';
import {Link} from 'react-router-dom';
import {logoutFromApp} from '../../Configure'
import { Button } from 'office-ui-fabric-react/lib/Button';
import Avatar from 'react-avatar';
import {ic_keyboard_arrow_down} from 'react-icons-kit/md/ic_keyboard_arrow_down'
import {ic_keyboard_arrow_up} from 'react-icons-kit/md/ic_keyboard_arrow_up'
let size=25;
class Head extends React.Component<any,any> {
  
    
    render()
    {
    return (
    <div className="head">
       
        <div className="leftHead">

        <Icon size={50} icon={chatbubbles} className="logo"/>
        <text className="headname">Corporate Chat Club</text>
        <Icon size={size} icon={gear} className="icon" />

        </div>
        <div className="rightHead">
               <Profile UserDisplayName={this.props.UserDisplayName} profilePic={this.props.profilePic}/>
        </div>
          
      </div>
      );
    }
  }

  export class Profile extends React.Component<any,any>  {
    constructor(props)
    {
      super(props)
      this.state=({optionsDisplay:false})
      this.dropDownClicked=this.dropDownClicked.bind(this)
      this.makeDropDownHide=this.makeDropDownHide.bind(this)
      this.logout=this.logout.bind(this);
    }
    
    dropDownClicked()
    {
        this.setState({optionsDisplay:!this.state.optionsDisplay})
    }
    
    makeDropDownHide()
    {
      debugger;
      this.setState({optionsDisplay:false})
    }

    logout()
    {
      logoutFromApp()
    }

    
    render()
    {
    return(
   
        <span className="profile">
          <Icon size={size} icon={iosBell} className="notify" />
          <span><Link to="/profile"> <Avatar size="2.5rem" name={this.props.UserDisplayName.charAt(0).toUpperCase+this.props.user} style={{"margin-right":"1vw"}} round={true} src={this.props.profilePic} />   </Link></span>
          <text>{this.props.UserDisplayName}</text>
          <div className="options" onClick={this.dropDownClicked}>
          {this.state.optionsDisplay?<Icon size={30} icon={ic_keyboard_arrow_up} style={{cursor:"pointer"}}/>:<Icon size={30} icon={ic_keyboard_arrow_down} style={{cursor:"pointer"}}/>}
            <button className={this.state.optionsDisplay?"dropdown-content-display":"dropdown-content-hide"} onBlur={this.makeDropDownHide} >
                      <Link to="/profile"><p id="Admin">Profile</p></Link>
                      <p id="User" onClick={this.logout}>Logout</p>
                  </button>
            </div>
          
         
        </span>
    );
    }
  } 
  export default Head;  