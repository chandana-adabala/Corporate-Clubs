import React from 'react';
import {user} from 'react-icons-kit/fa/user'
import {Icon} from 'react-icons-kit';
import './EmptyPage.scss';
import {Link,Route} from 'react-router-dom';
import AddUser from './AddUser';
class EmptyUsers extends React.Component<any,any>{
    render()
    {
        return(
            <div className="empty">
                    <Icon icon={user} className="icon" size={300} />
                    <p className="no">There are no users added yet.</p>
                  <Link to="/Admin/AddUser"> <input type="button" value="Add Users" className="Add"/></Link>
                  <Route path="/Admin/AddUser" component={AddUser}/>
            </div>
        );
    }
}
export default EmptyUsers;