import "./App.css";

import "firebase/firestore";
import "firebase/auth";

import LandingPage from "./Components/LandingPage/LandingPage";
import Join from "./Components/Join/Join";
import React from "react";
import { Router } from "@reach/router";
import ProfilePage from "./Components/ProfilePage/ProfilePage";

import Quiz from "./Components/QuizRoom/Quiz";
import DashBoard from "./Components/DashBoard/Dashboard";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

class App extends React.Component {
  state = {
    user: "",
    host: false,
    avatar: "",
  };

  setHost = (host) => {
    this.setState({ host: host });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  setAvatar = (avatar) => {
    this.setState({ avatar: avatar });
  };
  componentDidUpdate() {}

  render() {
    console.log(this.state, "state in app");
    return (
      <div className="App">
        <Router>
          <LandingPage
            path="/"
            setUser={this.setUser}
            testUser={this.state.user}
            setAvatar={this.setAvatar}
          />
          <DashBoard
            path="/dashboard"
            user={this.state.user}
            setHost={this.setHost}
            avatar={this.state.avatar}
          />
          <ProfilePage path="/profile" user={this.state.user} />
          <Join path="/quiz" user={this.state.user} host={this.state.host} />
          <Quiz
            path="/quiz/:room_id"
            user={this.state.user}
            host={this.state.host}
          />
        </Router>
      </div>
    );
  }
}

export default App;
