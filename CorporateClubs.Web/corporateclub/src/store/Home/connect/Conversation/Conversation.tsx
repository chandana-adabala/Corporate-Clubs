import React from 'react';
import './Conversation.scss'
import Icon from 'react-icons-kit';
import {moreVertical} from 'react-icons-kit/feather/moreVertical'
import {ic_attach_file} from 'react-icons-kit/md/ic_attach_file'
import {ic_send} from 'react-icons-kit/md/ic_send'
import {smileO} from 'react-icons-kit/fa/smileO'
import {ic_notifications_off} from 'react-icons-kit/md/ic_notifications_off'
import {ic_favorite} from 'react-icons-kit/md/ic_favorite'
import {ic_flight_takeoff} from 'react-icons-kit/md/ic_flight_takeoff'
import {ic_info} from 'react-icons-kit/md/ic_info'
import SendMessage from './SendMessage/SendMessage';
import ReceivedMessage from './ReceivedMessage/ReceivedMessage';
import ReceivedConnection from '../receivedConnection';

 export default class Conversation extends React.Component{
     render(){
         return(
             <div className="chatScreen">
                 <div className="titleBar">
                     <div className="title">Title{}</div>
                     <nav>
                          <Icon size={24} icon={moreVertical} style={{ color: 'gray' }} />
                          <div className="options">
                              <p><Icon size={24} icon={ic_info} style={{ color: 'gray' ,paddingRight:'0.5rem'}} />Group Info</p>
                              <p> <Icon size={24} icon={ic_notifications_off} style={{ color: 'gray',paddingRight:'0.5rem' }} /> Mute Notifications</p>
                              <p> <Icon size={24} icon={ic_favorite} style={{ color: 'gray',paddingRight:'0.5rem' }} />Mark Favorite</p>
                              <p> <Icon size={24} icon={ic_flight_takeoff} style={{ color: 'gray',paddingRight:'0.5rem' }} />Exit Club</p>

                          </div>
                    </nav>
                 </div>
                 <div className="chatDisplayArea">
                     <ReceivedConnection/>
                   
                       
                 </div>
                 <div className="chatArea">
                    <div className="messageArea">
                            <input type="text" className="message" placeholder="Type a message here"/>
                            <div className="messageOptions">
                                <Icon size={24} icon={ic_attach_file} style={{ color: 'gray' }} />
                                <Icon size={32} icon={smileO} style={{ color: '#B2E269' }} />
                                <Icon size={32} icon={ic_send} style={{ color: 'gray' }} />
                            </div>
                            

                    </div>
                    <div className="attachmentArea">

                    </div>
                 </div>
             </div>
         );
     }
 }