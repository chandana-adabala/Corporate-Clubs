import React from 'react';
import '../UsersList/DeactivateorActivateUser.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
import {connect} from 'react-redux';
import {deleteClub,FetchClubs} from '../Actions/Actions';
interface Iprops{
    name?:string;
}
class DeleteClub extends React.Component<any,any> {
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



   async  confirmButtonHandle(event)
    {
           
       await  this.props.dispatch(deleteClub(this.props.clubID,this.state.reason));
       await this.props.dispatch(FetchClubs())
    }
    
    render()
    {
    return(
        
        <div className="DeactivateUser" >
            <header className="DeacivateUser_head">
        <text>Delete</text>
        <Link to="/Admin">
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
            <h3>What Happens next?</h3>
            <ul>
                <li>The Club and all the converstions will completely be removed from the system.</li>
                <li>All the users of this club will be notified actively.</li>
            </ul>
            <p>Reason:</p>
            <textarea rows={5} value={this.state.reason} onChange={this.reasonHandle}  />
            <span className="buttons">
            <Link to={this.props.to}>
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
            <Link to={this.props.to}>
                <button className="addclub" onClick={this.confirmButtonHandle}><text>Confirm</text></button>
            </Link>
            </span>
       
    
    </div>
</div>
    );
    }
}


export default connect()(DeleteClub);