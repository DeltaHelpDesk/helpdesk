class DateHelper {

    isChristmasTime = (): boolean => {
        const today = new Date();

        // month -1 because months are from 0 to 11
        const from = new Date(today.getFullYear(), 12 - 1 /* (Month) -1 */, 10 /* (Day)*/);
        const to = new Date(today.getFullYear() + 1, 1 - 1 /* (Month) -1 */, 6 /* (Day)*/);

        return (today > from && today < to);
    }

    isPrideMonth = (): boolean => {
        const today = new Date();

        // month -1 because months are from 0 to 11
        const from = new Date(today.getFullYear(), 5 - 1 /* (Month) -1 */, 1 /* (Day)*/);
        const to = new Date(today.getFullYear(), 5 - 1 /* (Month) -1 */, 31 /* (Day)*/);

        return (today > from && today < to);
    }
}

export default DateHelper;
