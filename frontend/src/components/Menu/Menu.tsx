import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';

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

function ButtonAppBar(props: any) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className="flex-direction-column">
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
                </Toolbar>

            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
