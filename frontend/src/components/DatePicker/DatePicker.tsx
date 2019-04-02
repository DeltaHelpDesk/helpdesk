import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});




function DatePicker(props:any) {
  const { classes } = props;
  

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Datum"
        type="date"
        defaultValue="2019-04-2"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);