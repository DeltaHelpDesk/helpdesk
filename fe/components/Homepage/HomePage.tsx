import { FunctionComponent, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ReactAuthContext } from "../../src/graphql/auth";
import Link from "next/link";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";

// tslint:disable-next-line:no-empty-interface
interface IHomePageProps {

}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
    const useStyles = makeStyles((currentTheme) => ({
        root: {

        },
        subheader: {
            textAlign: "center",
        },

        buttonHomepage: {
            "margin": "10px 25px",
            "color": currentTheme.palette.secondary.contrastText,
            "backgroundColor": currentTheme.palette.secondary.main,
            "padding": "10px 35px",
            "borderRadius": "0px",
            "fontWeight": "bold",
            "textTransform": "uppercase",
            "&:hover": {
                backgroundColor: currentTheme.palette.secondary.light,
            },
        },

        itemsCenter: {
            textAlign: "center",
        },
        info: {
            color: currentTheme.palette.text.primary,
            [currentTheme.breakpoints.down("sm")]: {
                fontSize: "18px",
            },
            textAlign: "center",
            fontSize: "20px",
        },
        center: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
        },
        background: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
            zIndex: -5,
            [currentTheme.breakpoints.down("sm")]: {
                height: "100%",
                width: "auto",
            },
            backgroundColor: currentTheme.palette.background.default,
        },
        title: {
            fontWeight: "bold",
            color: currentTheme.palette.text.primary + "!important",
        },
    }),
    );

    const { isLoggedIn, logout } = useContext(ReactAuthContext);

    const classes = useStyles(props);

    return (
        <div>
            <Grid className={classes.center} container={true} direction="row" justify="center" alignItems="center">
                <div className={"d-flex flex-column"}>
                    <Grid item={true} xs={12}>
                        <Typography className={classes.title} component="h1" variant="h1" gutterBottom={true}>
                            Delta helpdesk
                            </Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className={classes.subheader} component="h2" variant="h2" gutterBottom={true}>
                            {localisation.common.welcome}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={12}>
                        <p className={classes.info}>{localisation.common.subtitleHomepage}</p>
                    </Grid>
                    <div className={"d-flex justify-content-around pt-5"} style={{ width: "100%" }}>
                        <Link href={customRoutes.newTask}>
                            <Button className={classes.buttonHomepage} variant="contained" color="primary">
                                {localisation.task.sendNew}
                            </Button>
                        </Link>
                        {
                            isLoggedIn
                                ? <></>
                                // <Button variant="contained" color="primary" onClick={logout}>
                                //     {localisation.login.logout}
                                // </Button>
                                :
                                <Link href={customRoutes.loginRoute}>
                                    <Button className={classes.buttonHomepage} variant="contained" color="primary">
                                        {localisation.login.login}
                                    </Button>
                                </Link>
                        }
                    </div>
                </div>
                <img src="/static/helpdesk_bg_trans.png" className={classes.background} />
            </Grid>
        </div>
    );
};
export default HomePage;
