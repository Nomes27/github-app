import React from "react";
import LeaderBoard from "./LeaderBoard";
import FriendsList from "./FriendsList";
const user = {
  name: "alex",
  avatar:
    "https://bigideasforsmallbusiness.com/wp-content/uploads/2017/07/blog4site_7-13-17_Quiz-on-Tax-Rules_dreamstime-480x420.jpg",
};
function DashBoard() {
  return (
    <div>
      <header>
        <button>Log out </button>
        <button>Settings </button>
        <img src={`${user.avatar}`} />
        <p>Hello, {user.name}!</p>
      </header>
      <button>Host Game</button>
      <button>Join Game</button>
      <FriendsList />
      <LeaderBoard />
    </div>
  );
}

export default DashBoard;
