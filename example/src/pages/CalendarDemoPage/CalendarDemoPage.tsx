import * as faker from 'faker';
import React, { useState } from 'react';
import './CalendarDemoPage.scss';
import { NCCornerCalendar, NCCornerCalendarEvent, NCCornerCalendarV1 } from '@cactus/srm-component';
import { IntlProvider } from 'react-intl';

interface NCCornerCalendarEventExtended extends NCCornerCalendarEvent {
    name: string;
}

export const CalendarDemoPage: React.FunctionComponent = () => {
    const [ selectedDate, setSelectedDate ] = useState<Date>();
    const [ selectedEvents, setSelectedEvents ] = useState<Array<NCCornerCalendarEvent>>([]);

    const date = new Date();
    const events: Array<NCCornerCalendarEventExtended> = [
        {
            name: 'Fifa and something',
            id: faker.datatype.uuid(),
            date: new Date(),
            classNames: [ 'fifa', 'something' ]
        },
        {
            name: 'Bs',
            id: faker.datatype.uuid(),
            date: new Date(Date.now() + 6.048e+8),
            classNames: ['bs']
        },
        {
            name: 'Bs and fifa',
            id: faker.datatype.uuid(),
            date: new Date(Date.now() + 6.048e+8),
            classNames: [ 'bs', 'fifa' ]
        },
        {
            name: 'Bs and fifa v2',
            id: faker.datatype.uuid(),
            date: new Date(Date.now() + (31 * 24 * 60 * 60 * 1000)),
            classNames: [ 'bs', 'fifa' ]
        }
    ].reverse();

    const onDateSelected = (date: Date, eventIds: Array<string>) => {
        setSelectedDate(date);
        setSelectedEvents(events.filter(e => eventIds.includes(e.id)));
    };

    const openEvent = (e: string) => {
        alert('Open event ' + e);
    };

    return <div className='calendar-demo-page d-flex flex-column'>
        <div>
            <h2>Corner calendar base</h2>
            <div className='row'>
                <div className='col-4'>
                    <div className='mt-3'>
                        <h3>Intl locale fr</h3>
                        <IntlProvider locale='fr'>
                            <NCCornerCalendar
                                month={date.getMonth()}
                                year={date.getFullYear()}
                                events={events}
                                selectedDate={selectedDate}
                                onDateSelected={onDateSelected}
                            />
                        </IntlProvider>
                    </div>
                    <div className='mt-3'>
                        <h3>Intl locale en</h3>
                        <IntlProvider locale='en'>
                            <NCCornerCalendar
                                month={date.getMonth() + 1}
                                year={date.getFullYear()}
                                events={events}
                                selectedDate={selectedDate}
                                onDateSelected={onDateSelected}
                                weekdayFormat='narrow'
                            />
                        </IntlProvider>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='d-flex flex-column'>
                        <span>Selected events</span>
                        {selectedEvents.map(e => {
                            return <span key={e.id}>{(e as NCCornerCalendarEventExtended).name}</span>;
                        })}
                    </div>
                </div>
            </div>
            <h2 className='mt-5'>Corner calendar v1</h2>
            <NCCornerCalendarV1
                events={events.map(e => ({ ...e, date: Math.round(e.date.getTime() / 1000) }))}
                onOpenEvent={openEvent}
                games={[{ name: 'Fifa', slug: 'fifa' }, { name: 'LoL', slug: 'lol' }]}
                openEventLabel="Aller au tournoi" />
            <h2 className='mt-5'>Corner calendar horizontal</h2>
            <NCCornerCalendarV1
                events={events.map(e => ({ ...e, date: Math.round(e.date.getTime() / 1000) }))}
                onOpenEvent={openEvent}
                games={[{ name: 'Fifa', slug: 'fifa' }, { name: 'LoL', slug: 'lol' }]}
                openEventLabel="Aller au tournoi"
                weekdayFormat='narrow'
                horizontal={true} />
        </div>
    </div>;
};
