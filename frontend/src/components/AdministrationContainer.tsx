import * as PropTypes from "prop-types";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const styles = {
 
};

function AdministrationContainer(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
            <h1>Administration</h1>
      </Grid>
    </div>
  );
}

AdministrationContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministrationContainer);
