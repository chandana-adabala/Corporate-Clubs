import React from 'react';
import '../Home/popups/AddClubs.scss';
import Toggle from '../Home/ClubInfo/Components/Toggle'
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
const AddClubs: React.FC = () => {
    return(
        
        <div className="AddUser" >
            <header className="adduser_head">
        <text>Add New Club</text>
        <Link to="/Clubs">
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
        
        <div id="one-third">
            <label>
                <input type="file" accept="image/*" style={{display:"none"}}/>
        <img src={require('./addimage.png')} alt="Group Icon" className="groupicon" id="grpicon" />
        </label>
        </div>
        <div>  </div> 

        <div id="two-third">
            <p>Name*</p>
            <input type="text" placeholder="Enter name"  className="Name"/>
            <p>Description</p>
            <textarea placeholder="Enter club description" rows={4} /><br/>
            <div><label>This club is a public club</label><Toggle/></div>
            <span>
                <label><input type="radio" className="clubtype" value="open" name="clubtype"/>Open club</label>
                <label><input type="radio" className="clubtype" value="open" name="clubtype"/>Closed club</label>
            </span>
            <text className="tblabel">Add Clubs Admins(Optional)</text><br/>
            <input type="text" className="textline" placeholder="search"/><br/>
            <text className="tblabel">Add Club Members</text><br/>
            <input type="text" className="textline" placeholder="search"/><br/>
            <span className="buttons">
            <Link to="/Clubs">
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
                <button className="addclub"><text>Add Club</text></button>
            </span>
        </div>

    
    </div>
</div>
    );
}
export default AddClubs;