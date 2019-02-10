import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import AdministrationContainer from "./components/Administration/AdministrationContainer";
import Layout from "./Layout/Layout";
import TaskList from './components/TaskList/TaskList';
import HomePage from './components/Homepage/HomePage';
import NewTask from './components/NewTask/NewTask';
import { AuthContext } from './graphql/auth';

class Router extends React.Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={AdministrationContainer} />
            <Route path="/tasklist" component={TaskList} />
            <Route path="/" exact={true} component={HomePage}/>
            <Route path="/form" component={NewTask} />
            <AuthContext.Consumer>
              {({isLoggedIn}) => !isLoggedIn && <Redirect to="/" exact={true} />}
            </AuthContext.Consumer>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Router;
