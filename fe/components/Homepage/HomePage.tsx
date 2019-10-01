import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AuthContext, IAuthContextValue } from '../../src/graphql/auth';





interface IHomePageProps extends RouteComponentProps {

}

class HomePage extends React.Component<IHomePageProps> {
    redirectToForm = () => {
        this.props.history.push("/form");
    }
    redirectToLogin = () => {
        this.props.history.push("/login");
    }


    render() {

        return <div>
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
                            <Button onClick={this.redirectToForm} variant="contained" color="primary">Poslat požadavek</Button>
                            <AuthContext.Consumer>{({ logout, user }: IAuthContextValue) =>
                                !user && <Button onClick={this.redirectToLogin} variant="contained" color="primary">Přihlásit se</Button>

                            }</AuthContext.Consumer>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>;
    }
}
export default withRouter(HomePage); 
