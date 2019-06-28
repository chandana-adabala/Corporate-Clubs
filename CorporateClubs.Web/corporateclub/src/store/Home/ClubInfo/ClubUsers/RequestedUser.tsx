import React from 'react'
import './User.scss'
import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import Icon from 'react-icons-kit';
import {shield} from 'react-icons-kit/entypo/shield'
import {check} from 'react-icons-kit/metrize/check'
import {cross} from 'react-icons-kit/metrize/cross'
import { connect } from 'react-redux';
import { acceptRequest, rejectRequest, fetchMyClubInfo } from '../../actions/clubAction';
class RequestedUser extends React.Component<any,{}>{
    constructor(props){
        super(props);

    }
    handleAcceptRequest=()=>{
        this.props.dispatch(acceptRequest(this.props.club.clubID,this.props.user.userID));
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
    }
    handleRejectRequest=()=>{
        this.props.dispatch(rejectRequest(this.props.club.clubID,this.props.user.userID));
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
    }


    render(){
        return(
            <div className="user">
                <div className="profilePic"> 
                        <img src={this.props.user.profilePic} ></img>
                </div>
                <div className="userName">
                        {this.props.user.displayName} 
                        <div className="email" style={{display:'flex'}}>
                            {this.props.user.email}
                           
                         </div>

                </div>
             
                <Icon size={24} icon={check} style={{padding:'1rem',color:'green'}} onClick={this.handleAcceptRequest}/>
                <Icon size={24} icon={cross} style={{padding:'1rem',color:'red'}} onClick={this.handleRejectRequest}/>
                
            </div>
        );
    }
}
function mapStateToProps(state){
     
    console.log('mapstattoprops',state.homeReducer);
    return{
        myclubs
           : state.homeReducer.myclubs,
       favclubs
           : state.homeReducer.favclubs,
       club
           : state.homeReducer.club,
       cUsers
           : state.homeReducer.cUsers,
       rUsers
           : state.homeReducer.rUsers,
       users
           : state.homeReducer.users
    }
    

  }
export default connect(mapStateToProps)(RequestedUser);