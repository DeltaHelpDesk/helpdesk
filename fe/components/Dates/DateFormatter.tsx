import { useEffect, useState, FunctionComponent } from "react";
import moment from "moment";

interface IDateProps {
    date: Date;
    relative?: boolean;
}

const getFormattedDate = (date: string, relative = false) => {
    return relative
            ? moment(date).calendar()
            : moment(date).format("DD/MM/YYYY, hh:mm");
};

const DateFormatComponent: React.FunctionComponent<IDateProps> = ({ date, relative = false }) => {

    const [dateMoment, setDateMoment] = useState<string>("");

    // TODO: use without useEffect

    useEffect(() => {
        const dateString: string = relative
            ? moment(date).calendar()
            : moment(date).format("DD/MM/YYYY, hh:mm");
        setDateMoment(dateString);
    });

    return <>
        {dateMoment}
    </>;
};

export default {DateFormatComponent, getFormattedDate};
