import React from 'react';
import {Icon} from 'react-icons-kit';
import {caretDown} from 'react-icons-kit/fa/caretDown';
import {ic_refresh} from 'react-icons-kit/md/ic_refresh';
import {search} from 'react-icons-kit/fa/search';
import './Connections.scss'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import User from './User';
import {connect} from 'react-redux';
import {fetchContacts,fetchSuggestions,filtration} from './Actions/Actions'
import {NewConnection} from './NewConnection/NewConnection'
import {Box} from './Box/Box'
import EmptyConnection from './EmptyConnections/EmptyConnections'
class Connections extends React.Component<any,any>{
  constructor(props)
  {
    super(props);
    this.state=({contacts:[],suggestions:[],status:[],role:[],searchBar:""})
    this.addStatusProperty=this.addStatusProperty.bind(this);
    this.addRoleProperty=this.addRoleProperty.bind(this);
    this.searchBarHandle=this.searchBarHandle.bind(this);
    this.removeStatusProperty=this.removeStatusProperty.bind(this);
    this.removeRoleProperty=this.removeRoleProperty.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }
  componentWillMount()
  {
    debugger;
    this.props.dispatch(fetchContacts());
    this.props.dispatch(fetchSuggestions());

  }

  onlyUnique(value, index, self) {
    debugger;
    console.log(self.indexOf(value));
    return self.indexOf(value) === index;
  }



  addStatusProperty(event)
{
  debugger;
  var role=this.state.role;
  var searchBar=this.state.searchBar;
  var status=this.state.status;
  status.push(event.target.textContent);
  status=status.filter(this.onlyUnique)
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar));
  this.setState({status:status});
}


addRoleProperty(event)
{
  debugger;
  var role=this.state.role;
  var searchBar=this.state.searchBar;
  var status=this.state.status;
  role.push(event.target.textContent);
  role=role.filter(this.onlyUnique)
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar))
  this.setState({role:role});
}


searchBarHandle(event)
{
  debugger;
  var role=this.state.role;
  var status=this.state.status;
  var searchBar=event.target.value.toLowerCase();
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar))
  this.setState({searchBar:searchBar});
}


removeStatusProperty(event)
{
  debugger;
  var role=this.state.role;
  var searchBar=this.state.searchBar;
  var status=this.state.status;
  var status=this.state.status.filter(value=>value!=(event.currentTarget.id));
  this.setState({status:status});
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar))
}


removeRoleProperty(event)
{
  debugger;
  var role=this.state.role;
  var searchBar=this.state.searchBar;
  var status=this.state.status;
  var role=this.state.role.filter(value=>value!=(event.currentTarget.id));
  this.setState({role:role});
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar))
}

handleReset()
{
  var role=[]
  var searchBar=[]
  var status=[]
  this.props.dispatch(filtration(this.props.userContacts,role,status,searchBar));
  this.setState({status:[],search:"",role:[]});
}

  render() {
    debugger;
    return(
      this.props.userContacts==[]?<EmptyConnection/>:
        <div className="connections">
            <div className="header" >
             
              <div>
                <text className="heading">All Connections</text>
                <Link to="/connections/newconnection">
                <button className="adduser">New Connection</button> 
                </Link>
              </div>
                

                <div className="buttonbar">

                  <span className="dropdown">
                    <button className="dropbtn">User Role    
                     <Icon icon={caretDown} size={15} className="down"/> 
                    </button>
                    <span className="dropdown-content">
                    <p id="Admin" onClick={this.addRoleProperty}>Admin</p>
                      <p id="User"  onClick={this.addRoleProperty}>User</p>
                  </span>
                  </span> 

                  <span className="dropdown2">
                    <span className="buttoncont">
                    <button className="dropbtn2">User Status 
                     <Icon icon={caretDown} size={15}/> 
                    </button>
                    </span>
                    <span className="dropdown-content2">
                    <p id="Active"  onClick={this.addStatusProperty}>Active</p>
                      <p id="Inactive"  onClick={this.addStatusProperty}>Inactive</p>
                  </span>
                  
                  </span>
                    
                  <span className="search">
                   <span><Icon icon={search} size={20}/></span>   
                      <input type="text" placeholder="Search" onChange={this.searchBarHandle} value={this.state.searchBar}/>
                  </span>
                  <button className="reset">
                    <Icon icon={ic_refresh} size={20} onClick={this.handleReset}/>Reset
                  </button>
            </div>
            <div className="filter">
            {this.state.status.map(value=><Box name={value} close={this.removeStatusProperty}/>)}
            {this.state.role.map(value=><Box name={value} close={this.removeRoleProperty}/>)}
          </div>
</div>
      <div className="connection_tiles">  
      {this.props.filtereduserContacts.map(userContact=>(<User displayName={userContact.displayName} email={userContact.email} mobileNumber={userContact.mobileNumber} mutualClubs={userContact.mutualClubs} about={userContact.about} profilePic={userContact.profilePic} />))}
      </div>  
      <Route  path="/connections/newconnection" component={()=><NewConnection userSuggestions={this.props.userSuggestions}/>}/>
        </div>
       
        
    )
}
}


function mapStateToProps(state)
{
return{
  userContacts:state.ConnectionsReducer.userContacts,
  filtereduserContacts:state.ConnectionsReducer.filtereduserContacts,
  userSuggestions:state.ConnectionsReducer.userSuggestions
}
}
export default connect(mapStateToProps)(Connections);