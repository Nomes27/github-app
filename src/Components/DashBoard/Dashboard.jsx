import React from "react";
import LeaderBoard from "./LeaderBoard";
import { navigate } from "@reach/router";
import firebase from "../../config";
import "firebase/firestore";
import exit from "../../img/exit.png";
import avatar from "../../img/avatar-placeholder.png";
const db = firebase.firestore();
const rooms = db.collection("rooms");

class DashBoard extends React.Component {
  state = {
    user: "",
  };

  generateCode = () => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return rooms
      .doc(result)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return result;
        } else {
          return this.generateCode();
        }
      });
  };

  setUpRoom = (code, multi) => {
    rooms
      .doc(code)
      .set({
        host: this.props.user,
        current_question: 0,
        time_up: false,
        showQuiz: false,
        multi: multi
      })
      .then(() => {
        rooms.doc(code).collection("users").doc(this.props.user).set({
          username: this.props.user,
          score: 0,
          answers: [],
        });
        //create a collection of users within the room doc, within rooms collection
      });
    // make the room doc(as generated code), puts in the active user into the room
  }; //doing this here, so that users are available to view in host lobby

  hostSolo = (event) => {
    event.preventDefault();
    this.hostGame(false);
  };

  hostMulti = (event) => {
    event.preventDefault();
    this.hostGame(true);
  };

  hostGame = (multi) => {
    this.props.setHost(true);
    this.generateCode().then((room) => {
      this.setUpRoom(room, multi);
      navigate(`/quiz/${room}`);
    });
  };

  joinGame = (event) => {
    event.preventDefault();
    navigate(`/quiz`);
  };

  logOut = () => {
    navigate(`/`);
  };

  render() {
    return (
      <div>
        <header className="dashboard-header">
          <div className="dashboard-header-buttons">
            <img
              src={exit}
              className="logout-btn"
              onClick={this.logOut}
              alt="logout button"
            ></img>
          </div>
          <img className='user-avatar' src={avatar}></img>
          <h1 className="dashboard-greeting">Hello, {this.props.user}!</h1>
        </header>
        <div className="dashboard-play-buttons">
          <button className="play-btn" onClick={this.hostMulti}>
            HOST GAME
          </button>
          <button className="play-btn" onClick={this.joinGame}>
            JOIN GAME
          </button>
          <button className="play-btn" onClick={this.hostSolo}>
            SOLO GAME
          </button>
        </div>

        <LeaderBoard />
      </div>
    );
  }
}

export default DashBoard;
