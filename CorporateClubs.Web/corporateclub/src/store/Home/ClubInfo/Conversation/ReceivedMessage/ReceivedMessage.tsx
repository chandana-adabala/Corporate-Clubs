import React from 'react'
import './ReceivedMessage.scss'


export default class ReceivedMessage extends React.Component<any,any>{
    render(){
        console.log("received message",this.props.message);
        
        return(
            <div className='receivedMessage'>
                <div className='messageHeader'>
                         <img src={this.props.message.profilePic}/>
                         <div className="displayname">{this.props.message.userName}</div>
                        <div className="time">{this.props.time}</div>
                        
                        
                        
                </div>
                <div className='messageBody'>
                    
                        <div className='message'>
                                {this.props.message.message}
                        </div>
                        <div className="attachments">
                        </div>                        
                </div>
                   
            </div>
        );
    }
}