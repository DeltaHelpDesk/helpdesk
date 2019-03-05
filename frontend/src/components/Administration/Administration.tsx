import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = {
    Card:
    {
        color: "white",
        minHeight: "200px",
        minWidth: "200px",
        display:"inline-flex",
        justifyContent:"center",
        alignItems: "center",
        margin:"20px"
    }
};


interface IAdministrationItemsProps extends WithStyles<typeof styles> {
}

function AdministrationItems(props:IAdministrationItemsProps) {
  const { classes } = props;
  return (
    <div className="center-all-inner-items">
      <Card className={classes.Card}>
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
    </div>
  );
}


export default withStyles(styles)(AdministrationItems);

