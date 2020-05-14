import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { withApollo } from "react-apollo";
import { Route, Switch } from "react-router-dom";

import Index from "./pages/Index";
import Article from "./pages/Article";
import Header from "./components/Header";

function App(props) {
  const RouterApp = withApollo(AppRouter);
  return (
    <section className="wrapper">
      <RouterApp></RouterApp>
    </section>
  );
}

function AppRouter({ client }) {
  return (
    <div>
      <Header></Header>
      {/* <Sidebar></Sidebar> */}
      <>
        <Route path="/" exact component={Index} />
        {/* <Route path="/articles/" component={() => <Article />} /> */}
        {/* <Route path="/tickets/" component={() => <Tickets />} /> */}
        <Switch>
          <Route path="/articles/:id" children={<Article />} />
        </Switch>
      </>
    </div>
  );
}

export default App;
