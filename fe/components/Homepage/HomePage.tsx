import { FunctionComponent, useContext } from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ReactAuthContext } from '../../src/graphql/auth';
import Link from "next/link";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";



interface IHomePageProps {

}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {

    const { isLoggedIn, logout } = useContext(ReactAuthContext);

    return (
        <div>
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <div className={'d-flex flex-column'}>
                    <Grid item={true} xs={12}>
                        <Typography component="h1" variant="h1" gutterBottom={true}>
                            Delta helpdesk
                            </Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography component="h2" variant="h2" gutterBottom={true}>
                            {localisation.common.welcome}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={12}>
                        <p >{localisation.common.subtitleHomepage}</p>
                    </Grid>
                    <div className={'d-flex justify-content-around pt-5'} style={{ width: '100%' }}>
                        <Link href={customRoutes.newTask}>
                            <Button variant="contained" color="primary">
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
                                    <Button variant="contained" color="primary">
                                        {localisation.login.login}
                                    </Button>
                                </Link>
                        }
                    </div>
                </div>
            </Grid>
        </div>
    );
}
export default HomePage;