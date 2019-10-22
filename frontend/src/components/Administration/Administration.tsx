import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import * as React from "react";
import helpdesk_bg from "../helpdesk_bg_trans.png";

import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

const styles = (theme: Theme) => createStyles({
    Card: {
        color: "white",
        minHeight: "200px",
        minWidth: "200px",
        display:"inline-flex",
        justifyContent:"center",
        alignItems: "center",
        margin:"50px",
        textTransform: "lowercase",
        backgroundColor: "#ffffff00",
        border: "#ffffff 3px solid",
        '&:hover': {
            backgroundColor: theme.palette.contrast.light + "50",
        },
    },
    wrapper: {
      display: "flex",
      marginTop: "100px",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
  
    },
    background: {
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%,-50%)',
        width: "100%",
        zIndex: -5,
        [theme.breakpoints.down('sm')]: {
            height: "100%",
            width: "auto",
        },
        backgroundColor: theme.palette.background.default,
    },    
});


interface IAdministrationItemsProps extends WithStyles<typeof styles>, WithTranslation {
}

function AdministrationItems(props:IAdministrationItemsProps) {
  const { classes, t } = props;
  return (
    <div className={classes.wrapper}>
      <Card classes={{ root:classes.Card }}>
      <Grid item={true}>
        <p>Settings</p>
      </Grid>
      </Card>
      <Card className={classes.Card}>
      <Grid item={true}>
        <p>Edit tasks</p>
      </Grid>
      </Card>
      <Card className={classes.Card}>
      <Grid item={true}>
        <p>Devices</p>
      </Grid>
      </Card>
      <Link to="/admin/userlist">
        <Card className={classes.Card}>
        <Grid item={true}>
            <p>{t(`userList`)}</p>
        </Grid>
        </Card>
      </Link>
      <img className={classes.background} src={helpdesk_bg} />
    </div>
  );
}


export default withStyles(styles)(withTranslation()(AdministrationItems));

