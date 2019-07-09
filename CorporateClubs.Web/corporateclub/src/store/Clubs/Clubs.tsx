import React from 'react';
import {Icon} from 'react-icons-kit';
import {caretDown} from 'react-icons-kit/fa/caretDown';
import {ic_refresh} from 'react-icons-kit/md/ic_refresh';
import {search} from 'react-icons-kit/fa/search';
import './Clubs.scss';
import AddClubs from './AddClubs/AddClubs';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Club from './Club';
import EmptyClubs from "./EmptyClub/EmptyClubs";
import {FetchUsers,FetchMembers} from './Actions/ClubActions'
import {connect} from 'react-redux';
import {FetchClubMembersList} from './Actions/ClubActions';
class Clubs extends React.Component<any,any>{
  componentDidMount()
  {   
    this.props.dispatch(FetchUsers());
      this.props.dispatch(FetchClubMembersList());
      
  }
  render() {
    
    return(
      this.props.clubMembersList==[]?<EmptyClubs/>:
        <div className="content">
            <div >
             
              <div>
                <text className="heading">All Clubs</text>
                <Link to="/Clubs/addclubs">
                <button className="adduser">Add Club</button> 
                </Link>
              </div>
                

                <div className="buttonbar">

                  <span className="dropdown">
                    <button className="dropbtn">Club Type    
                     <Icon icon={caretDown} size={15} className="down"/> 
                    </button>
                    <span className="dropdown-content">
                      <p>Public Open</p>
                      <p>Public Closed</p>
                      <p>Private</p>
                  </span>
                  </span> 

                  <span className="dropdown2">
                    <span className="buttoncont">
                    <button className="dropbtn2">Status 
                     <Icon icon={caretDown} size={15}/> 
                    </button>
                    </span>
                    <span className="dropdown-content2">
                      <p>Active</p>
                      <p>Inactive</p>
                      <p>Invited</p>
                      <p>Not Invited</p>
                  </span>
                  
                  </span>
                  <span className="datecont">
                  <DatePicker placeholderText='Date Created' className="date"/>
                  </span>
                    <Switch>
                    <Route path="/Clubs/addclubs" component={AddClubs} />
                    </Switch>
                  <span className="search">
                   <span><Icon icon={search} size={20}/></span>   
                      <input type="text" placeholder="Search"/>
                  </span>
                  <button className="reset">
                    <Icon icon={ic_refresh} size={20}/>Reset
                  </button>
            </div>
  
</div>
      <div className="club_tiles">  
      {this.props.clubMembersList.map((clubMember)=>
      {
      return <Club  clubMember={clubMember} users={this.props.users}/> }
      )}
      </div>  
        </div>
    )
}
}
function mapStateToProps(State)
  {
    debugger;
    console.log(State)
    return{
       clubs:State.ClubReducer.clubs,
      users:State.ClubReducer.users,
      members:State.ClubReducer.members,
      clubMembersList:State.ClubReducer.clubMembersList
    }
  }
export default connect(mapStateToProps)(Clubs);