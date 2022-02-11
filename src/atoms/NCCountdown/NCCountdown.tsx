import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './NCCountdown.scss';

export interface NCCountdownProps {
    datetime: string;
}

interface FormattedCountdown {
    d?: number;
    h?: number;
    m?: number;
    s?: number;
}

export const NCCountdown: React.FunctionComponent<NCCountdownProps> = (
    props: NCCountdownProps
) => {
    const [ timeLeft, setTimeLeft ] = useState<FormattedCountdown>({});
    const countdown: Array<string> = [];
    const intl = useIntl();

    const calculateTimeLeft = (interval: NodeJS.Timeout) => {
        const toDatetime = moment(props.datetime);
        const now = moment.utc();
        const difference = toDatetime.diff(now);
        if (difference > 0) {
            return {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        clearInterval(interval);
        return {};
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(() => calculateTimeLeft(interval));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    for (const [ key, value ] of Object.entries(timeLeft)) {
        countdown.push(`${value}${key} `);
    }

    return (
        <React.Fragment>
            {countdown.length > 0 &&
                <div className="nc-countdown">
                    <div>
                        {countdown} {intl.formatMessage({ id: 'tournament.match.paused.countdown' })}
                    </div>
                </div>}
        </React.Fragment>
    );
};
