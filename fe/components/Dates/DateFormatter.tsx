import { useEffect, useState, FunctionComponent } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

interface IDateProps {
    date: Date;
    relative?: boolean;
}

const { t } = useTranslation();

export const getFormattedDate = (date: string, relative = false) => {
    return relative
        ? moment(date).calendar(null, {
            sameDay: `[${t(locKeys.date.sameDay)}]`,
            lastDay: `[${t(locKeys.date.lastDay)}]`,
            lastWeek: `[${t(locKeys.date.lastWeek)}]`,
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
                sameDay: `[${t(locKeys.date.sameDay)}]`,
                lastDay: `[${t(locKeys.date.lastDay)}]`,
                lastWeek: `[${t(locKeys.date.lastWeek)}] dddd`,
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
