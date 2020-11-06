import React from "react";
import "firebase/firestore";
import firebase from "../../config.js";

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
    return rooms.doc(this.props.room_id).collection('users').get()
  }

  getRoomInfo = (roomData) => {
    console.log(roomData)
    this.getUserInfo().then((docs) => {
      docs.forEach(doc => {
        console.log(doc.data())

        //NOW HAVE ACCESS TO USER DATA FOR ROOM - NEED TO SET TO STATE
      })

      this.setState({
        host: roomData.host,
        questions: [...roomData.questions],
        time_up: roomData.time_up,
        current_question: roomData.current_question,
        isLoading: false,
      });
 
      
    })

    //get the users collection from the room document inside the rooms collection
    //for each document in the users collection, make a user object from each field in the document
    //push each user document to a users array
    //set users array in state to the users array


  };

  selectAnswer = (event) => {
    const answer = event.target.value;
    rooms
      .doc(this.props.room_id)
      .collection("users")
      .doc(this.props.user)
      .set({ field: "test" });
    //update();
    //patch question to the db
  };

  componentDidMount() {
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
    console.log("this is the new state", this.state);
    console.log();
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
