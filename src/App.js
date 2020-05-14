import React from "react";
import COFlag from "./assets/COFlag.png";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Switch as AntSwitch } from "antd";
import Index from "./pages/Index";
import Article from "./pages/Article";
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
        <img
          height="50px"
          width="80px"
          className="App-logo"
          alt="coflag"
          src={COFlag}
        ></img>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
        Colorado Mode:{" "}
        <AntSwitch onChange={(checked) => setColoradoMode(checked)}></AntSwitch>
      </div>

      <div className={coloradoMode ? "main colorado" : "main"}>
        <Header coloradoMode={coloradoMode}></Header>
        {/* <Sidebar></Sidebar> */}
        <>
          <Route path="/" exact component={Index} />
          {/* <Route path="/articles/" component={() => <Article />} /> */}
          <Switch>
            <Route path="/articles/:topic" children={<Article />} />
          </Switch>
        </>
      </div>
    </div>
  );
}

export default App;
