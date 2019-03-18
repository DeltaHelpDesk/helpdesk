import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AdministrationContainer from "./components/Administration/AdministrationContainer";
import Layout from "./Layout/Layout";
import TaskList from './components/TaskList/TaskList';
import HomePage from './components/Homepage/HomePage';
import NewTask from './components/NewTask/NewTask';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UserList from "./components/Administration/UserList/UserList";
import About from './components/About/About';

class Router extends React.Component<{}> {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/about" component={About} />
                        <AuthenticatedRoute path="/admin" component={AdministrationContainer} />
                        <AuthenticatedRoute path="/tasklist" component={TaskList} />
                        <AuthenticatedRoute path="/userlist" component={UserList} />
                        <Route path="/" exact={true} component={HomePage} />
                        <AuthenticatedRoute path="/form" component={NewTask} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default Router;
