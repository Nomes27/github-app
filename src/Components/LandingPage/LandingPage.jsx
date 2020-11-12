import { navigate } from "@reach/router";

import React from "react";

class LandingPage extends React.Component {
  //NEED TO DO FORM VALIDATION ON USER
  state = {
    user: "",
    error: "",
  };

  updateUsername = (event) => {
    this.setState({ user: event.target.value, error: "" });
  };

  submitUser = (event) => {
    event.preventDefault();
    if (this.state.user.length === 0) {
      this.setState({ error: "Name cannot be blank!" });
    } else {
      this.props.setUser(this.state.user);
      navigate("/dashboard");
    }    
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
          <h3>{this.state.error}</h3>
        </div>
      </div>
    );
  }
}

export default LandingPage;
