import React from "react";
import "firebase/firestore";
import firebase from "../../config.js";
import "firebase/functions";
const db = firebase.firestore();
//const room = db.collection("Rooms").doc("XYZA");
const rooms = db.collection("rooms");
class Room extends React.Component {
  state = {
    users: [],
    host: "",
    questions: [],
    time_up: false,
    current_question: 0,
    isLoading: true,
  };

  getUserInfo = () => {
    return rooms.doc(this.props.room_id).collection("users").get();
  };

  getRoomInfo = (roomData) => {
    const userData = [];
    this.getUserInfo().then((docs) => {
      docs.forEach((doc) => {
        userData.push(doc.data());
        //NOW HAVE ACCESS TO USER DATA FOR ROOM - NEED TO SET TO STATE
      });
      this.setState({
        users: [...userData],
        host: roomData.host,
        questions: [...roomData.questions],
        time_up: roomData.time_up,
        current_question: roomData.current_question,
        isLoading: false,
      });
    });

    //get the users collection from the room document inside the rooms collection
    //for each document in the users collection, make a user object from each field in the document
    //push each user document to a users array
    //set users array in state to the users array
  };

  selectAnswer = (event) => {
    const answer = event.target.innerText;
    // this.setState((prevState) => {
    //   users: [...prevState, ]
    // })
    rooms
      .doc(this.props.room_id)
      .collection("users")
      .doc(this.props.user)
      .update({ answers: firebase.firestore.FieldValue.arrayUnion(answer) });
  };

  updateUserScore = () => {
    ///compare each users answers against the correct answer, update score on db

    //get into users collection and check this.props.user .answers[current_question]
    //if this === correct_answer[current_question] then incremement score by 1

    db.collection("rooms")
      .doc(this.props.room_id)
      .collection("users")
      .doc(this.props.user)
      .get()
      .then((doc) => {
        let answer = doc.data().answers[this.state.current_question];
        console.log(
          this.state.questions[this.state.current_question].correct_answer,
          "all of it"
        );
        console.log(this.state.questions, "all questions");
        console.log(this.state.questions[this.state.current_question]);
        console.log(this.state.current_question, "current q");
        if (
          answer ===
          this.state.questions[this.state.current_question].correct_answer
        ) {
          db.collection("rooms")
            .doc(this.props.room_id)
            .collection("users")
            .doc(this.props.user)
            .update({ score: firebase.firestore.FieldValue.increment(1) });
        }
      });
  };

  allAnsweredListener = db
    .collection("rooms")
    .doc(this.props.room_id)
    .collection("users")
    .onSnapshot((querySnapshot) => {
      let allAnswered = true;
      //get req to db

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.data().answers.length, "answers length in listener");
        console.log(
          this.state.current_question,
          "current question in listener"
        );
        if (!doc.data().answers.length > this.state.current_question) {
          allAnswered = false;
        }
      });

      if (allAnswered) {
        //
        db.collection("rooms")
          .doc(this.props.room_id)
          .update({ time_up: true });
        this.setState((prevState) => {
          const newQuestion = prevState.current_question++;
          return { time_up: true, current_question: newQuestion };
        });
        this.updateUserScore();
        console.log("hi");
      }
    });

  componentDidMount() {
    console.log("user in room", this.props.user);
    rooms
      .doc(this.props.room_id)
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
    console.log(this.state.time_up, "here is time-up");
    if (this.state.isLoading === true) {
      return <h1>LOADING.....</h1>;
    } else {
      return (
        <div>
          <h2>Question {this.state.current_question + 1}</h2>
          <h1> {this.state.questions[this.state.current_question].question}</h1>
          <div className="answerbuttons--container">
            {this.state.questions[this.state.current_question].all_answers.map(
              (answer) => {
                return (
                  <button
                    onClick={this.selectAnswer}
                    className="answerbutton"
                    key={answer}
                  >
                    {answer}
                  </button>
                );
              }
            )}
          </div>
          <div>
            {this.state.users.map((user, i) => {
              return <p key={user + i}>{`${user.username}: ${user.score}`}</p>;
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
