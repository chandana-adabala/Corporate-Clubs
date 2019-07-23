import React from 'react'
import {Icon} from 'react-icons-kit';
import {library} from 'react-icons-kit/icomoon/library';
import {ic_mail} from 'react-icons-kit/md/ic_mail';
import {phone} from 'react-icons-kit/icomoon/phone'
import './receivedConnection.scss'
import {acceptConnectionRequest,declineConnectionRequest} from '../actions/threadActionsMod'
export default class ReceivedConnection extends React.Component<any,any>{
    constructor(props)
    {
        super(props)
        this.acceptConnectionRequest=this.acceptConnectionRequest.bind(this);
        this.declineConnectionRequest=this.declineConnectionRequest.bind(this)
        
    }
    acceptConnectionRequest()
    {
         this.props.dispatch(acceptConnectionRequest(this.props.loggedUserID,this.props.connectedUserID))

    }

    declineConnectionRequest()
    {
         this.props.dispatch(declineConnectionRequest(this.props.loggedUserID,this.props.connectedUserID))
         
    }


render(){
        return(
            <div className="receivedReqWindow">
                <div className="paddingBlock"></div>
            <div className="innerReqWindow">
                <div className='profilePic'>
                   <img className='image' src="http://localhost:3333/images/user2.jpeg"/>
                </div>
                <div className='reqWindowBody'>
                    <p className="heading">{"Surya"}want to connect with you !</p>
                    <p className="mutualClubs">
                         <Icon icon={library}/>
                         {10}  in mutual
                    </p>
                    <p className="contact">
                        <span className='mail'>
                            <Icon icon={ic_mail}></Icon>
                            {"ramagirish123@gmail.com"}
                        </span>
                        <span className='phone'>
                            <Icon icon={phone}/>
                            {"+9059399747"}
                        </span>
                    </p>
                    <p className='mutualContacts'>
                            <span className="contactName">You and {"surya"} know</span>
                            <span className="mutualContactsList">{"surya,you,others,21"}</span>
                    </p>
                    <div className="buttons">
                        <button className="connectNow">Connect Now</button>
                        <button className="block">Block</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}