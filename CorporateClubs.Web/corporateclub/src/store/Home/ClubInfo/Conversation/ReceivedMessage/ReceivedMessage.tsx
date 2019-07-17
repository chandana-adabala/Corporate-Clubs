import React from 'react'
import './ReceivedMessage.scss'
import {ic_cancel} from 'react-icons-kit/md/ic_cancel'
import {ic_insert_drive_file} from 'react-icons-kit/md/ic_insert_drive_file'
import Icon from 'react-icons-kit';
import {ic_attach_file} from 'react-icons-kit/md/ic_attach_file'
import FileViewer from 'react-file-viewer';


export default class ReceivedMessage extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state={
            attach:"",
            attachType:"",
            showAttach:false,
        }
    }

    viewAttachment=(event)=>{
         
        var i = this.props.message.attachmentNames.indexOf(event.currentTarget.id);
        var type=this.props.message.attachmentUrls[i].split('.');
        this.setState({
            showAttach:true,
            attach:this.props.message.attachmentUrls[i],
            attachType:type[type.length-1]
        })
    }
    unViewAttachment=(event)=>{
         
        this.setState({
            attach:"",
            attachType:"",
            showAttach:false,
        })
    }
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
                        {this.props.message.attachmentNames!=null?(this.props.message.attachmentNames.map(file=>(<span className="attachments" id={file} onClick={this.viewAttachment}>
                                                                
                                                                <Icon size={16} icon={ic_attach_file} style={{ color: '#543754',padding:'4px'}}/>
                                                                {file}
                                                                
                                                        </span>)))
                                                        :(<span></span>)                                                    
                                                    }
                        </div>                        
                </div>
                   
            {this.state.showAttach==true?
            (<div className="attachPreview">
                    {/* <img src={this.state.attach}/> */}
                   
                    <FileViewer
                        fileType={this.state.attachType}
                        filePath={this.state.attach}
                        />
                    <Icon size={16} icon={ic_cancel} style={{ color: '#543754',padding:'4px'}} onClick={this.unViewAttachment}/>
            </div>)
            :(<span></span>)}
            </div>
        );
    }
}