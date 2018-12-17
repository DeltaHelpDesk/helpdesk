import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    flexGrow: 1
  },
  menuItem: {
    color: "white",
    textDecoration: "none"
  }
};

function ButtonAppBar(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            <NavLink className={classes.menuItem} to="/">HELPDESK</NavLink>
          </Typography>
          <Button ><NavLink className={classes.menuItem} to="/admin">Administration</NavLink></Button>
          <Button><NavLink className={classes.menuItem} to="">Menu item</NavLink></Button>
          <Button><NavLink className={classes.menuItem} to="">Menu tem</NavLink></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
