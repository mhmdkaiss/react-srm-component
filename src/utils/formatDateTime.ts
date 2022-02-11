export class FormattedDateTime {
    constructor(
        public date = '',
        public time = '',
    ) {
    }
}

export function formatDateTime(
    dateString: string,
    language?: string
): FormattedDateTime {
    const date = new Date(dateString);
    const dateFormat = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    } as Intl.DateTimeFormatOptions;
    const timeFormat = {
        timeStyle: 'short'
    } as Intl.DateTimeFormatOptions;
    const localeDate = date.toLocaleDateString(
        language ? language : 'default', dateFormat
    );
    const localeTime = date.toLocaleTimeString([], timeFormat);
    return { date: localeDate, time: localeTime };
}
