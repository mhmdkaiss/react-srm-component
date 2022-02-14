import React, { useEffect, useState } from 'react';
import './NCCornerCalendarV1.scss';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { Button, ButtonTheme } from '../../../atoms/Button/Button';
import { NCCornerCalendar } from '../NCCornerCalendar/NCCornerCalendar';
import { Icon, IconType } from '../../../atoms/Icon/Icon';

export interface NCCornerCalendarV1Props {
    events: Array<NCCornerCalendarV1Event>,
    games: Array<{slug: string, name: string}>,
    openEventLabel?: string;
    onOpenEvent?: (eventId: string) => void;
    horizontal?: boolean;
    weekdayFormat?: 'short' | 'narrow',
}

export interface NCCornerCalendarV1Event {
    id: string,
    date: number,
    name: string,
    classNames?: Array<string>
}

interface MonthYear {
    month: number;
    year: number;
}

export const NCCornerCalendarV1: React.FunctionComponent<NCCornerCalendarV1Props> = (props: NCCornerCalendarV1Props) => {
    const intl = useIntl();
    const [ selectedDate, setSelectedDate ] = useState<Date>();
    const [ selectedEvents, setSelectedEvents ] = useState<Array<NCCornerCalendarV1Event>>([]);
    const [ monthsWithEvent, setMonthsWithEvents ] = useState<Array<MonthYear>>([]);
    const [ visibleMonth, setVisibleMonth ] = useState<moment.Moment>(moment());
    const [ calendarClass, setCalendarClass ] = useState<string>('');

    const openEvent = (tournamentId: string) => {
        if (props.onOpenEvent) {
            props.onOpenEvent(tournamentId);
        }
    };

    const onDateSelected = (date: Date, eventIds: Array<string>) => {
        setSelectedDate(date);
        setSelectedEvents(props.events.filter(t => eventIds.includes(t.id)));
    };

    const getAllMonthsWithEvents = (): Array<MonthYear> => {
        const months: Array<MonthYear> = [];
        props.events.forEach(t => {
            const date = moment(t.date * 1000);
            if (!months.some(m => date.month() === m.month && date.year() === m.year)) {
                months.push({ month: date.month(), year: date.year() });
            }
        });
        return months.sort((m1, m2) => (m1.month + m1.year * 100) - (m2.month + m2.year * 100));
    };

    const selectFirstDateWithEvents = () => {
        if (props.events.length > 0) {
            const date = moment(props.events[props.events.length - 1].date * 1000);
            const events: Array<string> = [];
            for (let i = props.events.length - 1; i >= 0; i--) {
                const tournament = props.events[i];
                if (moment(tournament.date * 1000).isSame(date, 'day')) {
                    events.push(tournament.id);
                } else {
                    break;
                }
            }
            onDateSelected(date.toDate(), events);
        }
    };

    useEffect(() => {
        if (props.horizontal) {
            if (props.events.length > 0) {
                setVisibleMonth(moment(props.events[props.events.length - 1].date * 1000));
            }
        } else {
            setMonthsWithEvents(getAllMonthsWithEvents());
        }
        selectFirstDateWithEvents();
    }, [props.events]);

    const changeMonth = (offset: number): void => {
        setCalendarClass(offset > 0 ? 'slide-left' : 'slide-right');
        setTimeout(() => {
            setVisibleMonth(visibleMonth.clone().add(offset, 'months'));
            setCalendarClass('');
        }, 130);
    };

    return <div className='nc-corner-calendar-v1 d-flex flex-column p-3'>
        <div className='row'>
            <div className='col-12 col-md-6 calendars'>
                {props.horizontal ? <React.Fragment>
                    <div className='d-flex justify-content-between'>
                        <div className='month-switcher cursor-pointer' onClick={() => changeMonth(-1)}>
                            <Icon icon={IconType.Colapse} styleName='previous' />
                        </div>
                        <div className='month text-center'>{intl.formatDate(visibleMonth.toDate(), { month: 'long' })} {visibleMonth.year()}</div>
                        <div className='month-switcher cursor-pointer' onClick={() => changeMonth(1)}>
                            <Icon icon={IconType.Colapse} styleName='next' />
                        </div>
                    </div>
                    <div className={`calendar-container ${calendarClass}`}>
                        <NCCornerCalendar
                            month={visibleMonth.month()}
                            year={visibleMonth.year()}
                            events={props.events.map(e => ({ ...e, date: new Date(e.date * 1000) }))}
                            selectedDate={selectedDate}
                            onDateSelected={onDateSelected}
                            weekdayFormat={props.weekdayFormat}
                        />
                    </div>
                </React.Fragment>
                    :
                    monthsWithEvent.map((m, i) => {
                        const momentMonth = moment().set('month', m.month).set('year', m.year);
                        return <React.Fragment key={`${m.month}-${m.year}`}>
                            { i !== 0 && <div className='divider'></div>}
                            <div className='month'>{intl.formatDate(momentMonth.toDate(), { month: 'long' })} {momentMonth.year()}</div>
                            <NCCornerCalendar
                                month={momentMonth.month()}
                                year={momentMonth.year()}
                                events={props.events.map(e => ({ ...e, date: new Date(e.date * 1000) }))}
                                selectedDate={selectedDate}
                                onDateSelected={onDateSelected}
                                weekdayFormat={props.weekdayFormat}
                            />
                        </React.Fragment>;
                    })}
            </div>
            <div className='col-12 col-md-6 d-flex flex-column details align-self-center px-4 mt-3 mt-lg-0'>
                {selectedEvents.map((se, i) => {
                    const date = new Date(se.date * 1000);
                    return <div className='mb-1' key={se.id}>
                        {i !== 0 && <div className='divider'></div>}
                        <div className='date pb-2'>{intl.formatDate(date, { day: 'numeric', month: 'long' })}</div>
                        <div className='time pb-2'>{intl.formatDate(date, { hour: '2-digit', minute: '2-digit' })}</div>
                        <div className='name pb-4'>{se.name}</div>
                        {props.openEventLabel && props.onOpenEvent && <Button
                            theme={ButtonTheme.CUSTOM}
                            label={props.openEventLabel}
                            setClick={() => openEvent(se.id)}
                        />}
                    </div>;
                }
                )}
            </div>
        </div>
        <div className='divider m-0'></div>
        <div className='legend d-flex flex-column flex-sm-row justify-content-around mt-3 mb-4'>
            {props.games.map(g => <div key={g.slug} className='d-flex'>
                <div className={`circle mr-3 ${g.slug}`}></div>
                {g.name}
            </div>)}
        </div>
    </div>;
};
