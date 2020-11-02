import "./App.css";
import React from "react";
import firebase from "./config";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//NEED TO INSTALL BOTH FIREBASE AND FIREBASE TOOLS

const db = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">Test</header>
    </div>
  );
}

export default App;
