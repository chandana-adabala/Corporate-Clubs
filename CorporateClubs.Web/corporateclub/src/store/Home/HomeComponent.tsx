import React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {search} from 'react-icons-kit/icomoon/search'
import './Home.scss';
import ClubInfo from './ClubInfo/ClubInfo';
import { Icon } from 'react-icons-kit';
import Club from './ClubInfo/MyClubs/Club';
import {connect} from 'react-redux';
import Istate from './reducers/homeReducer';
import { fetchFavClubs, fetchMyClubs } from './actions/clubAction';
import IClubs from '../../models/IClubs';
import HomeNav from './HomeBar/HomeNav';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Conversation from './ClubInfo/Conversation/Conversation'
import * as signalR from "@aspnet/signalr";

initializeIcons();



class Home extends React.Component<any,any> {
    constructor(props){
        super(props);
        const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:3333/conversationhub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
        .configureLogging(signalR.LogLevel.Trace)
        .build();
        this.state={
            searchTerm:'',
            currentClubs:this.props.myclubs,
            isClubHide:this.props.isClubHide,
            isChatHide:true,
            connection:connection
        };
     this.onInputChange = this.onInputChange.bind(this);

    }
    onInputChange(event){
        
        
        let searchClub = (this.props.myclubs).filter(club=>club.clubTitle.toLowerCase().includes((event.target.value).toLowerCase()));
        this.setState({
            searchTerm:event.target.value,
            currentClubs:searchClub
        });
    }
    componentDidMount(){
        this.props.dispatch(fetchFavClubs(this.props.LoggedUser.userId));
        this.props.dispatch(fetchMyClubs(this.props.LoggedUser.userId));
       

    this.state.connection
      .start({ withCredentials: false })
      .catch(err => console.error(err.toString()));
    }
    showChat=()=>{
        debugger;
        this.setState({
            isClubHide:true,
            isChatHide:false
    });
    }

    hideClubInfo=()=>{
            this.setState({
                    isClubHide:true,
                    isChatHide:false
            });
    }
    showClubInfo=()=>{
        this.setState({
            isClubHide:false,
            isChatHide:true
        });
    }

    render(){
      debugger;
        
        return(
            <div className="homeContainer">
                <HomeNav/>
               
                    <div className="homeBar">
                        My Clubs
                        <button className="createBtn">Create New</button>
                    </div>
                    <div className="homeBody">

                    
                    <div className="homeClubs">
                   
                                <div style={{ color: '#e3e5e6' }} className="searchBar">
                                    <Icon size={14} icon={search}/>
                                    <input className="searchBox" type="search" name="search" placeholder="Search Club" onChange={this.onInputChange}/>
                                </div>
                                <div className="favTitle">
                                    FAVORITES
                                </div>
                                <div className="favClubs">
                             
                                {(this.props.favclubs!="") ?(
                                    this.props.favclubs.map(club=>(
                                        <Club club={club} key={club.clubID} openChat={this.showChat}/>
                                            ))):(<h4>no fav clubs</h4>)}
                                
                                   
                                </div>
                                <div className="favTitle">
                                    CLUBS
                                </div>
                                <div className="clubs">
                                    {this.state.currentClubs!=""?(
                                    this.state.currentClubs.map(club=>(
                                        <Club club={club} key={club.clubID} openChat={this.showChat}/>
                                            ))):(this.props.myclubs!=""?(
                                                this.props.myclubs.map(club=>(
                                                    <Club club={club} key={club.clubID} openChat={this.showChat}/>
                                                        ))):(<h4>no clubs</h4>))} 
                                </div>
                    </div>
                    <div className="homeArena">
                        {this.state.isChatHide==false?(<Conversation connection={this.state.connection} club={this.props.club} messages={this.props.messages} show={this.showClubInfo} loggedUser={this.props.LoggedUser}/>)
                                                    :(
                                                    this.state.isClubHide==false?
                                                    (<ClubInfo club={this.props.club} cUsers={this.props.cUsers} rUsers={this.props.rUsers} nUsers={this.props.nUsers} users={this.props.users} hide={this.hideClubInfo}/>)
                                                    :(<span>choose a club</span>))
                           }
                  
                    
                    </div>
                </div> 

                    </div>
    
        );
   
    }
}




function mapStateToProps(state){
 debugger;
     return{
         myclubs
            : state.homeReducer.myclubs,
        favclubs
            : state.homeReducer.favclubs,
        club
            : state.homeReducer.club,
        cUsers
            : state.homeReducer.cUsers,
        rUsers
            : state.homeReducer.rUsers,
        nUsers
            : state.homeReducer.nUsers,
        users
            : state.homeReducer.users,
        isClubHide
            : state.homeReducer.hide,
        LoggedUser
            :state.AppReducer.LoggedUser,
        messages
            :state.homeReducer.messages
     }
     

   }
   

   export default connect(mapStateToProps)(Home);