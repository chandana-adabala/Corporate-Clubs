import React from 'react';
import './DeactivateorActivateUser.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import {deleteUser} from './Actions/Actions';
import {connect} from 'react-redux';
import { getNativeProps } from '@uifabric/utilities';
import { ReactComponent } from '*.svg';
interface Iprops{
    name?:string;
}
class DeleteUser extends React.Component<any,any> {

        constructor(props) 
        {
            super(props);
            this.state={reason:""}
            this.reasonHandle=this.reasonHandle.bind(this);
            this.confirmButtonHandle=this.confirmButtonHandle.bind(this);
        }
    
        reasonHandle(event)
        {
             
            var Reason=event.target.value;
            this.setState({reason:Reason})
        }   
    
    
    
        confirmButtonHandle(event)
        {
            
             this.props.dispatch(deleteUser(this.props.userID,this.state.reason))
    
        }



    render(){
    return(
        
        <div className="DeactivateUser" >
            <header className="DeacivateUser_head">
        <text>Delete {this.props.displayName}</text>
        <Link to={this.props.to}>
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
            <h3>What Happens next?</h3>
            <ul>
                <li>This user will completely be removed from Corporate clubs.</li>
                <li>This user will be removed from all the clubs he/she is part of and removed from all his/her connections.</li>
            </ul>
            <p>Reason:</p>
            <textarea rows={5} value={this.state.reason} onChange={this.reasonHandle} />
            <span className="buttons">
            <Link to="/Admin">
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
                <button className="addclub" onClick={this.confirmButtonHandle} ><text>Confirm</text></button>
            </span>
       
    
    </div>
</div>
    );
    }
}

export default connect()(DeleteUser);