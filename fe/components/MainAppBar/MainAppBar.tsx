import { FunctionComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { Button, CssBaseline } from "@material-ui/core";
import { AuthContext } from "../../src/graphql/auth";
import UserLogged from "./UserLogged";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";
import PersonIcon from "@material-ui/icons/Person";
import { Theme, makeStyles, Grid } from "@material-ui/core";
import Logo from "./Logo/Logo";

const MainAppBar: FunctionComponent<{}> = (props) => {
    const useStyles = makeStyles(() => ({
        grow: {
            flexGrow: 1,
        },
        menuItem: {
            "alignItems": "center",
            "textDecoration": "none",
            "marginLeft": "5px",
            "padding": "10px 15px 2px",
            "fontWeight": 500,
            "transform": "scale(1, 1.1)",
            "letterSpacing": "1.5px",
            "textTransform": "lowercase",
            "width": "100%",
            "color": "white",
            "&:hover": {
                "&:before": {
                    width: "100%",
                },
            },
            "&:active": {
                color: "#ffffff80",
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
        <CssBaseline />
        <AppBar position="fixed" >
            <Toolbar >
                <Logo />
                <div className={classes.grow} />
                <Typography variant="body1" component="div">
                    <Grid container
                        direction="row"
                        alignItems="center"
                        alignContent="center"
                        justify="flex-end"
                        spacing={2}>
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
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <PersonIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            {localisation.login.login}
                                                        </Grid>
                                                    </Grid>
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
