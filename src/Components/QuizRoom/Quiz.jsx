import React, { useReducer } from "react";
import Room from "./Room";
import { navigate } from "@reach/router";
import "firebase/firestore";
import firebase from "../../config.js";
import axios from "axios";
import { formatQuestions } from "../../utils/utils";

const db = firebase.firestore();
const rooms = db.collection("rooms");

class Quiz extends React.Component {
  state = {
    // roomCode: "NJHJ",
    category: 9,
    difficulty: "easy",
    isLoading: true,
    showQuiz: false,
    users: [],
  };

  getQuestions = () => {
    const params = {
      category: this.state.category,
      difficulty: this.state.difficulty,
    };
    return axios.get("https://opentdb.com/api.php?amount=10&type=multiple", {
      params,
    });
  };

  //&category=9&difficulty=easy&type=multiple
  startQuiz = (event) => {
    event.preventDefault();
    this.getQuestions().then((response) => {
      const questions = response.data.results;
      const formattedQuestions = formatQuestions(questions);
      rooms
        .doc(this.props.room_id)
        .update({ questions: formattedQuestions, showQuiz: true });
    });
  };

  resetQuiz = () => {
    db.collection("rooms").doc(this.props.room_id).update({ showQuiz: false });
  };

  showQuizListener = db
    .collection("rooms")
    .doc(this.props.room_id)
    .onSnapshot((roomSnapshot) => {
      if (roomSnapshot.data().showQuiz !== this.state.showQuiz) {
        this.setState({
          showQuiz: roomSnapshot.data().showQuiz,
        });
      }
    });

  userslistener = db
    .collection("rooms")
    .doc(this.props.room_id)
    .collection("users")
    .onSnapshot((usersSnapshot) => {
      let newUsers = [];
      usersSnapshot.forEach((user) => {
        newUsers.push(user.data());
      });
      this.setState({
        users: [...newUsers],
      });
    });

  playersInRoom = () => {
    console.log("this function is running");
    return (
      <ul>
        {this.state.users.map((user) => {
          return <li>{user.username}</li>;
        })}
      </ul>
    );
  };

  selectTopic = (event) => {
    this.setState({ category: event.target.value });
  };

  selectDifficulty = (event) => {
    this.setState({ difficulty: event.target.value });
  };

  render() {
    console.log(this.state);
    if (this.state.showQuiz === true) {
      return (
        <Room
          room_id={this.props.room_id}
          user={this.props.user}
          resetQuiz={this.resetQuiz}
        />
      );
    } else {
      if (this.props.host) {
        return (
          <div>
            <h1>Your code: {this.props.room_id}</h1>
            <h3>Topic</h3>
            <select onChange={this.selectTopic}>
              <option value="9">General knowledge</option>
              <option value="27">Animals</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="25">Art</option>
              <option value="21">Sport</option>
              <option value="12">Music</option>
            </select>

            <h3>Difficulty</h3>
            <select onChange={this.selectDifficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <br></br>
            <button onClick={this.startQuiz}>START QUIZ!</button>

            <div className="users-in-room">{this.playersInRoom()}</div>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Waiting for host to start game</h1>
            <div className="users-in-room">{this.playersInRoom()}</div>
          </div>
        );
      }
    }
  }
}

export default Quiz;
