import React from "react";



function FriendsList(props) {
  return <ul className="friendslist">
    {props.friends.map(friend => {
      return <div className="friendslist-friend"><li>{friend}</li></div>
    })}
          </ul>
}

export default FriendsList;
