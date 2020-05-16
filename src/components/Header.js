import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Tabs, Row, Col, Input, Button } from "antd";
const { TabPane } = Tabs;

export default function Header(props) {
  const [searchValue, setSearchValue] = React.useState("");
  const [leftActiveKey, setLeftActiveKey] = React.useState("0");
  const [rightActiveKey, setRightActiveKey] = React.useState("0");
  const { Search } = Input;
  let location = useLocation();
  let path = location.pathname;

  return (
    <>
      <Row className="Header-row" gutter={8}>
        <Col span={8}>
          <Tabs
            defaultActiveKey="0"
            activeKey={
              path.includes("articles") || path.includes("history")
                ? "1"
                : leftActiveKey
            }
            onChange={(key) => setLeftActiveKey(key)}
            type="card"
            animated
          >
            <TabPane
              key={1}
              tab={
                <Link
                  to={`/articles/${
                    props.currentTopic ? props.currentTopic : searchValue
                  }`}
                >
                  <h2>Article</h2>
                </Link>
              }
            ></TabPane>
            <TabPane
              key={2}
              tab={
                <Link
                  to={`/talk/${
                    props.currentTopic ? props.currentTopic : searchValue
                  }`}
                >
                  <h2>Talk</h2>
                </Link>
              }
            ></TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <Tabs
            defaultActiveKey="0"
            activeKey={
              path.includes("history")
                ? rightActiveKey
                : path.includes("articles") || path.includes("talk")
                ? "1"
                : "0"
            }
            onChange={(key) => setRightActiveKey(key)}
            type="card"
            animated
          >
            <TabPane
              key={1}
              tab={
                <Link
                  to={`/articles/${
                    props.currentTopic ? props.currentTopic : searchValue
                  }`}
                >
                  <h2>Read</h2>
                </Link>
              }
            ></TabPane>
            <TabPane
              key={2}
              tab={
                <Link
                  to={`/history/${
                    props.currentTopic ? props.currentTopic : searchValue
                  }`}
                >
                  <h2>History</h2>
                </Link>
              }
            ></TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            enterButton={
              <Button
                style={{
                  backgroundColor: props.coloradoMode ? "#35647e" : "#1897ff",
                  color: "white",
                }}
              >
                Search
              </Button>
            }
            allowClear
            onSearch={(value) => {
              setSearchValue(value);
              props.setTheCurrentTopic(value);
            }}
          ></Search>
        </Col>
        {searchValue.length > 0 && (
          <Redirect
            to={`/articles/${
              props.currentTopic ? props.currentTopic : searchValue
            }`}
          />
        )}
      </Row>
    </>
  );
}
