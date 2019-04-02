import* as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing.unit * 2,
  }
});


  function CircularIndeterminate(props: WithStyles<typeof styles>) {
    const { classes } = props;
    return (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
 
  
  export default withStyles(styles)(CircularIndeterminate);