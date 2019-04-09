import * as React from 'react';
import { withStyles, Theme, createStyles,WithStyles } from '@material-ui/core/styles';
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



interface IDatePickerProps extends WithStyles<typeof styles>{
  id:number;
  label:string;
  type:Date;
  defaultValue:Date;

}

function DatePicker(props:IDatePickerProps) {
  const { classes } = props;
  const{id,label,type,defaultValue}=props;

  return (
    <form className={classes.container} noValidate={true}>
      <TextField
        id={id.toString()}
        label={label}
        type={type.toString()}
        defaultValue={defaultValue.toString()}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

export default withStyles(styles)(DatePicker);