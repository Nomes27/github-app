
import { navigate, Link } from "@reach/router"

import React from "react";

class LandingPage extends React.Component {

//NEED TO DO FORM VALIDATION ON USER
  state = {
    user: ""
  }

  updateUsername = (event) => {
    this.setState({user: event.target.value})
  };

  submitUser = (event) => {
    event.preventDefault();
    console.log('this is being run')
    this.props.setUser(this.state.user)
    navigate('/dashboard'); 
  };

render() {
  return (
    <div className="landing-page--wrapper">
      <div className="landing-page--graphic"></div>
      <div className="landing-page--sign-in">
        <form onSubmit={this.submitUser}>
          <input
            onChange={this.updateUsername}
            type="text"
            placeholder="enter username..."
          ></input>
          <button type="submit">START PLAYING</button>
        </form>
      </div>
    </div>
  );
}

};

export default LandingPage;
