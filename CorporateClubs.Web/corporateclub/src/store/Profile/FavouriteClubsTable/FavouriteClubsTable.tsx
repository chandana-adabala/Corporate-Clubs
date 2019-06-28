import * as React from "react";
import * as ReactDOM from "react-dom";
import './FavouriteClubsTable.scss'

class FavouriteClubsTable extends React.Component {
 render(){  
     return(
      <table className="table">
      <tr className="columns">
        <th className="rows">Club Title</th>
        <th className="rows">Club Type</th>
        <th className="rows">Created By</th>
        <th className="rows">Created On</th>
      </tr>
      <tr className="rows">
        <td className="rows"><div>
          <p className="name">Name</p>
          <p>emai@email.com</p>
          </div></td>
        <td className="rows">Phone Number</td>
        <td className="rows">
          <div>
            <p>Added By</p>
            <p>Date</p>
          </div>
        </td>
        <td className="rows">User Status</td>
       
     
      </tr>
      </table>
    )}
}

export default FavouriteClubsTable