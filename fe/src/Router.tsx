import * as React from "react";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import AdministrationContainer from "../components/Administration/AdministrationContainer";
import MainLayout from "../components/Layouts/Layout";
import TaskList from '../components/TaskList/TaskList';
import HomePage from '../components/Homepage/HomePage';
import NewTask from '../components/NewTask/NewTask';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UserList from "../components/Administration/UserList/UserList";
import TaskDetail from '../components/TaskDetail/TaskDetail';
import About from '../components/About/About';
import NewUser from '../components/Administration/NewUser/NewUser';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

class MainRouter extends React.Component<{}> {
    render() {
        return (
            <Router history={history}>
                <MainLayout>
                    <Switch>
                        <Route path="/" exact={true} component={HomePage} />
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/about" exact={true} component={About} />


                        {/* <AuthenticatedRoute path="/admin" exact={true} component={AdministrationContainer} /> */}
                        {/* <AuthenticatedRoute path="/tasklist" component={TaskList} /> */}
                        {/* <AuthenticatedRoute path="/admin/userlist" component={UserList} /> */}
                        {/* <AuthenticatedRoute path="/admin/newuser" component={NewUser} /> */}
                        {/* <AuthenticatedRoute path="/form" component={NewTask} /> */}
                        {/* <AuthenticatedRoute path="/task/:id" component={TaskDetail} /> */}
                        {/* <AuthenticatedRoute path="/board" component={TaskBoard} /> */}
                    </Switch>
                </MainLayout>
            </Router>
        );
    }
}

export default MainRouter;