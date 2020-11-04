import React from "react";

const deleteFriend = (friend) => {};

function FriendsList(props) {
  return (
    <div className="friendslist">
      <h3>Friends</h3>
      {props.friends.map((friend) => {
        return (
          <div className="friendslist-friend" key={friend}>
            <p>{friend}</p>
            {props.path === "/dashboard" && <p>Online</p>}
            {props.path === "/profile" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteFriend(friend);
                }}
              >
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FriendsList;
