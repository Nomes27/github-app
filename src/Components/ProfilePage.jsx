import React from "react";
import FriendsList from "./FriendsList";

const user = {
  name: "alex",
  avatar:
    "https://bigideasforsmallbusiness.com/wp-content/uploads/2017/07/blog4site_7-13-17_Quiz-on-Tax-Rules_dreamstime-480x420.jpg",
};

function ProfilePage() {
  return (
    <div>
      <section>
        <h1 className="profile_h1">{user.name.toUpperCase()}</h1>
        <button className="profile_button">Change Username</button>
      </section>
      <section>
        <img className="profile_avatar" src={`${user.avatar}`}></img>
        <br />
        <button className="profile_button">Change Avatar</button>
      </section>
      <FriendsList />
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
  );
}

export default ProfilePage;
