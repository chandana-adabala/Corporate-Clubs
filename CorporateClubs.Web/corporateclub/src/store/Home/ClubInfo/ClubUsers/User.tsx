import React from 'react'
import './User.scss'
import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import Icon from 'react-icons-kit';
import {shield} from 'react-icons-kit/entypo/shield'
import BlockUser from '../Block_User/BlockUser'
import Remove_As_Admin from '../Remove_As_Admin/RemoveAsAdmin'
import {Link,Route} from 'react-router-dom'
import UnBlockUser from '../UnBlock_User/UnBlockUser'

export default class User extends React.Component<any,{}>{
    render(){
        return(
            <div className="user">
                <div className="profilePic"> 
                        <img src={this.props.user.profilePic} ></img>
                </div>
                <div className="userName">
                        {this.props.user.displayName}   {this.props.cuser.role=='Club Owner'?(<Icon size={14} icon={shield} style={{ color: 'gray' }} />):(<span></span>)} 
                        <div className="email" style={{display:'flex'}}>
                           {this.props.user.email}  
                           
                            {this.props.user.isActive==true?((this.props.cuser.isPersonBlock==true?(<li style={{paddingLeft:'1rem',color:'red'}}>blocked</li>):(<li style={{paddingLeft:'1rem',color:'green'}}>active</li>))):(<li style={{paddingLeft:'1rem', color:'red'}}>inactive</li>) }
                         </div>

                </div>
             
                <span className="menu"> <Icon size={14} icon={moreVertical} style={{ color: 'gray' }} />
                <span className="menu-content">
                      {this.props.cuser.role=='Club Owner'?(<Link to={'/removeAsAdmin/'+this.props.clubID+'/'+this.props.cuser.userID}><p>Remove As ClubOwner</p></Link>):(<span></span>)}
                      {this.props.cuser.isPersonBlock==false?<Link to={'/blockUser/'+this.props.clubID+'/'+this.props.cuser.userID}><p>Block Member</p></Link>:<Link to={'/unblockUser/'+this.props.clubID+'/'+this.props.cuser.userID}><p>UnBlock Member</p></Link>}
                  </span>  
                  </span>
                  <Route path={'/removeAsAdmin/'+this.props.clubID+'/'+this.props.cuser.userID} component={()=><Remove_As_Admin to='/' userID={this.props.user.userID} clubID={this.props.clubID} displayName={this.props.user.displayName}/>}/>
                  <Route path={'/blockUser/'+this.props.clubID+'/'+this.props.cuser.userID} component={()=><BlockUser to='/' userID={this.props.user.userID} clubID={this.props.clubID} displayName={this.props.user.displayName}/>}/>
                  <Route path={'/unblockUser/'+this.props.clubID+'/'+this.props.cuser.userID} component={()=><UnBlockUser to='/' userID={this.props.user.userID} clubID={this.props.clubID} displayName={this.props.user.displayName}/>}/>
            </div>
        );
    }
}