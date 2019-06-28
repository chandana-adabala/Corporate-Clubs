
import React from 'react';
import './Head.scss'
import { Icon } from 'react-icons-kit'
import {gear} from 'react-icons-kit/fa/gear'
import {chatbubbles} from 'react-icons-kit/ionicons/chatbubbles';
import {iosBell} from 'react-icons-kit/ionicons/iosBell' 
let size=25;
const Head: React.FC = () => {
    
    
  
    return (
    <div className="head">
       
        <div className="leftHead">

        <Icon size={50} icon={chatbubbles} className="logo"/>
        <text className="headname">Corporate Chat Club</text>
        <Icon size={size} icon={gear} className="icon" />

        </div>
        <div className="rightHead">
               <Profile/>
        </div>
      </div>
      );
  }

  export const Profile: React.FC = () => {
    var name="name";
    var source="source"
    return(

        <span className="profile">
          <Icon size={size} icon={iosBell} className="notify" />
          <img src={require('./damon.png')} alt="profile pic" className="profilepic" />
          <text>{name}</text>
        </span>
    );
  } 
  export default Head;