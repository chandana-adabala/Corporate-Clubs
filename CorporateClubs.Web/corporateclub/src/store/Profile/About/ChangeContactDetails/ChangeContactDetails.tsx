import React from 'react';
import './ChangeContactDetails.scss'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import { match, Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import IUser from '../../../../models/IUsers'
import {DefaultUser} from '../../../../models/IUsers'
import {UpdateUserDetails,FetchProfileDetails} from '../../Actions'
interface Iprops {
    name?: string,
    status?: string,
    email?: string,
    phoneno?: string,
    about?: string,
    firstname?: string,
    lastname?: string,
    gender?: string,
    martialstatus?: string,
    middlename?: string,
    dipslauname?: string,
    dateofbirth?: string,
    bloodgroup?: string,
    address?: string,
    professionalSummary?: string


}

interface Istate {
    diplayprofile?: string
}

class ChangeContactDetails extends React.Component<any, any>{
    constructor(props) {
        super(props);
    this.state = {mobileNumber:this.props.User.mobileNumber,"email":this.props.User.email,"address":this.props.User.address};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    debugger;
      }
// componentDidUpdate()
// {
//     debugger;
//     this.state = {mobileNumber:this.props.User.mobileNumber,"email":this.props.User.email,"address":this.props.User.address};
// }


 async handleSubmit(event)
  {
   const User:IUser={...this.props.User}
   console.log(User,"event")
   User.mobileNumber=this.state.mobileNumber;
   User.email=this.state.email;
   User.address=this.state.address;
   debugger;
   console.log(User)
   await this.props.dispatch(UpdateUserDetails(User,"contactdetails"));
   await this.props.dispatch(FetchProfileDetails())
  }


  handleChange(event)
  {
    if(event.target.name=="mobileNumber")
    this.setState({mobileNumber:event.target.value})
    if(event.target.name=="email")
    this.setState({email:event.target.value})
    if(event.target.name=="address")
    this.setState({address:event.target.value})
    console.log(this.state)
  }

    render() {
        debugger;
        return (
            <div id="ChangeContactDetailsModal" >
                { <div id="content">
                    <div className="header">
                        <h4>Change Contact Details</h4>
                        <Link to="/Profile">
                            <Icon size={'2em'} icon={ic_close} />
                        </Link>
                    </div>
                    <div id="formbody">
                            <label>WorkPhone
                        <input type="text" name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChange}/>
                            </label>
                            <label>Email
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                            </label>
                            <label>Address
                        <input type="text" name="address" value={this.state.address}onChange={this.handleChange} />
                            </label>
                            <div className="buttons">
                                <button className="addclub" onClick={this.handleSubmit} value="submit"><Link to="/Profile">Change</Link></button>
                                <button className="cancelbutton" ><Link to="/Profile">Cancel</Link></button>
                            </div>



                    </div>


                </div> }
            </div>
        )
    }
}


function mapStatetoProps(state) {
    debugger;
    console.log("changecontactDetails");
    debugger;
    return {
        User: state.ProfilePageReducer.User,
        error:state.ProfilePageReducer.error,
        message:state.ProfilePageReducer.message,
    }


}
export default connect(mapStatetoProps)(ChangeContactDetails);