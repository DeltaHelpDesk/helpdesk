import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from 'src/graphql/auth';



const styles = (theme: Theme) => createStyles({
    root: {
        color: theme.palette.primary.dark,
    },
    subheader: {
        color: theme.palette.secondary.light,
        textAlign: "center"
    },

    buttonHomepage: {
        margin: "10px",
    },

    itemsCenter: {
        textAlign: "center",
    },
    info: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "18px"
        },
        textAlign: "center",
        fontSize: "20px",
    },
    center: {
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%,-50%)',
        width: "100%",
    },

});

interface IHomePageProps extends WithStyles<typeof styles>, RouteComponentProps {

}

class HomePage extends React.Component<IHomePageProps> {
    redirectToForm = () => {
        this.props.history.push("/form");
    }
    redirectToLogin = () => {
        this.props.history.push("/login");
    }


    render() {

        const { classes } = this.props;
        return <div>
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <div className={classes.center}>
                    <Grid item={true} xs={12}>
                        <Typography component="h1" variant="h1" gutterBottom={true}>Delta helpdesk</Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography component="h2" variant="h2" gutterBottom={true}>Vítejte na stránkách podpory</Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={12}>
                        <p className={classes.info}>Pokud máte problém zašlete požadavek.</p>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <div className={classes.itemsCenter}>
                            <Button className={classes.buttonHomepage} onClick={this.redirectToForm} variant="contained" color="primary">Poslat požadavek</Button>
                            <AuthContext.Consumer>{({ logout, user }) =>
                                !user && <Button className={classes.buttonHomepage} onClick={this.redirectToLogin} variant="contained" color="primary">Přihlásit se</Button>

                            }</AuthContext.Consumer>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>;
    }
}
export default withStyles(styles)(withRouter(HomePage)); 
