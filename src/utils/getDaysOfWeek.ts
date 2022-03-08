const dayDate = new Date();
export const DAYS_OF_WEEK = new Array(7).fill('');

const getDayOfWeek = (d: number, locale: string) => {
    dayDate.setDate(dayDate.getDate() - (dayDate.getDay() + 6) % 7 + d);
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(dayDate);
};

export const getDaysOfWeek = (
    locale: string = 'en',
    numOfChar: number = 2
): Array<string> =>
    DAYS_OF_WEEK.map((_, i ) =>
        getDayOfWeek(i, locale).slice(0, numOfChar));

export const convertToDaysOfWeek = (
    days: Array<number>,
    locale: string = 'en',
    numOfChar: number = 3
): Array<string> =>
    days.map(d => getDayOfWeek(d, locale).slice(0, numOfChar));
