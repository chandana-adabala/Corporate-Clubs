import React from 'react';
import './UnBlockUser.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
import {connect} from 'react-redux';
import {blockOrUnblockUser,fetchClubMembers} from '../../actions/homeActions'
interface Iprops{
    name?:string;
}
class UnBlockUser extends React.Component<any,any> {
    
    constructor(props) 
    {
        super(props);
        this.confirmButtonHandle=this.confirmButtonHandle.bind(this);
    }        
       



   async confirmButtonHandle(event)
    {
          
    await this.props.dispatch(blockOrUnblockUser(this.props.userID,this.props.clubID));
    await this.props.dispatch(fetchClubMembers(this.props.clubID))
    }



    render()
    {
        
    return(
        
        <div className="unBlockUser" >
            <header className="unBlockUser_head">
        <text>Block {this.props.displayName}</text>
        <Link to={this.props.to}>
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
         
                <p>This User Will Be Un Blocked from this club and he starts receiving all the updates of this club</p>
                <p>Do you wish to continue?</p>
           
            <span className="buttons">
            <Link to={this.props.to}>
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
            <Link to={this.props.to}>
                <button className="leaveClub" onClick={this.confirmButtonHandle}><text>UnBlock</text></button>
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
export default connect(mapStatetoProps)(UnBlockUser);