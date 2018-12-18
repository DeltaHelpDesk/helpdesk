import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AdministrationContainer from "./components/Administration/AdministrationContainer";
import Layout from "./Layout/Layout";
import TaskList from './components/TaskList/TaskList';

class Router extends React.Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route path="/admin" component={AdministrationContainer} />
            <Route path="/tasklist" component={TaskList} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Router;