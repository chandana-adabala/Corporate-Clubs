import React from 'react';
import './RemoveAsAdmin.scss';
import { Icon } from 'react-icons-kit'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { getNativeProps } from '@uifabric/utilities';
import {connect} from 'react-redux';
import {removeUserAsAdmin,fetchClubMembers} from '../../actions/homeActions'
// import {exitFromClub} from '../../actions/homeActions'
interface Iprops{
    name?:string;
}
class RemoveAsAdmin extends React.Component<any,any> {
    
    constructor(props) 
    {
        super(props);
        this.confirmButtonHandle=this.confirmButtonHandle.bind(this);
    }        
       



   async confirmButtonHandle(event)
    {
    await this.props.dispatch(removeUserAsAdmin(this.props.userID,this.props.clubID));
     this.props.dispatch(fetchClubMembers(this.props.clubID));
    }



    render()
    {
    
    return(
        
        <div className="RemoveAsAdmin" >
            <header className="RemoveAsAdmin_head">
        <text>Remove  {this.props.displayName} As Admin</text>
        <Link to={this.props.to}>
        <Icon icon={ic_close} size={30}/>
        </Link>
        </header>
        <div id="content">
         
                <p>He will become the user of the club and loose adminstrative powers of this club</p>
                <p>Do you wish to continue?</p>
           
            <span className="buttons">
            <Link to={this.props.to}>
                <button className="cancelbutton"><text>Cancel</text></button>
            </Link>
            <Link to={this.props.to}>
                <button className="leaveClub" onClick={this.confirmButtonHandle}><text>confirm</text></button>
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
export default connect(mapStatetoProps)(RemoveAsAdmin);