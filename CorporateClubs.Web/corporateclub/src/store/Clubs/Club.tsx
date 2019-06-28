import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert';
import {user} from 'react-icons-kit/icomoon/user';
import { Interface } from 'readline';
import { number } from 'prop-types';
import {connect} from 'react-redux'
import { FetchRequests } from './Actions/ClubActions';



class Club extends React.Component<any,any>{
    componentDidMount()
  {
      console.log("did mount");
      
      this.props.dispatch(FetchRequests(this.props.club.clubID));
  }
  
    render(){
debugger;

    
    return(
        <div className="club">
            <div className="clubhead">
                <text className="title">{this.props.club.clubTitle}</text>
              <span className="menu"><Icon icon={ic_more_vert} size={30}/>
              <span className="menu-content">
                      <p>Report Club</p>
                      <p>Deactivate Club</p>
                  </span>  
                  </span>
            </div>
            
            <div>  <img src={this.props.club.profilePic} alt="profile pic" className="groupicon" /></div>  
            <div>
                <p className="status">
                    {this.props.club.description}
                </p>
                <p className="creation">
                    Created By {this.props.users!=undefined?(this.props.users.map((user)=>{
                        if(this.props.club.rowCreatedBy==user.userID)
                            return <text>{user.displayName}</text>
                    }
                        )):(<span></span>)} on {new Date(this.props.club.rowCreatedOn).toDateString()}
                </p>
            </div>
            <div className="members">
                 <Icon icon={user} size={25}/><text>{this.props.club.members}</text>
                 {this.props.members!=undefined?(this.props.members.map((member)=>{
                        if(this.props.club.clubID==member.clubID)
                            return  <span><Exitbtn/></span> 
                    }
                        )):(<span></span>)}
                        
                {this.props.requests!=undefined?(this.props.requests.map((request)=>{
                        if(request.userID==2)
                            return  <span><CancelRequest/></span> 
                    }
                        )):(<span>5985985</span>)}
              
            </div>
        </div>
    );
}
}
const Joinbtn: React.FC = () => {
    return(
        <button className="join">Join</button>
    )
}
const CancelRequest: React.FC = () => {
    return(
        <button className="cancelrequest">Cancel Request</button>
    )
}
const RequestJoinbtn: React.FC = () => {
    return(
        <button className="join">Request Join</button>
    )
}
const Exitbtn: React.FC = () => {
    return(
        <button className="exit">Exit Club</button>
    )
}
function mapStateToProps(State)
  {
    debugger;
    console.log(State)
    return{
      requests:State.ClubReducer.requests,
    }
  }

  export default connect(mapStateToProps)(Club);