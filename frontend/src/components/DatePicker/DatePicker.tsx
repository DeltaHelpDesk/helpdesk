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
  onChange: (date: Date) => void
}

function formatDate(date: string) {
  return new Date(date);
}


function DatePicker(props: IDatePickerProps) {

  const { id, label, defaultValue, classes, onChange } = props;
  console.log(defaultValue)
  return (
    <TextField
      id={id}
      label={label}
      type="date"
      defaultValue={formatDate(defaultValue).toISOString().substring(0, 10)}
      className={classes.textField}
      onChange={(e) => onChange(formatDate((e.target.value)))}
    />

  );
}


export default withStyles(styles)(DatePicker);