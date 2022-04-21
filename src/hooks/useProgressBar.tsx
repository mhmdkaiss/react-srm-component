import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useIntl } from 'react-intl';

type UseProgressBarReturnType = {
    calculateProgressRatio: (startDate: string, endDate: string) => number;
    calculateTimeLeftText: (startDate: string, endDate: string) => string;
};

export const useProgressBar = (): UseProgressBarReturnType => {
    const intl = useIntl();
    const [now] = useState<Moment>(moment());

    const calculateProgressRatio = (startDate: string, endDate: string) => {
        const isEnded = now.isAfter(endDate);
        if (isEnded) {
            return 1;
        }
        const isStarted = now.isSameOrAfter(startDate);
        if (isStarted) {
            const date = moment(isStarted ? endDate : startDate);
            const timeLeft = Math.abs(date.diff(now));
            if (timeLeft > 0) {
                const duration = date.diff(startDate);
                return (1 - timeLeft / duration);
            }
        }
        return 0;
    };

    const calculateTimeLeftText = (startDate: string, endDate: string) => {
        const isEnded = now.isAfter(endDate);
        const isStarted = now.isSameOrAfter(startDate);
        if (!isStarted || !isEnded) {
            const date = moment(isStarted ? endDate : startDate);
            const ranges: Array<moment.unitOfTime.Diff> = [ 'days', 'hours', 'minutes', 'seconds' ];
            for (const r of ranges) {
                const diff = Math.abs(date.diff(now, r));
                if (diff > 1) {
                    return intl.formatMessage(
                        { id: `challenge.time-${isStarted ? 'left' : 'start'}.${r}` },
                        { value: diff }
                    );
                }
            }
        }
        return '';
    };

    return { calculateProgressRatio, calculateTimeLeftText };
};
