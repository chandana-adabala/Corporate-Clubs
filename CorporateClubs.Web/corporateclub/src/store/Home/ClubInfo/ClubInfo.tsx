import React from 'react'
import { search } from 'react-icons-kit/icomoon/search'
import './ClubInfo.scss';
import { Icon } from 'react-icons-kit';
import { ic_lock } from 'react-icons-kit/md/ic_lock'
import { edit } from 'react-icons-kit/ionicons/edit'
import { closeRound } from 'react-icons-kit/ionicons/closeRound'
import { user_add } from 'react-icons-kit/ikons/user_add'
import ExitClub from './ExitClub/ExitClub'
import User from './ClubUsers/User'
import RequestedUser from './ClubUsers/RequestedUser'
import MyRadio from './Components/Radio'
import IUsers from '../../../models/IUsers';
import { connect } from 'react-redux';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'; 
import { changeClubType, fetchMyClubInfo, muteNunmuteClub, addNewMembers, fetchNonClubMembers } from '../actions/homeActions';
import NonClubUser from './ClubUsers/NonClubUser';
import DeactivateClub from '../../Clubs/DeactivateClub/DeactivateClub'
import {Link,Route} from 'react-router-dom';
import UpdateClub from './UpdateClub/UpdateClub'

//import './MyCheckbox.scss';

class ClubInfo extends React.Component<any, any>{
    uA: IUsers[];
    non_user:IUsers[];
    searchMem: IUsers[];
    constructor(props) {
        
        super(props);
        this.uA = [];
        this.non_user=[];
        this.searchMem = [];
        this.state = {
            nonUsers:this.props.nUsers,
            searchTerm: '',
            userArrayFilter: this.props.cUsers.map(cUser => this.props.users.filter(user => cUser.userID == user.userID)[0]),
            hideClubSubTypes:(this.props.club.clubType=="Private Club")?(true):(false),
            newMemCount:0,
            newMemList:[],
            publicClubType:"",
            isChecked:false,
            currentUserRole:''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.getNewClub = this.getNewClub.bind(this);

    }
    onInputChange(event) {
        this.searchMem = this.uA.filter(user => user.displayName.toLowerCase().includes((event.target.value).toLowerCase()));
        this.setState({
            searchTerm: event.target.value,
            userArrayFilter: this.searchMem
        });
         //('on input change', event.target.value, this.state.userArrayFilter, this.uA, this.searchMem);

        //this.getSearchData(event);

    }
    getNewClub(event) {
         //('on blur called');

        this.setState({
            searchTerm: event.target.value,
            userArrayFilter: ""
        });
        event.target.value = "";
         //("onBlur", this.state.userArrayFilter);

    }

    handleToggle=(event: React.MouseEvent<HTMLElement>, checked: boolean|undefined)=>{
         //('handle toggle');
          
        if(checked==true){
            this.setState({
                hideClubSubTypes:false
            })
        
        }
        else{
            this.setState({
                hideClubSubTypes:true
            })
            this.props.dispatch(changeClubType("Private Club",this.props.club.clubID));
        }
    }
    handleRadio=(ev: React.FormEvent<HTMLInputElement>, option: any)=>{
        this.props.dispatch(changeClubType("Public-"+option.text,this.props.club.clubID))
    }
    handleMute=(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean|undefined)=>{
        this.props.dispatch(muteNunmuteClub(this.props.club.clubID))
    }
    searchNonUser=(ev)=>{
        let searchUser = this.props.nUsers.filter(user=>user.displayName.toLowerCase().includes((ev.target.value).toLowerCase()));
        this.setState({
         
            nonUsers:searchUser
        });
    }

    selectNewmembers=(checked,newUser)=>{
        if(checked)    
        this.setState({
                newMemCount:this.state.newMemCount+1,
                newMemList:[...this.state.newMemList,newUser.userID]
            });
        if(!checked){
             //("checked pop",this.state.newMemList.filter(user=>user!=newUser.userID));
            this.setState({
                newMemCount:this.state.newMemCount-1,
                //prevState.data.filter(el => el != id )
                newMemList:this.state.newMemList.filter(user=>user!=newUser.userID)
            });
        }
        
    }
    addMembers=()=>{
          
        this.props.dispatch(addNewMembers(this.props.club.clubID,this.state.newMemList,this.props.currentUser));
        this.props.dispatch(fetchMyClubInfo(this.props.club.clubID));
        this.setState({
            newMemCount:0,
            newMemList:[],
            
        })
       
    }

    componentWillUpdate() {
   
        
        this.uA = this.props.cUsers.map(cUser => this.props.users.filter(user => cUser.userID == user.userID)[0]);
      
    }
    componentWillReceiveProps(nextProps){
          
        this.setState({
            nonUsers:nextProps.nUsers,
            newMemCount:0,
            newMemList:[]
        });
         
        if(nextProps.club.clubID!=this.props.club.clubID)
         this.setState({newMemList:[],newMemCount:0})
        
        if(nextProps.club.clubType=="Private Club")
         this.setState({isChecked:false,hideClubSubTypes:true})
        else
        {
        var publicClubType=nextProps.club.clubType=="Public-Open Club"?'A':'B';  
        this.setState({isChecked:true,hideClubSubTypes:false,publicClubType:publicClubType})
        }
        if(this.state.currentUserRole==''&&nextProps.club!=undefined&&nextProps.cUsers!=undefined)
        {
              
            var user=nextProps.cUsers.filter(cUser=>cUser.clubID==nextProps.club.clubID&&cUser.userID==nextProps.LoggedUserID)
            if(user[0]!=undefined)
            {
            this.setState({currentUserRole:user[0].role})
            }
        }
        
    }
    
    render() {
    
 //("non user",this.state.nonUsers);
        return (
            <div className="clubInfo">
                <div className="clubTitle">

                    <div className="profilePic">
                        <img src={this.props.club.profilePic} alt="profilePic"></img>
                    </div>
                    <div className="clubDetails">

                        <div className="firstLine">
                            {this.props.club.clubTitle}
                            <div className="i">
                                {this.state.isChecked?<span/>:<Icon size={28} icon={ic_lock} style={{ color: '#a4aab2' }} />}
                            </div>
                            <div className="ii">
                                <Link to={"/editClub/"+this.props.club.clubID}><Icon size={18} icon={edit} style={{ color: '#a4aab2', padding: '0rem 1rem 0rem 0rem' }} /></Link>
                                <Icon size={18} icon={closeRound} style={{ color: '#a4aab2', paddingRight: '1rem' }} onClick={() => this.props.hide()} />
                            </div>
                        </div>
                        <div className="secondLine">
                            {this.props.club.description}

                        </div>
                        <div className="thirdLine">
                            Created by {this.props.users.map(user => {
                                if (user.userID == this.props.club.clubCreatedBy)
                                    return user.displayName
                            })}  on {new Date(this.props.club.createdOn).toDateString()}
                            <div className="addParticipant">
                                {this.props.cUsers.length} Participants
                                                
                                <nav>
                                    <Icon size={24} icon={user_add} style={{ color: '#a4aab2', padding: '0rem 0rem 0rem 1rem ' }} />
                                    <div className="nonUserDropDown">
                                        <ul>
                                        
                                            <div style={{ color: '#e3e5e6' }} className="searchBar">
                                                <div>Select the users you wants to add</div>
                                            
                                                <input className="searchBox" type="search" name="search" placeholder="Start typing user name" onChange={this.searchNonUser}/>

                                            </div>
                                            {/* {this.props.nUsers!=""?(this.props.nUsers.map(user=><li><NonClubUser user={user} select={this.selectNewmembers}/></li>)):(<span>no members to add</span>)} */}
                                            {this.state.nonUsers.map((user,index)=><li><NonClubUser user={user} key={index} select={this.selectNewmembers}/></li>)}        
                                        </ul>
                                            <div className="fixed">
                                                {this.state.newMemCount} Members selected
                                                    <button className="primaryBtn" onClick={this.addMembers}>Add Members</button>
                                            </div>     
                                    </div>  
                                    
                                </nav>
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
                                <input className="searchBox" type="search" name="search" placeholder="Search Member" onChange={this.onInputChange} onBlur={this.getNewClub} />

                            </div>
                            {this.props.cUsers != "" ? (
                                this.props.cUsers.map((cuser) => {
                                    return this.state.userArrayFilter != "" ? (this.state.userArrayFilter.map((user) => {
                                         //("user filter", user);

                                        if (cuser.userID == user.userID)
                                            return <User user={user} key={user.userID} cuser={cuser} clubID={this.props.club.clubID}  />
                                    }
                                    )) : (
                                            this.props.users.map((user) => {
                                                //  //('role',cuser.role);

                                                if (cuser.userID == user.userID)
                                                    return <User user={user} key={user.userID} cuser={cuser} clubID={this.props.club.clubID} />
                                            })
                                        )
                                }))
                                : (<h4>no members</h4>)}




                        </div>
                    </div>
                    <div className="rightGrid">
                        <div className="re">Requests</div>
                        <div className="requests">
                            {this.props.rUsers != "" ? (
                                this.props.rUsers.map((ruser) => {
                               
                                    return this.props.users.map((user) => {
                                      
                                        if (ruser.userID == user.userID)
                                            return <RequestedUser user={user} key={user.userID} ruser={ruser} />
                                    })
                                }))
                                : (<h4>No Requests</h4>)}

                        </div>
                        <div className="gs">Group Settings</div>
                        <div className="groupSettings">
                            <div className="clubType">
                                Make {this.props.club.clubTitle} {this.state.isChecked? "a private club":" a public club"}
                               
                                     {/* <MyToggle onChange={this.props.dispatch.changeClubType}/> */}
                                     <Toggle onChange={this.handleToggle} checked={!this.state.hideClubSubTypes}/>
                            </div>
                            <div className="subType">
                                <MyRadio hide={this.state.hideClubSubTypes} onChange={this.handleRadio} publicClubType={this.state.publicClubType}/>
                            </div>
                            <div className="mute">
                                <Checkbox onChange={this.handleMute}/> Mute all the notifications and messages from this club
                                   </div>
                            <div className="clubActions">
                                <Link to={"/deactivateclub"+this.props.club.clubTitle}><button>Deactivate Club</button></Link>
                                <Link to={"/exitclub"+this.props.club.clubTitle}><button>Exit Club</button></Link>
                            </div>

                        </div>
                    </div>
                </div>
                <Route path={"/deactivateclub"+this.props.club.clubTitle} component={()=><DeactivateClub to="/" clubTitle={this.props.club.clubTitle} clubID={this.props.club.clubID}/>}/>
                <Route path={"/exitclub"+this.props.club.clubTitle} component={()=><ExitClub to="/" clubTitle={this.props.club.clubTitle} clubID={this.props.club.clubID}/>}/>
                <Route path={"/editClub/"+this.props.club.clubID} component={()=><UpdateClub to="/" clubTitle={this.props.club.clubTitle} clubID={this.props.club.clubID} description={this.props.club.description} profilePic={this.props.club.profilePic}/>}/>
            </div>
        );
    }
}

function mapStatetoProps(state)
{
    return{
        LoggedUserID:state.AppReducer.LoggedUser.userID
    }
}
export default connect(mapStatetoProps)(ClubInfo);