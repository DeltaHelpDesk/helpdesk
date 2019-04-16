import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

const styles = {
    Card:
    {
      '&$Hover': {
      background: "#434343",
      letterSpacing: "1px",
      boxShadow: "0px 5px 40px -10px rgba(0,0,0,0.57)",
      transition: "all 0.4s ease 0s",
      },
        color: "white",
        minHeight: "200px",
        minWidth: "200px",
        display:"inline-flex",
        justifyContent:"center",
        alignItems: "center",
        margin:"20px"
    },
    Hover:{},
    wrapper: {
      display: "flex",
      marginTop: "100px",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
  
    },
    

};


interface IAdministrationItemsProps extends WithStyles<typeof styles>, WithTranslation {
}

function AdministrationItems(props:IAdministrationItemsProps) {
  const { classes, t } = props;
  return (
    <div className={classes.wrapper}>
      <Card classes={{root:classes.Card, hover:classes.Hover}}>
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
    </div>
  );
}


export default withStyles(styles)(withTranslation()(AdministrationItems));

