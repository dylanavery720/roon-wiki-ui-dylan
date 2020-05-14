import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Tabs, Row, Col, Input } from "antd";
const { TabPane } = Tabs;
//TODO ADD TABS HERE, THIS WONT BE LANGUAGE PAGE, JUST A HOME PAGE< EMPTY FIRST NO LANDING
export default function Header() {
  const [searchValue, setSearchValue] = React.useState("");
  const { Search } = Input;

  return (
    <>
      <Row className="Header-row" gutter={8}>
        <Col span={8}>
          <Tabs
            // style={{ backgroundColor: "white" }}
            // tabBarStyle={{ backgroundColor: "#ECECEC" }}
            type="card"
            animated
          >
            <TabPane
              key={1}
              tab={
                <Link to={`/articles/${searchValue}`}>
                  <h2>Article</h2>
                </Link>
              }
            ></TabPane>
            <TabPane key={2} tab={`Talk`}></TabPane>
          </Tabs>
          <Search
            placeholder="input search text"
            enterButton="Search"
            onSearch={(value) => {
              console.log(value);
              setSearchValue(value);
            }}
          ></Search>
          {searchValue.length > 1 && (
            <Redirect to={`/articles/${searchValue}`} />
          )}
        </Col>
      </Row>
      {/* <div>
        <img src="images/meal-ticket.svg" alt="" />
        <h1 className="img-title">meal ticket</h1>
        <p>{date}</p>
      </div> */}
      {/* <ul>
        <li>
          <Link to="/generate">
            <img src="images/generate-mt.svg" alt="generate meal ticket" />
          <h2>Generate Meal Ticket</h2>
          </Link>
        </li>
        <li>
          <Link to="/tickets">
            <img src="images/find-mt.svg" alt="Find Meal Ticket" />
          <h2>Find Meal Ticket</h2>
          </Link>
        </li>
      </ul> */}
    </>
  );
}
