import React from "react";
import COFlag from "./assets/COFlag.png";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import { Switch as AntSwitch } from "antd";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Create from "./pages/Create";
import History from "./pages/History";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Header from "./components/Header";

function App(props) {
  return (
    <section className="wrapper">
      <AppRouter></AppRouter>
    </section>
  );
}

function AppRouter() {
  const [coloradoMode, setColoradoMode] = React.useState(false);
  const [currentTopic, setCurrentTopic] = React.useState(null);

  const setTheCurrentTopic = (value) => {
    setCurrentTopic(value);
  };

  return (
    <div>
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
          coloradoMode={coloradoMode}
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
              children={<Categories setTheCurrentTopic={setTheCurrentTopic} />}
            />
            <Route path="/contact" component={() => <Contact />} />
            <Route
              path="/articles/:topic"
              children={<Article coloradoMode={coloradoMode} />}
            />
            <Route path="/create/:topic" component={() => <Create />} />
            <Route path="/history/:topic" component={() => <History />} />
          </Switch>
        </>
      </div>
    </div>
  );
}

export default App;
