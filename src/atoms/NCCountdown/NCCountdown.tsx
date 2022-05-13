import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './NCCountdown.scss';

interface FormattedCountdown {
    d?: number;
    h?: number;
    m?: number;
    s?: number;
}

export interface FormattedCountdownString {
    d?: string;
    h?: string;
    m?: string;
    s?: string;
}

const FORMATTED_COUNTDOWN_FUNCTIONS = {
    'd': (d: moment.Duration) => Math.floor(d.asDays()),
    'h': (d: moment.Duration) => Math.floor(d.asHours() % 24),
    'm': (d: moment.Duration) => Math.floor(d.asMinutes() % 60),
    's': (d: moment.Duration) => Math.floor(d.asDays() % 60),
};

const DEFAULT_FORMAT = {
    d: 'd',
    h: 'h',
    m: 'm',
    s: 's'
};

export interface NCCountdownProps {
    datetime: string;
    stringFormat?: FormattedCountdownString;
    text?: string;
    refreshInterval?: number;
}

export const NCCountdown: React.FunctionComponent<NCCountdownProps> = (
    props: NCCountdownProps
) => {
    const [ timeLeft, setTimeLeft ] = useState<FormattedCountdown>();
    const toDatetime = moment(props.datetime);
    const stringFormat = props.stringFormat ? props.stringFormat : DEFAULT_FORMAT;
    const delay = props.refreshInterval ? props.refreshInterval : 1000;

    const calculateTimeLeft = (timerId?: NodeJS.Timeout) => {
        const now = moment.utc();
        const diff = moment.duration(toDatetime.diff(now));
        if (diff) {
            const obj: FormattedCountdown = {};
            for (const [ key, value ] of Object.entries(stringFormat)) {
                Object.assign(obj, { [value]: FORMATTED_COUNTDOWN_FUNCTIONS[key](diff) });
            }
            return { ...obj };
        }
        if (timerId) {
            clearInterval(timerId);
        }
        return;
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timerId = setInterval(() => {
            setTimeLeft(calculateTimeLeft(timerId));
        }, delay);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="nc-countdown">
            {timeLeft && Object.entries(timeLeft).map(([ key, value ]) =>
                <React.Fragment key={key}>
                    <span className='digit'>{value}</span>
                    <span className='formatted-text'>{key}</span>
                </React.Fragment>
            )}
            {props.text}
        </div>
    );
};
