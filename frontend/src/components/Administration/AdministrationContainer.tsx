import * as PropTypes from "prop-types";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Administration from "./Administration";

const styles = {
 
};

function AdministrationContainer(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    <Grid container={true} direction="row" justify="center" alignItems="center">
            <Administration/>
      </Grid>
    </div>
  );
}

AdministrationContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministrationContainer);
