import moment from "moment";

export default class DateHelper {

    isBetween = (main: Date, min: Date, max: Date): boolean => {
        return (min <= main && main <= max);
    }

    isChristmasTime = (): boolean => {
        const today = new Date();
        const year = today.getFullYear();

        // is between 1.1.year and 6.1.year or
        // is between 10.12.year and 31.12.year
        return this.isBetween(today, new Date(year, 1 - 1, 1), new Date(year, 1 - 1, 6)) ||
            this.isBetween(today, new Date(year, 12 - 1, 10), new Date(year, 12 - 1, 31));
    }

    isPrideMonth = (): boolean => {
        const today = new Date();
        const year = today.getFullYear();

        // is between 1.6 and 30.6
        return this.isBetween(today, new Date(year, 6 - 1, 1), new Date(year, 6 - 1, 30));
    }

    getFormattedDate = (date: string, relative: "strict" | "relative" | "fromNow"): string => {
        switch (relative) {
            case "strict":
                return moment(date).format("DD.MM.YYYY, hh:mm");
            case "relative":
                return moment(date).calendar(null, {
                    sameDay: "[Dnes]",
                    lastDay: "[Včera]",
                    lastWeek: "[Minulý týden]",
                    sameElse: "DD.MM.YYYY",
                });
            case "fromNow":
                return moment(date).fromNow();
        }
    }
}
