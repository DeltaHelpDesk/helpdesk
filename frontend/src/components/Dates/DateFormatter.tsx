import * as React from 'react';
import { useEffect, useState } from 'react';
import * as moment from 'moment';

interface IDateProps {
    date: Date,
    relative?: boolean,
}

const DateFormatComponent: React.FunctionComponent<IDateProps> = ({ date, relative = false }) => {

    const [dateMoment, setDateMoment] = useState<string>("");

    useEffect(() => {
        const dateString: string = relative
            ? moment(date).calendar()
            : moment(date).format('DD/MM/YYYY, hh:mm');
        setDateMoment(dateString);
    });

    return <>
        {dateMoment}
    </>;
}

export default DateFormatComponent;

