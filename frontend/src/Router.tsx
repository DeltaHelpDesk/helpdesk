import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AdministrationContainer from "./components/Administration/AdministrationContainer";
import Layout from "./Layout/Layout";
import TaskList from './components/TaskList/TaskList';
import HomePage from './components/Homepage/HomePage';
import NewTask from './components/NewTask/NewTask';
import AuthenticatedRoute from './components/AuthenticatedRoute';

class Router extends React.Component<{}> {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <AuthenticatedRoute path="/admin" component={AdministrationContainer} />
                        <AuthenticatedRoute path="/tasklist" component={TaskList} />
                        <Route path="/" exact={true} component={HomePage} />
                        <AuthenticatedRoute path="/form" component={NewTask} />
                        <AuthenticatedRoute path="/task/:id" component={TaskDetail} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default Router;
