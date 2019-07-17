import * as React from "react";
import * as ReactDOM from "react-dom";
import './ProfilePage.scss';
import { mail } from 'react-icons-kit/entypo/mail'
import { Icon } from 'react-icons-kit'
import { quote } from 'react-icons-kit/entypo/quote'
import { ic_call } from 'react-icons-kit/md/ic_call'
import { pencil } from 'react-icons-kit/iconic/pencil'
import { eye } from 'react-icons-kit/fa/eye'
import { eyeSlash } from 'react-icons-kit/fa/eyeSlash'
import { BrowserRouter, Router, Link, match, Route, Switch } from 'react-router-dom'
import ChangeProfilePicture from './About/ChangeProfileDetails/ChangeProfilePicture'
import ChangePersonalDetails from './About/ChangePersonalDetails/ChangePersonalDetails'
import ChangeProfessionalDetails from './About/ChangeProfessionalDetails/ChangeProfessionalDetails'
import About from './About/About'
import ClubsTable from './ClubsTable/Clubs'
import FavouriteClubsTable from './FavouriteClubsTable/FavouriteClubsTable'
import { FetchProfileDetails } from './Actions'
import { PayloadType } from './Actions'
import { connect } from 'react-redux';
import { getToken } from '../../Configure'
import Avatar from 'react-avatar';
// import { Alert } from 'reactstrap';

interface Istate {
    diplayprofile?: string
}


class Profile_Head extends React.Component<any, any>{

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            error: "",
            activeButtons:{"About":true,"Clubs":false,"Favourites":false}

        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
        this.setState({ message: '', error: '' })
    }

    componentDidMount() {
         
        this.props.dispatch(FetchProfileDetails());

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: this.props.message, error: this.props.error })
        setTimeout(this.onDismiss, 4000);

        //for activating tabs in profile page navigator
        var url=nextProps.location.pathname;
        var selectedTab=url.split('/')[2];
        var activeButtons={"About":false,"Clubs":false,"Favourites":false}
        if(selectedTab=='')
        activeButtons.About=true;
        else
        activeButtons[selectedTab]=true;
        this.setState({activeButtons})
           
    }


    render() {
        return (
            <div className="ProfilePage">
                {/* <div className="alertWrapper">
                    <Alert color="success" className="alert" isOpen={this.state.message != '' ? true : false} toggle={this.onDismiss}>
                        {this.state.message}
                    </Alert>
                    <Alert color="danger" className="alert" isOpen={this.state.error != '' ? true : false} toggle={this.onDismiss}>
                        {this.state.error}
                    </Alert>
                </div> */}
                <div id="info">
                    <div id="profile" className="component">
                        <Link to="/Profile/ChangeProfilePicture">
        {(<Avatar size="5rem" name={this.props.displayName} style={{"margin":"auto","display":"block","margin-top":"20px"}} round={true}  src={this.props.profilePic}/>)}
                        </Link>
                    </div>
                    <div id="name" className="component" >
                        <h3>{this.props.displayName}</h3>
                        <h6>{this.props.about}</h6>
                    </div>
                    <div id="contact" className="component">
                        <div id="iconmail" style={{ color: '#a4aab2' }}>

                            <Icon size={18} icon={mail} />
                            <span>{this.props.email}</span>
                        </div>
                        <div id="iconcall" style={{ color: '#a4aab2' }}>

                            <Icon size={18} icon={ic_call} />
                            <span>{this.props.mobileNumber}</span>
                        </div>
                    </div>
                    <div id="status" className="component" >
                        <div id="iconquote" style={{ color: '#a4aab2' }}>

                            <Icon size={30} icon={quote} />
                            <span id="a">{this.props.about}</span>
                        </div>
                    </div>

                    <div id="menu">
                        <div className={this.state.activeButtons.About?"optionsActive":"options"}>
                        <Link to="/Profile/">About</Link>
                        </div>
                        <div className={this.state.activeButtons.Clubs?"optionsActive":"options"}>
                        <Link to="/Profile/Clubs">Clubs</Link>
                        </div> 
                         <div className={this.state.activeButtons.Favourites?"optionsActive":"options"}>
                        <Link to="/Profile/Favourites">Favourites</Link>
                        </div>
                    </div>
                </div>


                <Switch>

                    <Route path="/Profile/Clubs" component={ClubsTable} />
                    <Route path="/Profile/Favourites" component={FavouriteClubsTable} />
                    <Route path="/Profile/" component={About} />
                </Switch>
                <Route path="/Profile/ChangeProfilePicture" component={()=>{ return <ChangeProfilePicture profilePic={this.props.profilePic}/>}} />

            </div>

        );
        
    }

}

function mapStateToProps(State) {
     
    return {
        error: State.ProfilePageReducer.error,
        message: State.ProfilePageReducer.message,
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
export default connect(mapStateToProps)(Profile_Head)