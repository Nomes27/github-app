import React from "react";

class Lobby extends React.Component {
state = {
  roomCode: '',
  category: '',
  difficulty: '',
  isLoading: true
}



render() {
  return <div>
    <h1>Your code: NJHJ</h1>
    <h3>Topic</h3>
    <select>
      <option>General knowledge</option>
      <option>Animals</option>
      <option>Geography</option>
      <option>History</option>
      <option>Art</option>
      <option>Sport</option>
      <option>Entertainment: Music</option>
    </select>

    <h3>Difficulty</h3>
    <select>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>

<br></br>
    <button>START QUIZ!</button>
  </div>;
}
}

export default Lobby;
