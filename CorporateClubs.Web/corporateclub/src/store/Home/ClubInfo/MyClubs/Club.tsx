import React from 'react';
import './Club.scss';
import { fetchFavClubs, fetchMyClubInfo } from '../../actions/clubAction';
import { connect } from 'react-redux';
import IClubs from '../../../../models/IClubs'
import { string } from 'prop-types';


class Club extends React.Component<any,any>{
   
    render(){
        return(
            <div className="club" onClick={()=>this.props.dispatch(fetchMyClubInfo(this.props.club.clubID))}>

                <div className="profilePic"> 
                        <img src={"https://www.google.com"+this.props.club.profilePic} ></img>
                </div>
                <div className="clubTitle">
                      {this.props.club.clubTitle}
                        <div className="lastMsg" >
                            Name: Message....
                </div>

                </div>
                <div className="lastMsgTime">
                                12:05
               </div>
                
            </div>
        );
    }
}

export default connect()(Club);