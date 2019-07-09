import React from 'react';
import './Admin.scss';
import User from './UsersList/AdminUser';
import InactiveClubs from './InactiveClubs/AdminInactiveClubs'
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
class AdminNav extends  React.Component<any,any> {
    constructor(props)
    {
        super(props)
        this.state={activeButtons:{users:true,inactiveClubs:false}}
        this.onClickChangeButtonToActive=this.onClickChangeButtonToActive.bind(this);
    }
    onClickChangeButtonToActive(event)
    {
        debugger;
          var activeButtons={users:false,inactiveClubs:false}
          activeButtons[event.currentTarget.id]=true;
          this.setState({activeButtons:activeButtons})
    }
    render(){
    return(
        <div className="Admin1">
            <nav className="admin-nav">
                <Link onClick={this.onClickChangeButtonToActive} id="users" to='/Admin' className={this.state.activeButtons.users?"admin-nav-options-active":"admin-nav-options"}>Users</Link>
                <Link onClick={this.onClickChangeButtonToActive} id="inactiveClubs" to='/Admin/InactiveClubs' className={this.state.activeButtons.inactiveClubs?"admin-nav-options-active":"admin-nav-options"}>Inactive Clubs</Link>
                
            </nav>
            <Switch>
            <Route path='/Admin/InactiveClubs' component={InactiveClubs}/>
            <Route  path='/Admin' component={User}/>
            </Switch>
        </div>
    );
    }

    
}

export default AdminNav;