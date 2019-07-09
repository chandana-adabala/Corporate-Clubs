import React from 'react';
import './NewConnection.scss'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md/ic_close'
import { Link } from 'react-router-dom'
import { search } from 'react-icons-kit/fa/search';
import {upload} from 'react-icons-kit/icomoon/upload'
import {addNewConnection} from '../Actions/Actions'
import {connect} from 'react-redux'



export class NewConnection extends React.Component<any, any>
{
    constructor(props) {
        super(props)
        this.state=({search:'',selecteduserSuggestions:this.props.userSuggestions})
        this.onSearchChange=this.onSearchChange.bind(this);
    }

    componentWillReceiveProps()
    {
        
        this.setState({selecteduserSuggestions:this.props.userSuggestions})
        
    }


    onSearchChange(event)
    {
        debugger;
        let selecteduserSuggestions=this.props.userSuggestions.filter(userSuggestion=>userSuggestion.displayName.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({selecteduserSuggestions:selecteduserSuggestions,search:event.target.value})
    }
    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className='header'>
                        <span className="newConnectionHeading">New Connection</span>
                        <Link to="/connections">
                            <Icon icon={ic_close} size={30} />
                        </Link>
                    </div>
                    <div className="suggestionSearch">
                        <span><Icon icon={search} size={20} /></span>
                        <input type="text" placeholder="Search User" value={this.state.search} onChange={this.onSearchChange} />
                    </div>
                    <div className="suggestedHeading">
                        <text>Suggested</text>
                    </div>
                    <div className="suggestedUsersContent">
                        {this.state.selecteduserSuggestions.map(userSuggestion=>(<ConnectedSuggestedUser userID={userSuggestion.userID} profilePic={userSuggestion.profilePic} mutualClubs={userSuggestion.mutualClubs} mutualFriends={userSuggestion.mutualFriends} displayName={userSuggestion.displayName} />))}

                    </div>
                </div>

            </div>
        );
    }

}


class SuggestedUser extends React.Component<any, any>
{
    constructor(props) {
        super(props)
        this.newConnectionRequest=this.newConnectionRequest.bind(this);
    }

    newConnectionRequest()
    {
        debugger;
      this.props.dispatch(addNewConnection(this.props.userID));
    }
    

    render() {
        return (
            <div className="suggestedUser">
                <div className="profilePic">
                  <img className="profilePicture" src={this.props.profilePic}/>
                </div>
                 

                <div className="userDetails">
                    <text className="suggestedUserName">{this.props.displayName}</text>
                    <text className="mutualDetails">{this.props.mutualClubs} mutualClubs|{this.props.mutualFriends} mutualcontacts</text>
                </div>
                <div>
                <Icon icon={upload} style={{color:"#5d9ed3"}}  size={20} onClick={this.newConnectionRequest} />
                </div>
            </div>
        )
    }
}

const ConnectedSuggestedUser=connect()(SuggestedUser)