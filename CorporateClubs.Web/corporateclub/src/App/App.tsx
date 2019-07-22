import React from "react";
import "./App.css";
import Navigate from "../store/HeadNav/Navigate";
import Admin from "../store/Admin/Admin";
import Clubs from "../store/Clubs/Clubs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../store/Home/HomeComponent";
import Head from "../store/HeadNav/Head";
import Profile_Head from "../store/Profile/ProfilePage";
import { connect } from "react-redux";
import MyThreads from "../store/Home/MyThreads";
import { GetLoggedUserDetails, storeConnectionID } from "./AppActions/AppActions";
import Connections from "../store/Connections/Connections";
import { withRouter } from "react-router-dom";
import Loading from "./LoadingPage/Loading";
import * as signalR from "@aspnet/signalr";

class App extends React.Component<any, any> {
  
  constructor(props)
  {
    super(props);
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:3333/conversationhub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
    .configureLogging(signalR.LogLevel.Trace)
    .build();
    this.state={
      NavigatewithLocation:null,
      connection:connection
    }


  }
  componentWillMount() {
    this.props.dispatch(GetLoggedUserDetails());
    this.props.dispatch(storeConnectionID(this.state.connection));
     this.setState({NavigatewithLocation:withRouter(props => <Navigate {...props} />)});
  }

  render() {
    
      
    //returning loading page if fetch call is not resolved
    // if(this.props.error=="not mounted")
    //  return <Loading/>
    // if (this.props.error != "") {
    //   return <Forbidden />;
    // } else {
      return (
        <div className="app">
          <Router>
            <div className="commonNav">
              <this.state.NavigatewithLocation />
              <Head
                UserDisplayName={this.props.LoggedUser.displayName}
                profilePic={this.props.LoggedUser.profilePic}
              />
            </div>

            <div className="body">
              <Switch>
                <Route path="/profile" component={Profile_Head} />
                <Route path="/Clubs" component={Clubs} />
                <Route path="/Admin" component={Admin} />
                <Route path="/Connections" component={Connections} />
                <Route path="/Home/MyThreads" component={MyThreads} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </Router>
          {/* {this.props.isLoading?<Loading/>:<span/>} */}
        </div>
      );
    }
  }


function mapStatetoProps(state) {
    
  return {
    LoggedUser: state.AppReducer.LoggedUser,
    error: state.AppReducer.error,
    isLoading: state.AppReducer.isLoading,
    connectionID:state.AppReducer.connectionID
  };
}

export default connect(mapStatetoProps)(App);
