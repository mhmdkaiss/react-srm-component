import './NCCornerCalendarV1.scss';

import { Button, ButtonTheme } from '../../../atoms/Button/Button';
import { Icon, IconType } from '../../../atoms/Icon/Icon';
import React, { useEffect, useState } from 'react';
import { Tournament, TournamentContent } from '../../../models/Tournament';

import { NCCornerCalendar } from '../NCCornerCalendar/NCCornerCalendar';
import { NCTournamentCard } from '../../NCTournamentCard/NCTournamentCard';
import { TournamentUtilsService } from '../../../services/tournament-utils.service';
import moment from 'moment';
import { useIntl } from 'react-intl';

export enum TournamentInfoStyle {
    Text,
    TournamentCard
}

export interface NCCornerCalendarV1Props {
    events: Array<NCCornerCalendarV1Event>,
    games: Array<{slug: string, name: string}>,
    openEventLabel?: string;
    onOpenEvent?: (eventId: string) => void;
    horizontal?: boolean;
    weekdayFormat?: 'short' | 'narrow',
    tournamentInfoStyle?: TournamentInfoStyle
    numberOfEventsMessage?: string
    hideLegend?: boolean
}

export interface NCCornerCalendarV1Event {
    id: string,
    date: number,
    name: string,
    classNames?: Array<string>
    tournament?: Tournament
    tournamentContent?: TournamentContent
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
            const event = props.events.reverse().find(event => moment(event.date * 1000) > moment());
            if (event) {
                onDateSelected(moment(event.date * 1000).toDate(), [event.id]);
            }
        }
    };

    useEffect(() => {
        if (!props.horizontal) {
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

    const renderTournamentInfo = (eventInfo: NCCornerCalendarV1Event) => {
        switch (props.tournamentInfoStyle) {
            case TournamentInfoStyle.TournamentCard:
                return renderTournamentInfoCard(eventInfo);
            default:
                return renderTournamentInfoText(eventInfo);
        }
    };

    const renderTournamentInfoText = (eventInfo: NCCornerCalendarV1Event) => {
        const date = new Date(eventInfo.date * 1000);
        return <React.Fragment>
            <div className='date pb-2'>{intl.formatDate(date, { day: 'numeric', month: 'long' })}</div>
            <div className='time pb-2'>{intl.formatDate(date, { hour: '2-digit', minute: '2-digit' })}</div>
            <div className='name pb-4'>{eventInfo.name}</div>
            {props.openEventLabel && props.onOpenEvent && <Button
                theme={ButtonTheme.CUSTOM}
                label={props.openEventLabel}
                setClick={() => openEvent(eventInfo.id)}
            />}
        </React.Fragment>;
    };

    const renderTournamentInfoCard = (eventInfo: NCCornerCalendarV1Event) => {
        if (!eventInfo.tournament) {
            return <React.Fragment></React.Fragment>;
        }
        let banner = `${process.env.REACT_APP_S3_PUBLIC_URL}/game/${eventInfo.tournament.gameSlug}/medias/TournamentBanner`;
        if (eventInfo.tournamentContent?.banner) {
            banner = eventInfo.tournamentContent?.banner;
        }
        const game = props.games?.find(g => g.slug === eventInfo.tournament?.gameSlug);
        let onOpen = undefined;
        if (props.onOpenEvent) {
            onOpen = () => {
                props.onOpenEvent?.(eventInfo.id);
            };
        }
        return <div className='d-flex justify-content-center w-100'>
            <NCTournamentCard
                tournament={eventInfo.tournament}
                banner={banner}
                gameName={game?.name || ''}
                prize={TournamentUtilsService.getReward(eventInfo.tournament, intl)}
                joinHook={onOpen}
                gift={TournamentUtilsService.gotGift(eventInfo.tournament)}
            />
        </div>;
    };

    return <div className='nc-corner-calendar-v1 d-flex flex-column p-3'>
        <div className='row'>
            <div className='col-12 col-md-6 calendars mx-auto'>
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
                { props.numberOfEventsMessage && selectedEvents.length > 0 && <span className='text-center number-of-events-message'>
                    {selectedEvents.length} {props.numberOfEventsMessage}
                </span>}
                {selectedEvents.map((se, i) => {
                    return <div className='mb-1' key={se.id}>
                        {i !== 0 && <div className='divider'></div>}
                        {renderTournamentInfo(se)}
                    </div>;
                }
                )}
            </div>
        </div>
        {!props.hideLegend && props.games.length > 0 && <React.Fragment>
            <div className='divider m-0'></div>
            <div className='legend d-flex flex-column flex-sm-row justify-content-around mt-3 mb-4'>
                {props.games.map(g => <div key={g.slug} className='d-flex'>
                    <div className={`circle mr-3 ${g.slug}`}></div>
                    {g.name}
                </div>)}
            </div>
        </React.Fragment>}
    </div>;
};
