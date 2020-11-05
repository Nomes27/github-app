import React from "react";
import "firebase/firestore";
import firebase from '../../config.js';

const db = firebase.firestore();
const room = db.collection('Rooms').doc('XYZA')

class Room extends React.Component {
state = {
    users: [],
    host: '',
    questions: [],
    time_up: false,
    current_question: 0,
}

getRoomInfo = (roomData) => {
        this.setState({
          users: [...roomData.users],
          host: roomData.host,
          questions: [...roomData.questions],
          time_up: roomData.time_up,
          current_question: roomData.current_question
      });
}

componentDidMount() {
  room.get()
  .then((doc) => {
    if(doc.exists) {
      const roomData = doc.data()
       this.getRoomInfo(roomData)
    } else {
      console.log("No such document!");
    }
  })
  .catch(function (error) {
          console.log("Error getting document:", error);
        });
 }

    
render() {
      console.log('this is the new state', this.state)
      return <h1>Friends-list goes here...</h1>;
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