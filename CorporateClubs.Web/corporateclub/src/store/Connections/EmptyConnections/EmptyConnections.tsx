import React from 'react';
import {addressBook} from 'react-icons-kit/icomoon/addressBook'
import {Icon} from 'react-icons-kit';
import './EmptyPage.scss';
import {Link,Route} from 'react-router-dom';
import {NewConnection} from '../NewConnection/NewConnection'
import {connect} from 'react-redux'
class EmptyConnections extends React.Component<any,any>{
    render()
    {
        return(
            <div className="empty">
                    <Icon icon={addressBook} className="icon" size={300} />
                    <p className="no">There are no contacts added yet.</p>
                  <Link to="/Connections/newconnection"> <input type="button" value="Add Contact" className="Add"/></Link>
                  <Route path="/Connections/newconnection"component={()=><NewConnection userSuggestions={this.props.userSuggestions}/>}/>
            </div>
        );
    }
}
function mapStatetoProps(state)
{
return {
    userSuggestions:state.ConnectionsReducer.userSuggestions
}
}

export default connect(mapStatetoProps)(EmptyConnections);