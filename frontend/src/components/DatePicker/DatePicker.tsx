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
  id:string;
  label:string;
  defaultValue:Date;
  onChange:(date:Date)=>void

}



function DatePicker(props:IDatePickerProps) {
 
    const{id,label,defaultValue,classes,onChange}=props;

  return (
      <TextField
        id={id}
        label={label}
        type="date"
        defaultValue={defaultValue.toString()}
        className={classes.textField}
        onChange={(e)=>onChange(new Date(e.target.value))}
      />
    
  );
}
//todo pridat moment js

export default withStyles(styles)(DatePicker);