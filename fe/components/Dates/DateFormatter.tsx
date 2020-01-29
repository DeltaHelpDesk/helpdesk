import { useEffect, useState, FunctionComponent } from "react";
import moment from "moment";

interface IDateProps {
    date: Date;
    relative?: boolean;
}

export const getFormattedDate = (date: string, relative = false) => {
    return relative
        ? moment(date).calendar(null, {
            sameDay: "[Dnes]",
            lastDay: "[Včera]",
            lastWeek: "[Minulý týden]",
            sameElse: "DD.MM.YYYY",
        })
        : moment(date).format("DD.MM.YYYY, hh:mm");
};

const DateFormatComponent: FunctionComponent<IDateProps> = ({ date, relative }) => {

    const [dateMoment, setDateMoment] = useState<string>("");

    // TODO: use without useEffect

    useEffect(() => {
        const dateString: string = relative
            ? moment(date).calendar(null, {
                sameDay: "[Dnes]",
                lastDay: "[Včera]",
                lastWeek: "[Minulý] dddd",
                sameElse: "DD.MM.YYYY",
            })
            : moment(date).format("DD.MM.YYYY, hh:msm");
        setDateMoment(dateString);
    });

    return (<span>
        {dateMoment}
    </span>);
};

export default DateFormatComponent;
