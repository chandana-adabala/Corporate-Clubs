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
initializeIcons();



class Home extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state={
            searchTerm:'',
            currentClubs:this.props.myclubs,
            isClubHide:this.props.isClubHide
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
        console.log('mounting success');
        // debugger;
        this.props.dispatch(fetchFavClubs(1));
        this.props.dispatch(fetchMyClubs(1));
        
    
    }

    hideClubInfo=()=>{
            this.setState({
                    isClubHide:true
            });
    }
    showClubInfo=()=>{
        this.setState({
            isClubHide:false
        });
    }

    render(){
       console.log('my',this.props.myclubs,this.props.favclubs);
       
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
                                        <Club club={club} key={club.clubID} show={this.showClubInfo}/>
                                            ))):(<h4>no fav clubs</h4>)}
                                
                                   
                                </div>
                                <div className="favTitle">
                                    CLUBS
                                </div>
                                <div className="clubs">
                                    {this.state.currentClubs!=""?(
                                    this.state.currentClubs.map(club=>(
                                        <Club club={club} key={club.clubID} show={this.showClubInfo}/>
                                            ))):(this.props.myclubs!=""?(
                                                this.props.myclubs.map(club=>(
                                                    <Club club={club} key={club.clubID} show={this.showClubInfo}/>
                                                        ))):(<h4>no clubs</h4>))} 
                                </div>
                    </div>
                    <div className="homeArena">
                        <Conversation/>
                    {this.state.isClubHide==false?(<ClubInfo club={this.props.club} cUsers={this.props.cUsers} rUsers={this.props.rUsers} nUsers={this.props.nUsers} users={this.props.users} hide={this.hideClubInfo} currentUser={2}/>)
                                                :(<span></span>)}
                    
                    </div>
                </div> 

                    </div>
    
        );
   
    }
}




function mapStateToProps(state){
     
     console.log('mapstattoprops',state.homeReducer);
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
            : state.homeReducer.hide
     }
     

   }
   

   export default connect(mapStateToProps)(Home);