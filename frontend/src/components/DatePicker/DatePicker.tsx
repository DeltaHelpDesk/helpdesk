import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
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



interface IDatePickerProps extends WithStyles<typeof styles> {
  id: string;
  label: string;
  defaultValue: string;
  disabled?:boolean;
  onChange: (date: string) => void
}

function formatDate(date: string) {
  // Change the format if required
  // Substring crops the time part from ISO formatted date
  // e.g.: 2013-03-10T02:00:00Z => 2013-03-10
  return new Date(date).toISOString().substring(0, 10);
}


function DatePicker(props: IDatePickerProps) {

  const { id, label, defaultValue, classes,disabled=false, onChange } = props;

  return (
    <TextField
      id={id}
      label={label}
      disabled={disabled}
      type="date"
      defaultValue={formatDate(defaultValue)}
      className={classes.textField}
      onChange={(e) => onChange(formatDate((e.target.value)))}
    />

  );
}


export default withStyles(styles)(DatePicker);