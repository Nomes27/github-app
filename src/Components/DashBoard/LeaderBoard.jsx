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
  //citiesRef.orderBy("state").orderBy("population", "desc")
  /*
  componentDidMount() {
    db.collection("Leaderboard")
      .get()
      .then((leaderboardSnapshot) => {
        let usersArr = [];
        leaderboardSnapshot.forEach((doc) => {
          usersArr.push({ name: doc.data().name, score: doc.data().score });
          this.setState({
            users: [...usersArr],
          });
        });
      });
  }*/
  leaderboardListener = db
    .collection("Leaderboard")
    .orderBy("score", "desc")
    .limit(10)
    .onSnapshot((usersSnapshot) => {
      console.log(usersSnapshot);
      let newUsers = [];
      usersSnapshot.forEach((doc) => {
        newUsers.push({ name: doc.data().name, score: doc.data().score });
      });
      this.setState({
        users: [...newUsers],
      });
    });

  render() {
    console.log(this.state.users, "users leaderboard");
    return (
      <div className="leaderboard">
        <div className="leaderboard--header">
          <h2 className="leaderboard--title">LEADERBOARD</h2>
          <FontAwesomeIcon icon={faTrophy} className="leaderboard--trophy" />
        </div>
        <table className="leaderboard--table">
          <thead>
            <tr>
              <th>Position</th>
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

      /*
<div className="leaderboard">
      <h2 className="leaderboard--title">Leaderboard</h2>
      <table className="leaderboard--table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
              <tr>
               <td className="leaderboard--position">1</td>
            <td className="leaderboard--username">ilikequizzes</td>
            <td className="leaderboard--score">500</td>
            </tr>
              <tr>
            <td className="leaderboard--position">2</td>
            <td className="leaderboard--username">notacat</td>
            <td className="leaderboard--score">450</td>
          </tr>
          <tr>
            <td className="leaderboard--position">3</td>
            <td className="leaderboard--username">coolbean</td>
            <td className="leaderboard--score">420</td>
          </tr>
          <tr>
            <td className="leaderboard--position">4</td>
            <td className="leaderboard--username">Quizmaster2020</td>
            <td className="leaderboard--score">400</td>
          </tr>
          <tr>
            <td className="leaderboard--position">5</td>
            <td className="leaderboard--username">Fredo</td>
            <td className="leaderboard--score">380</td>
          </tr>
          <tr>
            <td className="leaderboard--position">6</td>
            <td className="leaderboard--username">Sal10</td>
            <td className="leaderboard--score">340</td>
          </tr>
          <tr>
            <td className="leaderboard--position">7</td>
            <td className="leaderboard--username">BillyBones</td>
            <td className="leaderboard--score">340</td>
          </tr>
          <tr>
            <td className="leaderboard--position">8</td>
            <td className="leaderboard--username">smartypants</td>
            <td className="leaderboard--score">300</td>
          </tr>
          <tr>
            <td className="leaderboard--position">9</td>
            <td className="leaderboard--username">jazzyapple</td>
            <td className="leaderboard--score">280</td>
          </tr>
          <tr>
            <td className="leaderboard--position">10</td>
            <td className="leaderboard--username">poppinfresh</td>
            <td className="leaderboard--score">200</td>
          </tr>
        </tbody>
      </table>
    </div>
            */
    );
  }
}

export default LeaderBoard;
