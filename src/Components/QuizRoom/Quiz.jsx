import React from "react";
import Room from "./Room"
import {navigate, Router} from "@reach/router";

class Quiz extends React.Component {
state = {
  roomCode: 'NJHJ',
  category: 9,
  difficulty: 'easy',
  isLoading: true,
  showQuiz: false,
}

startQuiz = (event) => {
  event.preventDefault();
  this.setState({showQuiz: true})
  navigate(`/quiz/${this.state.roomCode}`)
}

selectTopic = (event) => {
  this.setState({category: event.target.value})
  
}

selectDifficulty = (event) => {
  this.setState({difficulty: event.target.value})
}

render() {
  if (this.state.showQuiz === true) {
    return <Room/>
  } else {
    return <div>
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
    </div>;
  }
}

}






export default Quiz;
