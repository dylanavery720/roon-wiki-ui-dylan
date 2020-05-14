import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Tabs, Row, Col, Input } from "antd";
const { TabPane } = Tabs;

export default function Header() {
  const [searchValue, setSearchValue] = React.useState("");
  const { Search } = Input;

  return (
    <>
      <Row className="Header-row" gutter={8}>
        <Col span={8}>
          <Tabs type="card" animated>
            <TabPane
              key={1}
              tab={
                <Link to={`/articles/${searchValue}`}>
                  <h2>Article</h2>
                </Link>
              }
            ></TabPane>
            <TabPane
              key={2}
              tab={
                <Link to={`/talk/${searchValue}`}>
                  <h2>Talk</h2>
                </Link>
              }
            ></TabPane>
          </Tabs>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            onSearch={(value) => {
              setSearchValue(value);
            }}
          ></Search>
        </Col>
        {searchValue.length > 1 && <Redirect to={`/articles/${searchValue}`} />}
      </Row>
    </>
  );
}
