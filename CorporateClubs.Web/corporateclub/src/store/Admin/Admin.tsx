import React from 'react';
import './Admin.scss';
import User from './UsersList/AdminUser';
import InactiveClubs from './InactiveClubs/AdminInactiveClubs'
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
const AdminNav: React.FC = () => {
    let displayPage:Number=1;
    return(
        <div className="Admin1">
            <nav className="admin-nav">
                <Link to='/Admin' className="admin-nav-options">Users</Link>
                <Link to='/Admin/InactiveClubs' className="admin-nav-options">Inactive Clubs</Link>
                
            </nav>
            <Switch>
            <Route path='/Admin/InactiveClubs' component={InactiveClubs}/>
            <Route  path='/Admin' component={User}/>
            </Switch>
        </div>
    );

    
}

export default AdminNav;