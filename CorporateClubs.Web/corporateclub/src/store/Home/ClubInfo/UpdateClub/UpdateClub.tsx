import React from 'react';
import './UpdateClub.scss';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Icon } from 'react-icons-kit'
import { ic_cancel } from 'react-icons-kit/md/ic_cancel'
import {ic_close} from 'react-icons-kit/md/ic_close'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import INewClub from '../../../../models/INewClub'
import AvatarEditor from 'react-avatar-editor'
import {editClub} from '../../actions/clubAction'
class UpdateClub extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = { name: this.props.clubTitle, description: this.props.description, error: "", image: "", editor: "",clubID:this.props.clubID };
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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



  async onSubmit(event) {
    debugger;
    if (this.state.name == '' || this.state.description == '') {
      this.setState({ error: "Fields marked * are mandatory" });
    }
    else {

      let editedClub: INewClub =
      {
        description: this.state.description,
        clubTitle: this.state.name,
        clubID:this.props.clubID,
        profilePic:null
      }
      const formData = new FormData();
      if(this.state.editor!='')
      {
      var dataURL = this.state.editor.getImageScaledToCanvas().toDataURL();
      var imageBlob: Blob = this.b64toBlob(dataURL);
      formData.append('image', imageBlob);
      await this.props.dispatch(editClub(editedClub,formData));
      }
      else
      await this.props.dispatch(editClub(editedClub,null))

    }
  }



  setEditorRef = (editor) => this.setState({ editor: editor });





  render() {
    return (
   
      <div className="updateUser" >
        <header className="adduser_head">
          <text>Edit Club Details</text>
          <Link to={this.props.to}>
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
            <div>
             
            </div>
            <span>
            </span>
            

            <span className="buttons">
              <Link to={this.props.to}>
                <button className="cancelbutton"><text>Cancel</text></button>
              </Link>
              <Link to={this.props.to}> 
              <button className="addclub" onClick={this.onSubmit}><text>Edit Club</text></button>
              </Link>
            </span>
          </div>


        </div>
      </div>
    );
  }
}




export default connect()(UpdateClub)