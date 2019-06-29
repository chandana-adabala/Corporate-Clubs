import React from 'react'
import './User.scss'
import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import Icon from 'react-icons-kit';
import {shield} from 'react-icons-kit/entypo/shield'
import {check} from 'react-icons-kit/metrize/check'
import {cross} from 'react-icons-kit/metrize/cross'
export default class RequestedUser extends React.Component<any,{}>{
    render(){
        return(
            <div className="user">
                <div className="profilePic"> 
                        <img src={require("../../a2.jpg")} ></img>
                </div>
                <div className="userName">
                        {this.props.user.displayName} 
                        <div className="email" style={{display:'flex'}}>
                            {this.props.user.email}
                           
                         </div>

                </div>
             
                <Icon size={24} icon={check} style={{padding:'1rem',color:'green'}}/>
                <Icon size={24} icon={cross} style={{padding:'1rem',color:'red'}}/>
                
            </div>
        );
    }
}