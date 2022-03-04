const dayDate = new Date();
export const DAYS_OF_WEEK = new Array(7).fill('');

const getDayOfWeek = (d: number, locale: string) => {
    dayDate.setDate(dayDate.getDate() - (dayDate.getDay() + 6) % 7 + d);
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(dayDate);
};

export const getDaysOfWeek = (locale = 'en'): Array<string> =>
    DAYS_OF_WEEK.map((_, i ) => getDayOfWeek(i, locale).slice(0, 2));
