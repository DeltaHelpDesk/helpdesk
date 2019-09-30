import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from "react";
import { NavLink } from 'react-router-dom';
import logo from "./logo_new.png";
import { AuthContext } from '../../graphql/auth';
import UserLogged from './UserLogged';

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
        padding: "10px 15px 2px",
        fontWeight: 500,
        transform: 'scale(1, 1.1)',
        letterSpacing: "1.5px",
        textTransform: "lowercase",
        // '&:hover :before': {
        //     // width: "100%"
        // },
        '&:before': {
            content: '',
            position: "absolute",
            left: "0px",
            bottom: "22px",
            height: "2px",
            width: "100%",
            backgroundColor: "#ffffff",
            // -webkit-transition: all .3s ease 0s,
            // -o-transition: all .3s ease 0s,
            // transition: all .3s ease 0s
        }
    },
    hamburger: {
        background: "transparent",
        position: "relative" as "relative",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column"
    },
    line: {
        width: "44px",
        height: "5px",
        background: "white"
    },
    [theme.breakpoints.down('sm')]: {
        parent: {
            display: "block !important"
        },
        navItems: {
            display: "none !important",
            justifyContent: "center !important",
            alignItems: "center !important",
            "flex-direction": "column !important"
        },
        grow: {
            flexGrow: 0
        }
    },
    navItems: {
        display: "flex",
        "flex-direction": "row",
        '&.is-active': {
            display: "flex !important"
        }
    },
    lineOneActive: {
        animation: "line-one-in",
        animationDuration: "1s",
        animationFillMode: "forwards",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
    },
    lineTwoActive: {
        animation: "line-two-in",
        animationDuration: "1s",
        animationFillMode: "forwards",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
    },
    lineThreeActive: {
        animation: "line-three-in",
        animationDuration: "1s",
        animationFillMode: "forwards",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
    },
    lineOneInactive: {
        animation: "line-one-in",
        animationDuration: "1s",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        animationDirection: "reverse"
    },
    lineTwoInactive: {
        animation: "line-two-in",
        animationDuration: "1s",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        animationDirection: "reverse"
    },
    lineThreeInactive: {
        animation: "line-three-in",
        animationDuration: "1s",
        animationIterationCount: "1",
        animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        animationDirection: "reverse"
    },
    parent: {
        display: "none",
        position: "absolute" as "absolute",
        width: "50px",
        height: "50px",
        right: "0"
    },
    menuLogo: {
        paddingTop: "5px",
        maxHeight:"65px"
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

    help() {
        const line1 = this.detach(document.getElementsByClassName(this.props.classes.line1)[0]);
        const line2 = this.detach(document.getElementsByClassName(this.props.classes.line2)[0]);
        const line3 = this.detach(document.getElementsByClassName(this.props.classes.line3)[0]);

        if (line1.getAttribute("class") === `${this.props.classes.line} ${this.props.classes.line1} ${this.props.classes.lineOneInactive}`) {
            line1.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line1} ${this.props.classes.lineOneActive}`);
            line2.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line2} ${this.props.classes.lineTwoActive}`);
            line3.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line3} ${this.props.classes.lineThreeActive}`);
        } else {
            line1.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line1} ${this.props.classes.lineOneInactive}`);
            line2.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line2} ${this.props.classes.lineTwoInactive}`);
            line3.setAttribute("class", `${this.props.classes.line} ${this.props.classes.line3} ${this.props.classes.lineThreeInactive}`);
        }

        document.getElementsByClassName(this.props.classes.hamburger)[0].appendChild(line1);
        document.getElementsByClassName(this.props.classes.hamburger)[0].appendChild(line2);
        document.getElementsByClassName(this.props.classes.hamburger)[0].appendChild(line3);
    }

    detach(node: any) {
        return node.parentElement.removeChild(node);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" >
                    <Toolbar className="flex-direction-column">
                        <Typography variant="h6" className={classes.grow}>
                            <NavLink className={classes.firstItem} to="/"><img className={classes.menuLogo} src={logo} /></NavLink>
                        </Typography>
                        <div className={classes.parent}>
                            <div className={classes.hamburger} onClick={() => { this.setState({ isActive: !this.state.isActive }); this.help(); }}>
                                <span className={`${classes.line} ${classes.line1} ${classes.lineOneInactive}`} />
                                <span className={`${classes.line} ${classes.line2} ${classes.lineTwoInactive}`} />
                                <span className={`${classes.line} ${classes.line3} ${classes.lineThreeInactive}`} />
                            </div>
                        </div>
                        <div className={`${classes.navItems} ${this.state.isActive ? "is-active" : ""}`}>
                            <NavLink className={classes.menuItem} to="/admin">{'Administration'}</NavLink>
                            <NavLink className={classes.menuItem} to="/tasklist">{'Tasklist'}</NavLink>
                            <NavLink className={classes.menuItem} to="/form">{'New task'}</NavLink>
                        </div>
                        <AuthContext.Consumer>{({ logout, user }) =>
                            user && (
                                <div>
                                    {/* <span>{user.fullName}</span> */}
                                    <UserLogged logout={logout} user={user}/>
                                    {/* <Button onClick={logout}>Odhlásit se</Button> */}
                                </div>
                            )
                        }</AuthContext.Consumer>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withRouter(withStyles(styles)(Hamburger));