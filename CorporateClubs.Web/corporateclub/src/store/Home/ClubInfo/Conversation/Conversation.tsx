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
import {connect} from 'react-redux';
import ReceivedMessage from './ReceivedMessage/ReceivedMessage';
import { fetchMyClubInfo,fetchMessagesOfClub } from '../../actions/clubAction';
import * as signalR from "@aspnet/signalr";

class Conversation extends React.Component<any,any>{
    
    constructor(props){
    
        super(props);
        debugger;
        this.state={
            messages:this.props.messages,
            isMessageSend:false,
            message:"",
            
        }
       
        
    }

 
    componentDidMount(){
    debugger;
  
      
        this.props.connection.invoke("AddToGroup",this.props.club.clubID).catch(err => console.log("ADDTOGROUPUNSUCCESS",err.toString()));
   
        
        this.props.connection.on(
           
            "ReceiveMessage",
            (user, message, postedAt) => {
                debugger;
           
              this.setState({
                messages:[...this.state.messages,{
                    userID:user,
                    message:message,
                    postedOn:postedAt
                }]
              });
            }
          );
          this.props.connection.on(
           
            "Disconnected",
            (e) => {
                debugger;
                this.state.connection.start();
            }
          );
         
        }
        
     
    
    
    componentDidUpdate(prevProps) {
        debugger;
        
        if (this.props.club.clubID !== prevProps.club.clubID) {
         
           
                this.props.connection.invoke("AddToGroup",this.props.club.clubID).catch(err => console.log("ADDTOGROUPUNSUCCESS",err.toString()));
                
        }
        if(this.props.messages!==prevProps.messages){
            this.setState({
                messages:this.props.messages
            });
  
        }
        
      }
     showGroupInfo=()=>{
         debugger;
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
        this.props.show();
     }
     saveMessage=(event: React.ChangeEvent<HTMLInputElement>)=>{
            this.setState({
                message:event.target.value,

            });
     }
     
     sendMessage=(event)=>{
        debugger;

            this.props.connection.invoke("SendMessageToClub",this.props.club.clubID,this.props.loggedUser.userID,this.state.message)
                                    .catch(err => console.error(err.toString()));
          
      
        
        
     }
     render(){
         debugger;
         
         return(
             <div className="chatScreen">
                 <div className="titleBar">
                     <div className="title">{this.props.club.clubTitle}</div>
                     <nav>
                          <Icon size={24} icon={moreVertical} style={{ color: 'gray' }} />
                          <div className="options">
                              <p onClick={this.showGroupInfo}><Icon size={24} icon={ic_info} style={{ color: 'gray' ,paddingRight:'0.5rem'}} />Group Info</p>
                              <p> <Icon size={24} icon={ic_notifications_off} style={{ color: 'gray',paddingRight:'0.5rem' }} /> Mute Notifications</p>
                              <p> <Icon size={24} icon={ic_favorite} style={{ color: 'gray',paddingRight:'0.5rem' }} />Mark Favorite</p>
                              <p> <Icon size={24} icon={ic_flight_takeoff} style={{ color: 'gray',paddingRight:'0.5rem' }} />Exit Club</p>

                          </div>
                    </nav>
                 </div>
                 <div className="chatDisplayArea">
                 {/* {this.props.messages.map(message=>message.userID==this.props.loggedUser.userID?
                                                    (<SendMessage message={message}></SendMessage>)
                                                    :(<ReceivedMessage message={message}></ReceivedMessage>))} */}
                       {this.state.messages==[]?(this.props.messages.map(message=>message.userID==this.props.loggedUser.userID?
                                                    (<SendMessage message={message}></SendMessage>)
                                                    :(<ReceivedMessage message={message}></ReceivedMessage>)))
                                                :(this.state.messages.map(message=>message.userID==this.props.loggedUser.userID?
                                                    (<SendMessage message={message}></SendMessage>)
                                                    :(<ReceivedMessage message={message}></ReceivedMessage>))
                                                )
                                                    
                        }
                                                
                                               
                       
                       
                 </div>
                 <div className="chatArea">
                    <div className="messageArea">
                            <input type="text" className="message" placeholder="Type a message here" value={this.state.message} onChange={this.saveMessage}/>
                            <div className="messageOptions">
                                <Icon size={24} icon={ic_attach_file} style={{ color: 'gray' }} />
                                <Icon size={32} icon={smileO} style={{ color: '#B2E269' }} />
                                <Icon size={32} icon={ic_send} style={{ color: 'gray' }} onClick={this.sendMessage}/>
                            </div>
                            

                    </div>
                    <div className="attachmentArea">

                    </div>
                 </div>
             </div>
         );
     }
 }

 
 export default connect()(Conversation);