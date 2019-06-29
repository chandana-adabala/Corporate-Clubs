import React from 'react';
import './ChangeProfilePicture.scss'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import {match,Router,Link} from 'react-router-dom'
import axios from 'axios';
import Avatar from 'react-avatar-edit'



export default class ChangeProfilePicture extends React.Component<any,any>{
    constructor(props) {
        super(props)
        this.state = {
            selectedImage:null,
          preview: null,
          src:null,
          name:null,
        }
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onFileLoad=this.onFileLoad.bind(this);
      }
      imageSelectHandler=(ev)=>{
        console.log(ev.target.files[0]);
        this.setState({
            selectedImage:ev.target.files[0]
        });
        
    }

    imageUploadHandler=(ev)=>{
        debugger;
        console.log("image upload");
        
        const fd = new FormData();
        fd.append('image',this.state.selectedImage);
        console.log(fd.get('image'),this.state.selectedImage,this.state.selectedImage.name);
        
        axios.post('http://localhost:3333/api/users/api/UploadImage/4',
        fd ,{headers: {'Content-Type': "multipart/form-data"}})
        .then(res=>{
            console.log(res);
        })

    }
     
      onClose() {
        this.setState({preview: null,name:""})
      }
      
      onCrop(preview) {
        this.setState({preview})
      }
      onFileLoad(event)
      {
        console.log(event);
        this.setState({
            selectedImage:event.target.files[0]
        });
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
        <button className="addclub" value="submit"  onClick={this.imageUploadHandler}><Link to="/Profile">Confirm</Link></button>
                                
          </div>
               </div>

           
           </div>
           </div>
       </div>
        )
    }
}


{/* interface Iprops
{
    userID?:number,
name?:string,
status?:string,
email?:string,
phoneno?:string,
about?:string,
firstname?:string,
lastname?:string,
gender?:string,
martialstatus?:string,
middlename?:string,
dipslauname?:string,
dateofbirth?:string,
bloodgroup?:string,
address?:string,
professionalSummary?:string


}

interface Istate
{
diplayprofile?:string
}

export class ChangeProfilePicture extends React.Component<Iprops,any>{
    constructor(props){
        super(props);
        this.state={
            selectedImage:null
        }
    }

    imageSelectHandler=(ev)=>{
        console.log(ev.target.files[0]);
        this.setState({
            selectedImage:ev.target.files[0]
        });
        
    }

    imageUploadHandler=(ev)=>{
        debugger;
        console.log("image upload");
        
        const fd = new FormData();
        fd.append('image',this.state.selectedImage);
        console.log(fd.get('image'),this.state.selectedImage,this.state.selectedImage.name);
        
        axios.post('http://localhost:3333/api/users/api/UploadImage/4',
        fd ,{headers: {'Content-Type': "multipart/form-data"}})
        .then(res=>{
            console.log(res);
        })

    }

    render()
    {
        return(
               <div className="uploadImageContainer">
                    <div className="titleBar">
                        
                    </div>
                    <div className="containerBody">
                        <div className="previewPlace">

                        </div>
                        <div className="uploadPlace">
                        <label>
                        <input type="file" accept="image/*" style={{display:"none"}} onChange={this.imageSelectHandler}/>
                        <img src={require('./addimage.png')} alt="Group Icon" className="groupicon" id="grpicon" style={{height:'200px', width:'200px'}}/>
                        </label>
                        <button onClick={this.imageUploadHandler}>Confirm</button>
                        </div>
                    </div>
               </div>
        )
    }
}*/}