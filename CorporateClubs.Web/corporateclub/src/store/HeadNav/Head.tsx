
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

    
    render()
    {
    return(
   
        <span className="profile">
          <Icon size={size} icon={iosBell} className="notify" />
          <Link to="/profile">  <img src={this.props.profilePic} alt="profile pic" className="profilepic" />   </Link>
          <text>{this.props.UserDisplayName}</text>
         
        </span>
    );
    }
  } 
  export default Head;