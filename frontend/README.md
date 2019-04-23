# Install project
yarn install

# Start project 
yarn start

# Build
yarn build

# Material-ui
## 1. Import material-ui styles + classes for later use
```typescript
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
```
## 2. Class declaration + set custom theme if used
```typescript
const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',        
  },
});
```

 example of class "container" declaration above
 ## 3. Interface declaration
 ```typescript
 interface IDatePickerProps extends WithStyles<typeof styles> {
  id: string;  
  label: string; //text above the datepicker
  defaultValue: string; //default value  like "2019/06/16"
  disabled?: boolean; // if true->readonly
  onChange: (date: string) => void
}
```
## 4. Export function declaration
 ```typescript
function DatePicker(props: IDatePickerProps) { //Sets the properties (interface)

  const { id, label, defaultValue, classes, disabled = false, onChange } = props; //Declares inner variables + returns properties values to newly declared variables

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
  
  ); //Returns datepicker component
}
```
## 5. Export component
```typescript
export default withStyles(styles)(DatePicker); //Exports component with styles declared above
```