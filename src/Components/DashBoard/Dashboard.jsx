import React from "react";
import LeaderBoard from "./LeaderBoard";
import { navigate } from "@reach/router";
import firebase from "../../config";
import "firebase/firestore";
import exit from "../../img/exit.png";
import axios from "axios";
const db = firebase.firestore();
const rooms = db.collection("rooms");
const onlineUsers = db.collection("onlineUsers");

class DashBoard extends React.Component {
  state = {
    user: "",
    loading: true,
    onlineUsers: [],
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

  getRoomToken = () => {
    return axios
      .get("https://opentdb.com/api_token.php?command=request")
      .then((res) => {
        return res.data.token;
      });
  };

  setUpRoom = (code, multi) => {
    return this.getRoomToken()
      .then((token) => {
        console.log(token);
        return rooms.doc(code).set({
          host: this.props.user,
          current_question: 0,
          time_up: false,
          showQuiz: false,
          multi: multi,
          sessionToken: token,
        });
      })
      .then(() => {
        return rooms.doc(code).collection("users").doc(this.props.user).set({
          username: this.props.user,
          score: 0,
          answers: [],
        });
        //create a collection of users within the room doc, within rooms collection
        // make the room doc(as generated code), puts in the active user into the room
        //doing this here, so that users are available to view in host lobby
      })
      .then(() => {
        return code;
      });
  };

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
    this.generateCode()
      .then((code) => {
        return this.setUpRoom(code, multi);
      })
      .then((code) => {
        navigate(`/quiz/${code}`);
      });
  };

  joinGame = (event) => {
    event.preventDefault();
    navigate(`/quiz`);
  };

  logOut = () => {
    onlineUsers.doc(this.props.user).delete();
    navigate(`/`);
  };

  componentDidMount() {
    onlineUsers.get().then((users) => {
      console.log(users);
      const newOnlineUsers = [];
      users.forEach((user) => {
        newOnlineUsers.push(user.data().username);
      });
      this.setState({ loading: false, onlineUsers: [...newOnlineUsers] });
    });
  }

  onlineUsersListener = onlineUsers.onSnapshot((usersSnapshot) => {
    let newOnlineUsers = [];
    usersSnapshot.forEach((user) => {
      newOnlineUsers.push(user.data().username);
    });
    this.setState({
      onlineUsers: [...newOnlineUsers],
    });
  });

  render() {
    console.log(this.state.onlineUsers);
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
        <h3>Online Users:</h3>
        {this.state.loading ? (
          <h4>Loading Users...</h4>
        ) : (
          this.state.onlineUsers.map((user) => {
            return <h6>{user}</h6>;
          })
        )}
      </div>
    );
  }
}

export default DashBoard;
