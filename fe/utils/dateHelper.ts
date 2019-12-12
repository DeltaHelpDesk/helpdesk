class DateHelper {

    isChristmasTime = (): boolean => {
        const today = new Date();

        const dateFrom = `10/12/${today.getFullYear()}`;
        const dateTo = `06/01/${today.getFullYear() + 1}`;

        const d1 = dateFrom.split("/");
        const d2 = dateTo.split("/");

        const from = new Date(Number(d1[2]), Number(d1[1]) - 1, Number(d1[0]));  // -1 because months are from 0 to 11
        const to = new Date(Number(d2[2]), Number(d2[1]) - 1, Number(d2[0]));

        return (today > from && today < to);
    }

    isPrideMonth = (): boolean => {
        const today = new Date();

        const dateFrom = `01/05/${today.getFullYear()}`;
        const dateTo = `31/05/${today.getFullYear()}`;

        const d1 = dateFrom.split("/");
        const d2 = dateTo.split("/");

        const from = new Date(Number(d1[2]), Number(d1[1]) - 1, Number(d1[0]));  // -1 because months are from 0 to 11
        const to = new Date(Number(d2[2]), Number(d2[1]) - 1, Number(d2[0]));

        return (today > from && today < to);
    }
}

export default DateHelper;
