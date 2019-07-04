import React from 'react';
import '../UsersList/DeactivateorActivateUser.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
import {connect} from 'react-redux';
import {reactiveClub,FetchClubs} from '../Actions/Actions';

interface Iprops{
    name?:string;
}
class ReactivateClub extends React.Component<any,any> {
    
    constructor(props) 
    {
        super(props);
        this.state={reason:""}
        this.reasonHandle=this.reasonHandle.bind(this);
        this.confirmButtonHandle=this.confirmButtonHandle.bind(this);
    }        
       
    reasonHandle(event)
    {
        debugger;
        var Reason=event.target.value;
        this.setState({reason:Reason})
    }   



    confirmButtonHandle(event)
    {
        debugger;
        this.props.dispatch(reactiveClub(this.props.clubID,this.state.reason));
    }



    render()
    {
    return(
        
        <div className="DeactivateUser" >
            <header className="DeacivateUser_head">
        <text>Reactivate</text>
        <Link to={this.props.to}>
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
            <h3>What Happens next?</h3>
            <ul>
                <li>All the Club memebers would be able to see the club and comunicate through it..</li>
                <li>This club will be shown to all users if it is public.</li>
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

export default connect()(ReactivateClub);