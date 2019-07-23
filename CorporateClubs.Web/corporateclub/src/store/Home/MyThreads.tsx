import React from 'react';
import {search} from 'react-icons-kit/icomoon/search'
import './MyThreads.scss';
import { Icon } from 'react-icons-kit';
import Contact from './contacts/MyContact';
import {connect} from 'react-redux';
import { fetchFavContacts, fetchMyContacts, fetchMessagesOfUser } from './actions/threadActions';
import HomeNav from './HomeBar/HomeNav';
import Conversation from './ThreadConversation/Conversation/Conversation'
import { Link, Route } from 'react-router-dom';
import { NewConnection } from '../Connections/NewConnection/NewConnection';


class MyThreads extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state={
            searchTerm:'',
            currentContacts:this.props.myContacts,
            primaryContact:this.props.myContacts[0],
            isChatHide:false,
            connectedUserID:0
        };
 
    }

    showChat=(connectedUserID,profilePic)=>{
                
        this.setState({
            isChatHide:false,
            connectedUserID:connectedUserID,
            connectedUserProfilePic:profilePic
    });
}
    onInputChange=(event)=>{
        
        
        let searchContacts = (this.props.myContacts).filter(contact=>contact.connectedUserDisplayName.toLowerCase().includes((event.target.value).toLowerCase()));
        this.setState({
            searchTerm:event.target.value,
            currentContacts:searchContacts
        });
    }
    componentDidMount(){
        this.props.dispatch(fetchFavContacts());
        this.props.dispatch(fetchMyContacts());
    }

    componentDidUpdate(prevProps){
             
        if(this.props.myContacts!=prevProps.myContacts && this.props.myContacts.length!=0 ){
               
            this.props.dispatch(fetchMessagesOfUser(this.props.myContacts[0].connectedUserID));
            this.setState({
                isChatHide:false,
                connectedUserID:this.props.myContacts[0].connectedUserID
        });
        }
    }
   
    render(){
           
        return(<div className="threadContainer">
            <HomeNav/>
            <div className="threadBar">
                        My Threads
                        <Link to="/Home/MyThreads/newconnection">
                        <button className="createBtn">Create New</button>
                        </Link>
                    </div>
                    <div className="threadBody">

                    
                    <div className="threads">
                   
                                <div style={{ color: '#e3e5e6' }} className="searchBar">
                                    <Icon size={14} icon={search}/>
                                    <input className="searchBox" type="search" name="search" placeholder="Search Club" onChange={this.onInputChange}/>
                                </div>
                                <div className="favTitle">
                                    FAVORITES
                                </div>
                                <div className="favThreads">
                             
                                {(this.props.favContacts!="") ?(
                                    this.props.favContacts.map(contact=>(
                                        <Contact contact={contact} key={contact.connectedUserID} openChat={this.showChat}/>
                                            ))):(<h4>no favorites</h4>)}
                                
                                   
                                </div>
                                <div className="favTitle">
                                    CHATS
                                </div>
                                <div className="myThreads">
                                    {this.state.currentContacts!=""?(
                                    this.state.currentContacts.map(contact=>(
                                        <Contact contact={contact} key={contact.connectedUserID} openChat={this.showChat}/>
                                            ))):(this.props.myContacts!=""?(
                                                this.props.myContacts.map(contact=>(
                                                    <Contact contact={contact} key={contact.connectedUserID} openChat={this.showChat}/>
                                                        ))):(<h4>no contacts</h4>))} 
                                </div>
                    </div>
                    <div className="threadArena">
                    
                    
                    {this.props.connection==undefined?
                    (<span></span>)
                    :(this.state.isChatHide==false ?
                        (this.state.primaryClub!=""?
                                (<Conversation  userMessages={this.props.userMessages} loggedUser={this.props.LoggedUser} connectedUserID={this.state.connectedUserID}/>)
                                :(<span>Loading...</span>))
                        :(<Conversation  userMessages={this.props.userMessages} loggedUser={this.props.LoggedUser} connectedUserID={this.state.connectedUserID} />) )}
                 
                    
                    </div>
                </div> 
                <Route  path="/Home/MyThreads/newconnection" component={()=><NewConnection userSuggestions={this.props.userSuggestions} from="/Home/MyThreads"/>}/>
        </div>);
      
    }
}



function mapStateToProps(state){
    console.log(state.threadReducer);
    
       
     return{
         myContacts
            : state.threadReducer.myContacts,
        favContacts
            : state.threadReducer.favContacts,
        connection
            :state.AppReducer.connection,
        LoggedUser
            :state.AppReducer.LoggedUser,
        userMessages
            :state.threadReducer.userMessages,
        userSuggestions
            :state.ConnectionsReducer.userSuggestions
        
   }
     

   }
   

   export default connect(mapStateToProps)(MyThreads);