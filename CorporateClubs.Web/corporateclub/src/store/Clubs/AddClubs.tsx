import React from 'react';
import './AddClubs.scss';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Icon } from 'react-icons-kit'
import { ic_cancel } from 'react-icons-kit/md/ic_cancel'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { FetchUsers,FetchClubMembersList } from './Actions/ClubActions'
import '../RoundBox.scss'
import { addClub } from './Actions/ClubActions'
import INewClub from './../../models/INewClub'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios';

class AddClubs extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", selectedAdmins: {}, selectedUsers: {}, clubtype: "", displayUsers: this.props.users, displayAdmins: this.props.users, usersSelection: "", adminsSelection: "", isToggled: true, clubType: "-Open Club", error: "", image: "", editor: "" };
    this.onNameChange = this.onNameChange.bind(this);
    this.onToggleChange = this.onToggleChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.userSearchChange = this.userSearchChange.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this);
    this.adminSearchChange = this.adminSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.b64toBlob = this.b64toBlob.bind(this);
  }



  b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }



  onImageUpload(event) {
    debugger;
    console.log(URL.createObjectURL(event.target.files[0]));
    this.setState({ image: URL.createObjectURL(event.target.files[0]), imageFile: event.target.files[0] });
  }



  onNameChange(event) {
    debugger;
    this.setState({ name: event.target.value, error: "" });
  }



  onDescriptionChange(event) {
    debugger;
    this.setState({ description: event.target.value, error: "" });
  }



  onToggleChange(isToggled: boolean) {
    debugger;
    this.setState({ isToggled: isToggled, error: "" })
  }



  // componentWillMount() {
  //   this.props.dispatch(FetchUsers());
  // }



  onRadioChange(event) {
    this.setState({ clubType: event.key, error: "" });
    console.log(this.state);
  }



  addUser(event) {
    debugger;
    var selectedUsers = this.state.selectedUsers;
    var displayAdmins=this.state.displayAdmins.filter(user=>user.userID!=event.currentTarget.id)
    var displayUsers=this.state.displayUsers.filter(user=>user.userID!=event.currentTarget.id)
    var selectedUser=this.props.users.filter(user=>user.userID==event.currentTarget.id)
    selectedUsers[event.currentTarget.id] = [event.target.textContent,selectedUser[0].profilePic];
    this.setState({ selectedUsers: selectedUsers, usersSelection: "", displayUsers: displayUsers,displayAdmins:displayAdmins });
  }


  removeUser(event) {
    debugger;
    var selectedUsers = this.state.selectedUsers;
    delete selectedUsers[event.currentTarget.id];
    var removedUser=this.props.users.filter(user=>user.userID==event.currentTarget.id)
    this.setState({ selectedUsers: selectedUsers,displayUsers: [...this.state.displayUsers,removedUser[0]],displayAdmins:[...this.state.displayAdmins,removedUser[0]] });
  }



  userSearchChange(event) {
    var displayUsers = this.props.users;
    displayUsers = displayUsers.filter(user => user.displayName.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({ usersSelection: event.target.value, displayUsers: displayUsers })

  }



  removeAdmin(event) {
    debugger;
    var selectedAdmins = this.state.selectedAdmins;
    delete selectedAdmins[event.currentTarget.id];
    var removedUser=this.props.users.filter(user=>user.userID==event.currentTarget.id)
    this.setState({ selectedAdmins: selectedAdmins,displayUsers: [...this.state.displayUsers,removedUser[0]],displayAdmins:[...this.state.displayAdmins,removedUser[0]]});
  }



  adminSearchChange(event) {
    var displayAdmins = this.props.users;
    displayAdmins = displayAdmins.filter(admin => admin.displayName.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({ adminsSelection: event.target.value, displayAdmins: displayAdmins })

  }



  addAdmin(event) {
    debugger;
    var selectedAdmins = this.state.selectedAdmins;
    var selectedAdmin=this.props.users.filter(user=>user.userID==event.currentTarget.id)
    var displayAdmins=this.state.displayAdmins.filter(user=>user.userID!=event.currentTarget.id)
    var displayUsers=this.state.displayUsers.filter(user=>user.userID!=event.currentTarget.id)
    selectedAdmins[event.currentTarget.id] = [event.target.textContent,selectedAdmin[0].profilePic];
    this.setState({ selectedAdmins: selectedAdmins, adminsSelection: "",displayUsers: displayUsers,displayAdmins:displayAdmins});
  }


  async onSubmit(event) {
    debugger;
    if (this.state.name == '' || this.state.description == '') {
      this.setState({ error: "Fields marked * are mandatory" });
    }
    else {
      let newClubType = this.state.isToggled ? "Public" : "Private";
      newClubType += this.state.clubType
      let NewClub: INewClub =
      {
        clubType: newClubType,
        description: this.state.description,
        profilePic: "1",
        members: Object.keys(this.state.selectedUsers).map(key => parseInt(key, 10)),
        admins: Object.keys(this.state.selectedAdmins).map(key => parseInt(key, 10)),
        clubTitle: this.state.name
      }
      console.log("NewClub", NewClub);
      const formData = new FormData();
      var dataURL = this.state.editor.getImageScaledToCanvas().toDataURL();
      var imageBlob: Blob = this.b64toBlob(dataURL);
      formData.append('image', imageBlob);
      await this.props.dispatch(addClub(NewClub,formData));
      await this.props.dispatch(FetchClubMembersList())

    }
  }

  //imageUpload

  imageUploadHandler = () => {
    debugger;

    console.log("image upload");

    const fd = new FormData();
    var dataURL = this.state.editor.getImageScaledToCanvas().toDataURL();
    var imageBlob: Blob = this.b64toBlob(dataURL);
    fd.append('image', imageBlob);
    axios.post('http://localhost:3333/api/clubs/UploadImage/7',
      fd, { headers: { 'Content-Type': "multipart/form-data" } })
      .then(res => {
        console.log(res);
      })

  }



  setEditorRef = (editor) => this.setState({ editor: editor });





  render() {
    return (

      <div className="AddUser" >
        <header className="adduser_head">
          <text>Add New Club</text>
          <Link to={this.props.from}>
            <Icon icon={ic_close} size={30} />
          </Link>
        </header>
        <div id="content">

          <div id="one-third">
            {this.state.image == '' ? (<label style={{ display: "inline" }}>
              <img src={require("./addimage.png")} className="groupicon" id="grpicon" />
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={this.onImageUpload} />
            </label>)
              : (<div><AvatarEditor
                ref={this.setEditorRef}
                image={this.state.image}
                width={320}
                height={144}
                border={30}
                color={[255, 255, 255, 1]} // RGBA
                scale={1}
                rotate={0}
                borderRadius={0}
                style={{ display: "block" }}
              /></div>)}

          </div>
          <div>  </div>

          <div id="two-third">
            <span className="error">{this.state.error}</span>
            <p>Name*</p>
            <input type="text" placeholder="Enter name" className="Name" value={this.state.name} onChange={this.onNameChange} />
            <p>Description*</p>
            <textarea placeholder="Enter club description" rows={4} value={this.state.description} onChange={this.onDescriptionChange} /><br />
            <div>       <label className="clubToggle">Club Type</label>
              <Toggle
                defaultChecked={this.state.isToggled}
                onChanged={this.onToggleChange}
                onText='Public Club'
                offText='Private Club' />
            </div>
            <span>
              <div className="choiceGroup"><ChoiceGroup
                options={[
                  {
                    key: '-Open Club',
                    text: 'Opened Club',
                    checked: true,
                    disabled: !this.state.isToggled


                  },
                  {
                    key: '-Closed Club',
                    text: 'Closed Club',

                    disabled: !this.state.isToggled
                  }
                ]}
                onChanged={this.onRadioChange}
              /></div>
            </span>
            <text className="tblabel">Add Club Members</text><br />


            <div className="selectedUsers">
              {this.state.selectedUsers != undefined ? Object.keys(this.state.selectedUsers).map(user => <RoundBox id={user} close={this.removeUser} name={this.state.selectedUsers[user][0]} profilePic={this.state.selectedUsers[user][1]} />) : <span></span>}
              <input type="text" className="textline" value={this.state.usersSelection} onChange={this.userSearchChange} placeholder="search" />

              <span className="addUsersDropdown">
                <span className="dropdown">
                  <span className="dropdown-content">
                    {this.state.displayUsers.map(user => (<p id={user.userID}  onClick={this.addUser}>{user.displayName}</p>))}
                  </span>
                </span>
              </span>
            </div>


            <div className="selectedUsers">
              {this.state.selectedAdmins != undefined ? Object.keys(this.state.selectedAdmins).map(Admin => <RoundBox id={Admin} close={this.removeAdmin} name={this.state.selectedAdmins[Admin][0]} profilePic={this.state.selectedAdmins[Admin][1]}/>) : <span></span>}
              <input type="text" className="textline" value={this.state.adminsSelection} onChange={this.adminSearchChange} placeholder="search" />

              <span className="addUsersDropdown">
                <span className="dropdown">
                  <span className="dropdown-content">
                    {this.state.displayAdmins.map(admin => (<p id={admin.userID}  onClick={this.addAdmin}>{admin.displayName}</p>))}
                  </span>
                </span>
              </span>
            </div>


            <span className="buttons">
              <Link to={this.props.from}>
                <button className="cancelbutton"><text>Cancel</text></button>
              </Link>
              <Link to={this.props.from}> 
              <button className="addclub" onClick={this.onSubmit}><text>Add Club</text></button>
              </Link>
            </span>
          </div>


        </div>
      </div>
    );
  }
}

function mapStateToProps(State) {
  debugger;
  console.log(State)
  return {
    users: State.ClubReducer.users,

  }
}

class RoundBox extends React.Component<any, any>
{
  render() {
    return (
      <span className="roundBoxClub" >
        <img src={this.props.profilePic}/>
        <span>{this.props.name}</span>
          <span onClick={this.props.close} id={this.props.id}><Icon size={'1rem'} icon={ic_cancel} style={{color:"#a4aab2"}} /></span>
      </span>
    )
  }
}
export default connect(mapStateToProps)(AddClubs)