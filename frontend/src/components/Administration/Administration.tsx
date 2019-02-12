import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
    "fixed-square-200":
    {
        color: "white",
    }
};

function AdministrationItems() {
  // const { classes } = props;
  return (
    <div className="center-all-inner-items">
      <Card className="fixed-square-200 flex center-all-inner-items">
      <Grid item={true}>
        <p>Settings</p>
      </Grid>
      </Card>
      <Card className="fixed-square-200 flex center-all-inner-items">
      <Grid item={true}>
        <p>Edit tasks</p>
      </Grid>
      </Card>
      <Card className="fixed-square-200 flex center-all-inner-items">
      <Grid item={true}>
        <p>Devices</p>
      </Grid>
      </Card>
    </div>
  );
}

AdministrationItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministrationItems);

