import React, { Component } from 'react';
import '../Admin.scss';
import { ic_close } from 'react-icons-kit/md/ic_close'
import { Icon } from 'react-icons-kit'
import { caretDown } from 'react-icons-kit/fa/caretDown'
import { search } from 'react-icons-kit/fa/search';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
//import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { ic_more_vert } from 'react-icons-kit/md/ic_more_vert';
import AddUser from '../UsersList/AddUser';
import { createStore } from 'redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Interface } from 'readline';
import ReactivateClub from './ReactivateClub'
import DeleteClub from './DeleteClub'
import { ReactComponent } from '*.svg';
import { render } from 'react-dom';
import '../box.scss'
import { connect } from 'react-redux'
import { FetchClubs, FetchUsers } from '../Actions/Actions'
import IClubs from '../../../models/IClubs';
class InactiveClubs extends React.Component<any, any>{


  constructor(props) {
    super(props);
    this.handleAddClub = this.handleAddClub.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleClubClose = this.handleClubClose.bind(this);
    this.handleUserClose = this.handleUserClose.bind(this);
    this.myFilter=this.myFilter.bind(this)
    this.reset = this.reset.bind(this);
    this.searchHandle=this.searchHandle.bind(this);
    this.state = { clubs:[],users:{},selectedList:[],search:""};
    debugger;
  }

  componentWillMount() {
    this.props.dispatch(FetchClubs());
    this.props.dispatch(FetchUsers());
  }

  componentWillReceiveProps()
  {
    this.setState({selectedList:this.props.clubs});
  }
  onlyUnique(value, index, self) {
    debugger;
    console.log(self.indexOf(value));
    return self.indexOf(value) === index;
  }

myFilter(clubRow)
{
  let i=0;
  for (i=0;i<this.state.clubs.length;i++) 
  { 
    if(clubRow.clubType==this.state.clubs[i]&&clubRow.clubTitle.toLowerCase().includes(this.state.search))
    {
      console.log("true");
    return true
    }
  }
  i=0;
  
  if(this.state.users!=undefined)
  {
  let userList=Object.keys(this.state.users);
  for (i=0;i<userList.length;i++) 
  { 
    if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().toLowerCase().includes(this.state.search))
    return true
  }
  }
  if(this.state.clubs==[]&&this.state.users==undefined&&this.state.search=='')
  return true;
  return false;

  
}


 



 handleAddUser(event)
 {
  
  function  myFilter(clubRow)
  {
    let i=0;
  
    for (i=0;i<clubs.length;i++) 
    { 
      if(clubRow.clubType==clubs[i]&&clubRow.clubTitle.toLowerCase().includes(search))
      {
        console.log("true");
      return true
      }
    }
    i=0;
    
    if(users!=undefined)
    {
    let userList=Object.keys(users);
    for (i=0;i<userList.length;i++) 
    { 
      if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().includes(search))
      return true
    }
    }
    if(clubs.length==0 && Object.keys(users).length === 0 &&clubRow.clubTitle.toLowerCase().includes(search))
    return true;
    return false;
  
  }
    var clubs = this.state.clubs;
    var users=this.state.users;
    var search=this.state.search
  users[event.target.id]=event.target.textContent;
  this.setState({users:users})
  this.forceUpdate()
  let selectedList=this.props.clubs.filter(myFilter);
  if(clubs.length==0 && Object.keys(users).length === 0 && search=='')
  selectedList=this.props.clubs;
  this.setState({selectedList:selectedList });
}







  handleAddClub(event) {
    function  myFilter(clubRow)
    {
      let i=0;
    
      for (i=0;i<clubs.length;i++) 
      { 
        if(clubRow.clubType==clubs[i]&&clubRow.clubTitle.toLowerCase().includes(search))
        {
          console.log("true");
        return true
        }
      }
      i=0;
      
      if(users!=undefined)
      {
      let userList=Object.keys(users);
      for (i=0;i<userList.length;i++) 
      { 
        if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().includes(search))
        return true
      }
      }
      if(clubs.length==0 && Object.keys(users).length === 0 &&clubRow.clubTitle.toLowerCase().includes(search))
      return true;
      return false;
    
    }
      var clubs = this.state.clubs;
      var users=this.state.users;
      var search=this.state.search
    clubs.push(event.target.textContent);
    clubs = clubs.filter(this.onlyUnique);
    this.setState({ clubs: clubs });
    this.forceUpdate();
    let selectedList=this.props.clubs.filter(myFilter)
    if(clubs.length==0 && Object.keys(users).length === 0 && search=='')
  selectedList=this.props.clubs;
    this.setState({selectedList:selectedList });
  }





handleClubClose(event)
{

 function  myFilter(clubRow)
{
  let i=0;

  for (i=0;i<clubs.length;i++) 
  { 
    if(clubRow.clubType==clubs[i]&&clubRow.clubTitle.toLowerCase().includes(search))
    {
      console.log("true");
    return true
    }
  }
  i=0;
  
  if(users!=undefined)
  {
  let userList=Object.keys(users);
  for (i=0;i<userList.length;i++) 
  { 
    if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().includes(search))
    return true
  }
  }
  if(clubs.length==0 && Object.keys(users).length === 0 &&clubRow.clubTitle.toLowerCase().includes(search))
  return true;
  return false;

}
  var clubs = this.state.clubs;
  var users=this.state.users;
  var search=this.state.search
  clubs=clubs.filter(value=>value!=(event.currentTarget.id));
  debugger;
  this.setState({ clubs: clubs });
  this.forceUpdate();
  let selectedList=this.props.clubs.filter(myFilter);
  if(clubs.length==0 && Object.keys(users).length === 0 && search=='')
  selectedList=this.props.clubs;
  this.setState({selectedList:selectedList });
}







handleUserClose(event)
{
  function  myFilter(clubRow)
{
  let i=0;

  for (i=0;i<clubs.length;i++) 
  { 
    if(clubRow.clubType==clubs[i]&&clubRow.clubTitle.toLowerCase().includes(search))
    {
      console.log("true");
    return true
    }
  }
  i=0;
  
  if(users!=undefined)
  {
  let userList=Object.keys(users);
  for (i=0;i<userList.length;i++) 
  { 
    if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().includes(search))
    return true
  }
  }
  if(clubs.length==0 && Object.keys(users).length === 0 &&clubRow.clubTitle.toLowerCase().includes(search))
  return true;
  return false;

}
  var clubs = this.state.clubs;
  var users=this.state.users;
  var search=this.state.search
  delete users[event.currentTarget.id]
  debugger;
  this.setState({ users: users });
  this.forceUpdate();
  let selectedList=this.props.clubs.filter(myFilter)
  if(clubs.length==0 && Object.keys(users).length === 0 && search=='')
  selectedList=this.props.clubs;
  this.setState({ users: users,selectedList:selectedList });

}

reset()
{
 
  var clubs=[];
  var users={}
  var search="";
  let selectedList=this.props.clubs;
  this.setState({clubs:clubs,users:users,search:search,selectedList:selectedList})
}






searchHandle(event)
{
  function  myFilter(clubRow)
  {debugger;
    let i=0;
  
    for (i=0;i<clubs.length;i++) 
    { 
      if(clubRow.clubType==clubs[i]&&clubRow.clubTitle.toLowerCase().includes(search))
      {
        console.log("true");
      return true
      }
    }
    i=0;
    
    if(users!=undefined)
    {
    let userList=Object.keys(users);
    for (i=0;i<userList.length;i++) 
    { 
      if(clubRow.clubType==userList[i]&&clubRow.clubTitle.toLowerCase().includes(search))
      return true
    }
    }
    if(clubs.length==0 && Object.keys(users).length === 0 &&clubRow.clubTitle.toLowerCase().includes(search))
    return true;
    return false;
  
  }
    var clubs = this.state.clubs;
    var users=this.state.users;
    var search=event.target.value.toLowerCase()
this.setState({search:event.target.value});
let selectedList=this.props.clubs.filter(myFilter)
if(clubs.length==0 && Object.keys(users).length === 0 && search=='')
  selectedList=this.props.clubs;
this.setState({selectedList:selectedList });
}


  render()
   {

     let selectedUsers={}
    let selected=this.props.clubs.map((club)=>(this.props.users.map((user)=>{              ///retriving users who created the below clubs
      if(user.userID==club.clubDeactiveBy)
      {
     selectedUsers[user.userID]=user.displayName;
    }}))[0]);
console.log(selectedUsers,"v");



    return (
      <div className="content">

        <div>
          <text className="heading">Inactive Clubs</text>

        </div>


        <div className="navbar2admin">

          <span className="dropdown">
            <button className="dropbtn">Club Type
                     <Icon icon={caretDown} size={15} className="down" />
            </button>
            <span className="dropdown-content">
              <p id="Public-Open Club"onClick={this.handleAddClub} >Public-Open Club</p>
              <p id="Public-Closed Club" onClick={this.handleAddClub}>Public-Closed Club</p>
              <p id="Private Club" onClick={this.handleAddClub}>Private Club</p>
            </span>
          </span>

          <span className="dropdown2">
            <button className="dropbtn2">Created By
                     <Icon icon={caretDown} size={15} />
            </button>
            <span className="dropdown-content2">
        
                   {selectedUsers!=undefined?(Object.keys(selectedUsers).map(user=>{ if(user!=undefined)
                    return  <p onClick={this.handleAddUser}id={user}>{selectedUsers[user]}</p>})):<span></span>}
            </span>
          </span>
          <span className="searchad">
            <span><Icon icon={search} size={20} /></span>
            <input type="text" placeholder="Search" value={this.state.search} onChange={this.searchHandle}/>
          </span>
          <button className="resetad" onClick={this.reset}>
            <Icon icon={ic_refresh} size={20} />Reset
                  </button>


        </div>
        <div className="filter">
         {this.state.clubs.map(value=>(<Box name={value} close={this.handleClubClose}/>))}
         {Object.keys(this.state.users).map(user=>(<Box_User name={selectedUsers[user]} id={user} close={this.handleUserClose}/>))}
        </div>
        <div className="gap">

        </div>
        <Route exact path="/Admin/AddUser" component={AddUser} />
       
        <DatatablePage clubsList={this.state.selectedList} UsersList={this.props.users}/>

      </div>


    );
  }
}
interface IProps
{
  clubs:IClubs
}
class DatatablePage extends React.Component<any,any>{
  
  render(){
     return(
        <table className="table">
        <tr className="columns">
          <th className="rows">Club Title</th>
          <th className="rows">Created By</th>
          <th className="rows">Club Type</th>
          <th className="rows">Deactivated By</th>
          <th className="rows">Reason</th>
          <th className="rows">Actions</th>
        </tr>


        {this.props.clubsList.map((clubs) =>
          <tr className="rows">

            <td className="rows"><div>
              <p className="name">{clubs.clubTitle}</p>
              <p>{clubs.description}</p>
            </div></td>
            <td className="rows">
              <div>
              {this.props.UsersList!=undefined?this.props.UsersList.map((user)=>{
                   console.log(user.UserID,clubs.clubsID)
                  if(user.userID==clubs.clubCreatedBy)
                  return (<p>{user.displayName}</p>)
                }):<span></span>}
                <p>{new Date(clubs.createdOn).toDateString()}</p>
              </div>
            </td>
            <td className="rows">{clubs.clubType}</td>
            <td className="rows">
              <div>
                {this.props.UsersList!=undefined?this.props.UsersList.map((user)=>{
                   console.log(user.UserID,clubs.clubsID)
                  if(user.userID==clubs.clubDeactiveBy)
                  return (<p>{user.displayName}</p>)
                }):<span></span>}
              </div>
            </td>

            <td className="rows">{clubs.reason}</td>
            <td className="rows"> <span className="menu"><Icon icon={ic_more_vert} size={30} />
              <span className="menu-content2">
                <Link to='/Admin/InactiveClubs/ReactivateClub'>
                  <p>Re-Activate Club</p>
                </Link>
                <Link to="/Admin/InactiveClubs/DeleteClub">
                  <p>Delete Permenantly</p>
                </Link>
              </span>
            </span></td>
            <Route exact path="/Admin/InactiveClubs/ReactivateClub" component={()=><ReactivateClub to="/Admin/InactiveClubs" clubID={clubs.clubID}/>} />
             <Route exact path="/Admin/InactiveClubs/DeleteClub" component={()=><DeleteClub to="/Admin/InactiveClubs" clubID={clubs.clubID}/>} />
          </tr>
        )}
      </table>
    );
  }
}
function mapStateToProps(State) {
  debugger;
  return {
    clubs: State.AdminPageReducer.clubs,
    users:State.AdminPageReducer.users
  }
}

export class Box extends React.Component<any, any>
{
  render() {
    return (
      <div className="box" >
        <span>{this.props.name}</span>
        <span onClick={this.props.close} id={this.props.name}><Icon size={'1rem'} icon={ic_close}/></span>
      </div>
    )
  }
}

class Box_User extends React.Component<any, any>
{
  render() {
    return (
      <div className="box" >
        <span>{this.props.name}</span>
        <span onClick={this.props.close} id={this.props.id}><Icon size={'1rem'} icon={ic_close}/></span>
      </div>
    )
  }
}

export default connect(mapStateToProps)(InactiveClubs);