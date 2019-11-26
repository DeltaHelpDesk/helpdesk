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
import Background from "../Background/Background";

// tslint:disable-next-line:no-empty-interface
interface IHomePageProps {

}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
    const useStyles = makeStyles(() => ({
        root: {

        },
        subheader: {
            textAlign: "center",
        },

        buttonHomepage: {
            margin: "50px 25px 0px",
            padding: "10px 35px",
            borderRadius: "0px",
            fontWeight: "bold",
            textTransform: "uppercase",
        },

        itemsCenter: {
            textAlign: "center",
        },
        info: {
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
        title: {
            fontWeight: "bold",
            textTransform: "uppercase",
        },
    }),
    );

    const { isLoggedIn, logout } = useContext(ReactAuthContext);

    const classes = useStyles(props);

    return (
        <div>
            <Grid
                className={classes.center}
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center">
                <Grid item={true}>
                    <Typography className={classes.title} component="h1" variant="h1" gutterBottom={true}>
                        Delta helpdesk
                            </Typography>
                </Grid>
                <Grid item={true}>
                    <Typography className={classes.subheader} component="h2" variant="h2" gutterBottom={true}>
                        {localisation.common.welcome}
                    </Typography>
                </Grid>
                <Grid item={true}>
                    <Typography className={classes.info} variant="body1" component="p">
                        {localisation.common.subtitleHomepage}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="center" spacing={6}>

                        <Grid item>
                            <Link href={customRoutes.newTask}>
                                <Button className={classes.buttonHomepage} variant="contained" color="primary">
                                    {localisation.task.sendNew}
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
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
                        </Grid>

                    </Grid>
                </Grid>

                <Background />
            </Grid>
        </div>
    );
};
export default HomePage;
