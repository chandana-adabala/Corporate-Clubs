import React from 'react'
import './ReceivedMessage.scss'


export default class ReceivedMessage extends React.Component<any,any>{
    render(){
        console.log("received message",this.props.message);
        
        return(
            <div className='receivedMessage'>
                <div className='messageHeader'>
                        <div className="time">{this.props.message.postedOn}</div>
                        <div className="displayname">{}</div>
                        <img src={require('../../../../Clubs/bike.jpeg')}/>
                        
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