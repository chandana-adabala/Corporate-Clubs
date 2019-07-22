import React from 'react';
import './MyContacts.scss';
import { fetchMessagesOfUser,} from '../actions/threadActions';
import { connect } from 'react-redux';


class Contact extends React.Component<any, any>{
    
    constructor(props) {
        super(props);
    }

    // componentDidUpdate(prevProps){
    //        
    //     if(prevProps.contact.connectedUserID != this.props.contact.connectedUserID){
    //         this.props.connection.invoke("RemoveFromGroup",prevProps.contact.connectedUserID ).catch(err => console.log("REMOVEGROUPUNSUCCESS",err.toString()));
    //         this.props.connection.invoke("AddToGroup",this.props.contact.connectedUserID).catch(err => console.log("ADDTOGROUPUNSUCCESS",err.toString()));
    //     }
    
    // }

    onClubClick=(event)=> {
             debugger; 
        this.props.dispatch(fetchMessagesOfUser(this.props.contact.connectedUserID));
        this.props.openChat(this.props.contact.connectedUserID);
    }


    render() {
        return (
            <div className="contact" onClick={this.onClubClick}>

                <div className="profilePic">
                    <img src={this.props.contact.connectedUserProfilePic} ></img>
                </div>
                <div className="displayName">
                    {this.props.contact.connectedUserDisplayName}
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

export default connect()(Contact);