import React from "react";
import Room from "./Room";
import "firebase/firestore";
import firebase from "../../config.js";
import axios from "axios";
import { formatQuestions } from "../../utils/utils";
import exit from "../../img/exit.png";
import { navigate } from "@reach/router";
const db = firebase.firestore();
const rooms = db.collection("rooms");

class Quiz extends React.Component {
  state = {
    category: 9,
    difficulty: "easy",
    isLoading: true,
    showQuiz: false,
    users: [],
    multi: true,
    loading: true,
    error: "",
  };

  getQuestions = () => {
    const params = {
      category: this.state.category,
      difficulty: this.state.difficulty,
      amount: 10,
      type: "multiple",
    };
    return axios.get("https://opentdb.com/api.php", {
      params,
    });
  };

  startQuiz = (event) => {
    event.preventDefault();
    if (!this.state.multi || this.state.users.length > 1) {
      this.getQuestions().then((response) => {
        const questions = response.data.results;
        const formattedQuestions = formatQuestions(questions);
        rooms
          .doc(this.props.room_id)
          .update({ questions: formattedQuestions, showQuiz: true });
      });
    } else {
      this.setState({
        error: "Must have more than 1 user to start a multiplayer game!",
      });
    }
  };

  resetQuiz = () => {
    db.collection("rooms").doc(this.props.room_id).update({ showQuiz: false });
  };

  showQuizListener = db
    .collection("rooms")
    .doc(this.props.room_id)
    .onSnapshot((roomSnapshot) => {
      if (
        roomSnapshot.data() !== undefined &&
        roomSnapshot.data().showQuiz !== this.state.showQuiz
      ) {
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
        error: "",
      });
    });

  playersInRoom = () => {
    return (
      <div className="quiz-players">
        <h3 className="ready-to-play">Players in room:</h3>
        <ul className="players-in-room">
          {this.state.users.map((user, i) => {
            return <li key={`${user}${i}`}>{user.username}</li>;
          })}
        </ul>
      </div>
    );
  };

  selectTopic = (event) => {
    this.setState({ category: event.target.value });
  };

  selectDifficulty = (event) => {
    this.setState({ difficulty: event.target.value });
  };

  componentDidMount() {
    rooms
      .doc(this.props.room_id)
      .get()
      .then((doc) => {
        this.setState({
          multi: doc.data().multi,
          loading: false,
        });
      });
  }

  backToDash = () => {
    navigate("/dashboard");
  };

  render() {

    if (this.state.loading) {
      return <h1 className="room-code">LOADING</h1>;
    } else if (this.state.showQuiz) {
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
          <div className="choose-wrapper">

            <img className="exit" src={exit} onClick={this.backToDash} alt="door icon"></img>


            {this.state.multi ? (
              <h1 className="room-code">Room code: {this.props.room_id}</h1>
            ) : (
              <h1 className="room-code">SOLO MODE</h1>
            )}
            <h3 className="quiz-choose">Choose a topic</h3>

            <select onChange={this.selectTopic}>
              <option value="9">General knowledge</option>
              <option value="27">Animals</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="18">Computers</option>
              <option value="11">Film</option>
              <option value="21">Sport</option>
              <option value="12">Music</option>
              <option value="10">Books</option>
              <option value="13">Musicals & Theatre</option>
              <option value="14">Television</option>
              <option value="15">Video Games</option>
              <option value="17">Science & Nature</option>
            </select>

            <h3 className="quiz-choose">Choose your difficulty</h3>
            <select onChange={this.selectDifficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <br></br>
            {this.playersInRoom()}
            {!this.state.loading && (
              <button className="start-quiz-btn" onClick={this.startQuiz}>
                START QUIZ!
              </button>
            )}
            <h1>{this.state.error}</h1>
          </div>
        );
      } else {
        return (
          <div className='user-waiting-to-start'>
            <h1>Waiting for host to start game</h1>
            {/* add a loader here*/}
            {this.playersInRoom()}
            <div className="waiting-loader"></div>
          </div>
        );
      }
    }
  }
}

export default Quiz;
