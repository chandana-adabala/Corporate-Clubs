import React from 'react';
import '../Admin.scss';

import { Icon } from 'react-icons-kit';
import { caretDown } from 'react-icons-kit/fa/caretDown'
import { search } from 'react-icons-kit/fa/search';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
//import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { ic_more_vert } from 'react-icons-kit/md/ic_more_vert';
import AddUser from './AddUser';
import { createStore } from 'redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Interface } from 'readline';
import DeactivateorActiveUser from './DeactivateorActivateUser'
import DeleteUser from './DeleteUser'
import { connect } from 'react-redux'
import { FetchClubs, FetchUsers, filtration } from '../Actions/Actions'
import { ReactComponent } from '*.svg';
import { Box } from '../InactiveClubs/AdminInactiveClubs'
import { userInfo } from 'os';
import EmptyUser from './EmptyUser'

interface Iprops {
  activate?: string;
  activatepath: string;
}



class User extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { status: [], role: [], searchBar: "" }
    this.addStatusProperty = this.addStatusProperty.bind(this);
    this.addRoleProperty = this.addRoleProperty.bind(this);
    this.onlyUnique = this.onlyUnique.bind(this);
    this.removeStatusProperty = this.removeStatusProperty.bind(this);
    this.removeRoleProperty = this.removeRoleProperty.bind(this);
    this.searchBarHandle = this.searchBarHandle.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  onlyUnique(value, index, self) {
     
     //(self.indexOf(value));
    return self.indexOf(value) === index;
  }


  componentWillMount() {
    this.props.dispatch(FetchUsers());
  }

  handleReset() {
    var role = []
    var searchBar = []
    var status = []
    this.props.dispatch(filtration(this.props.users, status, role, searchBar));
    this.setState({ status: [], search: "", role: [] });
  }

  addStatusProperty(event) {
     
    var role = this.state.role;
    var searchBar = this.state.searchBar;
    var status = this.state.status;
    status.push(event.target.textContent);
    status = status.filter(this.onlyUnique)
    this.props.dispatch(filtration(this.props.users, status, role, searchBar));
    this.setState({ status: status });
  }


  addRoleProperty(event) {
     
    var role = this.state.role;
    var searchBar = this.state.searchBar;
    var status = this.state.status;
    role.push(event.target.textContent);
    role = role.filter(this.onlyUnique)
    this.props.dispatch(filtration(this.props.users, status, role, searchBar))
    this.setState({ role: role });
  }


  searchBarHandle(event) {
     
    var role = this.state.role;
    var status = this.state.status;
    var searchBar = event.target.value.toLowerCase();
    this.props.dispatch(filtration(this.props.users, status, role, searchBar))
    this.setState({ searchBar: searchBar });
  }


  removeStatusProperty(event) {
     
    var role = this.state.role;
    var searchBar = this.state.searchBar;
    var status = this.state.status;
    var status = this.state.status.filter(value => value != (event.currentTarget.id));
    this.setState({ status: status });
    this.props.dispatch(filtration(this.props.users, status, role, searchBar))
  }


  removeRoleProperty(event) {
     
    var role = this.state.role;
    var searchBar = this.state.searchBar;
    var status = this.state.status;
    var role = this.state.role.filter(value => value != (event.currentTarget.id));
    this.setState({ role: role });
    this.props.dispatch(filtration(this.props.users, status, role, searchBar))
  }





  render() {
    return (
      this.props.users==[]?<EmptyUser/>:
      <div className="content">

        <div>
          <text className="heading">All Users</text>
          <Link to="/Admin/AddUser">
            <button className="adduser">Add User</button>
          </Link>
        </div>


        <div className="navbar2admin">

          <span className="dropdown">
            <button className="dropbtn">User Role
                     <Icon icon={caretDown} size={15} className="down" />
            </button>
            <span className="dropdown-content">
              <p id="Admin" onClick={this.addStatusProperty}>Admin</p>
              <p id="User" onClick={this.addStatusProperty}>User</p>
            </span>
          </span>

          <span className="dropdown2">
            <button className="dropbtn2">User Status
                     <Icon icon={caretDown} size={15} />
            </button>
            <span className="dropdown-content2">
              <p id="Active" onClick={this.addRoleProperty}>Active</p>
              <p id="Inactive" onClick={this.addRoleProperty}>Inactive</p>
            </span>
          </span>
          <span className="searchad">
            <span><Icon icon={search} size={20} /></span>
            <input type="text" value={this.state.searchBar} onChange={this.searchBarHandle} />
          </span>
          <button className="resetad" onClick={this.handleReset}>
            <Icon icon={ic_refresh} size={20} />Reset
                  </button>


        </div>
        <div className="filter">
          {this.state.status.map(value => <Box name={value} close={this.removeStatusProperty} />)}
          {this.state.role.map(value => <Box name={value} close={this.removeRoleProperty} />)}
        </div>
        <div className="gap">

        </div>
        <Route exact path="/Admin/AddUser" component={AddUser} />
        <DatatablePage activatepath="/Admin/DeactivateUser" usersList={this.props.selectedUsers} />
      </div>


    );
  }
}
class DatatablePage extends React.Component<any, any>
{
  render() {
    return (
      <table className="table">
        <thead>
        <tr className="columns">
          <th className="rows">User Name</th>
          <th className="rows">Phone Number</th>
          <th className="rows">Added By</th>
          <th className="rows">User Status</th>
          <th className="rows">User Role</th>
          <th className="rows">Active Clubs</th>
          <th className="rows">Action</th>
        </tr>
        </thead>         
        <tbody>
        {this.props.usersList.map(user => (<tr className="rows">
          <td className="rows"><div>
            <p className="name">{user.displayName}</p>
            <p>{user.email}</p>
          </div></td>
          <td className="rows">{user.mobileNumber}</td>
          <td className="rows">
            <div>
              {this.props.usersList.map(allUser => {
                if (user.rowCreatedBy == allUser.userID)
                  return <p>{allUser.displayName}</p>
              })}
              {user.rowCreatedBy == null ? <p>...</p> : <span></span>}

              <p className="createdDate">{"on " + new Date(user.loginCreated).toDateString()}</p>
            </div>
          </td>
          <td className="rows">{user.isActive ? "Active" : "InActive"}</td>
          <td className="rows">{user.role}</td>
          <td className="rows">Active Clubs</td>
          <td className="rows"> <span className="menu">
            <span className="menuIcon">
            <Icon icon={ic_more_vert} size={30} />
            <span className="menu-content2">
              <Link to={"/Admin/DeactivateorActiveUser/"+user.userID}><p>{user.isActive ? "Deactivate" : "Reactivate"}</p></Link>
              <Link to={"/Admin/DeleteUser/"+user.userID}>
                <p>Delete Permenantly</p>
              </Link>
              <Route exact path={"/Admin/DeactivateorActiveUser/"+user.userID} component={() => <DeactivateorActiveUser userID={user.userID} isActive={user.isActive} displayName={user.displayName} to="/Admin" />} />
              <Route exact path={"/Admin/DeleteUser/"+user.userID} component={() => <DeleteUser userID={user.userID} isActive={user.isActive} displayName={user.displayName} to="/Admin" />} />
            </span>
            </span>
          </span></td>

        </tr>))}
        </tbody>
      </table>


    );
  }
}




function mapStateToProps(State) {
   
  return {
    users: State.AdminPageReducer.users,
    selectedUsers: State.AdminPageReducer.selectedUsers
  }
}

export default connect(mapStateToProps)(User);