import React from "react";
import COFlag from "./assets/COFlag.png";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import { Switch as AntSwitch } from "antd";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Create from "./pages/Create";
import History from "./pages/History";
import Header from "./components/Header";

function App(props) {
  return (
    <section className="wrapper">
      <AppRouter></AppRouter>
    </section>
  );
}

function AppRouter({ client }) {
  const [coloradoMode, setColoradoMode] = React.useState(false);

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
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
        Colorado Mode:{" "}
        <AntSwitch onChange={(checked) => setColoradoMode(checked)}></AntSwitch>
      </div>

      <div className={coloradoMode ? "main colorado" : "main"}>
        <Header coloradoMode={coloradoMode}></Header>
        <>
          <Route path="/" exact component={Index} />
          <Switch>
            <Route path="/articles/:topic" children={<Article />} />
            <Route path="/create/:topic" component={() => <Create />} />
            <Route path="/history/:topic" component={() => <History />} />
          </Switch>
        </>
      </div>
    </div>
  );
}

export default App;
