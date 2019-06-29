import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert';
import {user} from 'react-icons-kit/icomoon/user';
import { Interface } from 'readline';
import { number } from 'prop-types';
import {connect} from 'react-redux'
import { FetchRequests,makeAndCancelRequest,removeUser,addUserToPublicClub } from './Actions/ClubActions';



class Club extends React.Component<any,any>{
    componentDidMount()
  {
      console.log("did mount");
  }
  
  getButtonType(clubMember)
  {
       if(clubMember.members==null)
       {
        if(clubMember.clubs.clubType=='Public-Open Club')
         return <ConnectedJoinbtn clubID={clubMember.clubs.clubID} userID={2}/>
        if(clubMember.clubs.clubType=='Public-Closed Club')
         return <ConnectedRequestJoinbtn clubID={clubMember.clubs.clubID} userID={2}/>
       }

       if(clubMember.members!=null)
       {
           if(clubMember.members.ispersonBlock)
           return <span/>
       if(clubMember.members.isRequested)
        return <ConnectedCancelRequest clubID={clubMember.clubs.clubID} userID={2}/>

        if(!clubMember.members.isRequested)
        return <ConnectedExitbtn clubID={clubMember.clubs.clubID} userID={2}/> 
       }
        
  }
    render(){
debugger;

    
    return(
        <div className="club">
            <div className="clubhead">
                <text className="title">{this.props.clubMember.clubs.clubTitle}</text>
              <span className="menu"><Icon icon={ic_more_vert} size={30}/>
              <span className="menu-content">
                      <p>Report Club</p>
                      <p>Deactivate Club</p>
                  </span>  
                  </span>
            </div>
            
            <div>  <img src={this.props.clubMember.clubs.profilePic} alt="profile pic" className="groupicon" /></div>  
            <div>
                <p className="status">
                    {this.props.clubMember.clubs.description}
                </p>
                <p className="creation">
                     Created By {this.props.users.map(user=> {if(user.userID==this.props.clubMember.clubs.clubCreatedBy)return <text>{user.displayName}</text> })} on {new Date(this.props.clubMember.clubs.rowCreatedOn).toDateString()}}
                </p>
            </div>
            <div className="members">
                 <span><Icon icon={user} size={25}/><text>{this.props.clubMember.count}</text></span>
                 {this.getButtonType(this.props.clubMember)}
              
            </div>
        </div>
    );
}
}
class Joinbtn extends React.Component<any,any>{
    render(){
        return(
        <button className="join" onClick={()=>this.props.dispatch(addUserToPublicClub(this.props.userID,this.props.clubID,this.props.userID))}>Join</button>
    )
    }
}
class CancelRequest extends React.Component<any,any>{
    render(){
    return(
        <button className="cancelrequest" onClick={()=>this.props.dispatch(makeAndCancelRequest(this.props.userID,this.props.clubID,this.props.userID))}>Cancel Request</button>
    )
    }
}
class RequestJoinbtn extends React.Component<any,any>{
    render(){
    return(
        <button className="join" onClick={()=>{debugger;this.props.dispatch(makeAndCancelRequest(this.props.userID,this.props.clubID,this.props.userID))}}>Request Join</button>
    )
    }
}
class Exitbtn extends React.Component<any,any>{
    render(){
        return(
        <button className="exit" onClick={()=>this.props.dispatch(removeUser(this.props.userID,this.props.clubID,this.props.userID))}>Exit Club</button>
    )
    }
}
function mapStateToProps(State)
  {
    debugger;
    console.log(State)
    return{
      requests:State.ClubReducer.requests,
    }
  }


  const ConnectedJoinbtn=connect()(Joinbtn);
  const ConnectedExitbtn=connect()(Exitbtn);
  const ConnectedCancelRequest=connect()(CancelRequest);
  const ConnectedRequestJoinbtn=connect()(RequestJoinbtn);

  export default connect(mapStateToProps)(Club);