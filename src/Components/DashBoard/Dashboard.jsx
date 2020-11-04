import React from "react";
import LeaderBoard from "./LeaderBoard";
import FriendsList from "../Shared/FriendsList";
const user = {
  name: "alex",
  avatar:
    "https://bigideasforsmallbusiness.com/wp-content/uploads/2017/07/blog4site_7-13-17_Quiz-on-Tax-Rules_dreamstime-480x420.jpg",
};
function DashBoard() {
  return (
    <div>
      <header className="dashboard_header">
        <div className="dashboard_header_buttons">
          <button className="dashboard_header_button">Log out </button>
          <button className="dashboard_header_button">Settings </button>
        </div>
        <img src={`${user.avatar}`} className="dashboard_avatar" />
        <h1>Hello, {user.name}!</h1>
      </header>
      <div>
        <button className="dashboard_game_buttons">Host Game</button>
        <button className="dashboard_game_buttons">Join Game</button>
      </div>
      <FriendsList />
      <LeaderBoard />
    </div>
  );
}

export default DashBoard;
