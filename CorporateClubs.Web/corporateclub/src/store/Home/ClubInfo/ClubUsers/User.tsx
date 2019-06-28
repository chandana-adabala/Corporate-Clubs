import React from 'react'
import './User.scss'
import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import Icon from 'react-icons-kit';
import {shield} from 'react-icons-kit/entypo/shield'

export default class User extends React.Component<any,{}>{
    render(){
        return(
            <div className="user">
                <div className="profilePic"> 
                        <img src={this.props.user.profilePic} ></img>
                </div>
                <div className="userName">
                        {this.props.user.displayName}   {this.props.cuser.role=='Admin'?(<Icon size={14} icon={shield} style={{ color: 'gray' }} />):(<span></span>)} 
                        <div className="email" style={{display:'flex'}}>
                           {this.props.user.email}  
                           
                            {this.props.user.isActive==false?((this.props.cuser.isPersonBlock==true?(<li style={{paddingLeft:'1rem',color:'red'}}>blocked</li>):(<li style={{paddingLeft:'1rem',color:'green'}}>active</li>))):(<li style={{paddingLeft:'1rem', color:'red'}}>inactive</li>) }
                         </div>

                </div>
             
                <span className="menu"> <Icon size={14} icon={moreVertical} style={{ color: 'gray' }} />
                <span className="menu-content">
                      {this.props.cuser.role=='Admin'?(<p>Remove As Admin</p>):(<span></span>)}
                      <p>Block Member</p>
                  </span>  
                  </span>
            </div>
        );
    }
}