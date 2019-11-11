import { FunctionComponent } from "react";
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
import { Theme, makeStyles, Grid } from "@material-ui/core";

const MainAppBar: React.FunctionComponent<{}> = (props) => {
    const useStyles = makeStyles(() => ({
        grow: {
            flexGrow: 1,
        },
        menuItem: {
            "textDecoration": "none",
            "marginLeft": "5px",
            "padding": "10px 15px 2px",
            "fontWeight": 500,
            "transform": "scale(1, 1.1)",
            "letterSpacing": "1.5px",
            "textTransform": "lowercase",
            "width": "100%",
            "&:hover": {
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
        navItems: {
            "display": "flex",
            "flex-direction": "row",
            "&.is-active": {
                display: "flex !important",
            },
        },
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
                <div className={classes.grow} />
                <Typography variant="body1" component="div">
                    <Grid container direction="row" alignItems="center" alignContent="center" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Link href="/admin"><a className={classes.menuItem}>Administration</a></Link>
                        </Grid>
                        <Grid item>
                            <Link href={customRoutes.taskBoard}><a className={classes.menuItem}>Task list</a></Link>
                        </Grid>
                        <Grid item>
                            <Link href={customRoutes.newTask}><a className={classes.menuItem}>New task</a></Link>

                        </Grid>
                        <Grid item>
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
                        </Grid>
                    </Grid>
                </Typography>
            </Toolbar>
        </AppBar></>;
};

export default MainAppBar;
