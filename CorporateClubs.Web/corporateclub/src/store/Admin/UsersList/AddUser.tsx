import React from 'react';
import './AddUser.scss';
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { ic_cancel } from 'react-icons-kit/md/ic_cancel'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ReactComponent } from '*.svg';
import { connect } from 'react-redux';
import IUsers from '../../../models/IUsers'
import { addUser } from '../Actions/Actions'
import { caretDown } from 'react-icons-kit/fa/caretDown'
import { fetchAllClubs } from '../Actions/Actions'
import {library} from 'react-icons-kit/icomoon/library'
import '../RoundBox.scss'
class AddUser extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { firstName: "", middleName: "", lastName: "", displayName: "", mobileNumber: "+91", email: "", error: "  ", invite: true, displayClubs: this.props.allClubs, isError: false,display:false,selectedClubs:{},clubSelection:""};
        this.firstNameHandle = this.firstNameHandle.bind(this);
        this.middleNameHandle = this.middleNameHandle.bind(this);
        this.lastNameHandle = this.lastNameHandle.bind(this);
        this.mobileNumberHandle = this.mobileNumberHandle.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.displayNameHandle = this.displayNameHandle.bind(this);
        this.ValidateEmail = this.ValidateEmail.bind(this);
        this.removeClub=this.removeClub.bind(this);
        this.addClub=this.addClub.bind(this);
        this.changeDisplayClubs=this.changeDisplayClubs.bind(this);
        

    }

   
    componentWillMount() {
        this.props.dispatch(fetchAllClubs(2));
    }
    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

   

    firstNameHandle(event) {

        this.setState({ firstName: event.target.value, error: " " })
    }
    middleNameHandle(event) {
        this.setState({ middleName: event.target.value, error: " " })
    }
    lastNameHandle(event) {
        this.setState({ lastName: event.target.value, error: " " })
    }
    mobileNumberHandle(event) {
        if (event.target.value.length <= 13)
            this.setState({ mobileNumber: event.target.value, error: " " })

    }
    emailHandle(event) {
        this.setState({ email: event.target.value, error: " " });
        if (!this.ValidateEmail(event.target.value)) {
            this.setState({ error: "enter a valid email address", isError: true });

        }
        this.setState({ isError: false })
    }

    displayNameHandle(event) {
        
        this.setState({ displayName: event.target.value, error: " " })
    }


    
    addClub(event)

    {
          
        var selectedClubs=this.state.selectedClubs;
        selectedClubs[event.currentTarget.id]=event.target.textContent;
        this.setState({selectedClubs:selectedClubs,clubSelection:"",displayClubs:this.props.allClubs});
    }
    removeClub(event)
    {
         
        var selectedClubs=this.state.selectedClubs;
        delete selectedClubs[event.currentTarget.id];
        this.setState({selectedClubs:selectedClubs});
    }
    handleButton(event) {
        ;
        var newUser: IUsers =
        {

            displayName: this.state.displayName,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber
        }
        if (this.state.displayNameHandle == '' || this.state.firstName == '' || this.state.lastName == '' || this.state.middleName == '' || this.state.email == '' || this.state.mobileNumber == ' ')
            this.setState({ error: "....All Fields are mandatory" });
        else
            this.props.dispatch(addUser(newUser,Object.keys(this.state.selectedClubs),true));
 }

changeDisplayClubs(event)
{
     
var displayClubs=this.props.allClubs;
displayClubs=displayClubs.filter(club=>club.clubTitle.toLowerCase().includes(event.target.value.toLowerCase()))
this.setState({clubSelection:event.target.value,displayClubs:displayClubs})

}

    render() {
        return (

            <div className="AddUser" >
                <header className="adduser_head">
                    <text>Add New User</text>
                    <Link to="/Admin">
                        <Icon icon={ic_close} size={30} />
                    </Link>
                </header>
                <div id="content">
                    <div className="error">{this.state.error}</div>
                    <div id="first-half">

                        <text>First Name</text><br />
                        <input type="text" value={this.state.firstName} onChange={this.firstNameHandle} /><br />
                        <text>Last Name</text><br />
                        <input type="text" value={this.state.lastName} onChange={this.lastNameHandle} /><br />
                        <text>Phone</text><br />
                        <input type="number" value={this.state.mobileNumber} onChange={this.mobileNumberHandle} />
                    </div>
                    <div>  </div>

                    <div id="second-half">
                        <text>Middle Name</text><br />
                        <input type="text" value={this.state.middleName} onChange={this.middleNameHandle} /><br />
                        <text>Display Name</text><br />
                        <input type="text" value={this.state.displayName} onChange={this.displayNameHandle} /><br />
                        <text>Email</text><br />
                        <input type="text" value={this.state.email} onChange={this.emailHandle} />

                    </div>
                    <div className="bottom">

                        <label className="container">Invite user to access corporate clubs
                             <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <div>
                            <text>Make this user the member of following clubs</text><br />
                            <div className="selectedClubs">
                            {this.state.selectedClubs!=undefined?Object.keys(this.state.selectedClubs).map(club=><RoundBox id={club} close={this.removeClub} name={this.state.selectedClubs[club]}/>):<span></span>}
                            <input type="text" className="clubsInputField" value={this.state.clubSelection} onChange={this.changeDisplayClubs}/>
                            
                            <span className="addClubsDropdown">
                                <span className="dropdown">
                               <span className="dropdown-content">
                                        {this.state.displayClubs.map(club => (<p id={club.clubID} onClick={this.addClub}>{club.clubTitle}</p>))}
                                    </span>
                                </span>
                            </span>
                            </div>

                        </div >
                        <span className="buttons">
                            <Link to="/Admin">
                                <button className="cancelbutton"><text>Cancel</text></button>
                            </Link>
                            <button onClick={this.handleButton} className="addclub"><text>Add User</text></button>
                        </span>

                    </div>


                </div>
            </div>
        );
    }
}

class RoundBox extends React.Component<any, any>
{
  render() {
    return (
      <span className="roundBox" >
          <span className="clubIcon">
          <Icon icon={library} size={20} style={{color:'#ffffff'}}/>
          </span>
        <span>{this.props.name}</span>
        <span onClick={this.props.close} id={this.props.id}><Icon size={'1rem'} icon={ic_cancel} style={{color:"#a4aab2"}}/></span>
      </span>
    )
  }
}

function mapStateToProps(State) {
    ;
    return {
        allClubs: State.AdminPageReducer.allClubs,
    }
}
export default connect(mapStateToProps)(AddUser)