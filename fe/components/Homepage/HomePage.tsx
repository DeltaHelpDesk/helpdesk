import { FunctionComponent, useContext } from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ReactAuthContext } from '../../src/graphql/auth';
import Link from "next/link";
import customRoutes from "../../src/Routes";



interface IHomePageProps {

}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {

    const { isLoggedIn, logout } = useContext(ReactAuthContext);

    return (
        <div>
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <div >
                    <Grid item={true} xs={12}>
                        <Typography component="h1" variant="h1" gutterBottom={true}>Delta helpdesk</Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography component="h2" variant="h2" gutterBottom={true}>Vítejte na stránkách podpory</Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={12}>
                        <p >Pokud máte problém zašlete požadavek.</p>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <div>
                            <Link href={customRoutes.newTask}>
                                <Button variant="contained" color="primary">
                                    Poslat požadavek
                            </Button>
                            </Link>
                            {
                                isLoggedIn ?
                                    <Button variant="contained" color="primary" onClick={logout}>
                                        Odlásit se se
                                    </Button>
                                    :
                                    <Link href={customRoutes.loginRoute}>
                                        <Button variant="contained" color="primary">
                                            Přihlásit se
                                        </Button>
                                    </Link>
                            }
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}
export default HomePage;