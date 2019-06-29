import React from 'react'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { search } from 'react-icons-kit/icomoon/search'
import './ClubInfo.scss';
import { Icon } from 'react-icons-kit';
import { ic_lock } from 'react-icons-kit/md/ic_lock'
import { edit } from 'react-icons-kit/ionicons/edit'
import { closeRound } from 'react-icons-kit/ionicons/closeRound'
import { user_add } from 'react-icons-kit/ikons/user_add'

import User from './ClubUsers/User'
import RequestedUser from './ClubUsers/RequestedUser'
import MyToggle from './Components/Toggle'
import MyRadio from './Components/Radio'
import MyCheckbox from './Components/CheckBox'
import IUsers from '../../../models/IUsers';
//import './MyCheckbox.scss';

export default class ClubInfo extends React.Component<any, {}>{
    constructor(props){
        super(props);

        
        this.state={
            searchTerm:'',
            currentMem:this.props.cUsers
        };
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event){
        let searchMem = this.props.cUsers;
        
        this.setState({
            searchTerm:event.target.value,
            currentMem:searchMem
        });
    }
    componentDidUpdate(){
        
       
    }
    render() {
        //debugger;
        let userArray=[];
        userArray=this.props.cUsers.map(cUser=>this.props.users.filter(user=>cUser.userID==user.userID)[0]);
       
        console.log('userArray',userArray);
        return (
            <div className="clubInfo">
                <div className="clubTitle">

                    <div className="appleIcon">
                        <img src={"https://www.google.com" + this.props.club.profilePic} alt="apple"></img>
                    </div>
                    <div className="clubDetails">

                        <div className="firstLine">
                            {this.props.club.clubTitle}
                            <div className="i">
                                <Icon size={28} icon={ic_lock} style={{ color: '#a4aab2' }} />
                            </div>
                            <div className="ii">
                                <Icon size={18} icon={edit} style={{ color: '#a4aab2', padding: '0rem 1rem 0rem 0rem' }} />
                                <Icon size={18} icon={closeRound} style={{ color: '#a4aab2', paddingRight: '1rem' }} />
                            </div>
                        </div>
                        <div className="secondLine">
                            {this.props.club.description}

                        </div>
                        <div className="thirdLine">
                            Created by {this.props.users.map(user=>{
                             if(user.userID==this.props.club.clubCreatedBy)
                                return user.displayName
                            })}  on {new Date(this.props.club.createdOn).toDateString()}
                            <div className="addParticipant">
                                {this.props.cUsers.length} Participants
                                                 <span className="menu"> <Icon size={24} icon={user_add} style={{ color: '#a4aab2', padding: '0rem 0rem 0rem 1rem ' }} />
                                    <span className="menu-content">
                                        <div style={{ color: '#e3e5e6' }} className="searchBar">
                                            <Icon size={14} icon={search} />
                                            <input className="searchBox" type="search" name="search" placeholder="Search Member" />

                                        </div>
                                        <p>Report Club</p>
                                        <p>Deactivate Club</p>
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="clubBody">
                    <div className="leftGrid">
                        <div className="pa">Participants</div>
                        <div className="participants">

                            <div style={{ color: '#e3e5e6' }} className="searchBar">
                                <Icon size={14} icon={search} />
                                <input className="searchBox" type="search" name="search" placeholder="Search Member" onChange={this.onInputChange}/>

                            </div>

                            { this.props.cUsers != "" ? (
                                    this.props.cUsers.map((cuser)=> {
                                        return  this.props.users.map((user) => {
                                           // console.log('role',cuser.role);
                                            
                                            if (cuser.userID == user.userID)
                                                return <User user={user} key={user.userID} cuser={cuser} />
                                        })
                                    }))
                                    : (<h4>no members</h4>)}
                        </div>
                    </div>
                    <div className="rightGrid">
                        <div className="re">Requests</div>
                        <div className="requests">
                        { this.props.rUsers != "" ? (
                                    this.props.rUsers.map((ruser)=> {
                                        debugger;
                                        return  this.props.users.map((user) => {
                                            debugger;
                                            if (ruser.userID == user.userID)
                                                return <RequestedUser user={user} key={user.userID} ruser={ruser}/>
                                        })
                                    }))
                                    : (<h4>no req members</h4>)}
                         
                        </div>
                        <div className="gs">Group Settings</div>
                        <div className="groupSettings">
                            <div className="clubType">
                                Make "iPhone users club" a public club
                                     <MyToggle />
                            </div>
                            <div className="subType">
                                <MyRadio />
                            </div>
                            <div className="mute">
                                <MyCheckbox /> Mute all the notifications and messages from this club
                                   </div>
                            <div className="clubActions">
                                <button>Deactivate Club</button>
                                <button>Exit Club</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}