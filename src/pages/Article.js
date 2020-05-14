import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getContent } from "../requests/requests";
//TODO ADD TABS HERE, THIS WONT BE LANGUAGE PAGE, JUST A HOME PAGE< EMPTY FIRST NO LANDING
export default function Article(props) {
  const [content, setContent] = React.useState(null);
  const date = new Date().toDateString();
  let { id } = useParams();

  React.useEffect(async () => {
    const newContent = await getContent(id);
  });

  return (
    <>
      <div>
        {/* <img src="images/meal-ticket.svg" alt="" /> */}
        {/* <h1 className="img-title">meal ticket</h1> */}
        <p>{date}</p>
      </div>
      <ul>
        <li>
          {/* <Link to="/generate">
            <img src="images/generate-mt.svg" alt="generate meal ticket" /> */}
          <h2>Generate Meal Ticket</h2>
          {/* </Link> */}
        </li>
        <li>
          {/* <Link to="/tickets">
            <img src="images/find-mt.svg" alt="Find Meal Ticket" /> */}
          <h2>Find Meal Ticket</h2>
          {/* </Link> */}
        </li>
      </ul>
    </>
  );
}
