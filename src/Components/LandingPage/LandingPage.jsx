import { useEffect, useState } from "react";
import { useNavigate } from "@reach/router"

import React from "react";

class LandingPage extends React.Component {

state = {
  user: ''
}

  updateUsername = (event) => {
    this.props.setUser(event.target.value);
  };
  submitUser = (event) => {
    event.preventDefault();
    this.props.setUser(this.state.user)
    const navigate = useNavigate()
     navigate('./dashboard', { replace: true })
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
