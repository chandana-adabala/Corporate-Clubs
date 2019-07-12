import * as React from "react";
import * as ReactDOM from "react-dom";
import './About.scss';
import { mail } from 'react-icons-kit/entypo/mail'
import { Icon } from 'react-icons-kit'
import { quote } from 'react-icons-kit/entypo/quote'
import { ic_call } from 'react-icons-kit/md/ic_call'
import { pencil } from 'react-icons-kit/iconic/pencil'
import { eye } from 'react-icons-kit/fa/eye'
import { eyeSlash } from 'react-icons-kit/fa/eyeSlash'
import { BrowserRouter, Router, Link, match, Route } from 'react-router-dom'
import  ChangeProfilePicture  from './ChangeProfileDetails/ChangeProfilePicture'
import ChangeContactDetails from './ChangeContactDetails/ChangeContactDetails'
import ChangePersonalDetails  from './ChangePersonalDetails/ChangePersonalDetails'
import  ChangeProfessionalDetails  from './ChangeProfessionalDetails/ChangeProfessionalDetails'
import { connect } from 'react-redux';

interface IProps {
    userID: number,
    displayName: string,
    firstName: string,
    middleName: string,
    lastName: string,
    mobileNumber: string,
    email: string,
    role: string,
    address: string,
    gender: string,
    martialStatus: string,
    bloodGroup: string,
    dOB: Date,
    loginCreated: Date,
    lastSeen: Date,
    about: string,
    profSum: string,
    profilePic: string,
    isActive: boolean,
    isContactHide: boolean,
    isProfSumHide: boolean,
    rowCreatedOn: Date,
    rowCreatedBy: number,
    rowDeletedBy: number

}


interface Istate {
    diplayprofile?: string
}

class About extends React.Component<any, Istate>{
    defaultProps = {
        name: "ramgirish",
    }
    render() {
        return (

            <div className="ProfilePage">
                <div id="details">
                    <div id="personaldetails">
                        <div id="half" style={{ width: "40%" }}>
                            <h3>Personal Details</h3>
                            <h5>First Name</h5>
                            <h4>{this.props.firstName}</h4>
                            <h5>Last Name</h5>
                            <h4>{this.props.lastName}</h4>
                            <h5>Gender</h5>
                            <h4>{this.props.gender}</h4>
                            <h5>Maritial status</h5>
                            <h4>{this.props.martialStatus}</h4>
                            <h5>About</h5>
                            <h4>{this.props.about}</h4>

                        </div>

                        <div id="half" style={{ width: "49.99%" }}>
                            <Link to="/Profile/ChangePersonalDetails">
                                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                                    <Icon size={20} icon={pencil} />
                                </span>
                            </Link>
                            <h5 style={{ marginTop: "68px", clear: "both" }}>Middle Name</h5>
                            <h4>{this.props.middleName}</h4>
                            <h5>Display Name</h5>
                            <h4>{this.props.displayName}</h4>
                            <h5>Date of Birth</h5>
                            <h4>{new Date(this.props.dOB).toDateString()}</h4>
                            <h5>Blood Group</h5>
                            <h4>{this.props.bloodGroup}</h4>
                        </div>
                    </div>


                    <div id="contact_prof">
                        <div id="contactdetails">

                            <Link to="/Profile/ChangeContactDetails">
                                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                                    <Icon size={20} icon={pencil} />
                                </span>
                            </Link>
                            <span id="iconeye" style={{ color: '#a4aab2' }}>
                                <Icon size={20} icon={eye} />
                            </span>



                            <h3>Contact Details</h3>
                            <div>
                                <div style={{ width: "30%", float: "left" }}>
                                    <h5>Work Phone</h5>
                                    <h4>{this.props.mobileNumber}</h4>
                                </div>

                                <div style={{ width: "30%", float: "left" }}>
                                    <h5>EMAIL</h5>
                                    <h4>{this.props.email}</h4>
                                </div>
                            </div>


                            <div style={{ clear: "both", width: "40%" }}>
                                <h5>Address</h5>
                                <h4>{this.props.address}</h4>
                            </div>


                            <span>

                            </span>
                            <span>
                            </span>
                        </div>
                        <div id="professionalsummary">
                            <Link to="/Profile/ChangeProfessionalDetails">
                                <span id="iconpencil" style={{ color: '#a4aab2' }}>
                                    <Icon size={20} icon={pencil} />
                                </span>
                            </Link>
                            <span id="iconeye" style={{ color: '#a4aab2' }}>
                                <Icon size={20} icon={eye} />
                            </span>

                            <h3>Professional Summary</h3>
                            <h5>{this.props.profSum}</h5>
                        </div>
                    </div>
                </div>
                <Route path="/Profile/ChangeProfilePicture" component={ChangeProfilePicture} />
                <Route path="/Profile/ChangeContactDetails" component={ChangeContactDetails} />
                <Route path="/Profile/ChangePersonalDetails" component={ChangePersonalDetails} />
                <Route path="/Profile/ChangeProfessionalDetails" component={ChangeProfessionalDetails} />
             
            </div>

        );
    }

}

function mapStateToProps(State) {
    return {
        displayName: State.ProfilePageReducer.User.displayName,
        userID: State.ProfilePageReducer.User.userID,
        firstName: State.ProfilePageReducer.User.firstName,
        middleName: State.ProfilePageReducer.User.middleName,
        lastName: State.ProfilePageReducer.User.lastName,
        mobileNumber: State.ProfilePageReducer.User.mobileNumber,
        email: State.ProfilePageReducer.User.email,
        role: State.ProfilePageReducer.User.role,
        address: State.ProfilePageReducer.User.address,
        gender: State.ProfilePageReducer.User.gender,
        martialStatus: State.ProfilePageReducer.User.martialStatus,
        bloodGroup: State.ProfilePageReducer.User.bloodGroup,
        dOB: new Date(),
        loginCreated: new Date(),
        lastSeen: new Date(),
        about: State.ProfilePageReducer.User.about,
        profSum: State.ProfilePageReducer.User.profSum,
        profilePic: State.ProfilePageReducer.User.profilePic,
        isActive: false,
        isContactHide: false,
        isProfSumHide: false,
        rowCreatedOn: new Date(),
        rowCreatedBy: 0,
        rowDeletedBy: 0
    }
}
export default connect(mapStateToProps)(About)