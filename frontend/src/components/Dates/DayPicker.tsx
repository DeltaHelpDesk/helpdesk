import * as React from 'react';
import 'react-day-picker/lib/style.css';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { useState } from 'react';



interface IDatePickerProps {
    onChange?: (date: string) => void
}


const DayPicker: React.FunctionComponent<IDatePickerProps> = ({ onChange }) => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date);

    const handleChange = (date: any) => {
        setSelectedDate(date);
        if (onChange) { onChange(date.toString()); }
    }

    return <>
        <DatePicker onChange={handleChange} placeholder={selectedDate.toString()} />
    </>;
}


export default DayPicker;