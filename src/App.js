import "./App.css";
import firebase from "./config";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import LandingPage from "./Components/LandingPage/LandingPage";

import React from "react";
import { Router } from "@reach/router";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Room from "./Components/QuizRoom/Room";
import Quiz from "./Components/QuizRoom/Quiz";
import DashBoard from "./Components/DashBoard/Dashboard";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();
const rooms = db.collection("rooms");

class App extends React.Component {
  state = {
    user: "",
    host: false,
  };

  setHost = (host) => {
    this.setState({ host: host });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  componentDidUpdate() {
    console.log("this is in app", this.state.user);
  }
  render() {
    console.log("state-user", this.state.user);
    console.log("state-host", this.state.host);
    return (
      <div className="App">
        <Router>
          <LandingPage
            path="/"
            setUser={this.setUser}
            testUser={this.state.user}
          />
          <DashBoard path="/dashboard" user={this.state.user} setHost={this.setHost} />
          <ProfilePage path="/profile" user={this.state.user} />
          <Quiz path="/quiz/:room_id" user={this.state.user} />
        </Router>
      </div>
    );
  }
}

export default App;
