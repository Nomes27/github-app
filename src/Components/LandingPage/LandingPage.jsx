import { useEffect, useState } from "react";

import React from "react";

const LandingPage = (props) => {
  const [user, setUser] = useState("");

  const updateUsername = (event) => {
    setUser(event.target.value);
    console.log(user);
  };
  const submitUser = (event) => {
    event.preventDefault();
    //post req
    console.log("clicked");
  };

  useEffect(() => {
    console.log(props.testUser);
  });
  return (
    <div className="landing-page--wrapper">
      <div className="landing-page--graphic"></div>
      <div className="landing-page--sign-in">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.setUser(user);
            console.log(props.testUser);
          }}
        >
          <input
            onChange={updateUsername}
            type="text"
            placeholder="enter username..."
          ></input>
        </form>

        <button type="submit">START PLAYING</button>
      </div>
    </div>
  );
};

export default LandingPage;
