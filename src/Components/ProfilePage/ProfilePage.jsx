import React from "react";
import FriendsList from "../Shared/FriendsList";

const user = {
  name: "alex",
  avatar:
    "https://bigideasforsmallbusiness.com/wp-content/uploads/2017/07/blog4site_7-13-17_Quiz-on-Tax-Rules_dreamstime-480x420.jpg",
  friends: ["Naomi", "Tia", "Will"],
};
//ADD ON CLICK WHICH BRINGS UP FORM
class ProfilePage extends React.Component {
  state = {
    showForm: false,
  };

  displayForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  sendNewName = () => {
    //send new username to the db
  };

  render() {
    console.log(this.state.showForm);
    return (
      <div className="profile_grid">
        <div className="profile_grid_item1">
          <section>
            <h1 className="profile_h1">{user.name.toUpperCase()}</h1>
            <button onClick={this.displayForm} className="profile_button">
              Change Username
            </button>
            {this.state.showForm && (
              <form>
                <input placeholder="enter new username"></input>
                <button onclick={this.sendNewName}>SUBMIT</button>
              </form>
            )}
          </section>
          <section>
            <img className="profile_avatar" src={`${user.avatar}`}></img>
            <br />
            <button className="profile_button">Change Avatar</button>
            <img
              className="profile_graphic"
              src="https://chessit.co.uk/bj/wp-content/uploads/2018/10/quiz-2074324_640.png" //IS HIDDEN UNTIL SCREEN IS LARGE
            ></img>
          </section>
        </div>

        <div className="profile_grid_item2">
          <FriendsList friends={user.friends} path={this.props.path} />
          <form>
            <label htmlFor="name">Add friend by username</label>
            <br></br>
            <input
              className="profile_form"
              type="text"
              id="name"
              name="name"
            ></input>
            <button className="profile_form">ADD</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
