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
import Lobby from "./Components/QuizRoom/Lobby";
import DashBoard from "./Components/DashBoard/Dashboard";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();
const rooms = db.collection("rooms");

class App extends React.Component {
  state = {
    user: "",
  };

  setUser = (user) => {
    this.setState({ user: user });
  };
  componentDidUpdate() {
    console.log("this is in app", this.state.user);
  }
  render() {
    console.log("state", this.state.user);
    return (
      <div className="App">
        <Router>
          <LandingPage
            path="/"
            setUser={this.setUser}
            testUser={this.state.user}
          />
          <DashBoard path="/dashboard" user={this.state.user} />
          <ProfilePage path="/profile" />
          <Lobby path="/quiz" />
          <Room path="quiz/:room_id" />
        </Router>
      </div>
    );
  }
}

export default App;
