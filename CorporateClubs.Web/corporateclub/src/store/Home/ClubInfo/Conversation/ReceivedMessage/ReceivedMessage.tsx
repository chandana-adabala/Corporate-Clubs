import React from 'react'
import './ReceivedMessage.scss'


export default class ReceivedMessage extends React.Component{
    render(){
        return(
            <div className='receivedMessage'>
                <div className='messageHeader'>
                        <div className="time">12:00PM</div>
                        <div className="displayname">Technovert</div>
                        <img src={require('../../../../Clubs/bike.jpeg')}/>
                        
                </div>
                <div className='messageBody'>
                    
                        <div className='message'>
                            hi....... hello
                            klllll hi....... hello
                            klllll hi....... hello
                            klllllhi....... hello
                            klllll hi....... hello
                            klllll hi....... hello
                            klllll
                            hi....... hello
                            klllll hi....... hello
                            klllll hi....... hello
                            klllllhi....... hello
                            klllll hi....... hello
                            klllll hi....... hello
                            klllll
                        </div>
                        <div className="attachments">
                        </div>                        
                </div>
                   
            </div>
        );
    }
}