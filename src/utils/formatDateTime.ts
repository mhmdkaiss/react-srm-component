import moment from 'moment';

export class FormattedDateTime {
    constructor(
        public date = '',
        public time = '',
    ) {
    }
}

export function formatDateTime(dateString: string, language?: string)
: FormattedDateTime {
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

export function getTimeFromMinutes(minutes: number, format = 'HH:mm') : string {
    if (minutes < 0 || minutes > 24 * 60) {
        throw new Error();
    }
    return moment.utc()
        .hours((minutes / 60 | 0))
        .minutes((minutes % 60 | 0))
        .format(format);
}

export function getMinutesFromTime(time: string, format = 'HH:mm') : number {
    const tm = moment(time, format);
    return (tm.hours() * 60) + tm.minute();
}
