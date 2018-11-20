import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./../img/helpdesklogo.jpg";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

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
  }
};

function ButtonAppBar(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.grow}>
            <img className="logo" src={Logo}/>  
          </Typography>
          <Button color="inherit">Men</Button>
          <Button color="inherit">Menu item</Button>
          <Button color="inherit">Menu item</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}



export default withStyles(styles)(ButtonAppBar);
