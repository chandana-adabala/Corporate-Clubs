import React from 'react';
import {library} from 'react-icons-kit/icomoon/library';
import {Icon} from 'react-icons-kit';
import './EmptyPage.scss';
import {Link,Route} from 'react-router-dom';
import AddClubs from '../AddClubs/AddClubs'
class EmptyClubs extends React.Component<any,any>{
    render()
    {
        return(
            <div className="empty">
                    <Icon icon={library} className="icon" size={300} />
                    <p className="no">There are no clubs added yet.</p>
                  <Link to="/Clubs/AddClubs"> <input type="button" value="Add Clubs" className="Add"/></Link>
                  <Route path='/Clubs/AddClubs' component={AddClubs}/>
            </div>
        );
    }
}
export default EmptyClubs;