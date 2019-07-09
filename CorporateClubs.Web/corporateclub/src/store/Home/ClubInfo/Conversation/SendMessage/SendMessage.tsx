import React from 'react'
import './SendMessage.scss'

export default class SendMessage extends React.Component<any,any>{
    render(){
        console.log("sendmessage",this.props.message);
        return(
            <div className='sendMessage'>
                <div className='messageHeader'>
                        <div className="time">{this.props.message.postedOn}</div>
                        <div className="displayname">Technovert</div>
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