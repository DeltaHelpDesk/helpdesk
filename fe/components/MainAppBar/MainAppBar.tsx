import { FunctionComponent, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { CssBaseline } from "@material-ui/core";
import { AuthContext, ReactAuthContext, UserRole, checkUserRole } from "../../src/graphql/auth";
import UserLogged from "./UserLogged";
import customRoutes from "../../src/Routes";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles, Grid } from "@material-ui/core";
import Logo from "./Logo/Logo";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";
import getTheme from "../Themes/MainTheme";

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
const MainAppBar: FunctionComponent<{}> = () => {

    const { isLoggedIn, logout } = useContext(ReactAuthContext);
    const classes = useStyles(getTheme());
    const { t } = useTranslation();

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
                        {isLoggedIn ?
                            <>
                                <AuthContext.Consumer>{({ user }) =>
                                    // Ukázat administraci jen, pokud je admin
                                    user && checkUserRole(user.role, UserRole.ADMIN) ?
                                        <Grid item>
                                            <Link href="/admin">
                                                <a className={classes.menuItem}>
                                                    {t(locKeys.common.administration)}
                                                </a>
                                            </Link>
                                        </Grid>
                                        : <Grid item>
                                            <Link href="">
                                                <a className={classes.menuItem}>
                                                    {t(locKeys.task.taskList)}
                                                </a>
                                            </Link>
                                        </Grid>
                                }
                                </AuthContext.Consumer>
                                <Grid item>
                                    <Link href={customRoutes.newTask}>
                                        <a className={classes.menuItem}>
                                            {t(locKeys.common.newTask)}
                                        </a>
                                    </Link>
                                </Grid>
                            </> : <></>
                        }
                        <Grid item>{
                            isLoggedIn ? (
                                <AuthContext.Consumer>
                                    {({ user }) =>
                                        // Občas to blbne, proto ta podmínka
                                        user && <UserLogged logout={logout} user={user} />
                                    }
                                </AuthContext.Consumer>
                            ) : (
                                    <div>
                                        <Link href={customRoutes.loginRoute}>
                                            <a className={classes.menuItem}>
                                                <Grid container alignItems="center">
                                                    <Grid item>
                                                        <PersonIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        {t(locKeys.login.login)}
                                                    </Grid>
                                                </Grid>
                                            </a>
                                        </Link>
                                    </div>
                                )}
                        </Grid>
                    </Grid>
                </Typography>
            </Toolbar>
        </AppBar></>;
};

export default MainAppBar;
