import React from 'react';
import './ExitClub.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
import {connect} from 'react-redux';
import {exitFromClub} from '../../actions/clubAction'
interface Iprops{
    name?:string;
}
class ExitClub extends React.Component<any,any> {
    
    constructor(props) 
    {
        super(props);
        this.confirmButtonHandle=this.confirmButtonHandle.bind(this);
    }        
       



    confirmButtonHandle(event)
    {
        debugger;
        this.props.dispatch(exitFromClub(this.props.LoggedUserID,this.props.clubID));
    }



    render()
    {
    
    return(
        
        <div className="ExitClub" >
            <header className="ExitClub_head">
        <text>Leave {this.props.clubTitle}</text>
        <Link to={this.props.to}>
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
         
                <p>You Will no longer be a part of this club and the previous messages will be deleted from the account</p>
                <p>Do you wish to continue?</p>
           
            <span className="buttons">
            <Link to={this.props.to}>
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
            <Link to={this.props.to}>
                <button className="leaveClub" onClick={this.confirmButtonHandle}><text>Leave</text></button>
            </Link>
            </span>
       
    
    </div>
</div>
    );
    }
}
function mapStatetoProps(state)
{
    return{
        LoggedUserID:state.AppReducer.LoggedUser.userID
    }
}
export default connect(mapStatetoProps)(ExitClub);