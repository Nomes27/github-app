import React from "react";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "firebase/firestore";
import firebase from "../../config.js";
import "firebase/functions";
const db = firebase.firestore();

//info from the db should fill the table
//examples are in there for now, but the username and score should corresponde to the first 10 items of the leaderboard collection on firestore

class LeaderBoard extends React.Component {
  state = {
    users: [],
  };

  leaderboardListener = db
    .collection("Leaderboard")
    .orderBy("score", "desc")
    .limit(5)
    .onSnapshot((usersSnapshot) => {
      let newUsers = [];
      usersSnapshot.forEach((doc) => {
        newUsers.push({ name: doc.data().name, score: doc.data().score });
      });
      this.setState({
        users: [...newUsers],
      });
    });

  render() {
    return (
      <div className="leaderboard">
        <div className="leaderboard--header">
          <h2 className="leaderboard--title">
            <FontAwesomeIcon icon={faTrophy} className="leaderboard--trophy" />
            LEADERBOARD
            <FontAwesomeIcon icon={faTrophy} className="leaderboard--trophy" />
          </h2>
        </div>
        <table className="leaderboard--table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => {
              return (
                <tr key={user + i} className="leaderboard--row">
                  <td className="leaderboard--position">{i + 1}</td>
                  <td className="leaderboard--username">{user.name}</td>
                  <td className="leaderboard--score">{user.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LeaderBoard;
