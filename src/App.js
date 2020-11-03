import "./App.css";
import React from "react";
import firebase from "./config";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Router } from "@reach/router";
import LandingPage from "./Components/LandingPage";
import ProfilePage from "./Components/ProfilePage";
import SignUp from "./Components/SignUp";
import Room from "./Components/Room";
import Host from "./Components/Host";
import DashBoard from "./Components/Dashboard";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();
const rooms = db.collection("rooms");

function App() {
  return (
    <div className="App">
      <Router>
        <LandingPage path="/" />
        <DashBoard path="/dashboard" />
        <ProfilePage path="/profile" />
        <SignUp path="/sign-up" />
        <Host path="/quiz" />
        <Room path="quiz/:room_id" />
      </Router>
    </div>
  );
}

export default App;
