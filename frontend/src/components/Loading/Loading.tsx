import* as React from "react";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: { spacing: { unit: number; }; }) => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

  function CircularIndeterminate(props:any) {
    const { classes } = props;
    return (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
 
  
  export default withStyles(styles)(CircularIndeterminate);