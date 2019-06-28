import React from 'react'
import './SendMessage.scss'

export default class SendMessage extends React.Component{
    render(){
        return(
            <div className='sendMessage'>
                <div className='messageHeader'>
                        <div className="time">12:00PM</div>
                        <div className="displayname">Technovert</div>
                        <img src={require('../../../../Clubs/bike.jpeg')}/>
                        
                </div>
                <div className='messageBody'>
                    
                        <div className='message'>
                            hi....... 
                        </div>
                        <div className="attachments">
                        </div>                        
                </div>
                   
            </div>
        );
    }
}