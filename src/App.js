import "./App.css";
import React from "react";
import firebase from "./config";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import LandingPage from "./components/LandingPage/LandingPage";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();
const rooms = db.collection("rooms");

function App() {
  return (
    <div className="App">
      <header className="App-header">Test</header>
      <LandingPage />
    </div>
  );
}

export default App;
