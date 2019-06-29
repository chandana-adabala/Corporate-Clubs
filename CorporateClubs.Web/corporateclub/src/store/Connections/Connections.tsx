import React from 'react';
import {Icon} from 'react-icons-kit';
import {caretDown} from 'react-icons-kit/fa/caretDown';
import {ic_refresh} from 'react-icons-kit/md/ic_refresh';
import {search} from 'react-icons-kit/fa/search';
import './Connections.scss'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import User from './User';
import {connect} from 'react-redux';
class Connections extends React.Component<any,any>{
  render() {
    return(
        <div className="connections">
            <div >
             
              <div>
                <text className="heading">All Connections</text>
                <Link to="/Clubs/addclubs">
                <button className="adduser">New Connection</button> 
                </Link>
              </div>
                

                <div className="buttonbar">

                  <span className="dropdown">
                    <button className="dropbtn">User Type    
                     <Icon icon={caretDown} size={15} className="down"/> 
                    </button>
                    <span className="dropdown-content">
                      <p>Admin</p>
                      <p>User</p>
                  </span>
                  </span> 

                  <span className="dropdown2">
                    <span className="buttoncont">
                    <button className="dropbtn2">User Status 
                     <Icon icon={caretDown} size={15}/> 
                    </button>
                    </span>
                    <span className="dropdown-content2">
                      <p>Active</p>
                      <p>Inactive</p>
                      <p>Blocked</p>
                  </span>
                  
                  </span>
                  <span className="datecont">
                  {/* <DatePicker placeholderText='Date Created' className="date"/> */}
                  </span>
                    
                  <span className="search">
                   <span><Icon icon={search} size={20}/></span>   
                      <input type="text" placeholder="Search"/>
                  </span>
                  <button className="reset">
                    <Icon icon={ic_refresh} size={20}/>Reset
                  </button>
            </div>
  
</div>
      <div className="connection_tiles">  
      <User/> <User/> <User/> <User/>
      </div>  
        </div>
    )
}
}
export default Connections;