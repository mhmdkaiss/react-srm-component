import './NCCornerCalendar.scss';

import moment, { Moment } from 'moment';

import React from 'react';
import { useIntl } from 'react-intl';

export interface NCCornerCalendarProps {
    month: number,
    year: number,
    events: Array<NCCornerCalendarEvent>,
    onDateSelected: (date: Date, eventIds: Array<string>) => void,
    selectedDate?: Date,
    weekdayFormat?: 'short' | 'narrow',
}

export interface NCCornerCalendarEvent {
    id: string,
    date: Date,
    classNames?: Array<string>
}

const enShortWeekdayFormat = new Intl.DateTimeFormat('en', { weekday: 'short' });

export const NCCornerCalendar: React.FunctionComponent<NCCornerCalendarProps> = (props: NCCornerCalendarProps) => {
    const intl = useIntl();

    const isFirstDayOfWeek = (date: Date): boolean => {
        return enShortWeekdayFormat.format(date) === 'Mon';
    };

    const getLocalizedWeekDay = (date: Date): string => {
        return intl.formatDate(date, { weekday: 'short' });
    };

    const getOrderedWeekdays = (): Array<string> => {
        const orderedWeekdays : Array<string> = [];
        const firstDateOfMonth = new Date(props.year, props.month);
        let firstDayOfWeek = firstDateOfMonth;
        for (let i = 0; i < 7; i++) {
            firstDayOfWeek = moment(firstDateOfMonth).add(i, 'days').toDate();
            if (isFirstDayOfWeek(firstDayOfWeek)) {
                break;
            }
        }

        for (let i = 0; i < 7; i++) {
            orderedWeekdays.push(getLocalizedWeekDay(moment(firstDayOfWeek).add(i, 'days').toDate()));
        }
        return orderedWeekdays;
    };

    const weekdays = getOrderedWeekdays();
    const firstDateOfMonth = new Date(props.year, props.month);

    const selectDay = (date: Date, events: Array<NCCornerCalendarEvent>): void => {
        if (events.length > 0) {
            props.onDateSelected(date, events.map(e => e.id));
        }
    };

    const getEvents = (date: Moment): Array<NCCornerCalendarEvent> => {
        return props.events.filter(e => date.isSame(e.date, 'day'));
    };

    const renderDays = () => {
        const daysInMonth = moment(firstDateOfMonth).daysInMonth();
        const daysArray = [];
        for (let i = 0; i < daysInMonth; i++) {
            const date = moment(firstDateOfMonth).add(i, 'days');
            const events = getEvents(date);
            const classNames = Array.from(new Set(events.flatMap(e => e.classNames)));
            daysArray.push(<div
                key={i}
                onClick={() => selectDay(date.toDate(), events)}
                className={`calendar-item day ${events.length ? 'has-events' : ''} ${props.selectedDate && date.isSame(props.selectedDate, 'day') ? 'selected' : ''} ${classNames.join(' ')}`}
            >
                {i + 1}
            </div>);
        }
        return daysArray;
    };

    const renderEmptyDays = () => {
        const firstWeekDayOfMonth = getLocalizedWeekDay(firstDateOfMonth);

        const weekStartOffset = weekdays.findIndex(wd => wd === firstWeekDayOfMonth);
        const emptyDayArray = [];
        for (let i = 0; i < weekStartOffset; i++) {
            emptyDayArray.push(<div key={i} className='calendar-item empty-day '></div>);
        }
        return emptyDayArray;
    };

    const renderWeekdays = () => {
        return weekdays.map((wd, i) => {
            const narrowDay = wd.slice(0, 1).toUpperCase();
            return <div className='weekday calendar-item' key={i}>{props.weekdayFormat === 'narrow' ? narrowDay : wd}</div>;
        });
    };

    return <div className='nc-corner-calendar'>
        { renderWeekdays() }
        { renderEmptyDays() }
        { renderDays() }
    </div>;
};
