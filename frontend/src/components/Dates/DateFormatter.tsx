import * as React from 'react';
import { useEffect, useState } from 'react';



interface IDateProps {
    date: Date,
    relative?: boolean,
}

const DateFormatComponent: React.FunctionComponent<IDateProps> = ({ date, relative = false }) => {

    const [dateMoment, setDateMoment] = useState<string>();

    // TODO: use without useEffect

    useEffect(() => {
        const moment = require('moment');
        let dateString: string ;
        if(relative){
            dateString= moment(date).calendar();
        }else{
            dateString = moment(date).format('DD/MM/YYYY, hh:mm');
        }        
        console.log(dateString);
        setDateMoment(dateString);
    });

    return <>
        {dateMoment}
    </>;
}

export default DateFormatComponent;

