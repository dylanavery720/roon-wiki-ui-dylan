import React, { useState, useEffect } from "react";
import COFlag from "./assets/COFlag.png";
import "./App.scss";
import { Route, Switch, Link } from "react-router-dom";
import { Switch as AntSwitch } from "antd";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Create from "./pages/Create";
import History from "./pages/History";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import { ColoradoContext } from "./contexts/Context.js";

function App(props) {
  return (
    <section className="wrapper">
      <AppRouter></AppRouter>
    </section>
  );
}

function AppRouter() {
  const [coloradoMode, setColoradoMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  useColoradoMode(coloradoMode);

  const setTheCurrentTopic = (value) => {
    setCurrentTopic(value);
  };

  return (
    <div>
      <ColoradoContext.Provider value={coloradoMode}>
        <div className={coloradoMode ? "sidenav coloradoSideNav " : "sidenav"}>
          <Link to={`/`}>
            <img
              height="50px"
              width="80px"
              className="App-logo"
              alt="coflag"
              src={COFlag}
            ></img>{" "}
          </Link>
          <Link to={"/categories"}>Categories</Link>
          <Link to={"/create"}>Create</Link>
          <Link to={"/contact"}>Contact</Link>
          <span style={{ padding: "6px" }}>
            Colorado Mode:{" "}
            <AntSwitch
              onChange={(checked) => setColoradoMode(checked)}
            ></AntSwitch>
          </span>
        </div>

        <div className={coloradoMode ? "main colorado" : "main"}>
          <Header
            currentTopic={currentTopic}
            setTheCurrentTopic={setTheCurrentTopic}
          ></Header>
          <>
            <Route
              path="/"
              exact
              component={() => (
                <Index setTheCurrentTopic={setTheCurrentTopic}></Index>
              )}
            />
            <Switch>
              <Route
                path="/categories"
                children={
                  <Categories setTheCurrentTopic={setTheCurrentTopic} />
                }
              />
              <Route path="/create/:topic" component={() => <Create />} />
              <Route path="/create" component={() => <Create />} />
              <Route path="/contact" component={() => <Contact />} />
              <Route path="/articles/:topic" children={<Article />} />
              <Route path="/history/:topic" component={() => <History />} />
            </Switch>
          </>
        </div>
      </ColoradoContext.Provider>
    </div>
  );
}

export default App;

function useColoradoMode(coloradoMode) {
  useEffect(() => {
    if (coloradoMode) {
      document.body.style = "background-color: #00529C;";
    } else {
      document.body.style = "background-color: white";
    }
  }, [coloradoMode]);
  return () => {
    document.body.style = "background-color: white";
  };
}
