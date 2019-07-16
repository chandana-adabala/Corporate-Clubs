import React from 'react';
import './ChangeProfessionalDetails.scss'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import { match, Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import IUser from '../../../../models/IUsers'
import {DefaultUser} from '../../../../models/IUsers'
import {UpdateUserDetails} from '../../Actions'
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

class ChangeProfessionalDetails extends React.Component<any, any>{
    constructor(props) {
        super(props);
    this.state = {profSum:this.props.User.profSum};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
      }
// componentDidUpdate()
// {
//      
//     this.state = {mobileNumber:this.props.User.mobileNumber,"email":this.props.User.email,"address":this.props.User.address};
// }


 handleSubmit(event)
  {
   const User:IUser={...this.props.User}
   console.log(User,"event")
   User.profSum=this.state.profSum;
    
   console.log(User)
   this.props.dispatch(UpdateUserDetails(User,"professionaldetails"));;
  }


  handleChange(event)
  {
    this.setState({profSum:event.target.value})
    console.log(this.state)
  }

    render() {
         
        return (
            <div id="ChangeProfeesionalDetailsModal" >
                { <div id="content">
                    <div className="header">
                        <h4>Change ChangeProfessional Details</h4>
                        <Link to="/Profile">
                            <Icon size={'2em'} icon={ic_close} />
                        </Link>
                    </div>
                    <div id="formbody">
                       
                        
                            <label>professionalSummary </label>
                        <textarea name="address" value={this.state.profSum} rows={5} onChange={this.handleChange}/>
                           
                            <div className="buttons">
                                <button className="addclub" onClick={this.handleSubmit}><Link to="/Profile">Change</Link></button>
                                <button className="cancelbutton" ><Link to="/Profile">Cancel</Link></button>
                            </div>



                       
                    </div>


                </div> }
            </div>
        )
    }
}


function mapStatetoProps(state) {
     
    console.log("changecontactDetails");
     
    return {
        User: state.ProfilePageReducer.User
    }


}
export default connect(mapStatetoProps)(ChangeProfessionalDetails);