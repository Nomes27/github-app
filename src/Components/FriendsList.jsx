import React from "react";



function FriendsList(props) {
  return <ul className="friendslist">
    {props.friends.map(friend => {
      return <li>{friend}</li>
    })}
          </ul>
}

export default FriendsList;
