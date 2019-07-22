import React from "react";
import { Icon } from "react-icons-kit";
import { ic_more_vert } from "react-icons-kit/md/ic_more_vert";
import { user } from "react-icons-kit/icomoon/user";
import { Interface } from "readline";
import { number } from "prop-types";
import { connect } from "react-redux";
import {
  makeRequest,
  cancelRequest,
  removeUser,
  addUserToPublicClub,FetchClubMembersList
} from "./Actions/ClubActions";

import { Link, Route, NavLink } from "react-router-dom";
import Deactivateclub from "./DeactivateClub/DeactivateClub";
import { async } from "q";

class Club extends React.Component<any, any> {
 
  componentDidMount() {
    console.log("did mount");
  }



  //to decide which button to display for a club card i.e join,exit etc:- 
  getButtonType(clubMember) {
    if (clubMember.members == null) {
      if (clubMember.clubs.clubType == "Public-Open Club")
        return <ConnectedJoinbtn clubID={clubMember.clubs.clubID} userID={2} />;
      if (clubMember.clubs.clubType == "Public-Closed Club")
        return (
          <ConnectedRequestJoinbtn
            clubID={clubMember.clubs.clubID}
            userID={this.props.loggedUserID}
          />
        );
    }

    if (clubMember.members != null) {
      if (clubMember.members.ispersonBlock) return <span />;
      if (clubMember.members.isRequested)
        return (
          <ConnectedCancelRequest clubID={clubMember.clubs.clubID} userID={this.props.loggedUserID} />
        );

      if (!clubMember.members.isRequested)
        return <ConnectedExitbtn clubID={clubMember.clubs.clubID} userID={this.props.loggedUserID} />;
    }
  }


  render() {
       
    return (
      <div className="club">
        <div className="clubhead">
          <text className="title">{this.props.clubMember.clubs.clubTitle}</text>
          {this.props.loggedUserRole == "Admin" ? (
            <span className="menu">
              <Icon icon={ic_more_vert} size={30} />

              <span className="menu-content">
                <p>Report Club</p>
                <NavLink
                  to={
                    "/clubs/deactivateclub/" +
                    this.props.clubMember.clubs.clubID
                  }
                >
                  <p>Deactivate Club</p>
                </NavLink>
              </span>
            </span>
          ) : (
            <span />
          )}

          {this.props.loggedUserRole != "Admin" &&
          this.props.clubMember.members != null ? (
            this.props.clubMember.members.role == "Club Owner" ? (
              <span className="menu">
                <Icon icon={ic_more_vert} size={30} />
                <span className="menu-content">
                  <p>Report Club</p>
                  <NavLink
                    to={
                      "/clubs/deactivateclub/" +
                      this.props.clubMember.clubs.clubID
                    }
                  >
                    <p>Deactivate Club</p>
                  </NavLink>
                </span>
              </span>
            ) : (
              <span />
            )
          ) : (
            <span />
          )}
        </div>

        <div>
          <img
            src={this.props.clubMember.clubs.profilePic}
            alt="profile pic"
            className="groupicon"
          />
        </div>
        <div>
          <p className="status">{this.props.clubMember.clubs.description}</p>
          <p className="creation">
            Created By{" "}
            {this.props.users.map(user => {
              if (user.userID == this.props.clubMember.clubs.clubCreatedBy)
                return <text>{user.displayName}</text>;
            })}{" "}
            on{" "}
            {new Date(this.props.clubMember.clubs.createdOn).toDateString()}}
          </p>
        </div>
        <div className="members">
          <span>
            <Icon icon={user} size={25} />
            <text>{this.props.clubMember.count}</text>
          </span>
          {this.getButtonType(this.props.clubMember)}
        </div>
        <Route
          path={"/clubs/deactivateclub/" + this.props.clubMember.clubs.clubID}
          component={() => (
            <Deactivateclub
              to="/clubs"
              clubID={this.props.clubMember.clubs.clubID}
              clubTitle={this.props.clubMember.clubs.clubTitle}
            />
          )}
        />
      </div>
    );
  }
}
class Joinbtn extends React.Component<any, any> {
  render() {
    return (
      <button
        className="join"
        onClick={async () =>
          {
           await this.props.dispatch(addUserToPublicClub(this.props.clubID, this.props.userID));
            await this.props.dispatch(FetchClubMembersList()); 
          }
          
        }
      >
        Join
      </button>
    );
  }
}
class CancelRequest extends React.Component<any, any> {
  render() {
    return (
      <button
        className="cancelrequest"
        onClick={async () =>
          {
           await  this.props.dispatch(cancelRequest(this.props.clubID, this.props.userID));
            await this.props.dispatch(FetchClubMembersList()); 
          }

        }
      >
        Cancel Request
      </button>
    );
  }
}
class RequestJoinbtn extends React.Component<any, any> {
  render() {
    return (
      <button
        className="join"
        onClick={async () => 
           {
            await this.props.dispatch(makeRequest(this.props.clubID, this.props.userID));
           await  this.props.dispatch(FetchClubMembersList()); 
          }
        }
      >
        Request Join
      </button>
    );
  }
}
class Exitbtn extends React.Component<any, any> {
  render() {
    return (
      <button
        className="exit"
        onClick={async() =>{
             
         await  this.props.dispatch(removeUser(this.props.clubID, this.props.userID));
         await  this.props.dispatch(FetchClubMembersList()); 
        }
        }
      >
        Exit Club
      </button>
    );
  }
}
function mapStateToProps(State) {
     
  console.log(State);
  return {
    requests: State.ClubReducer.requests,
    loggedUserRole: State.AppReducer.LoggedUser.role,
    loggedUserID:State.AppReducer.LoggedUser.userID
  };
}

const ConnectedJoinbtn = connect()(Joinbtn);
const ConnectedExitbtn = connect()(Exitbtn);
const ConnectedCancelRequest = connect()(CancelRequest);
const ConnectedRequestJoinbtn = connect()(RequestJoinbtn);

export default connect(mapStateToProps)(Club);
