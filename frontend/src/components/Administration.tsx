import Grid from "@material-ui/core/Grid";

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  border: {
    border: "1px black solid",
    display: "inline-block",
    padding: "20px",
    textTransform: "uppercase"
  },
  caption: {
    color: "blue",
    textAlign: "center"
  }
};

function AdministrationItems(props) {
  const { classes } = props;
  return (
    <div>
      <Grid item xs={4} style={styles.border}>
        <p>settings</p>
      </Grid>
      <Grid item xs={4} style={styles.border}>
        <p>edit tasks</p>
      </Grid>
      <Grid item xs={4} style={styles.border}>
        <p>devices</p>
      </Grid>
    </div>
  );
}

AdministrationItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministrationItems);

