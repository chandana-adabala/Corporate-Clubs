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
import { fetchMyClubInfo} from '../../actions/homeActions';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ScrollToBottom from 'react-scroll-to-bottom';
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {ic_insert_drive_file} from 'react-icons-kit/md/ic_insert_drive_file'
import axios from 'axios';
import { getToken } from '../../../../Configure';
import IMsgWithAttach from '../../../../models/IMsgWithAttach';



class Conversation extends React.Component<any,any>{
   
    constructor(props){
    
        super(props);
         
        this.state={
            messages:this.props.messages,
            isMessageSend:false,
            message:"",
            showEmoji:false,
            files:[],
            sendingFileNames:[],
            receivedFileNames:[]
            
        }
       
        console.log("check::",this.props.messages);
        
    }

   // message arrived at
   timeDifference=(current, previous)=> {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        
        var elapsed = current - previous;
        
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
        
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
             return Math.round(elapsed/msPerDay) + ' days ago';   
        }
        else{
            return previous.toDateString();
        }
        
      
    }
 
    componentDidMount(){
         
        //signalr client side methods invoked from server side
         
        this.props.connection.on(
            
            "ReceiveMessage",
            (userID,displayName,profilePic ,message, postedAt,fileUrls,fileNames) => {
                 
           
              this.setState({
                messages:[...this.state.messages,{
                    userID:userID,
                    userName:displayName,
                    profilePic:profilePic,
                    message:message,
                    postedOn:postedAt,
                    attachmentUrls:fileUrls,
                    attachmentNames:fileNames
                }],
                receivedFileNames:fileNames
              });
            }
          );
          this.props.connection.on(
           
            "Disconnected",
            (e) => {
                 
                this.state.connection.start();
            }
          );
         
        }
        
     
    
    
    componentDidUpdate(prevProps) {
         
        
        if (this.props.club.clubID !== prevProps.club.clubID) {
         
                 this.props.connection.invoke("RemoveFromGroup",prevProps.club.clubID).catch(err => console.log("REMOVEGROUPUNSUCCESS",err.toString()));
                this.props.connection.invoke("AddToGroup",this.props.club.clubID).catch(err => console.log("ADDTOGROUPUNSUCCESS",err.toString()));
                
        }
        if(this.props.messages!==prevProps.messages){
            this.setState({
                messages:this.props.messages
            });
  
        }
        
      }


     showGroupInfo=()=>{
          
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
        this.props.show();
     }

     saveMessage=(event: React.ChangeEvent<HTMLInputElement>)=>{
            this.setState({
                message:event.target.value,

            });
     }
     
     sendMessage=(event)=>{
          
         if(this.state.files!=[]){
           
            const fd = new FormData();
            
             
            let conversation : IMsgWithAttach={
               
                ClubID:this.props.club.clubID,
                UserID:this.props.loggedUser.userID,
                Message:this.state.message,
                ProfilePic:this.props.loggedUser.profilePic,
                UserName:this.props.loggedUser.displayName,
                
            }
            
            var blob = new Blob([JSON.stringify(conversation)], {type : 'application/json'});
            
              fd.append('files',blob);
            
             this.state.files.forEach((file, i) => {
                fd.append('files', file)
              });
            
             axios.post('http://localhost:3333/api/conversations/uploadattachments/'+this.props.loggedUser.userID+'/'+this.props.club.clubID,
             fd ,{headers: {'Content-Type': "multipart/form-data", 'Authorization': 'Bearer ' + getToken()}})
                .then(res=>{
            console.log(res);})
           
            
         }
        
            this.props.connection.invoke("SendMessageToClub",this.props.club.clubID,this.props.loggedUser.userID,
                                                                        this.props.loggedUser.displayName,
                                                                        this.props.loggedUser.profilePic,
                                                                        this.state.message,
                                                                        this.state.sendingFileNames)
                                    .catch(err => console.error(err.toString()));
        
         this.setState({
                message:"",
                showEmoji:false,
                sendingFileNames:[],
                files:[]
            });
     }
     showEmojis=()=>{
         this.setState({
             showEmoji:!this.state.showEmoji
         })
     }
     handleEmojiClick=(e)=>{
          
            this.setState({
                    message:this.state.message+e.native
            });
     }
     maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null // discard selected file
               console.log(msg)
              return false;
     
          }
        return true;
     }
     onFilesChange =(event)=> {
          
        if(this.maxSelectFile(event)){ 
            this.setState({
            files: [...this.state.files,...event.target.files]
            })
            var f:any=[];
            Object.entries(event.target.files).forEach((file:any)=>{
                f=[...f,file[1].name]
            })
            this.setState({
                sendingFileNames:[...this.state.sendingFileNames,...f]
            })
        } 
    }
     
      onFilesError=(error, file) =>{
        console.log('error code ' + error.code + ': ' + error.message)
      }
      removeAttachment=(file)=>{
           
                this.setState({
                    files:this.state.files.filter(a=>a.name!=file.name)
                });
           
                
      }

     render(){
          
         console.log("fsd",this.state.messages);
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
                 <ScrollToBottom>
                 <div className="chatDisplayArea">
                 
                       {
                           this.state.messages==[]?(this.props.messages.map(message=>message.userID==this.props.loggedUser.userID?
                                                    (<SendMessage message={message} time={this.timeDifference(new Date(),new Date(message.postedAt))}></SendMessage>)
                                                    :(<ReceivedMessage message={message} time={this.timeDifference(new Date(),new Date(message.postedOn))}></ReceivedMessage>)))
                                                :(this.state.messages.map(message=>message.userID==this.props.loggedUser.userID?
                                                    (<SendMessage message={message} time={this.timeDifference(new Date(),new Date(message.postedOn))}></SendMessage>)
                                                    :(<ReceivedMessage message={message} time={this.timeDifference(new Date(),new Date(message.postedOn))}></ReceivedMessage>))
                                                )
                                                    
                        }
                                                
                                                                     
                       
                       
                 </div>
                 </ScrollToBottom>
                 <div className="chatArea">
                    <div className="messageArea">
                   

                            <input type="text" className="message" placeholder="Type a message here" value={this.state.message} onChange={this.saveMessage}/>
                            
                            <div className="messageOptions">
                                                            <label>
                                    <input type='file' multiple style={{display:'none'}} onChange={this.onFilesChange}/>
                                            <Icon size={24} icon={ic_attach_file} style={{ color: 'gray' }} />
                                </label>
                                <Icon size={32} icon={smileO} style={{ color: '#B2E269' }} onClick={this.showEmojis}/>
                                <Icon size={32} icon={ic_send} style={{ color: 'gray' }} onClick={this.sendMessage}/>
                                {this.state.showEmoji==true?(<Picker onSelect={this.handleEmojiClick} style={{position:'absolute',zIndex:1,margin:'-15rem'}}/>):(<span></span>)}   
                            </div>
                            

                    </div>

                    <div className="attachmentArea">
                            {this.state.files.map(file=>(<span className="attachments">
                                                                
                                                                <Icon size={24} icon={ic_insert_drive_file} style={{ color: 'white',backgroundColor:'#a961a9',marginRight:'1rem' ,borderRadius:'50%',padding:'4px'}}/>
                                                                {file.name}
                                                                <Icon size={24} icon={ic_cancel} style={{ color: 'gray',marginLeft:'1rem' }}  onClick={this.removeAttachment.bind(this, file)}/>
                                                        </span>))}
                    </div>

                 </div>
             </div>
         );
     }
 }

 
 export default connect()(Conversation);