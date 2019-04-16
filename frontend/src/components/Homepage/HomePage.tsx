import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../DatePicker/DatePicker';



const styles = (theme: Theme) => createStyles({
    root: {
        color: theme.palette.primary.dark,
    },
    subheader: {
        color: theme.palette.secondary.light,
        textAlign: "center"
    },
    // fix this
    mainH1: {
        textAlign: "center",
        color: theme.palette.primary.dark,
        textTransform: "uppercase",
        fontSize: "60px",
    },
    // fix this
    mainH2: {
        textAlign: "center",
        color: theme.palette.primary.dark,
        textTransform: "uppercase",
        marginTop: "-15px",
    },

    buttonHomepage: {
        margin: "10px",
    },

    itemsCenter: {
        textAlign: "center",
    },
    info: {
        textAlign: "center",
    },
    center: {
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%,-50%)',
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
                        <h1 className={classes.mainH1}>Delta Helpdesk</h1>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <h2 className={classes.mainH2}>Vítejte na stránkách podpory</h2>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <p className={classes.info}>Pokud máte problém zašlete požadavek.</p>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <div className={classes.itemsCenter}>
                            <Button className={classes.buttonHomepage} onClick={this.redirectToForm} variant="contained" color="primary">Poslat požadavek</Button>
                            <Button className={classes.buttonHomepage} onClick={this.redirectToLogin} variant="contained" color="primary">Přihlásit se</Button>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>;
    }
}
export default withStyles(styles)(withRouter(HomePage)); 
