import React from 'react';
import './ChangeProfilePicture.scss'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import {match,Router,Link} from 'react-router-dom'


export default class ChangeProfilePicture extends React.Component<any,any>{
    constructor(props) {
        super(props)
        this.state = {
          preview: null,
          src:null,
          name:null,
        }
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onFileLoad=this.onFileLoad.bind(this);
      }
     
      onClose() {
        this.setState({preview: null,name:""})
      }
      
      onCrop(preview) {
        this.setState({preview})
      }
      onFileLoad(event)
      {
          this.setState({name:event.name})
      }

    render()
    {
      
        return(
               <div className="changeProfilePicture" >
               <div id="content">
               <div className="header">   
               <h4>Add New Profile Picture</h4>
               <Link to="/Profile">
               <Icon size={'2em'} icon={ic_close}/>
               </Link>
               </div>
               <div className="imageContent">
               <div id="one-third">
               <span className="preview">Preview</span>
                <div className="previewImage">  
               <img src={this.state.preview} alt="Preview" />
               </div>
               </div>


               <div id="two-third">
                  <span className="upload">uploaded from device: <span className="uploadFileName">{this.state.name}</span></span>
               <Avatar
          width={300}
          height={200}
          imageWidth={300}
        
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
       
          lineWidth={0}
          cropColor	={"white"}
          onFileLoad={this.onFileLoad}
         

        />
         <div className="buttons">
         <button className="cancelbutton" type="submit"><Link to="/Profile">Cancel</Link></button>
        <button className="addclub" value="submit"><Link to="/Profile">Confirm</Link></button>
                                
          </div>
               </div>

           
           </div>
           </div>
       </div>
        )
    }
}