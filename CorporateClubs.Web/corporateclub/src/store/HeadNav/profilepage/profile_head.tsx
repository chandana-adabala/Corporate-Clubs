import * as React from "react";
import * as ReactDOM from "react-dom";
import './profile_head.scss';
import {mail} from 'react-icons-kit/entypo/mail'
import { Icon } from 'react-icons-kit'
import {quote} from 'react-icons-kit/entypo/quote'
import {ic_call} from 'react-icons-kit/md/ic_call'
import {pencil} from 'react-icons-kit/iconic/pencil'
import {eye} from 'react-icons-kit/fa/eye'
import {eyeSlash} from 'react-icons-kit/fa/eyeSlash'
const Profile_Head:React.FC=()=>{
return (
<div>
    <div id="info">
        <div  id="profile" className="component">
           <img id="image" src={require('../damon.png')}/>
         </div>   
         <div id="name"  className="component" >
             <h3>Ayesha Patel</h3>
             <h6>Nothing can stop you.Be You</h6>
         </div> 
         <div  id="contact" className="component">
         <div id="iconmail" style={{ color: '#a4aab2' }}>
        
            <Icon size={18} icon={mail}/>
            <span>rajesh.ram@xyz.com</span>
        </div>
        <div id="iconcall" style={{ color: '#a4aab2' }}>
        
        <Icon size={18} icon={ic_call}/>
        <span>9059399747</span>
    </div>
         </div> 
         <div id="status" className="component" >
         <div id="iconquote" style={{ color: '#a4aab2' }}>
        <Icon size={30} icon={quote}/>
        <span id="a">The term originally referred to messages sent using the Short Message Service (SMS). It has grown beyond alphanumeric text to include multimedia messages (known as MMS) containing digital images, videos, and sound content, as well as ideograms known as emoji (happy faces, sad faces, and other icons).</span>
        </div>
         </div> 
    
    <div id="menu">
        <a href="#">About</a>
        <a href="#">Club</a>
        <a href="#">Favourite</a>
        </div>
    </div>


        <div id="details">
            <div id="personaldetails">
            <div id="half" style={{width:"40%"}}>
                <h3>Personal Details</h3>
                <h5>First Name</h5>
                <h4>Ayesha</h4>
                <h5>Last Name</h5>
                <h4>Patel</h4>
                <h5>Gender</h5>
                <h4>Female</h4>
                <h5>Maritial status</h5>
                <h4>single</h4>
                <h5>About</h5>
                <h4>Nothing can stop you.Be You</h4>
                
                </div>

                <div id="half" style={{width:"49.99%"}}>
                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                 <Icon size={20} icon={pencil}/>
                </span>
                <h5 style={{marginTop:"68px",clear:"both"}}>Midlle Name</h5>
                <h4>Teja</h4>
                <h5>Display Name</h5>
                <h4>Ayesha Patel</h4>
                <h5>Date of Birth</h5>
                <h4>07/11/1997</h4>
                <h5>Blood Group</h5>
                <h4>A Positive</h4>
                </div>
                </div>


                <div id="contact_prof">
                <div id="contactdetails">


                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                 <Icon size={20} icon={pencil}/>
                </span>
                <span id="iconeye" style={{ color: '#a4aab2' }}>
                 <Icon size={20} icon={eye}/>
                </span>



                <h3>Contact Details</h3>
                   <div>
                   <div style={{width:"30%",float:"left"}}>
                   <h5>Work Phone</h5>
                   <h4>9654300990</h4>
                    </div>

                    <div style={{width:"30%",float:"left"}}>
                    <h5>EMAIL</h5>
                   <h4>rajesh.ram@xyz.com</h4>
                    </div>
                    </div>


                    <div style={{clear:"both",width:"40%"}}>
                    <h5>Address</h5>
                   <h4>Plot No 104, Madhapur Rd, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033</h4>
                    </div>

                
                <span>

                    </span>
                <span>
                    </span>     
                </div>
                <div id="professionalsummary">
                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                 <Icon size={20} icon={pencil}/>
                </span>
                <span id="iconeye" style={{ color: '#a4aab2' }}>
                 <Icon size={20} icon={eye}/>
                </span>

                <h3>Professional Summary</h3>
                <h5>Plot No 104, Madhapur Rd, Kavuri Hills, Jubilee Hills, Hyderabad, Telangana 500033</h5>
                </div>
                </div>
            </div>
</div>

);

}

export default Profile_Head;