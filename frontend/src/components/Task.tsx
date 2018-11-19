import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  class: {
    flexGrow: 1
  }
};
// Prepared for Task component
function Task(props: any) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

Task.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);
