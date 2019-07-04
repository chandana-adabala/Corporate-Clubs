import React from 'react';
import './ChangePersonalDetails.scss'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import {match,Router,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import IUser from '../../../../models/IUsers'
import {UpdateUserDetails,FetchProfileDetails} from '../../Actions'




interface Istate
{
diplayprofile?:string
}

class ChangePersonalDetails extends React.Component<any,any>{
    constructor(props) {
        super(props);
    this.state = {firstName:this.props.User.firstName,lastName:this.props.User.lastName,middleName:this.props.User.middleName,displayName:this.props.User.displayName,gender:this.props.User.gender,martialStatus:this.props.User.martialStatus,about:this.props.User.about,bloodGroup:this.props.User.bloodGroup,dOB:this.props.User.dob};
    var dOB:Date=new Date(this.props.User.dOB);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formatDate=this.formatDate.bind(this);
    debugger;
      }

 async handleSubmit(event)
  {
    debugger;
   const User:IUser={...this.props.User}
   console.log(User,"event")
   User.firstName=this.state.firstName;
   User.lastName=this.state.lastName;
   User.middleName=this.state.middleName;
   User.displayName=this.state.displayName;
   User.gender=this.state.gender;
   User.about=this.state.about;
   User.martialStatus=this.state.martialStatus;
   User.bloodGroup=this.state.bloodGroup;
   User.dOB=this.state.dOB;
   debugger;
   console.log(User)
   this.props.dispatch(UpdateUserDetails(User,"personaldetails"));
  
  }


 formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  handleChange(event)
  {
    if(event.target.name=="firstName")
    this.setState({firstName:event.target.value})
    if(event.target.name=="lastName")
    this.setState({lastName:event.target.value})
    if(event.target.name=="middleName")
    this.setState({middleName:event.target.value})
    if(event.target.name=="displayName")
    this.setState({displayName:event.target.value})
    if(event.target.name=="gender")
    this.setState({gender:event.target.value})
    if(event.target.name=="about")
    this.setState({about:event.target.value})
    if(event.target.name=="martialStatus")
    this.setState({martialStatus:event.target.value})
    if(event.target.name=="bloodGroup")
    this.setState({bloodGroup:event.target.value})
    if(event.target.name=="DateofBirth")
    this.setState({dOB:new Date(event.target.value)})
    debugger;
    console.log(this.state)
  }
    render()
    {debugger;
        return(
               <div id="ChangePersonalDetailsModal" >
               <div id="content">
               <div className="header">   
               <h4>Change Professional Details</h4>
               <Link to="/Profile">
               <Icon size={'2em'} icon={ic_close}/>
               </Link>
               </div>
               <div id="formbody" >
               
                    <label>First Name
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                        </label>
                        <label>Last Name
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                        </label>
                        <label>Middle Name
                        <input type="text" name="middleName" value={this.state.middleName} onChange={this.handleChange}/>
                        </label>
                        <label>Display Name
                        <input type="text" name="displayName" value={this.state.displayName} onChange={this.handleChange}/>
                        </label>
                        <label>Gender
                        <input list="gendertype" name="gender" value={this.state.gender} onChange={this.handleChange}/>
                        <datalist id="gendertype">
                            <option value="Male"/>
                            <option value="Female"/>
                            <option value="other"/>
                        </datalist>
                        </label>
                        <label>MartialStatus
                        <input list="martialstatus" name="martialStatus" value={this.state.martialStatus} onChange={this.handleChange}/>
                        <datalist id="martialstatus">
                            <option value="Married"/>
                            <option value="UnMarried"/>
                        </datalist>
                        </label>
                        <label>About
                        <input type="" name="about" value={this.state.about} onChange={this.handleChange}/>
                        </label>
                        
                        <label>Date of Birth
                        <input type="date" name="DateofBirth" value={this.formatDate(this.state.dOB)} onChange={this.handleChange}/>
                        </label>
                        <label>Blood Group
                        <input type="text" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleChange}/>
                        </label>
                        <div className="buttons">
                                <button className="addclub" onClick={this.handleSubmit}><Link to="/Profile">confirm</Link></button>
                                <button className="cancelbutton" ><Link to="/Profile">Cancel</Link></button>
                        </div>

           
               </div>

           
           </div>
       </div>
        )
    }
}

function mapStatetoProps(state) {
    debugger;
    console.log("cChangePersonalDetails");
    debugger;
    return {
        User: state.ProfilePageReducer.User
    }


}
export default connect(mapStatetoProps)(ChangePersonalDetails);