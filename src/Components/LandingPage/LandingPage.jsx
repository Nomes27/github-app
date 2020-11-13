import { navigate } from "@reach/router";
import React from "react";
import logo from "../../img/quizhub.png";
import cactus from "../../img/avatar-placeholder.png";
import zombie from "../../img/zombie-avatar.png";
import sheep from "../../img/sheep-avatar.png";
import coffee from "../../img/coffee-avatar.png";
import alien from "../../img/alien-avatar.png";
import sloth from "../../img/sloth-avatar.png";
class LandingPage extends React.Component {
  //NEED TO DO FORM VALIDATION ON USER
  state = {
    user: "",
    error: "",
    showAvatars: false,
    avatar: "",
    prevAvatar: "",
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

  showAvatarToggle = (event) => {
    this.setState((prevState) => ({
      showAvatars: !prevState.showAvatars,
    }));
  };

  selectAvatar = (event) => {
    let name = event.target.name;
    this.props.setAvatar(name);
    this.setState((prevState) => ({
      avatar: name,
      prevAvatar: prevState.avatar,
    }));
    //for highlighting yellow on selected avatar
    event.target.classList.add("selected");
    event.target.classList.remove("landing-page--avatar");
    let element = document.getElementById(`${this.state.prevAvatar}`);
    if (element !== null) {
      element.classList.add("landing-page--avatar");
      element.classList.remove("selected");
    }
  }; /*
  var element = document.getElementById("my-class");
element.classList.add("class-name");*/

  render() {
    return (
      <div className="landing-page--wrapper">
        <img
          src={logo}
          alt="quizhub logo"
          className="landing-page--graphic"
        ></img>
        <form className="signin-form" onSubmit={this.submitUser}>
          <input
            className="signin-input"
            onChange={this.updateUsername}
            type="text"
            placeholder="enter a username..."
          ></input>
          <button className="signin-button" type="submit">
            PLAY
          </button>
        </form>
        <div className="outer-avatar-container">
          <button
            onClick={this.showAvatarToggle}
            className="landing-page-select-avatar-button"
          >
            Select Avatar
          </button>
          {this.state.showAvatars && (
            <div className="landing-page--avatar-container">
              <img
                className="landing-page--avatar"
                src={cactus}
                alt="cactus avatar"
                onClick={this.selectAvatar}
                name="cactus"
                id="cactus"
              ></img>
              <img
                className="landing-page--avatar"
                src={zombie}
                alt="zombie avatar"
                onClick={this.selectAvatar}
                name="zombie"
                id="zombie"
              ></img>
              <img
                className="landing-page--avatar"
                src={sheep}
                alt="sheep avatar"
                onClick={this.selectAvatar}
                name="sheep"
              ></img>
              <img
                className="landing-page--avatar"
                src={coffee}
                alt="coffee avatar"
                onClick={this.selectAvatar}
                name="coffee"
              ></img>
              <img
                className="landing-page--avatar"
                src={alien}
                alt="alien avatar"
                onClick={this.selectAvatar}
                name="alien"
              ></img>
              <img
                className="landing-page--avatar"
                src={sloth}
                alt="sloth avatar"
                onClick={this.selectAvatar}
                name="sloth"
              ></img>
            </div>
          )}
        </div>

        <h3>{this.state.error}</h3>
      </div>
    );
  }
}
//could have each img with a value of the url string and then click set avatar, which along with username,store avatar on props

export default LandingPage;
