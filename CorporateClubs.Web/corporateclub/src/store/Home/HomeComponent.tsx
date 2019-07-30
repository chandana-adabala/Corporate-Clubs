import React from 'react';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {search} from 'react-icons-kit/icomoon/search'
import './Home.scss';
import ClubInfo from './ClubInfo/ClubInfo';
import { Icon } from 'react-icons-kit';
import Club from './ClubInfo/MyClubs/Club';
import {connect} from 'react-redux';
import { fetchFavClubs, fetchMyClubs, fetchMyClubInfo, fetchMessagesOfClub} from './actions/homeActions';
import HomeNav from './HomeBar/HomeNav';
import Conversation from './ClubInfo/Conversation/Conversation'
import { Link, Route } from 'react-router-dom';
import AddClubs from '../Clubs/AddClubs/AddClubs';

initializeIcons();



class Home extends React.Component<any,any> {
    constructor(props){
        super(props);
             
        //establishing signalr connection
        // const connection = new signalR.HubConnectionBuilder()
        // .withUrl("http://localhost:3333/conversationhub", {
        //     skipNegotiation: true,
        //     transport: signalR.HttpTransportType.WebSockets
        //   })
        // .configureLogging(signalR.LogLevel.Trace)
        // .build();
        this.state={
            searchTerm:'',
            currentClubs:this.props.myclubs,
            isClubHide:true,
            isChatHide:true,
            primaryClub:this.props.myclubs[0]
        };

    }

   
    componentDidMount(){
           
        // if(this.props.connection!=undefined){
        //     this.props.connection
        //     .start({ withCredentials: false })
        //     .catch(err => console.error(err));
        // }
          
            this.props.dispatch(fetchFavClubs(this.props.LoggedUser.userId));
            this.props.dispatch(fetchMyClubs(this.props.LoggedUser.userId));
            
            //starting signalr connection
            
           
     }

    componentDidUpdate(prevProps){
             
        if(this.props.myclubs!=prevProps.myclubs && this.props.myclubs.length!=0 ){
            this.props.dispatch(fetchMyClubInfo(this.props.myclubs[0].clubID));
            this.props.dispatch(fetchMessagesOfClub(this.props.myclubs[0].clubID));
        }
    }
    showChat=()=>{
             
            this.setState({
                isClubHide:true,
                isChatHide:false
        });
    }


     //searching clubs
     onInputChange=(event)=>{
        let searchClub = (this.props.myclubs).filter(club=>club.clubTitle.toLowerCase().includes((event.target.value).toLowerCase()));
        this.setState({
            searchTerm:event.target.value,
            currentClubs:searchClub
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
          
        return(
            <div className="homeContainer">
                <HomeNav/>
               
                    <div className="homeBar">
                        My Clubs
                        <Link to="/addclub"><button className="createBtn">Create New</button></Link>
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
                                                ))):(<h4>No favorite clubs</h4>)}
                                
                                   
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
                     
                           {this.state.isChatHide==true &&  this.state.isClubHide==true?
                                        (this.state.primaryClub!=""?
                                                (<Conversation  club={this.props.club} messages={this.props.messages} show={this.showClubInfo} loggedUser={this.props.LoggedUser}/>)
                                                :(<span>Loading...</span>))
                                        :(this.state.isChatHide==false?
                                             (<Conversation  club={this.props.club} messages={this.props.messages} show={this.showClubInfo} loggedUser={this.props.LoggedUser}/>)
                                            :(<ClubInfo club={this.props.club} cUsers={this.props.cUsers} rUsers={this.props.rUsers} nUsers={this.props.nUsers} users={this.props.users} hide={this.hideClubInfo}/>))
                                        }
                    </div>
                </div> 
                <Route path="/addclub" component={()=><AddClubs from="/"/>}/>
        </div>
    
        );
   
    }
}




function mapStateToProps(state){
     
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
            :state.homeReducer.messages,
        connection
            :state.AppReducer.connection,
     }
     

   }
   

   export default connect(mapStateToProps)(Home);