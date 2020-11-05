import React from "react";
import LeaderBoard from "./LeaderBoard";
import { Link } from "@reach/router";

import firebase from "../../config";
import "firebase/firestore";
const db = firebase.firestore();
const userDB = db.collection("users").doc("alexhunter");

class DashBoard extends React.Component {

state = {
  user: '',
}

updateHost = (event) => {
  event.preventDefault()
  this.props.setHost(true)
}

// componentDidMount() {
//   userDB
//   .get()
//   .then(function (doc) {
//     if (doc.exists) {
//       const user = doc.data();
//       this.setState({
//         user: user.name
//       })
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch(function (error) {
//     console.log("Error getting document:", error);
//   });
// }

 render() {
  return (
    <div>
      <header className="dashboard_header">
        <div className="dashboard_header_buttons">
          <button className="dashboard_header_button">Log out </button>
          <button className="dashboard_header_button">Settings </button>
        </div>
        <h1>Hello, {this.props.user}!</h1>
      </header>
      <div>
        <button className="dashboard_game_buttons" onClick={this.updateHost}>Host Game</button>
        <button className="dashboard_game_buttons">Join Game</button>
      </div>
      {/* <FriendsList friends={user.friends} path={props.path} /> */}
      <LeaderBoard />
    </div>
  );
 }

}

export default DashBoard;
