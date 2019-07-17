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
import {FetchClubMembersList,filterClub} from './Actions/ClubActions';
import {Box} from './Box/Box'

class Clubs extends React.Component<any,any>{


  constructor(props)
  {
      super(props);
      this.state={clubType:[],status:[],date:null,searchBar:""}
      this.addClubTypeProperty=this.addClubTypeProperty.bind(this);
      this.addStatusTypeProperty=this.addStatusTypeProperty.bind(this);
      this.removeClubTypeProperty=this.removeClubTypeProperty.bind(this);
      this.removeStatusTypeProperty=this.removeStatusTypeProperty.bind(this);
      this.onDateChange=this.onDateChange.bind(this);
      this.onSearchchange=this.onSearchchange.bind(this);
      this.handleReset=this.handleReset.bind(this);

  }
//for filtration

onlyUnique(value, index, self)
 {
   
  console.log(self.indexOf(value));
  return self.indexOf(value) === index;
}


addClubTypeProperty(event)
{
 
var status=this.state.status;
var clubType=this.state.clubType;
var date=this.state.date;
var searchBar=this.state.searchBar
clubType.push(event.target.textContent);
clubType=clubType.filter(this.onlyUnique)
this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
this.setState({clubType:clubType})
}


addStatusTypeProperty(event)
{
  var status=this.state.status;
  var clubType=this.state.clubType;
  var date=this.state.date;
  var searchBar=this.state.searchBar
  status.push(event.target.textContent);
  status=status.filter(this.onlyUnique)
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({status:status})
}

removeStatusTypeProperty(event)
{
  var status=this.state.status;
  var clubType=this.state.clubType;
  var date=this.state.date;
  var searchBar=this.state.searchBar
  status=this.state.status.filter(value=>value!=(event.currentTarget.id));
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({status:status});
}
removeClubTypeProperty(event)
{
  var status=this.state.status;
  var clubType=this.state.clubType;
  var date=this.state.date;
  var searchBar=this.state.searchBar
  clubType=this.state.clubType.filter(value=>value!=(event.currentTarget.id));
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({clubType:clubType});
}
onDateChange(date)
{
  var status=this.state.status;
  var clubType=this.state.clubType;
  var searchBar=this.state.searchBar;
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({date:date})
}

onSearchchange(event)
{
  var status=this.state.status;
  var clubType=this.state.clubType;
  var searchBar=this.state.searchBar;
  var date=this.state.date;
  searchBar=event.target.value.toLowerCase();
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({searchBar:searchBar});
}
handleReset()
{
  var status=[];
  var clubType=[];
  var searchBar="";
  var date=null;
  this.props.dispatch(filterClub(clubType,status,date,searchBar,this.props.clubMembersList));
  this.setState({date:date,searchBar:searchBar,clubType:clubType,status:status})

}
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
                      <p onClick={this.addClubTypeProperty}>Public-Open Club</p>
                      <p onClick={this.addClubTypeProperty}>Public-Closed Club</p>
                      <p onClick={this.addClubTypeProperty}>Private Club</p>
                  </span>
                  </span> 

                  <span className="dropdown2">
                    <span className="buttoncont">
                    <button className="dropbtn2">Status 
                     <Icon icon={caretDown} size={15}/> 
                    </button>
                    </span>
                    <span className="dropdown-content2">
                      <p onClick={this.addStatusTypeProperty}>Active</p>
                      <p onClick={this.addStatusTypeProperty}>Inactive</p>
                  </span>
                  
                  </span>
                  <span className="datecont">
                  <DatePicker placeholderText='Date Created' selected={this.state.date} className="date" onChange={this.onDateChange}/>
                  </span>
                    <Switch>
                    <Route path="/Clubs/addclubs" component={AddClubs} />
                    </Switch>
                  <span className="search">
                   <span><Icon icon={search} size={20}/></span>   
                      <input type="text" placeholder="Search" onChange={this.onSearchchange} value={this.state.searchBar}/>
                  </span>
                  <button className="reset" onClick={this.handleReset}>
                    <Icon icon={ic_refresh} size={20}/>Reset
                  </button>
            </div>
            <div className="filter">
            {this.state.clubType.map(value=><Box name={value} close={this.removeClubTypeProperty}/>)}
            {this.state.status.map(value=><Box name={value} close={this.removeStatusTypeProperty}/>)}
          </div>
  
</div>
      <div className="club_tiles">  
      {this.props.filteredClubMembersList.map((clubMember)=>
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
     
    console.log(State)
    return{
       clubs:State.ClubReducer.clubs,
      users:State.ClubReducer.users,
      members:State.ClubReducer.members,
      clubMembersList:State.ClubReducer.clubMembersList,
      filteredClubMembersList:State.ClubReducer.filteredClubMembersList
    }
  }
export default connect(mapStateToProps)(Clubs);