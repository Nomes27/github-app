import React from "react";
import LeaderBoard from "./LeaderBoard";
import { navigate } from "@reach/router";
import firebase from "../../config";
import "firebase/firestore";
import exit from '../../img/exit.png';
const db = firebase.firestore();
const rooms = db.collection("rooms");

class DashBoard extends React.Component {
  state = {
    user: "",
  };

  generateCode = () => {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let charactersLength = characters.length;
      for ( let i = 0; i < 4; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }


  setUpRoom = (code) => {
    rooms
      .doc(code)
      .set({
        host: this.props.user,
        current_question: 0,
        time_up: false,
        showQuiz: false
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

  updateHost = (event) => {
    event.preventDefault();
    this.props.setHost(true);
    const room = this.generateCode();
    this.setUpRoom(room);
    navigate(`/quiz/${room}`);
  };

  joinGame = (event) => {
    event.preventDefault();
    navigate(`/quiz`)
  }

  logOut = () => {
    navigate(`/`);
  }

  render() {
    return (
      <div>
        <header className="dashboard-header">
          <div className="dashboard-header-buttons">
            <img src={exit} className="logout-btn" onClick={this.logOut}></img>
          </div>
          <h1 className='dashboard-greeting'>Hello, {this.props.user}!</h1>
        </header>
        <div className='dashboard-play-buttons'>
          <button className="play-btn" onClick={this.updateHost}>
            HOST GAME
          </button>
          <button className="play-btn" onClick={this.joinGame}>JOIN GAME</button>
        </div>
        {/* <FriendsList friends={user.friends} path={props.path} /> */}
        <LeaderBoard />
      </div>
    );
  }
}

export default DashBoard;
