import React from "react";
import "firebase/firestore";
import firebase from "../../config.js";

const db = firebase.firestore();
const room = db.collection("Rooms").doc("XYZA");

class Room extends React.Component {
  state = {
    users: [],
    host: "",
    questions: [],
    time_up: false,
    current_question: 0,
    isLoading: true,
  };

  getRoomInfo = (roomData) => {
    this.setState({
      users: [...roomData.users],
      host: roomData.host,
      questions: [...roomData.questions],
      time_up: roomData.time_up,
      current_question: roomData.current_question,
      isLoading: false,
    });
  };

  componentDidMount() {
    room
      .get()
      .then((doc) => {
        if (doc.exists) {
          const roomData = doc.data();
          this.getRoomInfo(roomData);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    console.log("this is the new state", this.state);
    console.log();
    if (this.state.isLoading === true) {
      return <h1>LOADING.....</h1>;
    } else {
      return (
        <div>
          <h2>Question {this.state.current_question + 1}</h2>
          <h1> {this.state.questions[this.state.current_question].question}</h1>

          {this.state.questions[this.state.current_question].all_answers.map(
            (answer) => {
              return <button key={answer}>{answer}</button>;
            }
          )}

          <div>
            {this.state.users.map((user) => {
              return <p>{`${user.username}: ${user.score}`}</p>;
            })}
          </div>
        </div>
      );
    }
  }
}

export default Room;

// function FriendsList() {
//   friends
//     .get()
//     .then(function (doc) {
//       if (doc.exists) {
//         console.log(doc.data());
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }
//     })
//     .catch(function (error) {
//       console.log("Error getting document:", error);
//     });
//   return <h1>Friends-list goes here...</h1>;
// }
// export default FriendsList;
