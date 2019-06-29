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

initializeIcons();



class Home extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state={
            searchTerm:'',
            currentClubs:this.props.myclubs
        };
     this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event){
        let searchClub = (this.props.myclubs).filter(club=>club.clubTitle.includes((event.target.value).toLowerCase()));
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

    render(){
       console.log('my',this.props.myclubs,this.props.favclubs);
       
        return(
            <div className="homeContainer">
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
                                        <Club club={club} key={club.clubID}/>
                                            ))):(<h4>no fav clubs</h4>)}
                                
                                   
                                </div>
                                <div className="favTitle">
                                    CLUBS
                                </div>
                                <div className="clubs">
                            {/* {this.props.myclubs!=""?(
                                    this.props.myclubs.map(club=>(
                                        <Club club={club} key={club.clubID}/>
                                            ))):(<h4>no clubs</h4>)} */}
                                            {this.state.currentClubs!=""?(
                                    this.state.currentClubs.map(club=>(
                                        <Club club={club} key={club.clubID}/>
                                            ))):(this.props.myclubs!=""?(
                                                this.props.myclubs.map(club=>(
                                                    <Club club={club} key={club.clubID}/>
                                                        ))):(<h4>no clubs</h4>))} 
                                </div>
                    </div>
                    <div className="homeArena">
                    <ClubInfo club={this.props.club} cUsers={this.props.cUsers} rUsers={this.props.rUsers} users={this.props.users}/>
                    
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
        users
            : state.homeReducer.users
     }
     

   }
   

   export default connect(mapStateToProps)(Home);