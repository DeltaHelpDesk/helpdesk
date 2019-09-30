import * as React from 'react';
import { Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import 'react-day-picker/lib/style.css';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

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
    onChange: (date: string) => void
}


const DayPicker: React.FunctionComponent<IDatePickerProps> = () => {

    const [selectedDate, handleDateChange] = React.useState(new Date);

    const onChange = (date) => {
        handleDateChange(date);
      }

    return <>
        <DatePicker onChange={onChange} placeholder={selectedDate.toString()}/>
    </>;
}


export default DayPicker;