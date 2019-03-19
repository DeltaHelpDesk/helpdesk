import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from "react";


import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },
    root: {
        flexGrow: 1
    },
    firstItem: {
        color: "white",
        textDecoration: "none"
    },
    menuItem: {
        color: "white",
        textDecoration: "none",
        marginLeft: "5px",
        padding: "10px 15px",
        borderRadius: "5%",
        '&:hover': {
            background: "rgba(255,255,255,0.5)"
        }
    },
    hamburger: {
        display: "none",
        position: "absolute" as "absolute",
        right: "5px",
        top: "0"
    },
    line: {
        width: "50px",
        height: "5px",
        backgroundColor: "#ecf0f1",
        display: "block",
        margin: "8px auto",
        WebkitTransition: "all 0.3s ease-in-out",
        OTransition: "all 0.3s ease-in-out",
        transition: "all 0.3s ease-in-out"
    },
    [theme.breakpoints.down('sm')]: {
        hamburger: {
            display: "block !important"
        },
        navItems: {
            display: "none !important",
            justifyContent: "center !important",
            alignItems: "center !important",
            "flex-direction": "column !important"
        },
        grow:{
            flexGrow: 0
        }
    },
    navItems: {
        display: "flex",
        "flex-direction": "row",
        '&.is-active': {
            display: "flex !important"
        }
    }

});

interface IMenuProps extends RouteComponentProps, WithStyles<typeof styles> {

}

interface IMenuState {
    isActive: boolean
}
class Hamburger extends React.Component<IMenuProps, IMenuState> {

    constructor(props: IMenuProps) {
        super(props);

        this.state = {
            isActive: false
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className="flex-direction-column">
                        <Typography variant="h6" className={classes.grow}>
                            <NavLink className={classes.firstItem} to="/">HELPDESK</NavLink>
                        </Typography>
                        <div className={classes.hamburger} onClick={() => this.setState({ isActive: !this.state.isActive })}>
                            <span className={classes.line} />
                            <span className={classes.line} />
                            <span className={classes.line} />
                        </div>
                        <div className={`${classes.navItems} ${this.state.isActive ? "is-active" : ""}`}>
                            <NavLink className={classes.menuItem} to="/admin">{'Administration'.toUpperCase()}</NavLink>
                            <NavLink className={classes.menuItem} to="/tasklist">{'Tasklist'.toUpperCase()}</NavLink>
                            <NavLink className={classes.menuItem} to="/form">{'New task'.toUpperCase()}</NavLink>
                        </div>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }
}


export default withRouter(withStyles(styles)(Hamburger));
