import React from "react";
import LeaderBoard from "./LeaderBoard";
import { navigate } from "@reach/router";

import firebase from "../../config";
import "firebase/firestore";
const db = firebase.firestore();
const rooms = db.collection("rooms");

class DashBoard extends React.Component {
  state = {
    user: "",
  };

  generateCode = () => {
    return "NJHJ";
  };
  /*
 db.collection('users').doc(this.username).collection('booksList').add({
  password: this.password,
  name: this.name,
  rollno: this.rollno
})
        ],*/
  setUpRoom = (code) => {
    rooms
      .doc(code)
      .set({
        host: this.props.user,
        current_question: 0,
        time_up: false,
      })
      .then(() => {
        rooms
          .doc(code)
          .collection("users")
          .doc(this.props.user)
          .set({
            username: this.props.user,
            score: 0,
            answers: ["", "", "", "", "", "", "", "", "", ""],
          });
        //create a collection of users within the room doc, within rooms collection

        console.log();
      });
    // make the room doc(as generated code), puts in the active user into the room
  }; //doing this here, so that users are available to view in host lobby

  updateHost = (event) => {
    event.preventDefault();
    this.props.setHost(true);
    const room = this.generateCode();
    this.setUpRoom(room);
    navigate(`/quiz/${room}`);
  };

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
          <button className="dashboard_game_buttons" onClick={this.updateHost}>
            Host Game
          </button>
          <button className="dashboard_game_buttons">Join Game</button>
        </div>
        {/* <FriendsList friends={user.friends} path={props.path} /> */}
        <LeaderBoard />
      </div>
    );
  }
}

export default DashBoard;
