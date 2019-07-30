import React from 'react';
import './Club.scss';
import { fetchFavClubs, fetchMyClubInfo, fetchMessagesOfClub, fetchClubInfoError } from '../../actions/homeActions';
import { connect } from 'react-redux';


class Club extends React.Component<any, any>{
    
    constructor(props) {
        super(props);
    }

   onClubClick=(event)=> {
           
        this.props.dispatch(fetchMessagesOfClub(this.props.club.clubID));
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
        this.props.openChat();
    }


    render() {
        return (
            <div className="club" onClick={this.onClubClick}>

                <div className="profilePic">
                    <img src={this.props.club.profilePic} ></img>
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