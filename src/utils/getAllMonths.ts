export const getMonth = (month: number, locale: string): string => {
    const date = new Date();
    date.setMonth(month);
    return date.toLocaleString(locale, { month: 'long' });
};

export const getMonths = (months: Array<number>, locale = 'en'): Array<string> =>
    months.map((month: number) => getMonth(month, locale));

export const getAllMonths = (locale = 'en'): Array<string> =>
    getMonths([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ], locale);

export const sortByMonth = (months: Array<string>, locale = 'en'): Array<string> => {
    const monthsInRightOrder = getAllMonths(locale);
    return months.sort((m1, m2) =>
        monthsInRightOrder.indexOf(m1) - monthsInRightOrder.indexOf(m2)
    );
};
