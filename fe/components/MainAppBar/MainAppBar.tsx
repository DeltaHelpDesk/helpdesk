import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../src/graphql/auth";
import UserLogged from "./UserLogged";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";
import PersonIcon from "@material-ui/icons/Person";
import { Theme, makeStyles } from "@material-ui/core";

const MainAppBar: React.FunctionComponent<{}> = (props) => {
    const useStyles = makeStyles((theme) => ({
        // grow: {
        //     flexGrow: 1
        // },
        // root: {
        //     flexGrow: 1
        // },
        // firstItem: {
        //     color: "white",
        //     textDecoration: "none"
        // },
        menuItem: {
            "color": "white",
            "textDecoration": "none",
            "marginLeft": "5px",
            "padding": "10px 15px 2px",
            "fontWeight": 500,
            "transform": "scale(1, 1.1)",
            "letterSpacing": "1.5px",
            "textTransform": "lowercase",
            "width": "100%",
            "&:hover": {
                "color": theme.palette.secondary.main,
                "&:before": {
                    width: "100%",
                },
            },
            "&:before": {
                // content: `''`,
                // position: "absolute",
                // left: "0px",
                // top: "100%",
                // height: "2px",
                // width: "0%",
                // backgroundColor: "#ffffff",
            },
        },
        // hamburger: {
        //     background: "transparent",
        //     position: "relative" as "relative",
        //     width: "50px",
        //     height: "50px",
        //     display: "flex",
        //     justifyContent: "space-evenly",
        //     alignItems: "center",
        //     flexDirection: "column"
        // },
        // line: {
        //     width: "44px",
        //     height: "5px",
        //     background: "white"
        // },
        // [theme.breakpoints.down('sm')]: {
        //     parent: {
        //         display: "block !important"
        //     },
        //     navItems: {
        //         display: "none !important",
        //         justifyContent: "center !important",
        //         alignItems: "center !important",
        //         "flex-direction": "column !important"
        //     },
        //     grow: {
        //         flexGrow: 0
        //     }
        // },
        navItems: {
            "display": "flex",
            "flex-direction": "row",
            "&.is-active": {
                display: "flex !important",
            },
        },
        // lineOneActive: {
        //     animation: "line-one-in",
        //     animationDuration: "1s",
        //     animationFillMode: "forwards",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
        // },
        // lineTwoActive: {
        //     animation: "line-two-in",
        //     animationDuration: "1s",
        //     animationFillMode: "forwards",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
        // },
        // lineThreeActive: {
        //     animation: "line-three-in",
        //     animationDuration: "1s",
        //     animationFillMode: "forwards",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)"
        // },
        // lineOneInactive: {
        //     animation: "line-one-in",
        //     animationDuration: "1s",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        //     animationDirection: "reverse"
        // },
        // lineTwoInactive: {
        //     animation: "line-two-in",
        //     animationDuration: "1s",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        //     animationDirection: "reverse"
        // },
        // lineThreeInactive: {
        //     animation: "line-three-in",
        //     animationDuration: "1s",
        //     animationIterationCount: "1",
        //     animationTimingFunction: "cubic-bezier(1, -0.01, 0.14, 0.85)",
        //     animationDirection: "reverse"
        // },
        // parent: {
        //     display: "none",
        //     position: "absolute" as "absolute",
        //     width: "50px",
        //     height: "50px",
        //     right: "0"
        // },
        menuLogo: {
            padding: "5px 0px",
            maxHeight: "70px",
        },
    }));

    const classes = useStyles(props);

    return <>
        <AppBar position="fixed" >
            <Toolbar >
                <img src="/static/logo_new.png" className={classes.menuLogo} />
                <div className={"d-flex justify-content-end"} style={{ width: "100%" }}>
                    <div className={"d-flex justify-content-around align-items-center"} style={{ width: "auto" }}>
                        <div>
                            <Link href="/admin"><a className={classes.menuItem}>Administration</a></Link>

                        </div>
                        <div>
                            <Link href={customRoutes.taskBoard}><a className={classes.menuItem}>Task list</a></Link>
                        </div>
                        <div>
                            <Link href={customRoutes.newTask}><a className={classes.menuItem}>New task</a></Link>
                        </div>
                        <div>
                            <AuthContext.Consumer>{({ logout, user }) =>
                                user
                                    ? (
                                        <div>
                                            {/* <span>{user.fullName}</span> */}
                                            <UserLogged logout={logout} user={user} />
                                            {/* <Button onClick={logout}>Odhlásit se</Button> */}
                                        </div>
                                    )
                                    : (
                                        <div>
                                            {/* <span>{user.fullName}</span> */}
                                            <Link href={customRoutes.loginRoute}>
                                                <a className={classes.menuItem}>
                                                    <PersonIcon />
                                                    {localisation.login.login}
                                                </a>
                                            </Link>
                                            {/* <Button onClick={logout}>Odhlásit se</Button> */}
                                        </div>
                                    )

                            }</AuthContext.Consumer>
                        </div>
                    </div>
                </div>

            </Toolbar>
        </AppBar></>;
};

export default MainAppBar;
