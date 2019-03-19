import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles, Theme} from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) => ({
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
    },
    hamburger: {
        display: "none",
        position: "absolute" as "absolute",
        right: "5px",
        top: "0",
    },
    line: {
        width: "50px",
        height: "5px",
        backgroundColor: "#ecf0f1",
        display: "block",
        margin: "8px auto",
        WebkitTransition: "all 0.3s ease-in-out",
        OTransition: "all 0.3s ease-in-out",
        transition: "all 0.3s ease-in-out",
    },
    fullHamBurger: {
        background: "#000",
    },
    [theme.breakpoints.up('md')]: {
        hamburger: {
            display: "unset",
        },
        navItems: {
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },  
    }

});

function ButtonAppBar(props: any) {
    const { classes } = props;
    function myFunction() {
        document.getElementById("hamburger-6")!.classList.toggle("is-active")
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className="flex-direction-column">
                    <Typography variant="h6" className={classes.grow}>
                        <NavLink className={classes.firstItem} to="/">HELPDESK</NavLink>
                    </Typography>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className={classes.hamburger}>
                        <div className={classes.fullHamBurger + classes.hamburger} id="hamburger-6" onClick={myFunction}>
                            <span className={classes.line} />
                            <span className={classes.line} />
                            <span className={classes.line} />
                        </div>
                    </label>
                    <div className={classes.navItems}>
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
