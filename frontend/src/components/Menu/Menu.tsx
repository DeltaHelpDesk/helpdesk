import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { AuthContext } from 'src/graphql/auth';
import { Button } from '@material-ui/core';


const styles = {
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
    firstItem: {
        color: "white",
        textDecoration: "none",
    },
    menuItem: {
        color: "white",
        textDecoration: "none",
        marginLeft: "5px",
        padding: "10px 15px",
        borderRadius: "5%",
        '&:hover': {
            background: "rgba(255,255,255,0.5)",
        }
    }
};

const ButtonAppBar: React.SFC<WithStyles<string>> = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.grow}>
                        <NavLink className={classes.firstItem} to="/">HELPDESK</NavLink>
                    </Typography>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="hamburger">
                        <div className="full-hamburger">
                            <div className="rotate-ham">
                                <div className="inner-hamburger" />
                            </div>
                        </div>
                    </label>
                    <div className="nav-items">
                        <NavLink className={classes.menuItem} to="/admin">{'Administration'.toUpperCase()}</NavLink>
                        <NavLink className={classes.menuItem} to="/tasklist">{'Tasklist'.toUpperCase()}</NavLink>
                        <NavLink className={classes.menuItem} to="/form">{'New task'.toUpperCase()}</NavLink>
                    </div>
                        <AuthContext.Consumer>{({logout, user}) =>
                            user && (
                            <div>
                                <span>{user.fullName}</span>
                                <Button onClick={logout}>Odhlásit se</Button>
                            </div>
                            )
                        }</AuthContext.Consumer>
                </Toolbar>

            </AppBar>
        </div>
    );
}

export default withStyles(styles)(ButtonAppBar);
