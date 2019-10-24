import * as React from "react";
import { ReactAuthContext } from "../src/graphql/auth";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

export default class AuthenticatedRoute extends React.Component<RouteProps> {
    static contextType = ReactAuthContext;
    render() {
        return this.context.loading ?
            <CircularProgress />
            :
            (this.context.isLoggedIn ? <Route {...this.props} /> : <Redirect to="/login" />);
    }
}
