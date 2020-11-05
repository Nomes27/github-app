import React from "react";
import { useEffect, useState } from "react";
import LeaderBoard from "./LeaderBoard";
import FriendsList from "../Shared/FriendsList";

import firebase from "../../config";
import "firebase/firestore";
const db = firebase.firestore();
const userDB = db.collection("users").doc("alexhunter");

function DashBoard(props) {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    friends: [],
    online: false,
    score: 0,
  });
  useEffect(() => {
    userDB
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);
  console.log(props.user);
  return (
    <div>
      <header className="dashboard_header">
        <div className="dashboard_header_buttons">
          <button className="dashboard_header_button">Log out </button>
          <button className="dashboard_header_button">Settings </button>
        </div>
        <img src={`${user.avatar}`} className="dashboard_avatar" />
        <h1>Hello, {user.name}!</h1>
      </header>
      <div>
        <button className="dashboard_game_buttons">Host Game</button>
        <button className="dashboard_game_buttons">Join Game</button>
      </div>
      <FriendsList friends={user.friends} path={props.path} />
      <LeaderBoard />
    </div>
  );
}

export default DashBoard;
