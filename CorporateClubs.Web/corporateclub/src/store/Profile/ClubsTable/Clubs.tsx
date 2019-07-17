import * as React from "react";
import * as ReactDOM from "react-dom";
import './Clubs.scss'
import {connect} from 'react-redux'
import {FetchUsers,FetchAllClubDetails} from '../Actions'
class ClubsTable extends React.Component<any,any> {
  async componentWillMount()
  {
      await this.props.dispatch(FetchUsers());
      await this.props.dispatch(FetchAllClubDetails())
  }
 render(){  
     return(
      <table className="clubsTable">
      <tr className="columns">
        <th className="rows">Club Title</th>
        <th className="rows">Club Type</th>
        <th className="rows">Created By</th>
        <th className="rows">Created On</th>
      </tr>
      
    {this.props.clubs.map(club=> (<tr className="rows">
        <td className="rows"><div>
          <p className="name">{club.clubTitle}</p>
          </div></td>
        <td className="rows">{club.clubType}</td>
        <td className="rows">
          <div>
            <p>{this.props.users.map(user=> {if(user.userID==club.clubCreatedBy)return user.displayName})}</p>
            
          </div>
        </td>
        <td className="rows"><p>{new Date(club.createdOn).toDateString()}</p></td>
        
      
    </tr>))}
      </table>
    )}
}
function mapStatetoProps(state)
{
   
return {
  users:state.ProfilePageReducer.Users,
  clubs:state.ProfilePageReducer.Clubs
}
}
export default connect(mapStatetoProps)(ClubsTable)