import React, { useContext } from "react";
import { AuthContext } from "@8base/react-sdk";
import { Link } from "react-router-dom";
//TODO ADD TABS HERE, THIS WONT BE LANGUAGE PAGE, JUST A HOME PAGE< EMPTY FIRST NO LANDING
export default function Index(props) {
  console.log(props.articles, "arrr");
  const date = new Date().toDateString();
  const { isAuthorized, authClient } = useContext(AuthContext);
  return (
    <>
      <div>
        {/* <img src="images/meal-ticket.svg" alt="" /> */}
        {/* <h1 className="img-title">meal ticket</h1> */}
        <p>{date}</p>
      </div>
      <div>
        <button onClick={() => authClient.authorize()}>Login</button>
      </div>
    </>
  );
}
