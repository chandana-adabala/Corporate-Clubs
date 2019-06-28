import React from 'react';
import './ChangeProfilePicture.scss'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import {match,Router,Link} from 'react-router-dom'
import axios from 'axios';
interface Iprops
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
}